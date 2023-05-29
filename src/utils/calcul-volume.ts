export const calcul =(dimension,quantite)=> {

   const longueur =  parseInt(dimension.split('x')[0])
   const largeur =  parseInt(dimension.split('x')[1])
 const volume = (longueur/140)*(largeur/140)*quantite

    return volume
}