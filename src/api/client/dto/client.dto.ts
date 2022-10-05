import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class clientDto {
    
    @IsString()
    @IsNotEmpty()
    nrClient:string
    @IsString()
    @IsNotEmpty()
    nom      :string
    @IsString()
    adresse   :string
    @IsString()
    ville     :string
    @IsString()
    pays     :string
    @IsEmail()
    email     :string
    @IsNumber()
    telephone :number
    @IsNumber()
    remise    :number

}