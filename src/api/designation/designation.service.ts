import { Injectable } from '@nestjs/common';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { PrismaService } from 'src/external-service/prisma/prisma.service';
import { Designation, Prisma } from '@prisma/client';

@Injectable()
export class DesignationService {

  constructor(private prismaService: PrismaService){}

  async create(createDesignationDto: CreateDesignationDto) {
    // init designation..service.create
    const designation = await this.prismaService.designation.create({
      data: createDesignationDto
    })
    return designation;
  }

  async findAll(){
    // init designation.service.findAll
    const designations = await this.prismaService.designation.findMany({});
    return designations;
  }

  async findOne(id: number){
    // init designation.service.findOne
    const designation = await this.prismaService.designation.findUnique({
      where: {id: id}
    })
    return designation;
  }

  async update(id: number, updateDesignationDto: UpdateDesignationDto) {
    // init designation.service.update
    const designation = await this.prismaService.designation.update({
      where: {id},
      data: updateDesignationDto
    })
    return designation;
  }

  async remove(id: number) {
    // init designation.service.remove
    const designation = await this.prismaService.designation.delete({
      where: {id},
    })
    return designation;
  }
}
