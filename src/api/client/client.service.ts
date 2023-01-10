import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { numberClientGenerator, numberCompteGenerator } from 'src/utils/number-generator';
import { CompteService } from '../compte/compte.service';
import { clientDto, editclientDto } from './dto';

@Injectable()
export class ClientService {
    constructor(private prisma:PrismaService, private compteService: CompteService){}
    async creerclient(dto:clientDto){
        

        try {
            do{
                dto.nrClient = numberClientGenerator();
            } while(await this.getclientbynum(dto.nrClient))

            do{
                dto.numeroCompte = numberCompteGenerator();
            } while(await this.compteService.findOne(dto.numeroCompte))
         
         const client= await this.prisma.client.create({
             data:{ 
                
                nrClient:dto.nrClient,
                compte: {
                    create: {
                        numeroCompte: dto.numeroCompte,
                        solde: dto.soldeInitial
                    }
                },
                nom:dto.nom,  
                adresse :dto.adresse, 
                ville:dto.ville,     
                pays :dto.pays ,    
                email:dto.email,   
                telephone :dto.telephone,
                remise :dto.remise,
                isSpecial:dto.isSpecial
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
                },
                include: {
                    compte: true
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
             },
             include: {
                compte: true
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

     async updateSpecialPrice(numeroClient: any, listArticle: any){
        for(let i=0; i < listArticle.length; i++){
            await this.prisma.articleOnClient.upsert({
                where: {
                    articleId_clientId: {articleId:listArticle[i].articleId, clientId:numeroClient}
                },
                update: {
                    prixSpecial: listArticle[i].prixSpecial
                },
                create: {
                    clientId: numeroClient,
                    ... listArticle[i]
                }
            })
        }
        return numeroClient;
     }

     async deleteclient(nrClient:string){
          return this.prisma.client.delete({
             where:{
                 nrClient
             }
         })
     }
}
