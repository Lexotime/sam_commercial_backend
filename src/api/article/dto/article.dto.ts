import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class articleDto{
    
    
    @IsString()
    @IsNotEmpty()
    numeroArticle :string

    @IsNumber()
    designationId :number
     
    @IsNotEmpty()
    @IsString()
    marque :string

    @IsNotEmpty()
    @IsNumber()
    prixUnitaire :number
    
    @IsNotEmpty()
    @IsNumber()
    stock :number
       
    @IsNumber()
    epaisseur :number
    @IsOptional()
    @IsString()
    imageUrl   :string

    @IsOptional()
    @IsString()
    dimension : string

} 