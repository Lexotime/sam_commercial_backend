import  { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @IsNotEmpty()
    @ApiProperty()
    numeroArticle: string;
    
    @IsNotEmpty()
    @ApiProperty()
    designationId: number;

    @IsNotEmpty()
    @ApiProperty()
    marque: string;
    
    @IsNotEmpty()
    @ApiProperty()
    prixUnitaire: number;

    @IsNotEmpty()
    @ApiProperty()
    stock: number;

    @IsNotEmpty()
    @ApiProperty()
    epaisseur: string;
    
    @IsNotEmpty()
    @ApiProperty()
    imageUrl: string;

    @IsNotEmpty()
    @ApiProperty()
    dimension: string; 
}
