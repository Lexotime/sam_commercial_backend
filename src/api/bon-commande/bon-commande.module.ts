import { Module } from '@nestjs/common';
import { BonCommandeService } from './bon-commande.service';
import { BonCommandeController } from './bon-commande.controller';

@Module({
  controllers: [BonCommandeController],
  providers: [BonCommandeService]
})
export class BonCommandeModule {}
