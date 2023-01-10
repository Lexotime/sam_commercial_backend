import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  // @Post()
  // create(@Body() createCompteDto: CreateCompteDto) {
  //   return this.compteService.create(createCompteDto);
  // }

  @Get()
  async findAll(@Res() res) {
    const comptes = await this.compteService.findAll();
    return res.status(HttpStatus.OK).json({
      comptes
    })
  }

  @Get(':numeroCompte')
  async findOne(@Res() res, @Param('numeroCompte') numeroCompte: any) {
    const compte = await this.compteService.findOne(numeroCompte);
    return res.status(HttpStatus.OK).json({
      compte
    })
  }

  @Patch(':numeroCompte')
  async update(@Res() res, @Param('numeroCompte') numeroCompte: any, @Body('solde') solde: any) {
    const compte = await this.compteService.updateSolde(numeroCompte,solde);
    return res.status(HttpStatus.OK).json({
      compte
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compteService.remove(+id);
  }
}
