import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/external-service/prisma/prisma.service';


@Injectable()
export class ArticleService {

  constructor(private prismaService: PrismaService){}

  async create(data : any) {
    // init article.service.create
    const article = await this.prismaService.article.create({
      data
    }).then(async ()=> {
      const specialClients = await this.prismaService.client.findMany({
        where: {
          isSpecial: true
        }
      });
      for(let i=0; i < specialClients.length; i++){
        await this.prismaService.articleOnClient.create({
          data: {
            client: {
              connect: {
                nrClient: specialClients[i].nrClient
              },
            },
            article: {
              connect: {
                numeroArticle: data.numeroArticle
              }
            },
            prixSpecial: data.prixUnitaire
          }
        })
      }
    })
    return article;
  }

  async createmany(data : any) {
    let  article=new Array()
    // init article.service.create
    for (let i=0;i<data.length;i++){
      article.push(this.create(data[i]))
      
    }
    return article
  }

  async findAll() {
    // init article.service.findAll
    const articles = await this.prismaService.article.findMany({
      include: {
        client: true
      },
      orderBy:{
        id:'desc'
      }
    })
    return articles;
  }
  

  async findOne(numeroArticle: string) {
    // int article.service.findOne
    const article = await this.prismaService.article.findUnique({
      include:{
        client: true
      },
      where: {numeroArticle}
    });
    return article;
  }

  async update(numeroArticle: string, updateData: any) {
    // inti article.service.update
    const article = await this.prismaService.article.update({
      where: {numeroArticle},
      data: updateData
    })
    return article;
  }

  async remove(numeroArticle: string) {
    // init article.service.remove
    const article = await this.prismaService.article.delete({
      where: {numeroArticle}
    })
    return article;
  }
}
