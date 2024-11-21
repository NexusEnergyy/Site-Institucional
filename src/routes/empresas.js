var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/buscarMatrizes", empresaController.buscarMatrizes);

module.exports = router;