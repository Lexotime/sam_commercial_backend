import { Test, TestingModule } from '@nestjs/testing';
import { BonCommandeController } from './bon-commande.controller';
import { BonCommandeService } from './bon-commande.service';

describe('BonCommandeController', () => {
  let controller: BonCommandeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonCommandeController],
      providers: [BonCommandeService],
    }).compile();

    controller = module.get<BonCommandeController>(BonCommandeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
