import { Module } from '@nestjs/common';
import { VersementService } from './versement.service';
import { VersementController } from './versement.controller';
import { CompteModule } from '../compte/compte.module';

@Module({
  imports: [CompteModule],
  controllers: [VersementController],
  providers: [VersementService]
})
export class VersementModule {}
