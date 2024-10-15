document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('transition');
    const button2 = document.getElementById('transition2');
    const nav = document.getElementById('ativar');
    const menuItems = document.getElementById('menuItens');
    const menuItems2 = document.getElementById('menuItens2');
    const html = document.documentElement
    const titles = [
        document.getElementById('titulo'),
        document.getElementById('titulo2'),
        document.getElementById('titulo3')
    ];
    const titles2 = [
        document.getElementById('titulo4'),
        document.getElementById('titulo5'),
        document.getElementById('titulo6')
    ];
    const configNex = document.getElementById('configNex');
    const mainTitle = document.getElementById('mainTitle');
    const IA = document.getElementById('Bolt');
    const gearIcon = document.querySelector('.gear-icon');

    // Divs das seções
    const dashboardContent = document.querySelector('.highContentNex');
    const performanceContent = document.querySelector('.highContentNex2');
    const empresasContent = document.querySelector('.highContentNex3');
    const perfilContent = document.querySelector('.highContentNex4');

    function toggleDisplay(activeSection) {
        const sections = [dashboardContent, performanceContent, empresasContent, perfilContent];
        
        sections.forEach(section => {
            section.classList.remove('visible');
            section.classList.add('hidden');
            section.style.display = 'none'; 
        });
    
        // Mostrar a seção ativa
        activeSection.style.display = 'grid';
        setTimeout(() => {
            activeSection.classList.remove('hidden');
            activeSection.classList.add('visible');
        }, 50); 
    }
    
    
    document.addEventListener('DOMContentLoaded', () => {
        toggleDisplay(dashboardContent); 
    
        const button = document.getElementById('transition');
        button.addEventListener('click', () => toggleDisplay(dashboardContent));
    
        const button2 = document.getElementById('transition2');
        button2.addEventListener('click', () => toggleDisplay(performanceContent));
    
    
        document.getElementById('dashboardItem').addEventListener('click', () => toggleDisplay(dashboardContent));
        document.getElementById('performanceItem').addEventListener('click', () => toggleDisplay(performanceContent));
        document.getElementById('empresasItem').addEventListener('click', () => toggleDisplay(empresasContent));
        document.getElementById('perfilItem').addEventListener('click', () => toggleDisplay(perfilContent));
        
    });

    function toggleMenu() {
        nav.classList.toggle('active');
        menuItems.classList.toggle('open');
        menuItems2.classList.toggle('open');

        titles.forEach(title => {
            title.style.display = title.style.display === 'flex' ? 'none' : 'flex';
        });
        titles2.forEach(title => {
            title.style.display = title.style.display === 'flex' ? 'none' : 'flex';
        });
        mainTitle.style.display = mainTitle.style.display === 'flex' ? 'none' : 'flex';
        configNex.style.display = configNex.style.display === 'flex' ? 'none' : 'flex';
        IA.style.display = configNex.style.display === 'none' ? 'none' : 'flex';
    }

    function rotateGear() {
        gearIcon.classList.toggle('rotate');
    }

    
    button.addEventListener('click', toggleMenu);
    button2.addEventListener('click', rotateGear);
    button2.addEventListener('click', toggleMenu);
    

    document.getElementById('dashboardItem').addEventListener('click', () => {
        toggleDisplay(dashboardContent);
    });
    
    document.getElementById('performanceItem').addEventListener('click', () => {
        toggleDisplay(performanceContent);
    });
    
    document.getElementById('empresasItem').addEventListener('click', () => {
        toggleDisplay(empresasContent);
    });
    document.getElementById('perfilItem').addEventListener('click', () => {
        toggleDisplay(perfilContent);
    });



    document.getElementById('temaItem').addEventListener('click', () => lightColor());

    function lightColor(){
        html.classList.toggle('light');
    }
});
