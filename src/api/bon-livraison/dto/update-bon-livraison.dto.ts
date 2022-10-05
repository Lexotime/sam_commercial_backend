import { PartialType } from '@nestjs/mapped-types';
import { CreateBonLivraisonDto } from './create-bon-livraison.dto';

export class UpdateBonLivraisonDto extends PartialType(CreateBonLivraisonDto) {}
