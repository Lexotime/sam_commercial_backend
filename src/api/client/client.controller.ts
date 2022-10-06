import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { clientDto, editclientDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Client')
@Controller('client')
export class ClientController {
   constructor(private readonly clientservice:ClientService){}
   @Post('creer')
    async createclient(@Body() dto:clientDto,@Res() res){
      const client= await this.clientservice.creerclient(dto)
      return res.status(HttpStatus.OK).json({
        client
      })
    }
    
    @Get('get')
    async getcient(@Res() res){
        const clients= await this.clientservice.getclient()
        
        return res.status(HttpStatus.OK).json({
            clients
          })
    }

    @Get(':nrclient')
    async getbyid(@Param('nrclient') nrclient:string ,@Res() res){
        const client= await this.clientservice.getclientbynum(nrclient)
        if(!client){throw new HttpException('Not Found', HttpStatus.NOT_FOUND);}
      
        return res.status(HttpStatus.OK).json({
            client
          })
    }
     
    @Patch(':nrclient')
    async update(@Param('nrclient') nrclient:string,@Body() dto:editclientDto,@Res() res){
        const client= await this.clientservice.updateclient(nrclient,dto)
        return res.status(HttpStatus.OK).json({
            client
          })
    }
    
    @Delete(':nrclient')
    async delete(@Param('nrclient') nrclient:string,@Res() res){
        const client=await this.clientservice.deleteclient(nrclient)
        return res.status(HttpStatus.OK).json({
            client
          })
    }
}
