var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/getConsumoDados", function (req, res) {
    graficoController.getConsumoMensal(req, res);
})