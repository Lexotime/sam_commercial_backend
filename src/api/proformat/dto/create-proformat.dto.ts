import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProformatDto {

    @IsOptional()
    numeroProformat: string;
    
    @IsNotEmpty()
    @ApiProperty()
    nomClient: any;

    @IsNotEmpty()
    @ApiProperty()
    adresseClient: any;

    

    @IsNotEmpty()
    @ApiProperty()
    articles: any;

    @IsNotEmpty()
    @ApiProperty()
    commerciauxId: any;

   
}