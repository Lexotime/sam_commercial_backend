import { Injectable } from '@nestjs/common';
import { CreateBonLivraisonDto } from './dto/create-bon-livraison.dto';
import { UpdateBonLivraisonDto } from './dto/update-bon-livraison.dto';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { BonLivraison, Prisma } from '@prisma/client';

@Injectable()
export class BonLivraisonService {

  constructor(private prismaService: PrismaService){}

  async create(createBonLivraisonDto: any) {
    // init bonLivraison.service.create
   const bonLivraison = await this.prismaService.bonLivraison.create({
     data: createBonLivraisonDto,
   })
   return bonLivraison;
 }

 async findAll() {
   // init bonLivraison.service.findAll
   const bonLivraisons = await this.prismaService.bonLivraison.findMany({
    include:{
      commerciaux:true
    }
   });
   return bonLivraisons;
 }

 async findOne(numeroLivraison: string) {
   // inti bonLivraison.service.findOne
   const bonLivraison = await this.prismaService.bonLivraison.findUnique({
     where: {numeroLivraison},
     include:{
      articles:{
        include:{
          article:true
        }
      }
      ,
      client:true,
      commerciaux:true
     }
   })
   return bonLivraison;
 }

 async update(numeroLivraison: string, updateBonLivraisonDto: any) {
   // init bonLivraison.service.update
   const bonLivraison = await this.prismaService.bonLivraison.update({
     data : updateBonLivraisonDto,
     where : {numeroLivraison}
   })
   return bonLivraison;
 }

 async remove(numeroLivraison: string) {
   // init bonLivraison.service.remove
   const bonLivraison = await this.prismaService.bonLivraison.delete({
     where: {numeroLivraison}
   })
   return bonLivraison;
 }
}
