import { Test, TestingModule } from '@nestjs/testing';
import { AbsController } from './abs.controller';

describe('AbsController', () => {
  let controller: AbsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsController],
    }).compile();

    controller = module.get<AbsController>(AbsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
