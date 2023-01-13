import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/external-service/prisma/prisma.service';

@Injectable()
export class ProformatService {
    constructor(private prisma:PrismaService){}

    async create(CreateProformatDto:any) {
       // init bonCommande.service.create
      const proformat = await this.prisma.proformat.create({
        data: CreateProformatDto,
      })
      return proformat;
    }
  
    async findAll() {
      // init bonCommande.service.findAll
      const proformat = await this.prisma.proformat.findMany({
         orderBy:{
          id:'desc'
          
         },
         include:{
          commerciaux:{
            select:{
              username:true
            }
          }
         }
      });
      return proformat;
    }
  
    async findOne(numeroProformat: string) {
      // inti bonLivraison.service.findOne
      const proformat = await this.prisma.proformat.findUnique({
        where: {numeroProformat},
        include:{
          articles:{
            include:{
              article:true
            }
          },
        
         
        }
      })
      return proformat;
    }
  
}
