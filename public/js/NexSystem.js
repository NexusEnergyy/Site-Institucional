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
    const boltContent = document.querySelector('.highContentNex5');

    function toggleDisplay(activeSection) {
        const sections = [dashboardContent, performanceContent, empresasContent, perfilContent, boltContent];
        
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
        document.getElementById('boltItem').addEventListener('click', () => toggleDisplay(boltContent));
        
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
    document.getElementById('boltItem').addEventListener('click', () => {
        toggleDisplay(boltContent);
    });



    document.getElementById('temaItem').addEventListener('click', () => lightColor());
    document.getElementById('saida').addEventListener('click', () => sair());

    function lightColor(){
        html.classList.toggle('light');
    }

    function sair(){
        window.location.href="./index.html"
    }
});


function abrirModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hide');
    modal.classList.add('show');
    modal.showModal( )
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    modal.classList.add('hide');
    modal.closeModal()
}


document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o gráfico dentro do elemento com ID 'consumoMensalChart'
    const consumoMensalChart = echarts.init(document.getElementById('consumoMensalChart'));

    // Configurações do gráfico
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    // Renderiza o gráfico
    consumoMensalChart.setOption(option);

    // Responsividade para redimensionamento da janela
    window.addEventListener('resize', function () {
      consumoMensalChart.resize();
    });
  });


  // Aguarda o carregamento do DOM
  document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o gráfico dentro do elemento com ID 'previsaoConsumoChart'
    const previsaoConsumoChart = echarts.init(document.getElementById('previsaoConsumoChart'));

    // Configurações do gráfico
    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    const option = {
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        right: '20%'
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Evaporation',
          position: 'right',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0]
            }
          },
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Precipitation',
          position: 'right',
          alignTicks: true,
          offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1]
            }
          },
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2]
            }
          },
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          yAxisIndex: 1,
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 2,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    };

    // Renderiza o gráfico
    previsaoConsumoChart.setOption(option);

    // Responsividade para redimensionamento da janela
    window.addEventListener('resize', function () {
      previsaoConsumoChart.resize();
    });
  });


  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };


  document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o gráfico dentro do elemento com ID 'consumoHorarioChart'
    const consumoHorarioChart = echarts.init(document.getElementById('consumoHorarioChart'));

    // Configurações do gráfico de Consumo Horário
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    // Renderiza o gráfico
    consumoHorarioChart.setOption(option);

    // Responsividade para redimensionamento da janela
    window.addEventListener('resize', function () {
      consumoHorarioChart.resize();
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o gráfico dentro do elemento com ID 'emissaoCo2Chart'
    const emissaoCo2Chart = echarts.init(document.getElementById('emissaoCo2Chart'));

    // Configurações do gráfico de Medidor (Gauge) para Emissão de CO₂
    const option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%' // Tooltip para exibir o nome e valor do gráfico
      },
      series: [
        {
          name: 'Pressure', // Nome do medidor
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}' // Exibe o valor como está
          },
          data: [
            {
              value: 50, // Valor inicial do medidor
              name: 'SCORE' // Nome exibido no centro do medidor
            }
          ]
        }
      ]
    };

    // Renderiza o gráfico
    emissaoCo2Chart.setOption(option);

    // Responsividade para redimensionamento da janela
    window.addEventListener('resize', function () {
      emissaoCo2Chart.resize();
    });
  });