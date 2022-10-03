import {   IsString } from "class-validator"

export class signinDto{

     @IsString()
    login:string
    
    
     @IsString()
    password:string
    
   
}