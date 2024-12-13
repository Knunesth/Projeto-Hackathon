function limpar_dados(dados) {
    dados = dados + "";
    dados = dados.replace(/[<>\'\"\(\)\=]/g, "");
    return dados;
}