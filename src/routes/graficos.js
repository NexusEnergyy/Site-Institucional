var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/getConsumoMensal", function (req, res) {
    graficoController.getConsumoMensal(req, res);
})

router.get("/getEmissaoCO2", function (req, res) {
    graficoController.getEmissaoCO2(req, res);
})

router.get("/getCompensacaoAmbiental", function (req, res) {
    graficoController.getCompensacaoAmbiental(req, res);
})

module.exports = router;