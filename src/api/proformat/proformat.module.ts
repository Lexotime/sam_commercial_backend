import { Module } from '@nestjs/common';
import { ProformatService } from './proformat.service';
import { ProformatController } from './proformat.controller';

@Module({
  providers: [ProformatService],
  controllers: [ProformatController]
})
export class ProformatModule {}
