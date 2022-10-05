import { IsNotEmpty } from "class-validator";

export class CreateBonCommandeDto {

    @IsNotEmpty()
    numeroCommande: string;

    @IsNotEmpty()
    clientId: string;

    @IsNotEmpty()
    articles: any;

    @IsNotEmpty()
    commerciauxId: number;
}
