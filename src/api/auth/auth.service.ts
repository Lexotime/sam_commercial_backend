import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';

import { signinDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService) {}

    async signin(dto:signinDto){
        const commercial =await this.prisma.commerciaux.findUnique({
            where:{
                login:dto.login
            }
            })
            if (!commercial){
               throw new  ForbiddenException('credentials incorrect')
            }
            const pwpassword= commercial.password === dto.password
          
            if (!pwpassword){
              throw new  ForbiddenException('credentials incorrect')
            }
            return commercial
              
       
    }
}
