import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';

import { editclientDto } from '../client/dto';
import { ChauffeurDto } from './dto';

@Injectable()
export class ChauffeurService {
    constructor(private prisma:PrismaService){}
    async creerclient(dto:ChauffeurDto){
        

        try {
           
         
         const chauffeur= await this.prisma.chauffeur.create({
             data:{ 
               nomChauffeur:dto.nomChauffeur,
               matricule:dto.matricule
                 }
         })
            return chauffeur
         
        } catch (error) {
         throw new Error("client non cree");
         
         
        }
     }


     async getclient(){
         try {
             const chauffeur= await this.prisma.chauffeur.findMany({
                
             })
        
         return chauffeur
         } catch (error) {
             throw new Error('client pas trouve')
             
         }
          
     }
     async getclientbynum(matricule){
         const client=await this.prisma.chauffeur.findUnique({
             where:{
                 matricule
             }
 
           
              })
              
        return client
     }
   
     
}
