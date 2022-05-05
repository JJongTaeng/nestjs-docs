import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create Cat', () => {
    const cat: Cat = {
      age: 2,
      breed: 'mouse',
      name: 'nyaong',
    };
    service.create(cat);
    const cats = service.findAll();
    expect(cats.length).toBe(1);
  });
});
