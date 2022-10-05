import {  IsOptional, IsString } from "class-validator"

export class editcomDto{

    @IsString()
    @IsOptional()
    login?:string
    
    @IsOptional()
    @IsString()
    password?:string
    
    @IsOptional()
    @IsString()
    role?:string
}