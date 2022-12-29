import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ChauffeurService } from './chauffeur.service';
import { ChauffeurDto } from './dto';

@Controller('chauffeur')
export class ChauffeurController {
    constructor(private readonly chauffeurservice:ChauffeurService){}
   @Post('creer')
    async createclient(@Body() dto:ChauffeurDto,@Res() res){
      const chauffeur= await this.chauffeurservice.creerclient(dto)
      return res.status(HttpStatus.OK).json({
        chauffeur
      })
    }
    
    @Get('get')
    async getcient(@Res() res){
        const chauffeur= await this.chauffeurservice.getclient()
        
        return res.status(HttpStatus.OK).json({
            chauffeur
          })
    }

    @Get(':nrclient')
    async getbyid(@Param('nrclient') nrchauffeur:string ,@Res() res){
        const chauffeur= await this.chauffeurservice.getclientbynum(nrchauffeur)
        if(!chauffeur){throw new HttpException('Not Found', HttpStatus.NOT_FOUND);}
      
        return res.status(HttpStatus.OK).json({
            chauffeur
          })
    }
}
