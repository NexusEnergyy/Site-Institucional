const img1Box = document.getElementById('hoverImage1box');
const img2Box = document.getElementById('hoverImage2box');
const img3Box = document.getElementById('hoverImage3box');
const img4Box = document.getElementById('hoverImage4box');
const img5Box = document.getElementById('hoverImage5box');
const img6Box = document.getElementById('hoverImage6box');


const img1 = document.getElementById('hoverImage1');
const img2 = document.getElementById('hoverImage2');
const img3 = document.getElementById('hoverImage3');
const img4 = document.getElementById('hoverImage4');
const img5 = document.getElementById('hoverImage5');
const img6 = document.getElementById('hoverImage6');

        img1Box.addEventListener('mouseover', () => {
            img1.src = '../assets/plataforma/btn1hover.png';
        });

        img1Box.addEventListener('mouseout', () => {
            img1.src = '../assets/plataforma/btn1.png';
        });


        img2Box.addEventListener('mouseover', () => {
            img2.src = '../assets/plataforma/btn2hover.png';
        });

        img2Box.addEventListener('mouseout', () => {
            img2.src = '../assets/plataforma/btn2.png';
        });

        
        img3Box.addEventListener('mouseover', () => {
            img3.src = '../assets/plataforma/btn3hover.png';
        });

        img3Box.addEventListener('mouseout', () => {
            img3.src = '../assets/plataforma/btn3.png';
        });


        img4Box.addEventListener('mouseover', () => {
            img4.src = '../assets/plataforma/btn4hover.png';
        });

        img4Box.addEventListener('mouseout', () => {
            img4.src = '../assets/plataforma/btn4.png';
        });


        img5Box.addEventListener('mouseover', () => {
            img5.src = '../assets/plataforma/btn5hover.png';
        });

        img5Box.addEventListener('mouseout', () => {
            img5.src = '../assets/plataforma/btn5.png';
        });

        
        img6Box.addEventListener('mouseover', () => {
            img6.src = '../assets/plataforma/btn6hover.png';
        });

        img6Box.addEventListener('mouseout', () => {
            img6.src = '../assets/plataforma/btn6.png';
        });


function botaoSair(){
    window.location.href = '../index.html';
}