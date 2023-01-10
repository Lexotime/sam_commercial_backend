import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { VersementService } from './versement.service';
import { CreateVersementDto } from './dto/create-versement.dto';
import { UpdateVersementDto } from './dto/update-versement.dto';

@Controller('versement')
export class VersementController {
  constructor(private readonly versementService: VersementService) {}

  @Post()
  async create(@Res() res, @Body() createVersementDto: CreateVersementDto) {
    const versement = await this.versementService.create(createVersementDto);
    return res.status(HttpStatus.OK).json({
      versement
    })
  }

  @Get()
  async findAll(@Res() res) {
    const versements = await this.versementService.findAll();
    return res.status(HttpStatus.OK).json({
      versements
    })
  }

  @Get(':numeroCompte')
  async findOne(@Res() res, @Param('numeroCompte') numeroCompte: any) {
    const versements = await this.versementService.findOne(numeroCompte);
    return res.status(HttpStatus.OK).json({
      versements
    })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersementDto: UpdateVersementDto) {
    return this.versementService.update(+id, updateVersementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versementService.remove(+id);
  }
}
