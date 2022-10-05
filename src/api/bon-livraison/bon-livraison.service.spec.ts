import { Test, TestingModule } from '@nestjs/testing';
import { BonLivraisonService } from './bon-livraison.service';

describe('BonLivraisonService', () => {
  let service: BonLivraisonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BonLivraisonService],
    }).compile();

    service = module.get<BonLivraisonService>(BonLivraisonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
