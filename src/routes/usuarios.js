var express = require('express');
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/autenticar", function(req,res){
    usuarioController.autenticar(req,res);
})

router.post("/cadastrarResponsavel", function(req,res){
    usuarioController.cadastrarResponsavel(req,res);
})


module.exports = router;