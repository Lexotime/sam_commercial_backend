import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBonLivraisonDto {

    @IsNotEmpty()
    @ApiProperty()
    numeroCommande: string;

    @IsNotEmpty()
    @ApiProperty()
    chauffeur: string;

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
