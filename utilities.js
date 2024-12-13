const limpar_dados = (dados) => {
    dados = dados + "";
    dados = dados.replace(/[<>\'\"\(\)\=]/g, "");
    return dados;
}

module.exports = {
    limpar_dados
}

