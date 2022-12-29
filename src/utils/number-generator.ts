export const numberArticleGenerator = () => {
    // 4 numbers ----
    let articleNumber = 'ART-';
    for(let i=1; i <= 4; i++)
        articleNumber = articleNumber + Math.floor(Math.random()*10);
    return articleNumber;
}

export const numberOrderGenerator = () => {
    // 5 numbers ----
    let orderNumber = 'CM-';
    for(let i=1; i <=5; i++)
        orderNumber = orderNumber + Math.floor(Math.random()*10);
    return orderNumber;
}

export const numberLivraisonGenerator = () => {
    // 5 numbers ----
    let livraisonNumber = 'LV-';
    for(let i=1; i <=5; i++)
        livraisonNumber = livraisonNumber + Math.floor(Math.random()*10);
    return livraisonNumber;
}

export const numberFactureGenerator = () => {
    let numberFacture = 'FA-';
    for(let i=1; i<=5; i++)
        numberFacture = numberFacture + Math.floor(Math.random()*10);
    return numberFacture;
}

export const numberClientGenerator = () => {
    // 3 numbers ----
    let clientNumber = 'CL-';
    for(let i=1; i <=3; i++)
        clientNumber = clientNumber + Math.floor(Math.random()*10);
    return clientNumber;
}


export const numberProformatGenerator = () => {
    // 5 numbers ----
    let proNumber = 'CM-';
    for(let i=1; i <=5; i++)
        proNumber = proNumber + Math.floor(Math.random()*10);
    return proNumber;
}