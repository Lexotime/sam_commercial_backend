import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './api/article/article.module';
import { AuthModule } from './api/auth/auth.module';
import { CommercialModule } from './api/commercial/commercial.module';
import { FactureModule } from './api/facture/facture.module';
import { PrismaModule } from './external-service/prisma/prisma.module';
import { DesignationModule } from './api/designation/designation.module';
import { BonCommandeModule } from './api/bon-commande/bon-commande.module';
import { BonLivraisonModule } from './api/bon-livraison/bon-livraison.module';
import { ClientModule } from './api/client/client.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule, CommercialModule, AuthModule, ClientModule ,FactureModule,DesignationModule, ArticleModule, BonCommandeModule, BonLivraisonModule],
})
export class AppModule {}
