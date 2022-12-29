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

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule, CommercialModule, AuthModule, ClientModule ,FactureModule, ArticleModule, BonCommandeModule, BonLivraisonModule,StatistiqueModule,ProformatModule],
})
export class AppModule {}
