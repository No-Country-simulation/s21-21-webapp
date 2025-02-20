import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningService } from './screening.service';

describe('ScreeningService', () => {
  let service: ScreeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningService],
    }).compile();

    service = module.get<ScreeningService>(ScreeningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
