import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CommercialService } from './commercial.service';
import {   editcomDto } from './dto';

@Controller('commercial')
export class CommercialController {
    constructor(private comservice :CommercialService){}

  
    @Get('get')
    async getcommerciaux(){
        return await this.comservice.getcommerciaux()
    }

    @Get(':id')
    async getcommercialbyid(@Param('id',ParseIntPipe) id:number){
        return await this.comservice.getcommercialbyid(id)
    }
     
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:editcomDto){
        return await this.comservice.updatecommercial(id,dto)
    }
    
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number){
        return await this.comservice.deletecommercial(id)
    }

}
