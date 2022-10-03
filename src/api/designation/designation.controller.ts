import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from '@prisma/client';

@Controller('designation')
export class DesignationController {
  constructor(private readonly designationService: DesignationService) {}

  @Post()
  async create(@Res()res, @Body() createDesignationDto: CreateDesignationDto) {
    // init designation.controller.create
    const designation = await this.designationService.create(createDesignationDto);
    return res.status(HttpStatus.OK).json({
      designation
    });
  }

  @Get()
  async findAll(@Res() res) {
    // init designation.controller.findAll
    const designations = await this.designationService.findAll();
    return res.status(HttpStatus.OK).json({
      designations
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    // init designation.controller.findOne
    const designation = await this.designationService.findOne(Number(id));
    if(!designation)
      throw new HttpException('Designation Not Found', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.OK).json({
      designation
    })
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateDesignationDto: UpdateDesignationDto) {
    // init designation.controller.update
    const designation = await this.designationService.update(Number(id), updateDesignationDto);
    return res.status(HttpStatus.OK).json({
      designation
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const designation = await this.designationService.remove(Number(id));
    return res.status(HttpStatus.OK).json({
      designation
    })
  }
}
