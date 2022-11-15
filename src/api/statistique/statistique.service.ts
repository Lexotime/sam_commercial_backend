import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';

@Injectable()
export class StatistiqueService {
    constructor(private readonly prima:PrismaService){}

    statParclient(){

    }

    statParProduit(){
        
    }

    statparmois(){

    }
}
