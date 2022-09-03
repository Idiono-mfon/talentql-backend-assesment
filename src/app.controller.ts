import { Controller, Get, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Throttle(3, 1)
  @Get('howold')
  getAge(@Query('dob') dob: string): string {
    const age = this.appService.getAge(dob);
    return age;
  }
}
