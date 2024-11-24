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


module.exports = {
  buscarMatrizes,
  cadastrarEmpresa
};
