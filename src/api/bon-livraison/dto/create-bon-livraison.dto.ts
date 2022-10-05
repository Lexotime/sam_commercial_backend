import { IsNotEmpty } from "class-validator";

export class CreateBonLivraisonDto {

    @IsNotEmpty()
    numeroCommande: string;

    @IsNotEmpty()
    chauffeur: string;

    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    articles: any;

    @IsNotEmpty()
    commerciauxId: number;

    @IsNotEmpty()
    bonCommandeId: string;
}
