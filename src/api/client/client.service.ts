import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { clientDto, editclientDto } from './dto';

@Injectable()
export class ClientService {
    constructor(private prisma:PrismaService){}
    async creerclient(dto:clientDto){
        

        try {
         const client= await this.prisma.client.create({
             data:{ 
                nrClient:dto.nrClient,
                nom:dto.nom,  
                adresse :dto.adresse, 
                ville:dto.ville,     
                pays :dto.pays ,    
                email:dto.email,   
                telephone :dto.telephone,
                remise :dto.remise 
                 }
         })
            return client
         
        } catch (error) {
         throw new Error("facture non creer");
         
         
        }
     }


     async getclient(){
         try {
             const client= await this.prisma.client.findMany()
        
         return client
         } catch (error) {
             throw new Error('facture pas trouve')
             
         }
          
     }
     async getclientbyid(id:number){
         const client=await this.prisma.client.findUnique({
             where:{
                 id
             }
 
           
              })
              
        return client
     }
   
     async updateclient(id:number,dto:editclientDto){
         try {
             const client=this.prisma.client.update({
                 where:{id},

                 data:{
                   ...dto
                 }
             })
            
             return client
             
         } catch (error) {
             throw new Error('fqcture non modifiee')
         }
        
     }

     async deleteclient(id:number){
          return this.prisma.client.delete({
             where:{
                 id
             }
         })
     }
}
