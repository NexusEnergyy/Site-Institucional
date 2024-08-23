
// Exibir a senha:
    const olhoSenha1 = document.getElementById('olhoSenha1');
    const inputSenha1 = document.getElementById('inputSenha1');
    const olhoSenha2 = document.getElementById('olhoSenha2');
    const inputSenha2 = document.getElementById('inputSenha2');
    const olhoSenha3 = document.getElementById('olhoSenha3');
    const inputSenha3 = document.getElementById('inputSenha3');


    olhoSenha1.addEventListener('click', function() {
        if (inputSenha1.type === 'password') {
            inputSenha1.type = 'text';
        } else {
            inputSenha1.type = 'password';
        }
    });

    olhoSenha2.addEventListener('click', function() {
        if (inputSenha2.type === 'password') {
            inputSenha2.type = 'text';
        } else {
            inputSenha2.type = 'password';
        }
    });

    olhoSenha3.addEventListener('click', function() {
        if (inputSenha3.type === 'password') {
            inputSenha3.type = 'text';
        } else {
            inputSenha3.type = 'password';
        }
    });


// Animação inicial da tela de cadastro e login
document.addEventListener("DOMContentLoaded", function() {
    const boxesDiv = document.querySelector('.boxesDiv');

    boxesDiv.style.transform = 'translateY(780px)';
  });


function mudarTela1() {
    const boxCinza = document.querySelector(".boxCinza");
    const boxRosa = document.querySelector(".boxRosa");
    const boxRosaContent1 = document.querySelector(".boxRosaContent1");
    const boxRosaContent2 = document.querySelector(".boxRosaContent2");
    const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
    const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");
    const inputNome1 = document.getElementById("inputNome1");
    const inputEmail2 = document.getElementById("inputEmail2");
    const inputSenha2 = document.getElementById("inputSenha2");
    const inputSenha3 = document.getElementById("inputSenha3");


    
        boxCinza.style.transform = "translateX(100%)";
        boxRosa.style.transform = "translateX(-100%)";
        boxCinza.style.borderRadius = "0 50px 50px 0";
        boxRosa.style.borderRadius = "50px 0 0 50px";
        inputNome1.value = '';
        inputEmail2.value = '';
        inputSenha2.value = '';
        inputSenha3.value = '';


    setTimeout(function() {    
        boxRosaContent1.style.display = "none";
        boxRosaContent2.style.display = "flex";
        boxCinzaContent1.style.display = "none";
        boxCinzaContent2.style.display = "block";
    }, 300); // Tempo em milissegundos (300ms = 0.3 segundos)
}

function mudarTela2() {
    const boxCinza = document.querySelector(".boxCinza");
    const boxRosa = document.querySelector(".boxRosa");
    const boxRosaContent1 = document.querySelector(".boxRosaContent1");
    const boxRosaContent2 = document.querySelector(".boxRosaContent2");
    const boxCinzaContent1 = document.querySelector(".boxCinzaContent1");
    const boxCinzaContent2 = document.querySelector(".boxCinzaContent2");
    const inputEmail1 = document.getElementById("inputEmail1");
    const inputSenha1 = document.getElementById("inputSenha1");

    
        boxCinza.style.transform = "translateX(-0%)";
        boxRosa.style.transform = "translateX(0%)";
        boxCinza.style.borderRadius = "50px 0 0 50px";
        boxRosa.style.borderRadius = "0 50px 50px 0";
        inputEmail1.value = '';
        inputSenha1.value = '';

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




// Validaçẽos do campo:
