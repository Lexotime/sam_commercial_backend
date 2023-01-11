import { Module } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { BonLivraisonController } from './bon-livraison.controller';
import { FactureService } from '../facture/facture.service';
import { DebitModule } from '../debit/debit.module';
import { CompteModule } from '../compte/compte.module';
import { ArticleModule } from '../article/article.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [DebitModule, CompteModule, ArticleModule, ClientModule],
  controllers: [BonLivraisonController],
  providers: [BonLivraisonService,FactureService]
})
export class BonLivraisonModule {}
