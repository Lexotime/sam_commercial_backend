import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {

  constructor(private prismaService: PrismaService){}

  async create(data : any) {
    // init article.service.create
    const article = await this.prismaService.article.create({
      data
    })
    return article;
  }

  async findAll() {
    // init article.service.findAll
    const articles = await this.prismaService.article.findMany({})
    return articles;
  }
  

  async findOne(numeroArticle: string) {
    // int article.service.findOne
    const article = await this.prismaService.article.findUnique({
      where: {numeroArticle}
    });
    return article;
  }

  async update(numeroArticle: string, updateData: any) {
    // inti article.service.update
    const article = await this.prismaService.article.update({
      where: {numeroArticle},
      data: updateData
    })
    return article;
  }

  async remove(numeroArticle: string) {
    // init article.service.remove
    const article = await this.prismaService.article.delete({
      where: {numeroArticle}
    })
    return article;
  }
}
