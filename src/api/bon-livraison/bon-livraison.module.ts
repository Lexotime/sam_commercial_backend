import { Module } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { BonLivraisonController } from './bon-livraison.controller';

@Module({
  controllers: [BonLivraisonController],
  providers: [BonLivraisonService]
})
export class BonLivraisonModule {}
