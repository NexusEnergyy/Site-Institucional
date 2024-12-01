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


// GRÁFICO HISTÓRICO DE ENERGIA
document.addEventListener('DOMContentLoaded', function () {
  const historicoConsumoChart = echarts.init(document.getElementById('historicoConsumoChart'));

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

  historicoConsumoChart.setOption(option);

  window.addEventListener('resize', function () {
    historicoConsumoChart.resize();
  });

  function getConsumoMensal(idFilial) {

    fetch(`/graficos/getConsumoMensal?fkFilial=${idFilial}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (resposta) {
        if (resposta.status === 200) {
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
        historicoConsumoChart.setOption(option);
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

  // Função para buscar dados do comparativo
  function fetchComparativo() {
    const fkFilial = sessionStorage.getItem('FILIAL_USER');
  
    fetch(`/empresas/buscarComparativo?fkFilial=${fkFilial}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(dados => {
        if (!dados || dados.length === 0) {
          console.log("Nenhum dado encontrado.");
          return;
        }
  
        // Extrai os meses e as empresas
        const datas = [...new Set(dados.map(d => d.data))]; // Datas únicas
        const empresas = [...new Set(dados.map(d => d.nome_filial))]; // Empresas únicas
  
        // Monta os consumos por empresa
        const consumosPorEmpresa = empresas.map(empresa =>
          datas.map(data => {
            const dado = dados.find(d => d.nome_filial === empresa && d.data === data);
            return dado ? dado.consumo_energia : null; // Retorna o consumo ou null
          })
        );
  
        // Atualiza o gráfico
        const option = {
          tooltip: {
            trigger: 'axis',
            formatter: params => {
              let content = `${params[0].axisValue}<br>`;
              params.forEach(p => {
                content += `${p.marker} ${p.seriesName}: ${p.data} MWh<br>`;
              });
              return content;
            }
          },
          legend: { data: empresas, textStyle: { color: '#FFFFFF' } },
          xAxis: { type: 'category', data: datas, axisLabel: { textStyle: { color: '#FFFFFF' } } },
          yAxis: { type: 'value', axisLabel: { textStyle: { color: '#FFFFFF' } } },
          series: empresas.map((empresa, i) => ({
            name: empresa,
            type: 'line',
            data: consumosPorEmpresa[i], // Dados de consumo da empresa
            color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#d62728'][i % 5] // Cores pré-definidas
          }))
        };
  
        comparativoMercado2.setOption(option);
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }
  
  // Busca os dados ao carregar a página
  fetchComparativo();

  // Redimensionamento automático
  window.addEventListener('resize', function () {
    comparativoMercado2.resize();
  });

  // Função para trocar a cor da legenda
  window.changeLegendColor = function () {
    const currentColor = comparativoMercado2.getOption().legend[0].textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoMercado2.setOption({
      legend: { textStyle: { color: newColor } }
    });
  };

  // Função para trocar a cor dos rótulos do eixo X
  window.changeXAxisLabelColor = function () {
    const currentColor = comparativoMercado2.getOption().xAxis[0].axisLabel.textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoMercado2.setOption({
      xAxis: { axisLabel: { textStyle: { color: newColor } } }
    });
  };

  // Função para trocar a cor dos rótulos do eixo Y
  window.changeYAxisLabelColor = function () {
    const currentColor = comparativoMercado2.getOption().yAxis[0].axisLabel.textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoMercado2.setOption({
      yAxis: { axisLabel: { textStyle: { color: newColor } } }
    });
  };
});

// GRÁFICO DE CONSUMO MENSAL
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o gráfico dentro do elemento com ID 'consumoMensalChart'
  const consumoMensalChart = echarts.init(document.getElementById('consumoMensalChart'));

  // Configurações do gráfico
  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c} MWh'
    },
    series: [
      {
        name: 'Consumo Mensal',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} MWh',
          color: '#FFFFFF',
          fontSize: 20 
        },
        data: [
          {
            value: 0,
            name: 'ENERGIA',
            title: {
              color: '#FFFFFF'
            }
          }
        ],
        radius: '100%' 
      }
    ]
  };

  async function getConsumoMesAtual(idFilial) {
    try {
      const response = await fetch(`/graficos/getConsumoMensal?fkFilial=${idFilial}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const mesAtual = new Date().getMonth();
        const consumoMesAtual = data.find(item => new Date(item.dataReferencia).getMonth() === mesAtual);

        if (consumoMesAtual) {
          consumoMensalChart.setOption({
            series: [{
              data: [{ value: consumoMesAtual.consumoEnergia, name: 'SCORE' }]
            }]
          });
        } else {
          console.log('Nenhum dado encontrado para o mês atual.');
        }
      } else {
        console.error(`Erro ao buscar dados: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  getConsumoMesAtual(sessionStorage.getItem("FILIAL_USER"));

  // Renderiza o gráfico
  consumoMensalChart.setOption(option);

  // Responsividade para redimensionamento da janela
  window.addEventListener('resize', function () {
    consumoMensalChart.resize();
  });
});

// GRÁFICO DO NÍVEL DE COMPARATIVO FILIAIS
document.addEventListener('DOMContentLoaded', function () {
  const comparativoFiliaisChart = echarts.init(document.getElementById('comparativoFiliaisChart'));

  // Função para buscar dados do comparativo
  function fetchComparativo() {
    const fkFilial = sessionStorage.getItem('FILIAL_USER');
  
    fetch(`/empresas/buscarComparativo?fkFilial=${fkFilial}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(dados => {
        if (!dados || dados.length === 0) {
          console.log("Nenhum dado encontrado.");
          return;
        }
  
        // Extrai os meses e as empresas
        const datas = [...new Set(dados.map(d => d.data))]; // Datas únicas
        const empresas = [...new Set(dados.map(d => d.nome_filial))]; // Empresas únicas
  
        // Monta os consumos por empresa
        const consumosPorEmpresa = empresas.map(empresa =>
          datas.map(data => {
            const dado = dados.find(d => d.nome_filial === empresa && d.data === data);
            return dado ? dado.consumo_energia : null; // Retorna o consumo ou null
          })
        );
  
        // Atualiza o gráfico
        const option = {
          tooltip: {
            trigger: 'axis',
            formatter: params => {
              let content = `${params[0].axisValue}<br>`;
              params.forEach(p => {
                content += `${p.marker} ${p.seriesName}: ${p.data} MWh<br>`;
              });
              return content;
            }
          },
          legend: { data: empresas, textStyle: { color: '#FFFFFF' } },
          xAxis: { type: 'category', data: datas, axisLabel: { textStyle: { color: '#FFFFFF' } } },
          yAxis: { type: 'value', axisLabel: { textStyle: { color: '#FFFFFF' } } },
          series: empresas.map((empresa, i) => ({
            name: empresa,
            type: 'line',
            data: consumosPorEmpresa[i], // Dados de consumo da empresa
            color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#d62728'][i % 5] // Cores pré-definidas
          }))
        };
  
        comparativoFiliaisChart.setOption(option);
        comparativoFiliaisChart.resize(); // Força o redimensionamento do gráfico
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }
  
  // Busca os dados ao carregar a página
  fetchComparativo();

  // Redimensionamento automático
  window.addEventListener('resize', function () {
    comparativoFiliaisChart.resize();
  });

  // Função para trocar a cor da legenda
  window.changeLegendColor = function () {
    const currentColor = comparativoFiliaisChart.getOption().legend[0].textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoFiliaisChart.setOption({
      legend: { textStyle: { color: newColor } }
    });
  };

  // Função para trocar a cor dos rótulos do eixo X
  window.changeXAxisLabelColor = function () {
    const currentColor = comparativoFiliaisChart.getOption().xAxis[0].axisLabel.textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoFiliaisChart.setOption({
      xAxis: { axisLabel: { textStyle: { color: newColor } } }
    });
  };

  // Função para trocar a cor dos rótulos do eixo Y
  window.changeYAxisLabelColor = function () {
    const currentColor = comparativoFiliaisChart.getOption().yAxis[0].axisLabel.textStyle.color;
    const newColor = currentColor === '#FFFFFF' ? '#000' : '#FFFFFF';
    comparativoFiliaisChart.setOption({
      yAxis: { axisLabel: { textStyle: { color: newColor } } }
    });
  };
});


function editPerfil() {
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
    .then(function (resposta) {
      if (resposta.status === 200) {
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



document.addEventListener('DOMContentLoaded', () => {
  getCompensacaoAmbiental();
  getNivelSustentabilidade();
});

function calcularPorcentagemSustentabilidade(consumoMensal) {
  const CO2_POR_MWH = 0.081; // Emissões de CO2 em toneladas por MWh
  const CO2_POR_ARVORE = 100; // Quantidade de CO2 que uma árvore pode compensar por ano em kg

  const emissaoCO2 = (consumoMensal * 1000) * CO2_POR_MWH; // Emissões de CO2 em kg
  const qtdArvores = emissaoCO2 / 200; // Quantidade de árvores necessárias para compensar a emissão
  const compensacaoCO2 = qtdArvores * CO2_POR_ARVORE; // Compensação de CO2 em kg

  const porcentagem = (compensacaoCO2 / emissaoCO2) * 100;
  return Math.min(porcentagem, 100); // Limita a porcentagem a no máximo 100%
}

async function getNivelSustentabilidade() {
  const fkFilial = sessionStorage.getItem('FILIAL_USER');
  const respostaConsumo = await fetch(`/graficos/getConsumoMensal?fkFilial=${fkFilial}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (respostaConsumo.status === 200) {
    const consumoData = await respostaConsumo.json();
    if (consumoData.length === 0) {
      console.log("Nenhum dado de consumo encontrado");
      return;
    }

    // Calcule o nível de sustentabilidade
    const consumoMensal = consumoData[0].consumoEnergia;
    console.log("Consumo Mensal: " + consumoMensal);  
    const nivelSustentabilidade = calcularPorcentagemSustentabilidade(consumoMensal);
    console.log("Nivel de Sustentabilidade: " + nivelSustentabilidade)

    // Renderize o gráfico de sustentabilidade
    const chartDom = document.getElementById('sustentabilidadeGraphic');
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Nível de Sustentabilidade'],
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [
        {
          data: [100], // Série de fundo representando 100%
          type: 'bar',
          barGap: '-100%', // Sobrepõe as barras
          itemStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },
        {
          data: [nivelSustentabilidade], // Série real representando o nível de sustentabilidade
          type: 'bar',
          itemStyle: {
            color: '#4CAF50' // Cor da barra real
          }
        }
      ]
    };
    myChart.setOption(option);
  } else {
    console.log(`Erro ao buscar dados: ${respostaConsumo.status}`);
  }
}




let dadosRanking = [];

function gerarRanking() {
  const fkFilial = sessionStorage.getItem('FILIAL_USER'); 

  fetch(`/empresas/ranking?fkFilial=${fkFilial}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resposta) => {
      if (resposta.status === 200) {
        return resposta.json();
      } else if (resposta.status === 204) {
        console.log("Nenhum dado encontrado.");
        return [];
      } else {
        console.error(`Erro ao buscar dados: ${resposta.status}`);
        return [];
      }
    })
    .then((dados) => {
      dadosRanking = dados; 
      exibirRanking(dadosRanking); 
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados:", erro);
    });
}

function exibirRanking(dados) {
  const rankingContainer = document.querySelector('.contentRank');

  if (!rankingContainer) {
    console.error("Elemento .contentRank não encontrado no DOM.");
    return;
  }

  rankingContainer.innerHTML = ''; 

  if (!dados || dados.length === 0) {
    console.log("Nenhum dado encontrado.");
    return;
  }

  dados.forEach((item, index) => {
    const rankDiv = document.createElement('div');
    rankDiv.classList.add('rank1');


    const fkFilial = sessionStorage.getItem('FILIAL_USER');
    if (String(item.idFilial) === fkFilial) {
      rankDiv.classList.add('highlight');
    }

    const numLeftDiv = document.createElement('div');
    numLeftDiv.classList.add('numLeftRank');

    const numRankDiv = document.createElement('div');
    numRankDiv.classList.add('numRank');
    numRankDiv.textContent = index + 1;

    const infoRightDiv = document.createElement('div');
    infoRightDiv.classList.add('infoRightRank');

    const titleInfoDiv = document.createElement('div');
    titleInfoDiv.classList.add('titleInfoRank');
    titleInfoDiv.textContent = item.nomeFilial;

    const kmhInfoDiv = document.createElement('div');
    kmhInfoDiv.classList.add('KMHInfoRank');
    kmhInfoDiv.textContent = `${item.consumoEnergia} MWh`;

    numLeftDiv.appendChild(numRankDiv);
    infoRightDiv.appendChild(titleInfoDiv);
    infoRightDiv.appendChild(kmhInfoDiv);
    rankDiv.appendChild(numLeftDiv);
    rankDiv.appendChild(infoRightDiv);

    rankingContainer.appendChild(rankDiv);
  });
}

function filtrarRanking() {
  const input = document.getElementById('inputProcurar'); 
  const filtro = input.value.toLowerCase(); 
  const dadosFiltrados = dadosRanking.filter(item =>
    item.nomeFilial.toLowerCase().includes(filtro)
  );

  exibirRanking(dadosFiltrados); 
}

document.addEventListener("DOMContentLoaded", () => {
  gerarRanking(); 

  const input = document.getElementById('inputProcurar');
  if (input) {
    input.addEventListener('keyup', filtrarRanking);
  }
});

function atualizarMediaDiaria() {
  const fkFilial = sessionStorage.getItem('FILIAL_USER');

  fetch(`/empresas/mediaDiaria?fkFilial=${fkFilial}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resposta) => {
      if (resposta.status === 200) {
        return resposta.json();
      } else if (resposta.status === 204) {
        console.log("Nenhum dado encontrado.");
        return null;
      } else {
        console.error(`Erro ao buscar dados: ${resposta.status}`);
        return null;
      }
    })
    .then((dados) => {
      console.log("Dados recebidos da API:", dados);

      const mediaDiariaContainer = document.getElementById('mediaDiaria');

      if (!mediaDiariaContainer) {
        console.error("Elemento #mediaDiaria não encontrado no DOM.");
        return;
      }

      if (!dados || !dados.total_consumo) {
        mediaDiariaContainer.innerHTML = '<span style="color: red;">Dados indisponíveis</span>';
        return;
      }

      const totalConsumo = parseFloat(dados.total_consumo);

      if (!isNaN(totalConsumo) && totalConsumo > 0) {
        const mediaDividida = (totalConsumo / 22).toFixed(2);
        mediaDiariaContainer.innerHTML = `
          ${mediaDividida} <span style="color: yellow;">MWh</span>
        `;
      } else {
        mediaDiariaContainer.innerHTML = '<span style="color: red;">Dados inválidos</span>';
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar média diária:", erro);
    });
}

document.addEventListener('DOMContentLoaded', atualizarMediaDiaria);

