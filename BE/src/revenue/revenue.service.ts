import { UserService } from 'src/user/user.service';
import { OrderService } from './../order/order.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RevenueService {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  async getRevenue(orderType: 'month' | 'year') {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const [
      orders,
      numOfOrder,
      numOfUser,
      topSaleProducts,
      revenueOrder,
      orderCompleted,
      orderCancelled,
    ] = await Promise.all([
      this.orderService.totalCostOrderByYear(year),
      this.orderService.countOrderByYear(year),
      this.userService.countUserByMonth(year, month),
      this.orderService.getTopSellingProducts(10),
      orderType === 'month'
        ? this.orderService.findAllOrderByMonth(year, month)
        : this.orderService.findAllOrderByYear(year),
      this.orderService.findAllOrderCompletedByMonth(year, month),
      this.orderService.findAllOrderCancelledByMonth(year, month),
    ]);

    return {
      orders: orders,
      numOfOrder: numOfOrder,
      numOfUser: numOfUser,
      revenueOrder: revenueOrder,
      topSaleProducts: topSaleProducts,
      orderStatus: {
        completed: orderCompleted,
        cancelled: orderCancelled,
      },
    };
  }
}
