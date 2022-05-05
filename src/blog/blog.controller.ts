import { Controller, Get, HttpCode, Req, Request } from '@nestjs/common';

@Controller('blog')
export class BlogController {
  @Get('post/:id')
  @HttpCode(207)
  findAll(@Req() request: Request): string {
    return `this is blog Post ${request}`;
  }
}
