import {  ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';

import {   editcomDto } from './dto';

@Injectable()
export class CommercialService {
    constructor(private prisma:PrismaService){}


    async createcommerciaux(dto:any){
        
            const commerciaux= await this.prisma.commerciaux.create({
                data:{
                        login:dto.login,
                        password:dto.password,
                        role:dto.role,
                        image:dto.image,
                        username:dto.username
                }
            })

            return commerciaux
       
         
    }
 

 async getcommerciaux(){
     try {
         const commerciaux= await this.prisma.commerciaux.findMany()
     if (!commerciaux){
         throw new ForbiddenException('pas de commerciaux')
     }
     return commerciaux
     } catch (error) {
         throw new Error('commercial pas trouve') 
     }
      
 }
 
 async getcommercialbyid(id:number){
    try {
        const commerciaux= await this.prisma.commerciaux.findUnique({
            where:{
                id
            
            }
        })
   
    return commerciaux
    } catch (error) {
        throw new Error(error) 
    }
     
}


 async updatecommercial(id:number,dto:editcomDto){
     try {
         const commercial=this.prisma.commerciaux.update({
             where:{id},

             data:{
               ...dto
             }
         })
        
         return commercial
         
     } catch (error) {
         throw new Error(error)
     }
    
 }

 async deletecommercial(id:number){
      return this.prisma.commerciaux.delete({
         where:{
             id
         }
     })
 }
}
