function mudarPalindromo(s, key) {
    const arrLetras = s.split('');
    let maiorPalindromo = "";
    
    for(let i = 1; i < arrLetras.length; i++){
        let partesPalavra = arrLetras.slice(0, i);
        let copiaInvertida = [...partesPalavra].reverse();


        if(partesPalavra.join('') === copiaInvertida.join('')) {
            maiorPalindromo = partesPalavra.join('');
        }
    }
    
    let palavraNova = maiorPalindromo+key;
    for(let i = 0; i < palavraNova.length; i++) {
        if(i === 5) {
            palavraNova[i] += "_";
        }
    }
  
    return palavraNova;
}

console.log("My array")