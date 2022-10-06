import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { editfacturedto, factureDto } from './dto';
import { FactureService } from './facture.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Facture')
@Controller('facture')
export class FactureController {
    constructor(private factureservice:FactureService){}

    @Post('creer')
    async createfacture(@Body() dto:factureDto,@Res() res){
      const facture= await this.factureservice.creerfacture(dto)
      return res.status(HttpStatus.OK).json({
        facture
      })
    }
    
    @Get('get')
    async getfacture(@Res() res){
        const factures= await this.factureservice.getfacture()
        return res.status(HttpStatus.OK).json({
            factures
          })
    }

    @Get(':id')
    async getbyid(@Param('id',ParseIntPipe) id:number,@Res() res){
        const facture= await this.factureservice.getfacturebyid(id)
        if(!facture)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
     
    @Patch(':id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() dto:editfacturedto,@Res() res){
        const facture= await this.factureservice.updatefacture(id,dto)
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
    
    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number,@Res() res){
        const facture=await this.factureservice.deletefacture(id)
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
}
