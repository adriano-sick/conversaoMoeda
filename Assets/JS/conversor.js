// Adriano Siqueira - 9/14/2021 - Imersao Alura dev - Aula-2 - Conversao de moeda.


//Esse trecho coleta a data do dia anterior (o valor do dia de hoje so define apos o fechamento das bolsas), para poder inserir ele na url de consulta a api 
const data = new Date();
var dataFormatada = (((data.getMonth() )) + "-" + (data.getDate()-1) + "-" + data.getFullYear()).toLocaleString();


// Esse trecho do codigo consome a API do banco central brasileiro e retorna os dados da cotacao atual de compra, venda e horario da consulta
let url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + dataFormatada + "'&$format=json"; //URL da API
let request = new XMLHttpRequest(); //Instancia do XMLHttpRequest
request.open('GET', url, true); //Solicitacao de consulta na API

//Essa funcao faz o request dos dados da API logo quando o codigo (ou seja, a pagina em si) e carregado.
request.onload = function() {

    if (request.readyState == 4 && request.status == 200) {
        var resposta = JSON.parse(request.responseText);
        //repare que a variavel "valores", abaixo, nao possui a palavra reservada "var" antes dela, 
        //pois eu preciso usar essa variavel em outra funcao, e a palavra "var" a torna uma variavel local.
        valores = resposta.value[0]; 
    }     
};

//Essa funcao, avisa caso ocorra algum erro nessa consulta, e printa no console o erro propriamente dito    
request.onerror = function() {
    console.log("Erro:" + request);
};
    
request.send();

//essa funcao, converte o valor inserido, usando a cotacao de compra de dolar recuperada da API, e insere esse valor na div "valorConvertido"
function Converter() {
    var precoReal = parseFloat(document.getElementById("valor").value); 
    var divConvertido = document.getElementById("valorConvertido");

    //essa verificacao confirma que foi inserido um valor valido
    if(isNaN(precoReal)) {
        divConvertido.innerHTML = "Insira um valor!";
    } 
    else {
        var dataCotacao = valores.dataHoraCotacao;
        var precoDolar = (precoReal / valores.cotacaoCompra).toFixed(2);

        divConvertido.innerHTML = "R$" + precoReal + ", equivalem a US$" + precoDolar + ". Cambio cotado: " + dataCotacao + ".";
    }
}

