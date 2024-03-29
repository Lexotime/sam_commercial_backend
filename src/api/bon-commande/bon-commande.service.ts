import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';
import { UpdateBonCommandeDto } from './dto/update-bon-commande.dto';
import { BonCommande, Prisma } from '@prisma/client';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { upbonCommande } from './dto';

@Injectable()
export class BonCommandeService {

  constructor(private prismaService: PrismaService){}

  async create(createBonCommandeDto: any) {
     // init bonCommande.service.create
    const bonCommande = await this.prismaService.bonCommande.create({
      data: createBonCommandeDto,
    })
    return bonCommande;
  }

  async findAll() {
    // init bonCommande.service.findAll
    const bonCommandes = await this.prismaService.bonCommande.findMany({
      orderBy:{
        id:'desc'
      },
      include:{
        client:{
          include:{
            compte:true
          }
        },
        commerciaux:true,
        
      }
    });
    return bonCommandes;
  }

  async findOne(numeroCommande: string) {
    // inti bonLivraison.service.findOne
    const bonCommande = await this.prismaService.bonCommande.findUnique({
      where: {numeroCommande},
      include:{
        client:{
          include:{
            compte:true
          }
        },
        articles:{
          include:{
            article:true
          }
        },
        
      }
    })
    return bonCommande;
  }

  async update(numeroCommande: string, updateBonCommandeDto: UpdateBonCommandeDto) {
    // init bonCommande.service.update
    const bonCommande = await this.prismaService.bonCommande.update({
      data : updateBonCommandeDto,
      where : {numeroCommande}
    })
    return bonCommande;
  }

  async updatearticle(numeroaricle,numeroCommande,dto:upbonCommande){
    const bonCommande = await this.prismaService.articleOnCommande.update({
      where:{articleId_commandeId:{
        articleId:numeroaricle,commandeId:numeroCommande
      }},
      data:{
        ...dto
      }
    })
    return bonCommande

  }

  async updateBonCommande(numeroCommande: any, listArticles: any) {
    const bonCommande = await this.prismaService.bonCommande.findUnique({
      where: { numeroCommande },
    });
  
    if (!bonCommande) {
      throw new HttpException("NO BON DE COMMANDE FOUND !", HttpStatus.NOT_FOUND);
    }
  
    const articles = await this.prismaService.articleOnCommande.findMany({
      where: { commandeId: numeroCommande },
    });
  
    for (const article of articles) {
      const matchingListArticle = listArticles.find(
        (listArticle) => listArticle.articleId === article.articleId
      );
  
      if (matchingListArticle) {
        const updated = await this.prismaService.articleOnCommande.update({
          where: {
            articleId_commandeId: {
              articleId: article.articleId,
              commandeId: numeroCommande,
            },
          },
          data: {
            quantite: matchingListArticle.quantite,
          },
        });
      } else {
        const deleted = await this.prismaService.articleOnCommande.delete({
          where: {
            articleId_commandeId: {
              articleId: article.articleId,
              commandeId: numeroCommande,
            },
          },
        });
      }
    }
    return bonCommande;
  }
  
  

  async remove(numeroCommande: string) {
    // init bonCommande.service.remove
    const bonCommande = await this.prismaService.bonCommande.delete({
      where: {numeroCommande}
    })
    return bonCommande;
  }

  async calcul_volume(numeroCommande:string){

    const articleOnCommande = this.prismaService.articleOnCommande.findMany({
      where:{commandeId:numeroCommande},
      include:{
        article:true
      }
    })
    return articleOnCommande
  }
}

