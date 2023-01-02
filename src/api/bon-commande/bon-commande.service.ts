import { Injectable } from '@nestjs/common';
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
        client:true,
        commerciaux:true
      }
    });
    return bonCommandes;
  }

  async findOne(numeroCommande: string) {
    // inti bonLivraison.service.findOne
    const bonCommande = await this.prismaService.bonCommande.findUnique({
      where: {numeroCommande},
      include:{
        client:true,
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
  

  async remove(numeroCommande: string) {
    // init bonCommande.service.remove
    const bonCommande = await this.prismaService.bonCommande.delete({
      where: {numeroCommande}
    })
    return bonCommande;
  }
}
