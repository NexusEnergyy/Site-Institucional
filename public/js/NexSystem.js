document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('transition');
  const button2 = document.getElementById('transition2');
  const nav = document.getElementById('ativar');
  const menuItems = document.getElementById('menuItens');
  const menuItems2 = document.getElementById('menuItens2');
  const html = document.documentElement


  editNome.value = sessionStorage.NOME_USER
  editCpf.value = sessionStorage.CPF_USER
  editEmail.value = sessionStorage.EMAIL_USER
  editSenha.value = "NE@111123"


  var nomeCompleto = sessionStorage.getItem('NOME_USER');
  var partesNome = nomeCompleto.split(' ');
  var primeiroNome = partesNome[0];
  var sobrenome = partesNome.length > 1 ? partesNome[1] : '';
  
  document.getElementById('nome1').innerText = primeiroNome;
  document.getElementById('sobrenome1').innerText = sobrenome;


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
    if (sessionStorage.CARGO_USER == 0) {
      window.location.href = './cadastroRepresentantes.html';
    } else {
      toggleDisplay(empresasContent);
    }
  });
  document.getElementById('perfilItem').addEventListener('click', () => {
    toggleDisplay(perfilContent);
  });
  document.getElementById('boltItem').addEventListener('click', () => {
    toggleDisplay(boltContent);
  });

  document.getElementById('temaItem').addEventListener('click', () => lightColor());

  document.getElementById('saida').addEventListener('click', () => sair());


  function lightColor() {
    html.classList.toggle('light');
    changeLegendColor()
    changeXAxisLabelColor()
    changeYAxisLabelColor()
  }

  function sair() {
    window.location.href = "./index.html"
  }
});


function abrirModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('hide');
  modal.classList.add('show');
  modal.showModal()
  modal.showModal();
}

function fecharModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.classList.add('hide');
  modal.addEventListener('transitionend', () => {
    modal.close();
  }, { once: true });
  modal.close();
}


// GRÁFICO CONSUMO MENSAL DE ENERGIA
document.addEventListener('DOMContentLoaded', function () {
  const consumoMensalChart = echarts.init(document.getElementById('consumoMensalChart'));

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLabel: {
        color: '#FFFFFF'
      }
    },
    yAxis: {
      type: 'value',
      name: 'kWh',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#FFFFFF'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: 'Consumo Mensal',
        type: 'line',
        data: [],
        itemStyle: {
          color: 'rgba(75, 192, 192, 1)'
        },
        lineStyle: {
          width: 2
        }
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {
          title: 'Baixar Gráfico'
        }
      }
    }
  };

  consumoMensalChart.setOption(option);

  window.addEventListener('resize', function () {
    consumoMensalChart.resize();
  });

  function getConsumoMensal(idFilial) {

    fetch(`/graficos/getConsumoMensal?fkFilial=${idFilial}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(resposta){
        if(resposta.status === 200){
            return resposta.json();
        } else {
            alert(`Erro ao buscar dados: ${resposta.status}`);
        }
    })
    .then(data => {
        console.log("Valor da Requisição: " + data);
        const consumoMensal = new Array(12).fill(0);
        data.forEach(item => {
            const month = new Date(item.dataReferencia).getMonth();
            consumoMensal[month] = item.consumoEnergia;
        });
        option.series[0].data = consumoMensal;
        consumoMensalChart.setOption(option);
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
}

getConsumoMensal(sessionStorage.getItem("FILIAL_USER"));
});




// GRÁFICO PREVISÃO MENSAL DE ENERGIA
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
    data: ['Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'JUl', 'Ago'],
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



// GRÁFICO CONSUMO HORÁRIO DE ENERGIA
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o gráfico dentro do elemento com ID 'consumoHorarioChart'
  const consumoHorarioChart = echarts.init(document.getElementById('consumoHorarioChart'));

  // Configurações do gráfico de Consumo Horário
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#FFFFFF' // Define a cor branca para a legenda
      }
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      axisLabel: {
        color: '#FFFFFF' // Cor branca para os horários
      }
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
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: 'Consumo Horário',
        data: [70, 85, 95, 110, 130, 150, 165, 120], // Exemplo de consumo para cada horário
        type: 'bar'
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {
          title: 'Baixar Gráfico'
        }
      }
    }
  };

  // Renderiza o gráfico
  consumoHorarioChart.setOption(option);

  // Responsividade para redimensionamento da janela
  window.addEventListener('resize', function () {
    consumoHorarioChart.resize();
  });
});




// GRÁFICO DE EMISSAO DE CO2
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o gráfico dentro do elemento com ID 'emissaoCo2Chart'
  const emissaoCo2Chart = echarts.init(document.getElementById('emissaoCo2Chart'));

  // Função para gerar dados aleatórios com grande variação acima de 10.000
  function generateRandomData() {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push(Math.floor(Math.random() * 9000) + 10000); // Gera valores entre 10.000 e 18.999
    }
    return data;
  }

  // Dados aleatórios para o ano passado
  const lastYearData = generateRandomData();

  const idFilial = sessionStorage.getItem("FILIAL_USER");

  fetch(`/graficos/getEmissaoCO2?fkFilial=${idFilial}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Dados recebidos:", data);

      const thisYearData = new Array(12).fill(0);

      if (Array.isArray(data.emissaoCO2)) {
        data.emissaoCO2.forEach(item => {
          const month = new Date(item.date).getMonth();
          thisYearData[month] = item.value; 
        });
      } else {
        console.error('Dados de emissaoCO2 não encontrados ou inválidos');
      }

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Esse Ano', 'Ano Passado'],
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
          data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], // Meses do ano
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
            name: 'Esse Ano',
            type: 'line',
            stack: 'Total',
            data: thisYearData // Dados recebidos para os últimos 12 meses
          },
          {
            name: 'Ano Passado',
            type: 'line',
            stack: 'Total',
            data: lastYearData // Dados aleatórios para os últimos 12 meses
          }
        ]
      };

      // Renderiza o gráfico
      emissaoCo2Chart.setOption(option);
    })
    .catch(error => {
      console.error('Erro ao obter os dados do gráfico:', error);
    });

  // Responsividade para redimensionamento da janela
  window.addEventListener('resize', function () {
    emissaoCo2Chart.resize();
  });
});




// GRÁFICO DE COMPARATIVO DE EMPRESAS
document.addEventListener('DOMContentLoaded', function () {
  const comparativoMercado2 = echarts.init(document.getElementById('comparativoMercado2'));

  const option = {
    title: {
      text: 'Consumo (MWh) Entre Empresas',
      textStyle: { color: '#FFFFFF' },
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let content = `${params[0].axisValue}<br>`;
        params.forEach(item => {
          content += `${item.marker} ${item.seriesName}: ${item.data}<br>`;
        });
        return content;
      }
    },
    legend: {
      data: ['Tim', 'OI', 'Vivo', 'Claro'],
      textStyle: { color: '#FFFFFF' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    toolbox: { feature: { saveAsImage: {} } },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: { textStyle: { color: '#FFFFFF' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { textStyle: { color: '#FFFFFF' } }
    },
    series: [
      { name: 'Tim', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210], color: '#1f77b4' },
      { name: 'OI', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310], color: '#ff7f0e' },
      { name: 'Vivo', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410], color: '#2ca02c' },
      { name: 'Claro', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320], color: '#9467bd' }
    ]
  };

  comparativoMercado2.setOption(option);


  // Redimensionamento automático
  window.addEventListener('resize', function () {
    comparativoMercado2.resize();
  });

  // Função para trocar a cor da legenda
  window.changeLegendColor = function () {
    const newColor = option.legend.textStyle.color === '#000' ? '#FFFFFF' : '#000';
    option.legend.textStyle.color = newColor;
    comparativoMercado2.setOption(option);
  };
  // Função para trocar a cor dos rótulos do eixo X
  window.changeXAxisLabelColor = function () {
    const newColor = option.xAxis.axisLabel.textStyle.color === '#000' ? '#FFFFFF' : '#000';
    option.xAxis.axisLabel.textStyle.color = newColor;
    comparativoMercado2.setOption(option);
  };
  // Função para trocar a cor dos rótulos do eixo Y
  window.changeYAxisLabelColor = function () {
    const newColor = option.yAxis.axisLabel.textStyle.color === '#000' ? '#FFFFFF' : '#000';
    option.yAxis.axisLabel.textStyle.color = newColor;
    comparativoMercado2.setOption(option);
  };
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
          formatter: '{value}'
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



// GRÁFICO DO NÍVEL DE SUSTENTABILIDADE
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o gráfico dentro do elemento com ID 'nivelSustentabilidadeChart'
  const TreeGraphic = echarts.init(document.getElementById('TreeGraphic'));;
  var option;

  const treeDataURI =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC';
  const beginPercentage = 0;
  const endPercentage = 100;
  const lineCount = 7;

  option = {
    color: ['#e54035'],
    xAxis: {
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      name: beginPercentage + '%',
      nameLocation: 'middle',
      nameGap: 20,
      nameTextStyle: {
        color: 'white',
        fontWeight: 900,
        fontSize: 30,
        fontFamily: 'Wix Madefor Display, system-ui'
      },
      min: -2800,
      max: 2800
    },
    yAxis: {
      data: makeCategoryData(),
      show: false
    },
    grid: {
      top: 'center',
      height: 280
    },
    series: [
      {
        name: 'all',
        type: 'pictorialBar',
        symbol: 'image://' + treeDataURI,
        symbolSize: [20, 35],
        symbolRepeat: true,
        data: makeSeriesData(beginPercentage),
        animationEasing: 'elasticOut'
      },
      {
        name: 'all',
        type: 'pictorialBar',
        symbol: 'image://' + treeDataURI,
        symbolSize: [20, 35],
        symbolRepeat: true,
        data: makeSeriesData(beginPercentage, true),
        animationEasing: 'elasticOut'
      }
    ]
  };

  function makeCategoryData() {
    var categoryData = [];
    for (var i = 0; i < lineCount; i++) {
      categoryData.push(i + 'a');
    }
    return categoryData;
  }

  function makeSeriesData(percentage, negative) {
    const r = (percentage - beginPercentage + 1) * 10;
    const seriesData = [];
    for (let i = 0; i < lineCount; i++) {
      let sign = negative ? -1 * (i % 3 ? 0.9 : 1) : 1 * ((i + 1) % 3 ? 0.9 : 1);
      seriesData.push({
        value:
          sign *
          (percentage <= beginPercentage + 1
            ? Math.abs(i - lineCount / 2 + 0.5) < lineCount / 5
              ? 5
              : 0
            : (lineCount - Math.abs(i - lineCount / 2 + 0.5)) * r),
        symbolOffset: i % 2 ? ['50%', 0] : undefined
      });
    }
    return seriesData;
  }

  var currentPercentage = beginPercentage;
  setInterval(function () {
    currentPercentage += 25;
    if (currentPercentage > endPercentage) {
      currentPercentage = beginPercentage;
    }
    TreeGraphic.setOption({
      xAxis: {
        name: currentPercentage + '%'
      },
      series: [
        {
          data: makeSeriesData(currentPercentage)
        },
        {
          data: makeSeriesData(currentPercentage, true)
        }
      ]
    });
  }, 800);

  option && TreeGraphic.setOption(option);
  // Responsividade para redimensionamento da janela
  window.addEventListener('resize', function () {
    TreeGraphic.resize();
  });
});


function editPerfil(){
  var editNome = document.getElementById('editNome').value
  var editCpf = document.getElementById('editCpf').value
  var editSenha = document.getElementById('editSenha').value
  var editEmail = document.getElementById('editEmail').value

  fetch("/usuarios/editPerfil", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Nome: editNome,
      Email: editEmail,
      Cpf: editCpf,
      Senha: editSenha
    })
  }
  ).then(function (resposta) {
    if (resposta.ok) {
            alert("Dados Atualizados com Sucesso")
            atualizarNome()
    } else {
        throw ('Houve um erro na API!');
    }
}).catch(function (resposta) {
    console.error(resposta);
});
}
function qtdFiliais() {
  const idFilial = sessionStorage.FILIAL_USER;

  // Adicionando o parâmetro na URL como query string
  const url = `/empresas/qtdFiliais?fkFilial=${idFilial}`;

  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(function (resposta) {
      if (resposta.ok) {
          if (resposta.status == 204) {
              throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
              console.log("Dados recebidos: ", JSON.stringify(resposta));
              numeroFiliais.innerHTML = `${resposta.qtdFiliais}`;
          });
      } else {
          throw ('Houve um erro na API!');
      }
  }).catch(function (resposta) {
      console.error(resposta);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  qtdFiliais();
});



  
  async function cadastrar_funcionario() {
    const nome = document.querySelector('#input_nome_funcionario').value;
    const email = document.querySelector('#input_email_funcionario').value;
    const cpf = document.querySelector('#input_cpf_funcionario').value;
    const telefone = document.querySelector('#input_telefone_funcionario').value;
    const idFilial = sessionStorage.getItem('FILIAL_USER');

    const funcionario = {
        nomeServer: nome,
        emailServer: email,
        cpfServer: cpf,
        telefoneServer: telefone,
        fkFilialServer: idFilial 
    };

    try {
        const response = await fetch('usuarios/cadastrarFuncionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(funcionario)
        });

        if (response.ok) {
            await carregarFuncionarios(); // Aguarde a função carregarFuncionarios terminar
            fecharModal();
        } else {
            console.error('Erro ao cadastrar funcionário');
        }
    } catch (error) {
        console.error('Erro ao cadastrar funcionário:', error);
    }
}


async function carregarFuncionarios() {
  try {
      const idFilial = sessionStorage.getItem('FILIAL_USER');

      const response = await fetch(`usuarios/carregarFuncionarios?fkFilial=${idFilial}&fkCargo=2`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          const funcionarios = await response.json();
          const funcionariosBox = document.querySelector('.funcionariosBox');
          const noFuncionariosMessage = document.getElementById('noFuncionariosMessage');

          funcionariosBox.innerHTML = ''; 

          if (funcionarios.length > 0) {
              noFuncionariosMessage.style.display = 'none'; // Esconder a mensagem
              funcionarios.forEach(funcionario => {
                  const cardFuncionario = document.createElement('div');
                  cardFuncionario.className = 'cardFuncionario';
                  cardFuncionario.innerHTML = `
                      <div class="imgFuncionario">
                          <img id="imgFuncionario" src="https://picsum.photos/300/200">
                      </div>
                      <h2 id="nomeFuncionario">${funcionario.nome}</h2>
                      <h1> Email:${funcionario.email} </h1>
                  `;
                  funcionariosBox.appendChild(cardFuncionario);
              });
          } else {
              noFuncionariosMessage.style.display = 'block'; // Mostrar a mensagem
          }
      } else {
          console.error('Erro ao carregar funcionários');
      }
  } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarFuncionarios();
});



function getCompensacaoAmbiental() {
  const fkFilial = sessionStorage.getItem('FILIAL_USER');

  return fetch(`/graficos/getCompensacaoAmbiental?fkFilial=${fkFilial}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(function(resposta){
      if(resposta.status === 200){
          return resposta.json();
      } else {
          console.log(`Erro ao buscar dados: ${resposta.status}`);
      }
  })
  .then(data => {
    if (data.length > 0) {
      console.log("Qntd árvores: " + data[0].qtdArvores);

      const insightDiv = document.querySelector('.cardKpis .insight.compensacao');
      if (insightDiv) {
          insightDiv.innerHTML = `<img src="./assets/icon/Clip path group.png" alt="">${data[0].qtdArvores}`;
      }
  } else {
      console.log("Nenhum dado encontrado");
  }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCompensacaoAmbiental();
});


function buscarFiliais() {
  fetch('/empresas/buscarFiliais', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(function(resposta){
      if(resposta.status === 200){
          return resposta.json();
      } else {
          console.log(`Erro ao buscar dados: ${resposta.status}`);
      }
  })
  .then(data => {
      const select = document.getElementById('filialSelect');
      data.forEach(filial => {
          const option = document.createElement('option');
          option.value = filial.idFilial;
          option.textContent = filial.nome;
          select.appendChild(option);
      });
  })
  .catch(error => {
      console.error('Erro ao buscar dados:', error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buscarFiliais();
});