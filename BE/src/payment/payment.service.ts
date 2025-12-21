import { Inject, Injectable } from '@nestjs/common';
import { PayOS } from '@payos/node';
import { CreatePaymentLinkDTO } from './dtos/create-payment-link.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYOS')
    private readonly payOS: PayOS,
  ) {}

  async createPaymentLink(order: CreatePaymentLinkDTO): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const expiredAt = now + 5 * 60;

    const paymentLink = await this.payOS.paymentRequests.create({
      ...order,
      expiredAt: expiredAt,
    });

    return paymentLink.checkoutUrl;
  }

  // async updateStatusPayment(dataBody) {
  //   const { status, orderCode };
  // }
}
