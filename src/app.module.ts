import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './external-service/prisma/prisma.module';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),PrismaModule],
})
export class AppModule {}
