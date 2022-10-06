import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Res } from '@nestjs/common';
import { CommercialService } from './commercial.service';
import {   editcomDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Commercial')
@Controller('commercial')
export class CommercialController {
    constructor(private comservice :CommercialService){}

  
    @Get('get')
    async getcommerciaux(@Res() res){
        const commerciaux =await this.comservice.getcommerciaux()
        return res.status(HttpStatus.OK).json({
            commerciaux
        })
    }

    @Get(':id')
    async getcommercialbyid(@Param('id',ParseIntPipe) id:number,@Res() res){
        const commercial =await this.comservice.getcommercialbyid(id)
        if (!commercial)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return res.status(HttpStatus.OK).json({
            commercial
        })
    }
     
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:editcomDto,@Res() res){
        const commercial= await this.comservice.updatecommercial(id,dto)
        return res.status(HttpStatus.OK).json({
            commercial
        })
    }
    
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number,@Res() res){
        const commercial= await this.comservice.deletecommercial(id)
        return res.status(HttpStatus.OK).json({
            commercial
        })
    }

}
