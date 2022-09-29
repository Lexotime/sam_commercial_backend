import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { articleDto, editArticleDto } from './dto';

@Controller('article')
export class ArticleController {
   constructor(private articleservice:ArticleService){}
 
      

   @Post('article')
   async postarticle(@Body() dto:articleDto){
       return await this.articleservice.createarticle(dto)
   }

        @Get('get')
        async getarticles(){
            return await this.articleservice.getarticles()
        }
    
        @Post('articles')
        async getarticle(@Body() dto:editArticleDto){
            return await this.articleservice.getarticle(dto)
        }
    
        @Get(':id')
        async getarticlebyid(@Param('id',ParseIntPipe) id:number){
            return await this.articleservice.getarticlebyid(id)
        }
         
        @Patch(':id')
        async updatearticle(@Param('id',ParseIntPipe) id:number,@Body() dto:editArticleDto){
            return await this.articleservice.updatearticle(id,dto)
        }
        
        @Delete(':id')
        async deletearticle(@Param('id',ParseIntPipe) id:number){
            return await this.articleservice.deletearticle(id)
        }
    
}
