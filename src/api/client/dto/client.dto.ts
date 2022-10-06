import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class clientDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nrClient:string
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
    @IsEmail()
    @ApiProperty()
    email     :string
    @IsNumber()
    @ApiProperty()
    telephone :number
    @IsNumber()
    @ApiProperty()
    remise    :number

}