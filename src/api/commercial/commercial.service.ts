import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/external-service/prisma/prisma.service';

import {   editcomDto } from './dto';

@Injectable()
export class CommercialService {
    constructor(private prisma:PrismaService){}
 

 async getcommerciaux(){
     try {
         const commerciaux= await this.prisma.commerciaux.findMany()
     if (!commerciaux){
         return []
     }
     return commerciaux
     } catch (error) {
         throw new Error('commercial pas trouve') 
     }
      
 }
 async getcommercial(dto:editcomDto){
     const commercial=await this.prisma.commerciaux.findUnique({
         where:{
             login:dto.login
         }
         })
         if (!commercial){
            throw new  ForbiddenException('credentials incorrect')
         }
         const pwpassword= commercial.password === dto.password
       
         if (!pwpassword){
           throw new  ForbiddenException('credentials incorrect')
         }
         return commercial
           
    
 }
 async getcommercialbyid(id:number){
    try {
        const commerciaux= await this.prisma.commerciaux.findUnique({
            where:{
                id
            
            }
        })
    if (!commerciaux){
        return null
    }
    return commerciaux
    } catch (error) {
        throw new Error('commercial pas trouve') 
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
