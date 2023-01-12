import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateVersementDto {
    @IsNotEmpty()
    @ApiProperty()
    numeroCompte: string;

    @IsNotEmpty()
    @ApiProperty()
    montant: string;

    @IsNotEmpty()
    versementType: string;

    @IsOptional()
    banque: string;

    @IsOptional()
    soldeApres: number;
}
