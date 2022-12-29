import { Module } from '@nestjs/common';
import { ChauffeurController } from './chauffeur.controller';
import { ChauffeurService } from './chauffeur.service';

@Module({
  controllers: [ChauffeurController],
  providers: [ChauffeurService]
})
export class ChauffeurModule {}
