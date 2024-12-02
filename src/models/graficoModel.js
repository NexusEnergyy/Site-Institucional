var database = require("../database/config")

function getConsumoMensal(fkFilial) {
    var instrucaoSql = `
        SELECT consumoEnergia, dataReferencia FROM ConsumoDados WHERE fkFilial = ${fkFilial}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getEmissaoCO2(fkFilial) {
    var instrucaoSql = `
        SELECT emissaoCO2 AS value, dataReferencia AS date FROM ConsumoDados WHERE fkFilial = ${fkFilial}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getCompensacaoAmbiental(fkFilial) {
    var instrucaoSql = `
        SELECT qtdArvores 
        FROM ConsumoDados 
        WHERE fkFilial = ${fkFilial}
        ORDER BY dataReferencia DESC
        LIMIT 1
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getPrevisaoConsumo(fkFilial) {
    var instrucaoSql = `
        SELECT dataReferencia, consumoPrevisto FROM DadosPrevistos WHERE fkFilial = ${fkFilial};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    getConsumoMensal,
    getEmissaoCO2,
    getCompensacaoAmbiental,
    getPrevisaoConsumo
};