import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { editfacturedto, factureDto } from './dto';
import { FactureService } from './facture.service';

@Controller('facture')
export class FactureController {
    constructor(private factureservice:FactureService){}

    @Post('post')
    async createfacture(@Body() dto:factureDto){
      return await this.factureservice.creerfacture(dto)
    }
    
    @Get('get')
    async getfacture(){
        return await this.factureservice.getfacture()
    }

    @Get(':id')
    async getbyid(@Param('id',ParseIntPipe) id:number){
        return await this.factureservice.getfacturebyid(id)
    }
     
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:editfacturedto){
        return await this.factureservice.updatefacture(id,dto)
    }
    
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number){
        return await this.factureservice.deletefacture(id)
    }
}
