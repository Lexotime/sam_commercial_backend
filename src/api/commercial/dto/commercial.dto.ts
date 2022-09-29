import {  IsNotEmpty, IsString } from "class-validator"

export class comDto{

    @IsString()
    @IsNotEmpty()
    login:string
    
    @IsNotEmpty()
    @IsString()
    password:string
    
    @IsNotEmpty()
    @IsString()
    role:string
}