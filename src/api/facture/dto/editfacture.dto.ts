import { IsOptional, IsString } from "class-validator"

export class editfacturedto{

    @IsString()
    @IsOptional()
    numerofacture?:string
     
    @IsOptional()
    @IsString()
     bonlivraisonid?:string
}