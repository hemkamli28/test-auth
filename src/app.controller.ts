import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }
  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
