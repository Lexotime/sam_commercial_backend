import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { articleDto, editArticleDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(private prisma:PrismaService){}

async createarticle(dto:articleDto){
    const article =this.prisma.article.create({
        data:{
           numeroArticle:dto.numeroArticle,
           designationId :dto.designationId,
                marque :dto.marque,
            prixUnitaire :dto.prixUnitaire,
            	stock :dto.stock,
            epaisseur :dto.epaisseur,
            imageUrl   :dto.imageUrl,
        dimension : dto.dimension
        }
        
    })
    return article
}
    
 async getarticles(){
    try {
        const article= await this.prisma.article.findMany()
    if (!article){
        return []
    }
    return article
    } catch (error) {
        throw new Error('commercial pas trouve') 
    }
     
}
async getarticle(dto:editArticleDto){
    const article=await this.prisma.article.findUnique({
        where:{
            numeroArticle:dto.numeroArticle
        }
        })
        if (!article){
           throw new  ForbiddenException('credentials incorrect')
        }
       
        return article
          
   
}
async getarticlebyid(id:number){
   try {
       const article= await this.prisma.article.findUnique({
           where:{
               id
           
           }
       })
   if (!article){
       return null
   }
   return article
   } catch (error) {
       throw new Error('commercial pas trouve') 
   }
    
}


async updatearticle(id:number,dto:editArticleDto){
    try {
        const article=this.prisma.article.update({
            where:{id},

            data:{
              ...dto
            }
        })
       
        return article
        
    } catch (error) {
        throw new Error(error)
    }
   
}

async deletearticle(id:number){
     return this.prisma.article.delete({
        where:{
            id
        }
    })
}
}
