import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDesignationDto {
    @IsNotEmpty()
    libelle: string;
}
