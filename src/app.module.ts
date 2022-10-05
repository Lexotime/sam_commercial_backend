import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './api/article/article.module';
import { AuthModule } from './api/auth/auth.module';
import { CommercialModule } from './api/commercial/commercial.module';
import { FactureModule } from './api/facture/facture.module';
import { PrismaModule } from './external-service/prisma/prisma.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule,FactureModule,CommercialModule,ArticleModule,AuthModule],
})
export class AppModule {}
