import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { clientDto, editclientDto } from './dto';

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

    @Get(':id')
    async getbyid(@Param('id',ParseIntPipe) id:number,@Res() res){
        const client= await this.clientservice.getclientbyid(id)
        if(!client){throw new HttpException('Not Found', HttpStatus.NOT_FOUND);}
      
        return res.status(HttpStatus.OK).json({
            client
          })
    }
     
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:editclientDto,@Res() res){
        const client= await this.clientservice.updateclient(id,dto)
        return res.status(HttpStatus.OK).json({
            client
          })
    }
    
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number,@Res() res){
        const client=await this.clientservice.deleteclient(id)
        return res.status(HttpStatus.OK).json({
            client
          })
    }
}
