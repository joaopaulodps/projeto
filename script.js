//máscara de valor que transaforma no padrão XX,XX
function formatarMoeda() {
  var valorM = document.getElementById('valorMercadoria');
  var valor = valorM.value;
  

  valor = valor + '';
  valor = parseFloat(valor.replace(/[\D]+/g, ''));
  valor = valor + '';
  valor = valor.replace(/([0-9]{2})$/g, ",$1");

  if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  valorM.value = valor;
  if(valor == 'NaN') valorM.value = '';
}

//função de formatar valor da mercadoria para o usuário
function formatarValor(valorMercadoria) {
  return Math.abs(valorMercadoria).toLocaleString('pt-BR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  });
}

//campo de validação do formulário
var arr = []
function validarForm(){
  var tipoTransacao = document.getElementById("tipoTransacao").value
  var nomeMercadoria = document.getElementById("nomeMercadoria").value
  var valorMercadoria = document.getElementById("valorMercadoria").value
  var existe_erro = false
   
  //validação do campo tipo transação
  if(tipoTransacao == "selecione") {
    existe_erro = true
    document.getElementById("erroTipo").innerHTML = " CAMPO OBRIGATÓRIO"
  }

  //validação do campo nome
  if(nomeMercadoria == "") {
    existe_erro = true
    document.getElementById("erroNome").innerHTML = " CAMPO OBRIGATÓRIO"
  }

  //validação do campo mercadoria
  if(valorMercadoria == "") {

    existe_erro = true
    document.getElementById("erroValor").innerHTML = " CAMPO OBRIGATÓRIO"
  }

  //parte de enviar dados para local storage
  var valorNovo = (tipoTransacao == "-") 
  ? valorNovo = tipoTransacao.concat(valorMercadoria).replace('.','').replace(',','.')
  : valorNovo = valorMercadoria.replace('.','').replace(',','.')
  
  if(!existe_erro){
    var pdt = {'tipoTransacao': tipoTransacao, 'nomeMercadoria': nomeMercadoria, 'valorMercadoria': valorNovo}
    arr.push(pdt)
    localStorage.setItem('prods', JSON.stringify(arr))

    listarProdutos()
  }
}

//fucção de listar produtos na tabela
function listarProdutos(){
  somarProdutos()

 arr = JSON.parse(localStorage.getItem('prods'))
    document.getElementById("table").innerHTML = arr.map((pdtos) => {
      return `
  <tr>
      <td style="padding-left: 10px; border-color: #979797;
  border-style: solid;
  border-top-width: 1px;" id="a">`+ pdtos.tipoTransacao +`</td>
  <td style=" width: 56.2%; border-top: #979797; border-color: #979797;
  border-style: solid;
  border-top-width: 1px;" id="respMercadoria">`+ pdtos.nomeMercadoria +`</td>
  <td style="text-align: end; padding-right: 10px; border-color: #979797;
  border-style: solid;
  border-top-width: 1px;" id="respValor">R$ `+ formatarValor(pdtos.valorMercadoria) +`</td>
  </tr>`
    }).join('')
  }
  
//função de deletar todos os itens do local storage
function deleteData(){
  var r=confirm("Deseja apagar TODOS os dados da tabela?");
  if (r==true){
    localStorage.removeItem('prods')
    document.location.reload();
  } 
}

if(localStorage.prods != null){
  listarProdutos()
}


//botão para abrir o menu responsivo
function botaoAbrir(){
  document.getElementById("teste").style.display = "block"
}

//botão para fechar o menu responsivo (quando aberto)
function botaoFechar(){
  document.getElementById("teste").style.display = "none"
}

//botão de adicionar transação, não faz nada, apenas recarrega a página
function addTr(){
  document.location.reload()
}

//função de somar os valores que estão armazenados no local storage, colcoando o resultado final na tabela
function somarProdutos(){
  var total1 = 0
  arr = JSON.parse(localStorage.getItem('prods'))
  document.getElementById("table").innerHTML = arr.map((pdtos) =>{
    total1 += parseFloat(pdtos.valorMercadoria)
  }
  )
  
//campo de lucro/prejuizo
  document.getElementById("totalvl").innerHTML = "R$ " + formatarValor(total1)

  if(total1 > 0){
    document.getElementById("profit").innerHTML = "[LUCRO]"
  } 
  if(total1 < 0){
   document.getElementById("profit").innerHTML = "[PREJUÍZO]"
  } 
  if(total1 == 0){
    document.getElementById("profit").innerHTML = ""
  } 
}

var aljson = []
  fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico?maxRecords=&view=Grid%20view", {
    headers: {
      Authorization: "Bearer key2CwkHb0CKumjuM"
    }
  }).then((resp) =>{
    resp.json().then((data)=> aljson = data)
    return aljson
  })

var prodserv = JSON.stringify(localStorage.getItem('prods'))
/*function salvarServidor(){
  fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
    method: "POST",
    headers: {
      Authorization: "Bearer key2CwkHb0CKumjuM",
      "Content-Type": "application/json" 
     },
    body: JSON.stringify({
      "records": [
         {
           "fields": {
             "Aluno": "2670",
             "Json": prodserv}
         }
      ],
       "typecast": true
     })
   }
 )
}*/

var idAluno1 = "recAqeBq0pBCXpaAk"
function atualizarServidor(){
  fetch("https://api.airtable.com/v0/appRNtYLglpPhv2QD/Historico", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer key2CwkHb0CKumjuM",
      "Content-Type": "application/json" 
     },
    body: JSON.stringify({
      "records": [
         {
           "id": idAluno1 ,
           "fields": {
             "Aluno": "2670",
             "Json": prodserv}
         }
      ],

     })
   }
 )
}

