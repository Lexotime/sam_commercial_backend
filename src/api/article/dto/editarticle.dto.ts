import {  IsNumber, IsOptional, IsString } from "class-validator"

export class editArticleDto{
    
    @IsOptional()
    @IsString()
    numeroArticle? :string

    @IsOptional()
    @IsNumber()
    designationId ?:number
     
    @IsOptional()
    @IsString()
    marque? :string

    @IsOptional()
    @IsNumber()
    prixUnitaire? :number
    
    @IsOptional()
    @IsNumber()
    stock? :number
    @IsOptional() 
    @IsNumber()
    epaisseur? :number
    @IsOptional()
    @IsString()
    imageUrl  ? :string

    @IsOptional()
    @IsString()
    dimension ?: string

} 