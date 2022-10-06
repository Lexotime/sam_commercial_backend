import {  IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class comDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    login:string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password:string
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    role:string
}