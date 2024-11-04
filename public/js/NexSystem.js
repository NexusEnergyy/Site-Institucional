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
      changeLegendColor()
      changeXAxisLabelColor()
      changeYAxisLabelColor()
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
      left: 'center',
      textStyle: {
        color: '#FFFFFF'// Define a cor branca para a legenda
      }
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
          { value: 1048, name: 'Datacenters' },
          { value: 735, name: 'Máquinas' },
          { value: 580, name: 'Outros' }
          
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
  const colors = ['#5470C6', '#EE6666'];
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
      data: ['Consumo', 'Gasto'],
      textStyle: {
        color: '#FFFFFF' // Cor branca para a legenda
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: ['Nov', 'Dez', 'Jan', 'Mar', 'Abr', 'Mai'],
        axisLabel: {
          color: '#FFFFFF' // Cor branca para os nomes dos meses
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Consumo',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: '{value} kWh'
        }
      },
      {
        type: 'value',
        name: 'Gasto',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '{value} $'
        }
      }
    ],
    series: [
      {
        name: 'Consumo',
        type: 'bar',
        data: [120, 130, 150, 180, 210, 230]
      },
      {
        name: 'Gasto',
        type: 'line',
        yAxisIndex: 1,
        data: [50, 55, 60, 70, 80, 85]
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      axisLabel: {
        color: '#FFFFFF' // Cor branca para os horários
      }
    },
    yAxis: {
      type: 'value',
    },
    yAxis: [
      {
        type: 'value',
        name: 'kWh',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#FFFFFF' // Cor branca para a linha do eixo Y
          }
        },
        axisLabel: {
          formatter: '{value} kWh'
        }
      }
    ],
    series: [
      {
        data: [70, 85, 95, 110, 130, 150, 165, 120], // Exemplo de consumo para cada horário
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

// document.addEventListener('DOMContentLoaded', function () {
//   const comparativoMercado2 = echarts.init(document.getElementById('comparativoMercado2'));

//   var option = {
//     title: { text: 'Empresas:' },
//     tooltip: { trigger: 'axis' },
//     legend: {
//       data: ['Tim', 'OI', 'Vivo', 'Claro'],
//       textStyle: { color: '#FFFFFF' }
//     },
//     grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
//     toolbox: { feature: { saveAsImage: {} } },
//     xAxis: {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       axisLabel: { textStyle: { color: '#FFFFFF' } }
//     },
//     yAxis: {
//       type: 'value',
//       axisLabel: { textStyle: { color: '#FFFFFF' } } // Cor inicial dos rótulos do eixo Y
//     },
//     series: [
//       { name: 'Tim', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210] },
//       { name: 'OI', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310] },
//       { name: 'Vivo', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410] },
//       { name: 'Claro', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320] }
//     ]
//   };

//   comparativoMercado2.setOption(option);

//   // Redimensionamento automático
//   window.addEventListener('resize', function () {
//     comparativoMercado2.resize();
//   });

//   // Função para trocar a cor da legenda
//   window.changeLegendColor = function () {
//     const newColor = option.legend.textStyle.color === '#000' ? '#FFFFFF' : '#000';
//     option.legend.textStyle.color = newColor;
//     comparativoMercado2.setOption(option);
//   };

//   // Função para trocar a cor dos rótulos do eixo X
//   window.changeXAxisLabelColor = function () {
//     const newColor = option.xAxis.axisLabel.textStyle.color === '#000' ? '#FFFFFF' : '#000';
//     option.xAxis.axisLabel.textStyle.color = newColor;
//     comparativoMercado2.setOption(option);
//   };

//   // Função para trocar a cor dos rótulos do eixo Y
//   window.changeYAxisLabelColor = function () {
//     const newColor = option.yAxis.axisLabel.textStyle.color === '#000' ? '#FFFFFF' : '#000';
//     option.yAxis.axisLabel.textStyle.color = newColor;
//     comparativoMercado2.setOption(option);
//   };
// });


document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o gráfico dentro do elemento com ID 'emissaoCo2Chart'
  const emissaoCo2Chart = echarts.init(document.getElementById('emissaoCo2Chart'));

  const option = {
   
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Esse Mês', 'Mês Passado'],
      textStyle: {
        color: '#FFFFFF' // Cor branca para a legenda
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Últimos 6 meses do ano
      axisLabel: {
        color: '#FFFFFF' // Cor branca para os meses
      }
    },
    yAxis: {
      type: 'value',
      name: 'kg', // Unidade do eixo y
      axisLabel: {
        formatter: '{value} kg', // Formatação com "kg"
        color: '#FFFFFF' // Cor branca para os valores
      }
    },
    series: [
      {
        name: 'Esse Mês',
        type: 'line',
        stack: 'Total',
        data: [150, 200, 180, 250, 300, 270] // Dados de exemplo para os últimos 6 meses
      },
      {
        name: 'Mês Passado',
        type: 'line',
        stack: 'Total',
        data: [100, 150, 130, 200, 220, 190] // Dados de exemplo para os últimos 6 meses
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






// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
// Inicializa o gráfico dentro do elemento com ID 'historicoChart'
const historicoChart = echarts.init(document.getElementById('historicoChart'));

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
    data: ['Consumo'],
    textStyle: {
      color: '#FFFFFF' // Cor branca para a legenda
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      axisLabel: {
        color: '#FFFFFF' // Cor branca para os nomes dos meses
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'kWh',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#FFFFFF' // Cor branca para a linha do eixo Y
        }
      },
      axisLabel: {
        formatter: '{value} kWh'
      }
    }
  ],
  series: [
    {
      name: 'kWh',
      type: 'bar',
      data: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650] // Exemplo de dados em kWh
    }
  ]
};

// Renderiza o gráfico
historicoChart.setOption(option);

// Responsividade para redimensionamento da janela
window.addEventListener('resize', function () {
  historicoChart.resize();
});
});