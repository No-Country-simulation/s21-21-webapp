import { Test, TestingModule } from '@nestjs/testing';
import { HallService } from './hall.service';

describe('HallService', () => {
  let service: HallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallService],
    }).compile();

    service = module.get<HallService>(HallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
