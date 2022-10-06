import { IsString,IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class factureDto{
     
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    numerofacture:string
     
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
     bonlivraisonid:string
}