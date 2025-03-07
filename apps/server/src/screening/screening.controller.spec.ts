import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningController } from './screening.controller';

describe('ScreeningController', () => {
  let controller: ScreeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreeningController],
    }).compile();

    controller = module.get<ScreeningController>(ScreeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
