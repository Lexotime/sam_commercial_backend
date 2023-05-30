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

 async updateLivraison(numeroLivraison: any){
  const livraision = await this.prismaService.bonLivraison.update({
    where: {numeroLivraison},
    data: {
      status: "termine"
    }
  });
  return livraision;
 }

 async updateCommande(numeroCommande: any){
  await this.prismaService.bonCommande.update({
    where: {numeroCommande},
    data: {
      status: "termine"
    }
  });
 }

 async findAll() {
   // init bonLivraison.service.findAll
   const bonLivraisons = await this.prismaService.bonLivraison.findMany({
    orderBy:{
      id:'desc'
    },
    include:{
      commerciaux:true,
      debit: true,
      chauffeur:{
        select:{
          nomChauffeur:true
        }
      }
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
          article:{
            include: {
              client: true
            }
          }

        }
      }
      ,
      client:true,
      commerciaux:true,
      chauffeur:true,
      debit:{
        select:{
          montant:true
        }
      }
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

 async getHistorique(numeroClient: any){
  // get the compte of the client ...
  const compte = await this.prismaService.compte.findUnique({
    where: {
      numeroClient
    }
  });
  // get all bon de livraison ...
  const bonLivraisons = await this.prismaService.bonLivraison.findMany({
    where: {
      clientId: numeroClient
    },
    include: {
      debit: true
    }
  });

  // get all versement ...
  const versements = await this.prismaService.versement.findMany({
    where: {
      numeroCompte: compte.numeroCompte
    }
  })

  // merge the both ...
  let merge = new Array();
  for(let i=0; i < bonLivraisons.length; i++){
    merge.push(bonLivraisons[i]);
  }
  for(let i=0; i < versements.length; i++){
    let {montant} = versements[i];
    delete versements[i].montant;
    let objet = {
      numeroLivraison: "",
      date: versements[i].dateExecution,
      montantVersment:montant,
      bonCommandeId: "",
      clientId: "",
      commerciauxId: "",
      chauffeurId: "",
      debit: versements[i]
    }
    merge.push(objet);
  }
  // range by date ...
  merge.sort((a,b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  })
  return merge;
 }
}
