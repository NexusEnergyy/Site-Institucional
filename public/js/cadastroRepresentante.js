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

function buscarMatrizes(){
  fetch("/empresas/buscarMatrizes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((data) => {
    const select = document.getElementById('select_matriz');
    const select2 = document.getElementById('select_SubMercado');
    const defaultOption = document.createElement('option');
    const defaultOption2 = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione uma matriz';
    defaultOption2.textContent = 'Selecione um submercado';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption2.selected = true;
    defaultOption2.disabled = true;
    select.appendChild(defaultOption);
    select2.appendChild(defaultOption2);

    data.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.idMatriz; 
      option.textContent = item.nome; 
      option.dataset.cnpj = item.CNPJ; 
      select.appendChild(option);
    });

    // Adiciona evento para atualizar o CNPJ ao selecionar uma matriz
    select.addEventListener('change', (event) => {
      const selectedOption = event.target.selectedOptions[0];
      const cnpjInput = document.getElementById('input_CNPJ');
      cnpjInput.value = selectedOption.dataset.cnpj || ''; // Atualiza o valor do CNPJ
    });
  })
  .catch((error) => {
    console.error('Erro ao buscar matrizes:', error);
  });
}
document.addEventListener('DOMContentLoaded', buscarMatrizes);


function cadastrar_empresa() {
  const fkMatriz = document.getElementById('select_matriz').value;
  const nome_empresa = document.getElementById('input_nome_empresa').value;
  const submercado = document.getElementById('select_SubMercado').value;
  const cidade = document.getElementById('input_cidade').value;
  const uf = document.getElementById('input_UF').value;
  const CNPJ = document.getElementById('input_CNPJ').value;
  const resposta_erro = document.getElementById('resposta_erro');

  localStorage.NOME_EMPRESA = nome_empresa;


  if (fkMatriz === "" || nome_empresa === "" || submercado === "" || cidade === "" || uf === "" || CNPJ === "") {
    resposta_erro.innerHTML = `Preencha todos os campos para continuar`;
    return false;
  }

  fetch('/empresas/cadastrarEmpresa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fkMatriz: fkMatriz,
      nome_empresa: nome_empresa,
      submercado: submercado,
      cidade: cidade,
      uf: uf,
    })
  })

  .then(function(resposta){
    if(resposta.status === 201){
      alert(`Empresa cadastrada com sucesso!`);
      mudarTela1();
    } else {
      resposta_erro.innerHTML = `Erro ao cadastrar empresa: ${resposta.status}`;
    }
  })

  .then(data => {
    console.log(data);
  })

  .catch(error => {
    resposta_erro.innerHTML = `Erro ao cadastrar empresa: ${error.message}`;
  });

}




function cadastrar_responsavel() {
  var nome_responsavel = document.getElementById('input_nome_responsavel').value;
  const nome_empresa = localStorage.getItem('NOME_EMPRESA');
  var email = document.getElementById('input_email').value;
  var cpf = document.getElementById('input_cpf').value;
  var telefone = document.getElementById('input_telefone').value;  
  const resposta_erro = document.getElementById('resposta_erro2');


  if (nome_responsavel === "" || email === "" || cpf === "" || telefone === "") {
    resposta_erro.innerHTML = `Preencha todos os campos para continuar`;
    return false;
  } else if (email.indexOf("@") < 0) {
    resposta_erro.innerHTML = "E-mail inválido, o e-mail deve conter @";
    return false;
  }


  fetch("/usuarios/cadastrarResponsavel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_responsavelServer: nome_responsavel,
      nome_empresaServer: nome_empresa,
      emailServer: email,
      cpfServer: cpf,
      telefoneServer: telefone,
    })
  })
  .then(function(resposta){
    if(resposta.status === 201){
      alert(`Responsável cadastrado com sucesso!`);
      telaPlataforma();
    } else {
      resposta_erro2.innerHTML = `Erro ao cadastrar responsável: ${resposta.status}`;
    }
  })
  
}

  




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

function telaPlataforma(){
  window.location.href = "./NexSystem.html"
}


