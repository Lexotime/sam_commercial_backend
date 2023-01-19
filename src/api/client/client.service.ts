import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { numberClientGenerator, numberCompteGenerator } from 'src/utils/number-generator';
import { CreateBonLivraisonDto } from '../bon-livraison/dto/create-bon-livraison.dto';
import { CompteService } from '../compte/compte.service';
import { clientDto, editclientDto } from './dto';

@Injectable()
export class ClientService {
    constructor(private prisma:PrismaService, private compteService: CompteService){}
    async creerclient(dto:clientDto){
        

        try {
            let articles=new Array();
            do{
                dto.nrClient = numberClientGenerator();
            } while(await this.getclientbynum(dto.nrClient))

            do{
                dto.numeroCompte = numberCompteGenerator();
            } while(await this.compteService.findOne(dto.numeroCompte))

            if (dto.isSpecial==true){
                
                 const articlesbd= await this.prisma.article.findMany() 
                 for(let i=0;i < articlesbd.length;i++){
                    let objet={
                        article: {
                            connect: {
                                numeroArticle: articlesbd[i].numeroArticle
                            }
                        },
                        prixSpecial:articlesbd[i].prixUnitaire
                    }
                    articles.push(objet)
                 }
            }
            
         
         const client= await this.prisma.client.create({
             data:{ 
                
                nrClient:dto.nrClient,
                compte: {
                    create: {
                        numeroCompte: dto.numeroCompte,
                        solde: dto.soldeInitial? dto.soldeInitial:0 
                    }
                },
                articles:{
                    create:articles
                },
                nom:dto.nom,  
                adresse :dto.adresse, 
                ville:dto.ville,     
                pays :dto.pays ,    
                email:dto.email,   
                telephone :dto.telephone,
                remise :dto.remise,
                enCours: dto.enCours? dto.enCours:0,
                isSpecial:dto.isSpecial,
                
                 }
         })
         
            return client
         
        } catch (error) {
            console.log(error);
         throw new Error("client non cree");
         
         
        }
     }

     async creermore(data:any){
        
       for(let i=0;i<data.length;i++){
            await this.creerclient(data[i])   
        
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
     

     async getArticleOnClient(numeroClient: any, numeroArticle: any){
        const article = await this.prisma.articleOnClient.findUnique({
            where: {
                articleId_clientId: {articleId: numeroArticle, clientId: numeroClient}
            }
        });
        return article;
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
