var graficoModel = require("../models/graficoModel");

function getConsumoMensal(req, res) {
  var fkFilial = req.query.fkFilial;

  graficoModel.getConsumoMensal(fkFilial)
  .then((resultado) => {
    res.status(200).json(resultado);
  })
  .catch((erro) => {
    console.log(erro);
    res.status(500).json(erro.sqlMessage);
  });
}

function getEmissaoCO2(req, res) {
  var fkFilial = req.query.fkFilial;

  graficoModel.getEmissaoCO2(fkFilial)
  .then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json({ emissaoCO2: resultado });
    } else {
      res.status(404).json({ mensagem: "Nenhum dado encontrado" });
    }
  })
  .catch((erro) => {
    console.log(erro);
    res.status(500).json(erro.sqlMessage);
  });
}

function getCompensacaoAmbiental(req, res) {
  var fkFilial = req.query.fkFilial;

  graficoModel.getCompensacaoAmbiental(fkFilial)
  .then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ mensagem: "Nenhum dado encontrado" });
    }
  })
  .catch((erro) => {
    console.log(erro);
    res.status(500).json(erro.sqlMessage);
  });
}



module.exports = {
  getConsumoMensal,
  getEmissaoCO2,
  getCompensacaoAmbiental
};
