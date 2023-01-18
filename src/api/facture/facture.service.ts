import {  Injectable } from '@nestjs/common';
import { PrismaService } from '../../external-service/prisma/prisma.service';
import { editfacturedto} from './dto'

@Injectable()
export class FactureService {
    constructor(private prisma:PrismaService){}
   
 


        async getfacture(){
            try {
                const facture= await this.prisma.facture.findMany({
                    orderBy:{
                        id:'desc'
                    },
                   include:{
                    bonlivraison:{
                        select:{
                            articles:{
                                include:{
                                    article:true 
                                },
                                
                                
                            
                            },
                            client:{
                                select:{
                                    nom:true
                                }
                            }
                        }
                    }
                   
                }
                })
            if (!facture){
                return []
            }
            return facture
            } catch (error) {
                throw new Error('facture pas trouve')
                
            }
             
        }
        async getfacturebynrfacture(numerofacture){
            const facture=await this.prisma.facture.findUnique({
                where:{
                   numerofacture
                },
                include:{
                    bonlivraison:{
                        select:{
                            articles:{
                                include:{
                                    article:true
                                }
                            },
                            client:true,
                            commerciaux:true
                        }
                    }
                }
    
              
                 })
                 if(!facture){
                    return null
                 }
           return facture
        }
      
        async updatefacture(numerofacture:string,dto:editfacturedto){
            try {
                const facture=this.prisma.facture.update({
                    where:{numerofacture},

                    data:{
                      ...dto
                    }
                })
               
                return facture
                
            } catch (error) {
                throw new Error('facture non modifiee')
            }
           
        }

        async deletefacture(numerofacture:string){
             return this.prisma.facture.delete({
                where:{
                    numerofacture
                }
            })
        }
    }




