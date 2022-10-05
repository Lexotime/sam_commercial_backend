import {  Injectable } from '@nestjs/common';
import { PrismaService } from '../../external-service/prisma/prisma.service';
import { editfacturedto, factureDto } from './dto'

@Injectable()
export class FactureService {
    constructor(private prisma:PrismaService){}
   
  async creerfacture(dto:factureDto){
        

           try {
            const facture= await this.prisma.facture.create({
                data:{ 
                    numerofacture:dto.numerofacture,
                    bonlivraisonid:dto.bonlivraisonid
                    }
            })
               return facture
            
           } catch (error) {
            throw new Error("facture non creer");
            
            
           }
        }


        async getfacture(){
            try {
                const facture= await this.prisma.facture.findMany()
            if (!facture){
                return []
            }
            return facture
            } catch (error) {
                throw new Error('facture pas trouve')
                
            }
             
        }
        async getfacturebyid(id:number){
            const facture=await this.prisma.facture.findUnique({
                where:{
                    id
                }
    
              
                 })
                 if(!facture){
                    return null
                 }
           return facture
        }
      
        async updatefacture(id:number,dto:editfacturedto){
            try {
                const facture=this.prisma.facture.update({
                    where:{id},

                    data:{
                      ...dto
                    }
                })
               
                return facture
                
            } catch (error) {
                throw new Error('fqcture non modifiee')
            }
           
        }

        async deletefacture(id:number){
             return this.prisma.facture.delete({
                where:{
                    id
                }
            })
        }
    }




