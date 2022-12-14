import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { CompteModule } from '../compte/compte.module';

@Module({
  imports: [CompteModule],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService]
})
export class ClientModule {}
