import { Test, TestingModule } from '@nestjs/testing';
import { BonLivraisonController } from './bon-livraison.controller';
import { BonLivraisonService } from './bon-livraison.service';

describe('BonLivraisonController', () => {
  let controller: BonLivraisonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonLivraisonController],
      providers: [BonLivraisonService],
    }).compile();

    controller = module.get<BonLivraisonController>(BonLivraisonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
