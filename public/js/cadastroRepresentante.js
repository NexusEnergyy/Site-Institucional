// Exibir a senha:
const olhoSenha1 = document.getElementById('olhoSenha1');
const inputSenha1 = document.getElementById('inputSenha1');
const olhoSenha2 = document.getElementById('olhoSenha2');
const inputSenha2 = document.getElementById('inputSenha2');
const olhoSenha3 = document.getElementById('olhoSenha3');
const inputSenha3 = document.getElementById('inputSenha3');


// // Animação inicial da tela de cadastro e login
document.addEventListener("DOMContentLoaded", function () {
  const boxesDiv = document.querySelector('.boxesDiv');

  boxesDiv.style.transform = 'translateY(780px)';
});

function selecionar_categoria(){

  let categoria = document.getElementById('select_Categoria').value;
  let campos_matriz = document.getElementById('campos_matriz');
  const resposta_erro = document.getElementById('resposta_erro');

  // Exibe o input somente se a categoria for "matriz"
  if (categoria == "Matriz") {
    campos_matriz.style.display = "block";
    resposta_erro.innerHTML = "";
  }if (categoria == "Filial") {
    campos_matriz.style.display = "none";
    resposta_erro.innerHTML = "";
  }else{
    resposta_erro.innerHTML = `Selecione a categoria para que seja preenchidatodas as informaçoes necessárias`;
     return false;
  }
}


function cadastrar_empresa() {

  const categoria = document.getElementById('select_Categoria').value;
  const nome_empresa = document.getElementById('input_nome_empresa').value;
  const submercado = document.getElementById('select_SubMercado').value;
  const cidade = document.getElementById('input_cidade').value;
  const uf = document.getElementById('input_UF').value;
  const CNPJ = document.getElementById('input_CNPJ').value;
  const resposta_erro = document.getElementById('resposta_erro');
  const ativoTotal= document.getElementById("input_ativo_total").value;

  if (categoria === "Matriz") {
    if (ativoTotal === "") {
      resposta_erro.innerHTML = `Informe o ativo total`;
      return false;
    }
  }
  if(categoria == "" || nome_empresa == "" || submercado == "" || cidade == "" || uf == "" || CNPJ == ""){
    resposta_erro.innerHTML = `Preencha todos os campos para continuar`;
  }
  if(CNPJ.length == 14){
    mudarTela1();
  }
}


 

  // fetch("/usuarios/cadastrar_empresa", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     categoriaServer:categoria,
  //     nome_empresaServer: nome_empresa,
  //     submercadoServer: submercado,
  //     cidadeServer: cidade,
  //     ufServer: uf,
  //     CNPJSrver: CNPJ,
  //     ativoTotalServer: ativoTotal
  //   }),
  // });

// Função para transição de tela
function mudarTela1() {
  const boxCinza = document.querySelector(".boxCinza");
  const boxRosa = document.querySelector(".boxRosa");
  const boxRosaContent1 = document.querySelector(".boxRosaContent1");
  const boxRosaContent2 = document.querySelector(".boxRosaContent2");
  const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
  const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");
  const inputNome1 = document.getElementById("input_nome_empresa");
  const inputEmail2 = document.getElementById("selectSubMercado");

 
  console.log("boxCinza:", boxCinza);
  console.log("boxRosa:", boxRosa);
  console.log("boxRosaContent1:", boxRosaContent1);
  console.log("boxRosaContent2:", boxRosaContent2);
  console.log("boxCinzaContent1:", boxCinzaContent1);
  console.log("boxCinzaContent2:", boxCinzaContent2);

  if (boxCinza && boxRosa && boxRosaContent1 && boxRosaContent2 && boxCinzaContent1 && boxCinzaContent2) {
      boxCinza.style.transform = "translateX(100%)";
      boxRosa.style.transform = "translateX(-100%)";
      boxCinza.style.borderRadius = "0 50px 50px 0";
      boxRosa.style.borderRadius = "50px 0 0 50px";
      

      if (inputNome1) inputNome1.value = '';
      if (inputEmail2) inputEmail2.value = '';

      setTimeout(function () {
          boxRosaContent1.style.display = "none";
          boxRosaContent2.style.display = "flex";
          boxCinzaContent1.style.display = "none";
          boxCinzaContent2.style.display = "block";
      }, 300); // Tempo em milissegundos
  } else {
      console.log("Um ou mais elementos não foram encontrados.");
  }
}


function cadastrar_adm() {
  var nome_usuario_adm = input_nome_usuario_adm.value;
  var Email = inputEmail.value;
  var filial = input_filial.value;
  var matricula = input_matricula.value;

  if (nome_usuario_adm === "" || Email === "" || filial === "" || matricula === "") {
    resposta_erro2.innerHTML = `Preencha todos os campos para continuar`;
    return false;
  } else if (Email.indexOf("@") < 0) {
    resposta_erro2.innerHTML = "E-mail inválido, o e-mail deve conter @";
    return false;
  }

  resposta_erro2.innerHTML="Cadastrado"

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_usuario_admServer: nome_usuario_adm,
      EmailServer: Email,
      filialServer: filial,
      matriculaServer: matricula,
    }),
  });

  
}



function voltarPrimeiraTela() {
  const boxCinza = document.querySelector(".boxCinza");
  const boxRosa = document.querySelector(".boxRosa");
  const boxRosaContent1 = document.querySelector(".boxRosaContent1");
  const boxRosaContent2 = document.querySelector(".boxRosaContent2");
  const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
  const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");

  boxCinza.style.transform = "translateX(0%)";
  boxRosa.style.transform = "translateX(0%)";
  boxCinza.style.borderRadius = "50px 0px 0px 50px";
  boxRosa.style.borderRadius = "0px 50px 50px 0px";

  setTimeout(function () {
    boxCinzaContent1.style.display = "block";
    boxCinzaContent2.style.display = "none";
    boxRosaContent1.style.display = "flex";
    boxRosaContent2.style.display = "none";
  }, 300);
}


function telaHome() {
  window.location.href = "./index.html"
}


