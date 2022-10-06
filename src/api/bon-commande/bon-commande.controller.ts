import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { BonCommandeService } from './bon-commande.service';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';
import { UpdateBonCommandeDto } from './dto/update-bon-commande.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bon Commande')
@Controller('bon-commande')
export class BonCommandeController {
  constructor(private readonly bonCommandeService: BonCommandeService) {}

  @Post()
  async create(@Res() res, @Body() createBonCommandeDto: CreateBonCommandeDto) {
    // init bonCommande.controller.create
    const {articles, clientId, commerciauxId} = createBonCommandeDto;
    delete createBonCommandeDto.articles;
    delete createBonCommandeDto.clientId;
    delete createBonCommandeDto.commerciauxId;
    for(let i = 0; i < articles.length; i++){
     
      let {articleId} = articles[i];
      delete articles[i].articleId;
      articles[i].article = {
        connect : {numeroArticle: articleId}
      }
    }
    const data = {...createBonCommandeDto, 
      articles: {
        create : articles
      },
      client: {
        connect: {nrClient : clientId}
      },
      commerciaux: {
        connect: {id: commerciauxId}
      }
    }
    const bonCommande = await this.bonCommandeService.create(data);
    return res.status(HttpStatus.OK).json({
      bonCommande
    })
  }

  @Get()
  async findAll(@Res() res) {
    // init bonCommande.controller.findAll
    const bonCommandes = await this.bonCommandeService.findAll();
    return res.status(HttpStatus.OK).json({
      bonCommandes
    })
  }

  @Get(':numeroCommande')
  async findOne(@Res() res, @Param('numeroCommande') numeroCommande: string) {
    const bonCommande = await this.bonCommandeService.findOne(numeroCommande);
    if(!bonCommande)
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.OK).json({
      bonCommande
    })
  }

  @Patch(':numeroCommande')
  async update(@Res() res, @Param('numeroCommande') numeroCommande: string, @Body() updateBonCommandeDto: UpdateBonCommandeDto) {
    const bonCommande = await this.bonCommandeService.update(numeroCommande, updateBonCommandeDto);
    return res.status(HttpStatus.OK).json({
      bonCommande
    })
  }

  @Delete(':numeroCommande')
  async remove(@Res() res, @Param('numeroCommande') numeroCommande: string) {
    const bonCommande = await this.bonCommandeService.remove(numeroCommande);
    return res.status(HttpStatus.OK).json({
      bonCommande
    })
  }
}
