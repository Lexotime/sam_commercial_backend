import  { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @IsOptional()
    numeroArticle: string;
    
    @IsNotEmpty()
    @ApiProperty()
    designation: string;

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
