var empresaModel = require("../models/empresaModel");

function buscarMatrizes(req, res) {

  empresaModel.buscarMatrizes()
  .then((resultado) => {
    res.status(200).json(resultado);
  });

}

function cadastrarEmpresa(req, res) {
  const idMatriz = req.body.fkMatriz;
  const nome_empresa = req.body.nome_empresa;
  const submercado = req.body.submercado;
  const cidade = req.body.cidade;
  const uf = req.body.uf;

  console.log('Dados recebidos:', { idMatriz, nome_empresa, submercado, cidade, uf });

  empresaModel.cadastrarEmpresa(idMatriz, nome_empresa, submercado, cidade, uf)
  
  .then((resultado) => {
    res.status(201).send("Empresa cadastrada com sucesso");
  })
  .catch((error) => {
    console.error('Erro ao cadastrar empresa:', error);
    res.status(500).send('Erro ao cadastrar empresa');
  });

}

function qtdFiliais(req, res) {
  const filial = req.query.fkFilial;
  empresaModel.qtdFiliais(filial)
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.status(200).json({ qtdFiliais: resultado[0].qtd });
          } else {
              res.status(204).send("Nenhum resultado encontrado!");
          }
      })
      .catch(function (erro) {
          console.error(erro);
          res.status(500).json(erro);
      });
}

function buscarFiliais(req, res){
  empresaModel.buscarFiliais()
  .then((resultado) => {
    res.status(200).json(resultado);
  });
}

function nomeFilial(req, res) {
  const filial = req.query.fkFilial;

  empresaModel.nomeFilial(filial)
    .then((resultado) => {
      console.log('Resultado no Controller:', resultado); // Log para verificar
      res.status(200).json(resultado); // Certifique-se que `resultado` é um objeto ou string
    })
    .catch((erro) => {
      console.error('Erro ao buscar dados:', erro);
      res.status(500).send(erro);
    });
}

function ranking(req, res) {
  const filial = req.query.fkFilial;

  empresaModel.ranking(filial)
      .then(function (resultado) {
          if (resultado.length > 0) {
              const resposta = resultado.map(item => ({
                  consumoEnergia: item.consumo_energia,
                  nomeFilial: item.nome_filial,
                  submercado: item.submercado
              }));
              res.status(200).json(resposta);
          } else {
              res.status(204).send("Nenhum resultado encontrado!");
          }
      })
      .catch(function (erro) {
          console.error(erro);
          res.status(500).json(erro);
      });
}


function buscarComparativo(req, res) {
  const filial = req.query.fkFilial;

  empresaModel.buscarComparativo(filial)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados do comparativo:", erro);
      res.status(500).json(erro);
    });
}

function buscarComparativoFilial(req, res) {
  const filial = req.query.fkFilial;

  empresaModel.buscarComparativoFilial(filial)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar dados do comparativo:", erro);
      res.status(500).json(erro);
    });
}

function buscarTotalConsumo(req, res) {
  const filialId = req.query.fkFilial; // Obtém o ID da filial via query string

  empresaModel.buscarTotalConsumo(filialId)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado[0]); // Retorna o total de consumo
      } else {
        res.status(204).send("Nenhum dado encontrado!");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar total de consumo:", erro);
      res.status(500).json(erro);
    });
}

function previsaoConsumo(req, res) {
  const filialId = req.query.fkFilial;

  empresaModel.previsaoConsumo(filialId)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado[0]);
      } else {
        res.status(204).send("Nenhum dado encontrado!");
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar previsão de consumo:", erro);
      res.status(500).json(erro);
    });
}

module.exports = {
  buscarMatrizes,
  cadastrarEmpresa,
  qtdFiliais,
  buscarFiliais,
  ranking,
  buscarComparativo,
  buscarTotalConsumo,
  buscarComparativoFilial,
  nomeFilial,
  previsaoConsumo
};
