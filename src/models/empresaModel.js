var database = require("../database/config");

function buscarMatrizes() {
  var instrucaoSql = `SELECT idMatriz, nome, CNPJ FROM Matriz`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(idMatriz, nome_empresa, submercado, cidade, uf) {
  var instrucaoSql = `INSERT INTO Filial (nome, cidade, UF, submercado, fkMatriz) VALUES ('${nome_empresa}', '${cidade}', '${uf}', '${submercado}', '${idMatriz}')`;

  return database.executar(instrucaoSql).then(result => {
    return result.insertId; // Assuming the database library returns the inserted ID
  });
}

module.exports = { buscarMatrizes, cadastrarEmpresa};