import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class upbonCommande {
    
    @IsString()
    @IsNotEmpty()
    observation:string
}
