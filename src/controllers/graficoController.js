var graficoModel = require("../models/graficoModel");

function getConsumoMensal(req, res) {
  var fkFilial = req.query.fkFilial;

  graficoModel.getConsumoMensal(fkFilial)
  .then((resultado) => {
    res.status(200).json(resultado);
  });
}



module.exports = {
  getConsumoMensal
};
