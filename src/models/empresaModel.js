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

function qtdFiliais(filial) {
  var instrucaoSql = `
  SELECT 
    COUNT(F2.idFilial) AS qtd
FROM 
    Filial F1
JOIN 
    Matriz M ON F1.fkMatriz = M.idMatriz
JOIN 
    Filial F2 ON F2.fkMatriz = M.idMatriz
WHERE 
    F1.idFilial = ${filial};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { buscarMatrizes, cadastrarEmpresa, qtdFiliais};