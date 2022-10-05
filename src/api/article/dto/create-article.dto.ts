import  { IsNotEmpty } from 'class-validator'

export class CreateArticleDto {
    @IsNotEmpty()
    numeroArticle: string;
    
    @IsNotEmpty()
    designationId: number;

    @IsNotEmpty()
    marque: string;
    
    @IsNotEmpty()
    prixUnitaire: number;

    @IsNotEmpty()
    stock: number;

    @IsNotEmpty()
    epaisseur: string;
    
    @IsNotEmpty()
    imageUrl: string;

    @IsNotEmpty()
    dimension: string; 
}
