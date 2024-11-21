var database = require("../database/config");

function buscarMatrizes() {
  var instrucaoSql = `SELECT idMatriz, nome FROM Matriz`;

  return database.executar(instrucaoSql);
}



module.exports = { buscarMatrizes };
