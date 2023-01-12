import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { BonLivraisonService } from './bon-livraison.service';
import { CreateBonLivraisonDto } from './dto/create-bon-livraison.dto';
import { UpdateBonLivraisonDto } from './dto/update-bon-livraison.dto';
import { ApiTags } from '@nestjs/swagger';
import { numberLivraisonGenerator, numberFactureGenerator } from 'src/utils/number-generator';
import { FactureService } from '../facture/facture.service';
import { DebitService } from '../debit/debit.service';
import { CompteService } from '../compte/compte.service';
import { ArticleService } from '../article/article.service';
import { ClientService } from '../client/client.service';

@ApiTags('Bon Livraison')
@Controller('bon-livraison')
export class BonLivraisonController {
  constructor(private readonly bonLivraisonService: BonLivraisonService,private readonly factureservice:FactureService,
      private compteService: CompteService, private articleService: ArticleService,
      private clientService: ClientService) {}

  @Post()
  async create(@Res() res, @Body() createBonLivraisonDto: CreateBonLivraisonDto) {
    // init bonLivraison.controller.create
    let numberFacture, somme = 0;
    let { numeroCompte } = createBonLivraisonDto;
    delete createBonLivraisonDto.numeroCompte;
    let compte = await this.compteService.findOne(numeroCompte);
    if(!compte)
      throw new HttpException('CLIENT DOES NOT HAVE AN ACCOUNT', HttpStatus.NOT_FOUND);
    do{  numberFacture = numberFactureGenerator()}
      
    while(await this.factureservice.getfacturebynrfacture(numberFacture))
    
    
    const {articles, clientId, commerciauxId, bonCommandeId,chauffeurId} = createBonLivraisonDto;
    delete createBonLivraisonDto.articles;
    delete createBonLivraisonDto.clientId;
    delete createBonLivraisonDto.commerciauxId;
    delete createBonLivraisonDto.bonCommandeId;
    delete createBonLivraisonDto.chauffeurId;
    do{createBonLivraisonDto.numeroLivraison = numberLivraisonGenerator();}
    while(await this.bonLivraisonService.findOne(createBonLivraisonDto.numeroLivraison))

    const client  = await this.clientService.getclientbynum(clientId);

    if(client.isSpecial){
      for(let i = 0; i < articles.length; i++){
        let {articleId} = articles[i];
        delete articles[i].articleId;
        let article = await this.clientService.getArticleOnClient(clientId,articleId);
        somme = somme + article.prixSpecial * articles[i].quantite;
        articles[i].article = {
          connect : {numeroArticle: articleId}
        }
      }
    }else{
      for(let i = 0; i < articles.length; i++){
        let {articleId} = articles[i];
        delete articles[i].articleId;
        let article = await this.articleService.findOne(articleId);
        somme = somme + article.prixUnitaire * articles[i].quantite;
        articles[i].article = {
          connect : {numeroArticle: articleId}
        }
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
          numerofacture: numberFacture
        }
      },
      chauffeur:{
        connect:{matricule:chauffeurId}
      },
      debit: {
        create: {
          montant: somme,
          soldeApres: somme + compte.solde,
          compte: {
            connect: {
              numeroCompte
            }
          }
        }
      }
    }
    const bonLivraison = await this.bonLivraisonService.create(data).then(async () => {
      await this.compteService.updateSolde(numeroCompte, somme + compte.solde);
    });
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

  @Get('historique/:numeroClient')
  async getHistorique(@Res() res, @Param('numeroClient') numeroClient: string) {
    const bonLivraison = await this.bonLivraisonService.getHistorique(numeroClient);
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
