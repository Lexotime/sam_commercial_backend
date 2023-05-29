export const calcul =(designation:string, quantite)=> {

   const longueur =   parseInt(designation.toLowerCase().split('x')[0])
   const largeur =  parseInt(designation.toLowerCase().split('x')[1])
 const volume = (longueur/140)*(largeur/140)*quantite

    return volume
}