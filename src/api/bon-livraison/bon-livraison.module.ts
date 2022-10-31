import { Module } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { BonLivraisonController } from './bon-livraison.controller';
import { FactureService } from '../facture/facture.service';

@Module({
  controllers: [BonLivraisonController],
  providers: [BonLivraisonService,FactureService]
})
export class BonLivraisonModule {}
