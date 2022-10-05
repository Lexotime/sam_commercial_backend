import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './external-service/prisma/prisma.module';
import { DesignationModule } from './api/designation/designation.module';
import { ArticleModule } from './api/article/article.module';
import { BonCommandeModule } from './api/bon-commande/bon-commande.module';
import { BonLivraisonModule } from './api/bon-livraison/bon-livraison.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule, DesignationModule, ArticleModule, BonCommandeModule, BonLivraisonModule],
  providers: [],
})
export class AppModule {}
