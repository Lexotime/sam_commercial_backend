import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleDto, editArticleDto } from './dto';

@Controller('article')
export class ArticleController {
   constructor(private articleservice:ArticleService){}
 
      

   @Post('article')
   async postarticle(@Body() dto:articleDto,@Res() res){
       const article= await this.articleservice.createarticle(dto)
       return res.status(HttpStatus.OK).json({
        article
      })
   }

        @Get('get')
        async getarticles(@Res()  res){
            const articles= await this.articleservice.getarticles()
            return res.status(HttpStatus.OK).json({
                articles
              })
        }
    
        @Post('articles')
        async getarticle(@Body() dto:editArticleDto,@Res() res){
            const article= await this.articleservice.getarticle(dto)
            return res.status(HttpStatus.OK).json({
                article
              })
        }
    
        @Get(':id')
        async getarticlebyid(@Param('id',ParseIntPipe) id:number, @Res() res){
              const article= await this.articleservice.getarticlebyid(id)
              return res.status(HttpStatus.OK).json({
                article
              })
        }
         
        @Patch(':id')
        async updatearticle(@Param('id',ParseIntPipe) id:number,@Body() dto:editArticleDto,@Res() res){
            const article= await this.articleservice.updatearticle(id,dto)
            return res.status(HttpStatus.OK).json({
                article
              })
        }
        
        @Delete(':id')
        async deletearticle(@Param('id',ParseIntPipe) id:number,@Res() res){
            const article= await this.articleservice.deletearticle(id)
            return res.status(HttpStatus.OK).json({
                article
              })
        }
    
}
