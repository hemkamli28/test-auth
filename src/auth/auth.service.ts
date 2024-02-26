import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    RegisterDto: registerDto,
  ): Promise<{ token: string; user: object }> {
    const { name, email, password } = RegisterDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const data = {
      id: user._id,
    };
    const token = this.jwtService.sign(data);
    return { token, user };
  }

  async login(LoginDto: loginDto): Promise<{ token: string; user: object }> {
    const { email, password } = LoginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid Credentials!');
    }
    const data = {
      id: user._id,
    };
    const token = this.jwtService.sign(data);

    return { token, user };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
  }
}
