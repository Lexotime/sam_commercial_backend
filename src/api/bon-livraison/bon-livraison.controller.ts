import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { CreateBonLivraisonDto } from './dto/create-bon-livraison.dto';
import { UpdateBonLivraisonDto } from './dto/update-bon-livraison.dto';
import { ApiTags } from '@nestjs/swagger';
import { numberLivraisonGenerator, numberFactureGenerator } from 'src/utils/number-generator';

@ApiTags('Bon Livraison')
@Controller('bon-livraison')
export class BonLivraisonController {
  constructor(private readonly bonLivraisonService: BonLivraisonService) {}

  @Post()
  async create(@Res() res, @Body() createBonLivraisonDto: CreateBonLivraisonDto) {
    // init bonLivraison.controller.create
    let numberFacure = numberFactureGenerator();
    const {articles, clientId, commerciauxId, bonCommandeId} = createBonLivraisonDto;
    delete createBonLivraisonDto.articles;
    delete createBonLivraisonDto.clientId;
    delete createBonLivraisonDto.commerciauxId;
    delete createBonLivraisonDto.bonCommandeId;
    createBonLivraisonDto.numeroLivraison = numberLivraisonGenerator();
    for(let i = 0; i < articles.length; i++){
      let {articleId} = articles[i];
      delete articles[i].articleId;
      articles[i].article = {
        connect : {numeroArticle: articleId}
      }
    }
    const data = {...createBonLivraisonDto, 
      articles: {
        create : articles
      },
      client: {
        connect: {nrClient : clientId}
      },
      commerciaux: {
        connect: {id: commerciauxId}
      },
      bonCommande: {
        connect: {numeroCommande: bonCommandeId}
      },
      facture: {
        create: {
          numerofacture: numberFacure
        }
      }
    }
    const bonLivraison = await this.bonLivraisonService.create(data);
    return res.status(HttpStatus.OK).json({
      bonLivraison
    })
  }

  @Get()
  async findAll(@Res() res) {
    // init bonLivraison.controller.findAll
    const bonLivraisons = await this.bonLivraisonService.findAll();
    return res.status(HttpStatus.OK).json({
      bonLivraisons
    })
  }

  @Get(':numeroLivraison')
  async findOne(@Res() res, @Param('numeroLivraison') numeroLivraison: string) {
    const bonLivraison = await this.bonLivraisonService.findOne(numeroLivraison);
    if(!bonLivraison)
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.OK).json({
      bonLivraison
    })
  }

  @Patch(':numeroLivraison')
  async update(@Res() res, @Param('numeroLivraison') numeroLivraison: string, @Body() updateBonLivraisonDto: UpdateBonLivraisonDto) {
    const bonLivraison = await this.bonLivraisonService.update(numeroLivraison, updateBonLivraisonDto);
    return res.status(HttpStatus.OK).json({
      bonLivraison
    })
  }

  @Delete(':numeroLivraison')
  async remove(@Res() res, @Param('numeroLivraison') numeroLivraison: string) {
    const bonLivraison = await this.bonLivraisonService.remove(numeroLivraison);
    return res.status(HttpStatus.OK).json({
      bonLivraison
    })
  }
}
