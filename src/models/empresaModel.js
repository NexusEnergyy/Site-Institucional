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

function ranking(filial) {
  var instrucaoSql = `SELECT 
    CD.consumoEnergia AS consumo_energia,
    F.nome AS nome_filial,
    F.submercado AS submercado
FROM 
    ConsumoDados AS CD
JOIN 
    Filial AS F ON CD.fkFilial = F.idFilial
WHERE 
    F.fkPorte = (
        SELECT 
            F1.fkPorte
        FROM 
            Filial AS F1
        WHERE 
            F1.idFilial = ${filial}
    )
    AND CD.dataReferencia = '2024-06-01'
ORDER BY 
    CD.consumoEnergia DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarFiliais() {
  var instrucaoSql = `
      SELECT idFilial, nome from Filial;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function buscarComparativo(filial) {
  var instrucaoSql = `
    WITH EmpresasSelecionadas AS (
    SELECT 
        F.idFilial, 
        F.nome AS nome_filial
    FROM 
        Filial AS F
    WHERE 
        F.fkPorte = (
            SELECT 
                F1.fkPorte
            FROM 
                Filial AS F1
            WHERE 
                F1.idFilial = ${filial}
        )
    ORDER BY 
        RAND()
    LIMIT 5
)
SELECT 
    CD.dataReferencia AS data,
    DATE_FORMAT(CD.dataReferencia, '%Y-%m') AS mes,
    ES.nome_filial,
    CD.consumoEnergia AS consumo_energia
FROM 
    ConsumoDados AS CD
JOIN 
    EmpresasSelecionadas AS ES ON CD.fkFilial = ES.idFilial
ORDER BY 
    mes ASC, ES.nome_filial ASC, data ASC;
`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTotalConsumo(filialId) {
  const instrucaoSql = `
  SELECT 
    consumoEnergia as total_consumo
FROM 
    ConsumoDados
WHERE 
    fkFilial = ${filialId}
ORDER BY dataReferencia DESC
LIMIT 1; 
  `;

  console.log("Executando a instrução SQL:\n", instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarComparativoFilial(filial) {
    var instrucaoSql = `
          
WITH FiliaisSelecionadas AS (
    SELECT 
        F.idFilial, 
        F.nome AS nome_filial
    FROM 
        Filial AS F
    JOIN 
        ConsumoDados AS CD ON F.idFilial = CD.fkFilial
    WHERE 
        F.fkMatriz = (
            SELECT 
                fkMatriz
            FROM 
                Filial
            WHERE 
                idFilial = ${filial}
        )
    GROUP BY 
        F.idFilial, F.nome
    ORDER BY 
        SUM(CD.consumoEnergia) DESC
    LIMIT 5
)
SELECT 
    CD.dataReferencia AS data,
    DATE_FORMAT(CD.dataReferencia, '%Y-%m') AS mes,
    FS.nome_filial,
    CD.consumoEnergia AS consumo_energia
FROM 
    ConsumoDados AS CD
JOIN 
    FiliaisSelecionadas AS FS ON CD.fkFilial = FS.idFilial
ORDER BY 
    mes ASC, FS.nome_filial ASC, data ASC;
`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function nomeFilial(filial) {
    var instrucaoSql = `
          SELECT nome FROM Filial WHERE idFilial = ${filial};
`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }

  function previsaoConsumo(filialId) {
    const instrucaoSql = ` `;
  
    console.log("Executando a instrução SQL:\n", instrucaoSql);
    return database.executar(instrucaoSql);
  }


module.exports = { buscarMatrizes, cadastrarEmpresa, qtdFiliais, buscarFiliais, ranking, buscarComparativo, buscarTotalConsumo, buscarComparativoFilial, nomeFilial, previsaoConsumo };