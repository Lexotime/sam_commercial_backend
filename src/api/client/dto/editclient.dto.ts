import { IsBoolean } from "@nestjs/class-validator"
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class editclientDto {
    
    @IsString()
@IsOptional()
    nrClient?:string
    @IsString()
    @IsOptional()
    nom ?     :string
    @IsOptional()
    @IsString()
    adresse ?  :string
    @IsOptional()
    @IsString()
    ville ?    :string
    @IsOptional()
    @IsString()
    pays  ?   :string
    @IsOptional()
    @IsEmail()
    email  ?   :string
    @IsOptional()
    @IsNumber()
    telephone ? :number
    @IsOptional()
    @IsNumber()
    remise  ?   :number

    @IsOptional()
    @IsBoolean()
    isSpecial:boolean
}