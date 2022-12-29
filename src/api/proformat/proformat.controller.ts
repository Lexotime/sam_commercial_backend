import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { numberProformatGenerator } from 'src/utils/number-generator';
import { CreateProformatDto } from './dto';
import { ProformatService } from './proformat.service';

@ApiTags('proformat')
@Controller('proformat')
export class ProformatController {
    

  constructor(private readonly proformatService: ProformatService) {}

  @Post()
  async create(@Res() res, @Body() createProformatDto: CreateProformatDto) {
    // init bonCommande.controller.create
    const {articles,commerciauxId} = createProformatDto;
    delete createProformatDto.articles;
    
    delete createProformatDto.commerciauxId;
  
    
    do{createProformatDto.numeroProformat = numberProformatGenerator();}
    while(await this.proformatService.findOne(createProformatDto.numeroProformat));
    for(let i = 0; i < articles.length; i++){
     
      let {articleId} = articles[i];
      delete articles[i].articleId;
      
      articles[i].article = {
        connect : {numeroArticle: articleId}
      }
      
      
    }
    const data = {...createProformatDto, 
      articles: {
        create : articles
      },
      commerciaux: {
        connect: {id: commerciauxId}
      }
    }
    const proformat = await this.proformatService.create(data);
    return res.status(HttpStatus.OK).json({
      proformat
    })
  }

  @Get()
  async findAll(@Res() res) {
    // init bonCommande.controller.findAll
    const proformat = await this.proformatService.findAll();
    return res.status(HttpStatus.OK).json({
        proformat
    })
  }

  @Get(':numeroproformat')
  async findOne(@Res() res, @Param('numeroproformat') numeroProformat: string) {
    const proformat = await this.proformatService.findOne(numeroProformat);
    if(!proformat)
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.OK).json({
      proformat
    })
  }
}
