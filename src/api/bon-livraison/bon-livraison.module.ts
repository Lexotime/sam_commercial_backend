import { Module } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { BonLivraisonController } from './bon-livraison.controller';
import { FactureService } from '../facture/facture.service';
import { DebitModule } from '../debit/debit.module';
import { CompteModule } from '../compte/compte.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [DebitModule, CompteModule, ArticleModule],
  controllers: [BonLivraisonController],
  providers: [BonLivraisonService,FactureService]
})
export class BonLivraisonModule {}
