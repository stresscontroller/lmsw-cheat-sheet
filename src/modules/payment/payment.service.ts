import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class PaymentService {
  constructor(private usersService: UsersService) {}

  async getPaymentStatus(email: string) {
    try {
      const res = await this.usersService.findByEmail(email);
      return { isPaid: res.isPaid };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async setPayment(email: string) {
    try {
      await this.usersService.setPaymentStatus(email);
      return { status: true };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
