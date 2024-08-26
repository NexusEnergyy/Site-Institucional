const img1Box = document.getElementById('hoverImage1box');
const img2Box = document.getElementById('hoverImage2box');
const img3Box = document.getElementById('hoverImage3box');


const img1 = document.getElementById('hoverImage1');
const img2 = document.getElementById('hoverImage2');
const img3 = document.getElementById('hoverImage3');

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