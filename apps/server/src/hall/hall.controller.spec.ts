import { Test, TestingModule } from '@nestjs/testing';
import { HallController } from './hall.controller';

describe('HallController', () => {
  let controller: HallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallController],
    }).compile();

    controller = module.get<HallController>(HallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
