var database = require("../database/config")

function getConsumoMensal(fkFilial) {
    var instrucaoSql = `
        SELECT consumoEnergia FROM ConsumoDados WHERE fkFilial = ${fkFilial}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    getConsumoMensal
};