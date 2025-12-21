import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { Order } from './order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderPagination } from './interfaces/filter-order.interface';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusEnum } from 'src/common/enums/order.enum';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from 'src/common/enums/payment.enum';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  generateOrderCode = (id: number) => {
    return `DH${id.toString().padStart(6, '0')}`;
  };

  async findOneByid(id: number): Promise<Order> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoin('orderItem.product', 'product')
      .addSelect(['product.id', 'product.title', 'product.image_url'])
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return order;
  }

  async findAll(options: OrderPagination): Promise<Pagination<Order>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .orderBy('order.id', 'DESC');

    if (options?.search)
      queryBuilder
        .andWhere('order.name ILIKE :name', {
          name: `%${options.search}%`,
        })
        .orWhere('order.order_code ILIKE :order_code', {
          order_code: `%${options.search}%`,
        });

    if (options?.date_start && options?.date_end)
      queryBuilder.andWhere(
        'order.created_at BETWEEN :date_start AND :date_end',
        {
          date_start: options.date_start,
          date_end: options.date_end,
        },
      );

    if (options?.status)
      queryBuilder.andWhere('order.status = :status', {
        status: `${options.status}`,
      });

    if (options?.payment_status)
      queryBuilder.andWhere('order.payment_status = :payment_status', {
        payment_status: `${options.payment_status}`,
      });

    return paginate<Order>(queryBuilder, options);
  }

  async create(user_id: number, cart_id: number, data: CreateOrderDTO) {
    return await this.dataSource.transaction(async (manager) => {
      // 1.Tạo order
      const totalCost = data.line_items.reduce(
        (total, item) => total + item.price.sale * item.quantity,
        0,
      );

      const order = manager.create(Order, {
        name: data.name,
        phone: data.phone,
        note: data.note,
        payment_method: data.payment_method,
        shipping_fee: 30000,
        total_cost: totalCost + 30000,
        user_id: user_id,
        shipping_address: data.shipping_address,
        delivery: data.delivery,
        order_code: '',
      });

      const savedOrder = await manager.save(order);

      // 2. Tạo order_code
      order.order_code = this.generateOrderCode(savedOrder.id);
      await manager.save(savedOrder);

      // 3. Map line_items
      const orderItems = data.line_items.map((item) =>
        manager.create(OrderItem, {
          product_id: item.product_id,
          quantity: item.quantity,
          retail: item.price.retail,
          sale: item.price.sale,
          order_id: savedOrder.id,
        }),
      );
      // 4. Thêm nhiều order_item
      await manager.save(OrderItem, orderItems);

      // 5. Xoá hết tất cả item trong cart của user
      await this.cartService.deleteAllItem(manager, cart_id);

      // 6. Kiểm tra phương thứ thanh toán, nếu là chuyển khoản thì tạo link mã qr thanh toán
      if (savedOrder.payment_method === PaymentMethodEnum.BANK) {
        const paymentPayload = {
          orderCode: savedOrder.id,
          description: `Thanh toán ${savedOrder.order_code}`,
          amount: Number(savedOrder.total_cost),
          cancelUrl: 'http://localhost:5173/payment/failed',
          returnUrl: 'http://localhost:5173/payment/success',
        };
        const paymentLink =
          await this.paymentService.createPaymentLink(paymentPayload);
        return paymentLink;
      }
    });
  }

  async updateStatus(id: number, status: OrderStatusEnum) {
    await this.orderRepository.update(
      {
        id: id,
      },
      {
        status: status,
        updated_at: new Date(),
      },
    );
  }

  async updatePaymentStatus(id: number, payment_status: PaymentStatusEnum) {
    await this.orderRepository.update(
      {
        id: id,
      },
      {
        payment_status: payment_status,
        updated_at: new Date(),
      },
    );
  }
}
