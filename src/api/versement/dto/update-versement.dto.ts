import { PartialType } from '@nestjs/swagger';
import { CreateVersementDto } from './create-versement.dto';

export class UpdateVersementDto extends PartialType(CreateVersementDto) {}
