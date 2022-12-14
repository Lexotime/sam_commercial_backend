import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './api/article/article.module';
import { AuthModule } from './api/auth/auth.module';
import { CommercialModule } from './api/commercial/commercial.module';
import { FactureModule } from './api/facture/facture.module';
import { PrismaModule } from './external-service/prisma/prisma.module';
import { BonCommandeModule } from './api/bon-commande/bon-commande.module';
import { BonLivraisonModule } from './api/bon-livraison/bon-livraison.module';
import { ClientModule } from './api/client/client.module';
import { StatistiqueModule } from './api/statistique/statistique.module';
import { ProformatModule } from './api/proformat/proformat.module';
import { ChauffeurModule } from './api/chauffeur/chauffeur.module';
import { VersementModule } from './api/versement/versement.module';
import { DebitModule } from './api/debit/debit.module';
import { CompteModule } from './api/compte/compte.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule, CommercialModule, AuthModule, ClientModule ,FactureModule, ArticleModule, BonCommandeModule, BonLivraisonModule,StatistiqueModule,ProformatModule,ChauffeurModule, VersementModule, DebitModule, CompteModule],
})
export class AppModule {}
