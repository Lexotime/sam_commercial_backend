import {   IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class signinDto{

     @IsString()
     @ApiProperty()
    login:string
    
    
     @IsString()
     @ApiProperty()
    password:string
    
   
}