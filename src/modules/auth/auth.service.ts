import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto, UserRole } from '../users/dto/create-user.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = (await this.usersService.findAll()).find(
      (user) => user.email === email,
    );
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (
      user &&
      (await this.passwordService.comparePassword(password, user.password))
    ) {
      const payload = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const jwtToken = await this.jwtService.signAsync(payload);
      const data = {
        token: jwtToken,
        userInfo: payload,
      };
      return data;
    } else {
      throw new UnauthorizedException();
    }
  }

  async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    isPaid: boolean,
  ) {
    const createUserDto: CreateUserDto = {
      email,
      firstName,
      lastName,
      password: await this.passwordService.hashPassword(password),
      role: UserRole.User,
      isPaid,
    };

    try {
      const res = await this.usersService.create(createUserDto);
      const data = await this.signIn(res.email, password);
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getProfile(email: string) {
    try {
      const res = await this.usersService.findByEmail(email);
      const data = {
        ...res,
        isPaid: res.isPaid ? 'Paid' : 'Not Paid',
      };
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
