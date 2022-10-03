import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './external-service/prisma/prisma.module';
import { DesignationModule } from './api/designation/designation.module';
import { ArticleModule } from './api/article/article.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule, DesignationModule, ArticleModule],
})
export class AppModule {}
