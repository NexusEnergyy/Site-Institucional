var empresaModel = require("../models/empresaModel");

function buscarMatrizes(req, res) {

  empresaModel.buscarMatrizes()
  .then((resultado) => {
    res.status(200).json(resultado);
  });

}

module.exports = {
  buscarMatrizes
};
