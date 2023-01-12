import { isBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "@nestjs/class-validator"

export class clientDto {
    
    @IsOptional()
    nrClient:string

    @IsOptional()
    numeroCompte: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nom      :string
    @IsString()
    @ApiProperty()
    adresse   :string
    @IsString()
    @ApiProperty()
    ville     :string
    @IsString()
    @ApiProperty()
    pays     :string
    @ApiProperty()
    email     :string
    @IsNumber()
    @ApiProperty()
    telephone :number
    @IsNumber()
    @ApiProperty()
    remise    :number
    @IsBoolean()
    isSpecial:boolean

    @ApiProperty()
    @IsNotEmpty()
    soldeInitial: number
}