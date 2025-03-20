import { BadRequestException, Body, Controller, Get, Logger, Post, Req, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { CreateUserDto, CreateUserSchema } from '@lk/schemas';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  @Version('1')
  getHelloV1(@Req() req: Request) {
    return `Hello World for version 1! ${req.url}`;
  }

  @Get('/hello')
  @Version('2')
  getHelloV2(@Req() req: Request) {
    return `Hello World for version 2! ${req.url}`;
  }

  @Post('/hello')
  @Version('1')
  postHelloV1(@Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto) {
    if (body.email.endsWith('.org')) {
      throw new BadRequestException('Email is not allowed');
    }
    return body;
  }

  @Post('/hello')
  @Version('2')
  postHelloV2(@Body(new ZodValidationPipe(CreateUserSchema)) body: CreateUserDto) {
    if (body.email.endsWith('.org')) {
      throw new BadRequestException('Email is not allowed');
    }
    return body;
  }
}
