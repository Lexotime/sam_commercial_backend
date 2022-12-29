import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { numberClientGenerator } from 'src/utils/number-generator';
import { clientDto, editclientDto } from './dto';

@Injectable()
export class ClientService {
    constructor(private prisma:PrismaService){}
    async creerclient(dto:any){
        

        try {
            do{dto.nrClient = numberClientGenerator();}
            while(await this.getclientbynum(dto.nrClient))
         
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
         throw new Error("client non cree");
         
         
        }
     }


     async getclient(){
         try {
             const client= await this.prisma.client.findMany({
                orderBy:{
                    id:'desc'
                }
             })
        
         return client
         } catch (error) {
             throw new Error('client pas trouve')
             
         }
          
     }
     async getclientbynum(nrClient){
         const client=await this.prisma.client.findUnique({
             where:{
                 nrClient
             }
 
           
              })
              
        return client
     }
   
     async updateclient(nrClient:string,dto:editclientDto){
         try {
             const client=this.prisma.client.update({
                 where:{nrClient},

                 data:{
                   ...dto
                 }
             })
            
             return client
             
         } catch (error) {
             throw new Error('client non modifie')
         }
        
     }

     async deleteclient(nrClient:string){
          return this.prisma.client.delete({
             where:{
                 nrClient
             }
         })
     }
}
