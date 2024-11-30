var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/buscarMatrizes", function(req,res){
    empresaController.buscarMatrizes(req,res);
});

router.post("/cadastrarEmpresa", function(req,res){
    empresaController.cadastrarEmpresa(req,res);
});

router.get("/qtdFiliais", function (req, res) {
    empresaController.qtdFiliais(req, res);
});

router.get("/buscarFiliais", function(req,res){
    empresaController.buscarFiliais(req,res);
});

router.get("/ranking", function(req,res){
    empresaController.ranking(req,res);
});

router.get("/buscarComparativo", function(req,res){
    empresaController.buscarComparativo(req,res);
});

router.get("/mediaDiaria", function(req,res){
    empresaController.buscarTotalConsumo(req,res);
});
module.exports = router;