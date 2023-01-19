import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Injectable()
export class CompteService {

  constructor(private prismaService: PrismaService){

  }
  // create(createCompteDto: CreateCompteDto) {
  //   return 'This action adds a new compte';
  // }

  async findAll() {
    const comptes = await this.prismaService.compte.findMany({
      include: {
        client: true
      }
    });
    return comptes;
  }

  async findOne(numeroCompte: any) {
    const compte = await this.prismaService.compte.findUnique({
      where:{
        numeroCompte
      },
      include: {
        client: true
      }
    });
    return compte;
  }

  async updateSolde(numeroCompte: any, newSolde: any) {
    const updatedCompte = await this.prismaService.compte.update({
      where: {
        numeroCompte
      },
      data: {
        solde: newSolde
      }
    });
    return updatedCompte;
  }

  async updateSoldeInitial(numeroCompte: any, newSolde: any) {
    const updatedCompte = await this.prismaService.compte.update({
      where: {
        numeroCompte
      },
      data: {
        soldeInitial: newSolde
      }
    });
    return updatedCompte;
  }

  remove(id: number) {
    return `This action removes a #${id} compte`;
  }
}
