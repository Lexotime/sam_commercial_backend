import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { CompteService } from '../compte/compte.service';
import { CreateVersementDto } from './dto/create-versement.dto';
import { UpdateVersementDto } from './dto/update-versement.dto';

@Injectable()
export class VersementService {

  constructor(private compteService: CompteService, private prismaService: PrismaService){}

  async create(createVersementDto: any) {
    let { numeroCompte } = createVersementDto;
    delete createVersementDto.numeroCompte;
    const compte = await this.compteService.findOne(numeroCompte);
    if(!compte)
      throw new HttpException('CLIENT DOES NOT HAVE AN ACCOUNT', HttpStatus.NOT_FOUND);
    createVersementDto.soldeApres = compte.solde + createVersementDto.montant;
    const versement = await this.prismaService.versement.create({
      data: {
        ...createVersementDto,
        compte: {
          connect: {
            numeroCompte: numeroCompte
          }
        }
      }
    }).then(async () => {
      await this.compteService.updateSolde(numeroCompte,createVersementDto.soldeApres);
    })
    return versement;
  }

  async findAll() {
    const versements = await this.prismaService.versement.findMany();
    return versements;
  }

  async findOne(numeroCompte: any) {
    const versements = await this.prismaService.versement.findMany({
      where: {
        numeroCompte
      }
    });
    return versements;
  }

  update(id: number, updateVersementDto: UpdateVersementDto) {
    return `This action updates a #${id} versement`;
  }

  remove(id: number) {
    return `This action removes a #${id} versement`;
  }
}
