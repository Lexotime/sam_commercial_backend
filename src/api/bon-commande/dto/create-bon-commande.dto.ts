import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBonCommandeDto {

    @IsNotEmpty()
    @ApiProperty()
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
