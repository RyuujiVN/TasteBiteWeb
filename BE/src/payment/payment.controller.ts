import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreatePaymentLinkDTO } from './dtos/create-payment-link.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('receive-webhook')
  handleWebhook(@Body() body: any) {
    console.log(body);
  }
}
