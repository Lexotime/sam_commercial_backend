import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBonLivraisonDto {

    @IsOptional()
    numeroLivraison: string;

    @IsNotEmpty()
    @ApiProperty()
    chauffeurId: string;

    @IsNotEmpty()
    @ApiProperty()
    clientId: string;

    @IsNotEmpty()
    @ApiProperty()
    articles: any;

    @IsNotEmpty()
    @ApiProperty()
    commerciauxId: number;

    @IsNotEmpty()
    bonCommandeId: string;
}
