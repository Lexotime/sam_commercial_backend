import { IsString,IsNotEmpty } from "class-validator"

export class factureDto{
     
    @IsString()
    @IsNotEmpty()
    numerofacture:string
     
    @IsNotEmpty()
    @IsString()
     bonlivraisonid:string
}