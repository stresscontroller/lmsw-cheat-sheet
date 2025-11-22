import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';

import { AuthGuard } from '../../common/guards/auth.guard';
import { PaymentService } from './payment.service';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('isPaid')
  isPaid(@Body() signUpDto: Record<string, any>) {
    return this.paymentService.getPaymentStatus(signUpDto.email);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('setPayment')
  setPayment(@Body() signUpDto: Record<string, any>) {
    return this.paymentService.setPayment(signUpDto.email);
  }
}
