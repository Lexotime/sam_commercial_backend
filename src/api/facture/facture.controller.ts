import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch,  Res } from '@nestjs/common';
import { editfacturedto} from './dto';
import { FactureService } from './facture.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Facture')
@Controller('facture')
export class FactureController {
    constructor(private factureservice:FactureService){}

  
    
    @Get('get')
    async getfacture(@Res() res){
        const factures= await this.factureservice.getfacture()
        return res.status(HttpStatus.OK).json({
            factures
          })
    }

    @Get(':numerofacture')
    async getbyid(@Param('numerofacture') numfacture:string,@Res() res){
        const facture= await this.factureservice.getfacturebynrfacture(numfacture)
        if(!facture)
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
     
    @Patch(':numerofacture')
    async update(@Param('numerofacture')numfacture:string,@Body() dto:editfacturedto,@Res() res){
        const facture= await this.factureservice.updatefacture(numfacture,dto)
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
    
    @Delete(':numerofacture')
    async delete(@Param('numerofacture') numfacture:string,@Res() res){
        const facture=await this.factureservice.deletefacture(numfacture)
        return res.status(HttpStatus.OK).json({
            facture
          })
    }
}
