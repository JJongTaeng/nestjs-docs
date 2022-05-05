import { Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  create(cat: Cat) {
    this.catsService.create(cat);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
