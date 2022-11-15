import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBonCommandeDto {

    @IsOptional()
    numeroCommande: string;

    @IsNotEmpty()
    @ApiProperty()
    clientId: string;

    @IsNotEmpty()
    @ApiProperty()
    articles: any;

    @IsNotEmpty()
    @ApiProperty()
    commerciauxId: number;

   
}
