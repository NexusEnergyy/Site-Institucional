  // Exibir a senha:
  const olhoSenha1 = document.getElementById('olhoSenha1');
  const inputSenha1 = document.getElementById('inputSenha1');
  const olhoSenha2 = document.getElementById('olhoSenha2');
  const inputSenha2 = document.getElementById('inputSenha2');
  const olhoSenha3 = document.getElementById('olhoSenha3');
  const inputSenha3 = document.getElementById('inputSenha3');


// Animação inicial da tela de cadastro e login
document.addEventListener("DOMContentLoaded", function() {
  const boxesDiv = document.querySelector('.boxesDiv');

  boxesDiv.style.transform = 'translateY(780px)';
});


function cadastrar_empresa() {

  var nome_empresa = input_nome_empresa.value
  var submercado = selectSubMercado.value
  var logadouro =  input_logradouro.value
  var CNPJ = input_CNPJ.value

  if (nome_empresa == "" || submercado == "" || logadouro == "" || CNPJ == ""){
      resposta_erro.innerHTML = `Preencha todos os campos para continuar`
    return false;
  }
  if(CNPJ.length < 11 || CNPJ.length > 11){
      resposta_erro.innerHTML = `O CNPJ deve ter 11 números`
      return false;
  }

  // fetch("/usuarios/cadastrar", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({

  //     nome_empresaServer: nome_empresa,
  //     submercadoServer: submercado,
  //     logadouroServer: logadouro,
  //     CNPJServer: CNPJ,

  //   }),
  // })

  const boxCinza = document.querySelector(".boxCinza");
  const boxRosa = document.querySelector(".boxRosa");
  const boxRosaContent1 = document.querySelector(".boxRosaContent1");
  const boxRosaContent2 = document.querySelector(".boxRosaContent2");
  const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
  const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");
  const inputNome1 = document.getElementById("inputNome1");
  const inputEmail2 = document.getElementById("inputEmail2");

      boxCinza.style.transform = "translateX(100%)";
      boxRosa.style.transform = "translateX(-100%)";
      boxCinza.style.borderRadius = "0 50px 50px 0";
      boxRosa.style.borderRadius = "50px 0 0 50px";
      inputNome1.value = '';
      inputEmail2.value = '';
     


  setTimeout(function() {
      boxRosaContent1.style.display = "none";
      boxRosaContent2.style.display = "flex";
      boxCinzaContent1.style.display = "none";
      boxCinzaContent2.style.display = "block";
  }, 300); // Tempo em milissegundos (300ms = 0.3 segundos)
}

function CadastrarFuncionarioADM() {

  var nome_usuario_adm = input_nome_usuario_adm.value
  var Email = inputEmail.value
  var filial =  input_filial.value
  var matricula = input_matricula.value

  if (nome_usuario_adm == "" || Email == "" || filial == "" || matricula == ""){
      resposta_erro2.innerHTML = `Preencha todos os campos para continuar`
    return false;
  }
  else if (email.indexOf("@") < 0) {
    resposta_erro2.innerHTML = "E-mail inválido, o e-mail deve conter @"
    return false;
  }

  // fetch("/usuarios/cadastrar", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({

  //     nome_usuario_admServer: nome_usuario_adm,
  //     EmailServer: Email,
  //     filialServer: filial,
  //     matriculaServer: matricula,

  //   }),
  // })




  const boxCinza = document.querySelector(".boxCinza");
  const boxRosa = document.querySelector(".boxRosa");
  const boxRosaContent1 = document.querySelector(".boxRosaContent1");
  const boxRosaContent2 = document.querySelector(".boxRosaContent2");
  const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
  const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");
  const inputEmail1 = document.getElementById("inputEmail1");



      boxCinza.style.transform = "translateX(-0%)";
      boxRosa.style.transform = "translateX(0%)";
      boxCinza.style.borderRadius = "50px 0 0 50px";
      boxRosa.style.borderRadius = "0 50px 50px 0";
      inputEmail1.value = '';
     

  setTimeout(function() {
      boxCinzaContent1.style.display = "block";
      boxCinzaContent2.style.display = "none";
      boxRosaContent1.style.display = "flex";
      boxRosaContent2.style.display = "none";
  }, 300); // Tempo em milissegundos (300ms = 0.3 segundos)
}




function telaHome(){
  window.location.href="./index.html"
}
