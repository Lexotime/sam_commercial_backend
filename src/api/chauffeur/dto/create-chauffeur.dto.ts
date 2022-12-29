import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChauffeurDto {

    @IsOptional()
    nomChauffeur: string;

    

    @IsNotEmpty()
    @ApiProperty()
    matricule:string


}
