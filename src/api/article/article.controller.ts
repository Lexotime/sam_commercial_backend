import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { numberArticleGenerator } from '../../utils/number-generator';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Res() res, @Body() createArticleDto: CreateArticleDto) {
    // init article.controller.create
<<<<<<< HEAD
    const {designationId} = createArticleDto;
    delete createArticleDto.designationId;
    do{
       createArticleDto.numeroArticle = numberArticleGenerator();
      }
    while(this.articleService.findOne(createArticleDto.numeroArticle));
   
    const data = {...createArticleDto, designation: {
      connect: { id: designationId }
    }}
    const designation = await this.articleService.create(data);
=======
    createArticleDto.numeroArticle = numberArticleGenerator();
    const article = await this.articleService.create(createArticleDto);
>>>>>>> ddc52a07216dffc7da2d1736b8f169a88e97b026
    return res.status(HttpStatus.OK).json({
      article
    })
  }

  @Get()
  async findAll(@Res() res) {
    // init artilce.controller.article
    const articles = await this.articleService.findAll();
    return res.status(HttpStatus.OK).json({
      articles
    })
  }

  @Get(':numeroArticle')
  async findOne(@Res() res, @Param('numeroArticle') numeroArticle: string) {
    // init article.controller.findOne
    const article = await this.articleService.findOne(numeroArticle);
    if(!article)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.OK).json({
      article
    });
  }

  @Patch(':numeroArticle')
  async update(@Res() res, @Param('numeroArticle') numeroArticle: string, @Body() updateArticleDto: UpdateArticleDto) {
    // init article.controller.update
    const article = await this.articleService.update(numeroArticle, updateArticleDto);
    return res.status(HttpStatus.OK).json({
      article
    });
  }

  @Delete(':numeroArticle')
  async remove(@Res() res, @Param('numeroArticle') numeroArticle: string) {
    // init article.controller.remove
    const article = await this.articleService.remove(numeroArticle);
    return res.status(HttpStatus.OK).json({
      article
    })
  }
}
