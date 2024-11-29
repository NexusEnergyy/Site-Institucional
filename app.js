require("dotenv").config({ path: '.env' });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var usuarioRouter = require("./src/routes/usuarios");
var empresasRouter = require("./src/routes/empresas");
var graficosRouter = require("./src/routes/graficos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/graficos", graficosRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ###  ##  ######   ##  ##   ##  ##   ######
    #### ##  ##       ##  ##   ##  ##   ##
    ## # ##  ##       ##  ##   ##  ##   ##
    ## # ##  ####      ####    ##  ##   ######
    ## ####  ##         ##     ##  ##       ##
    ##  ###  ##       ##  ##   ##  ##       ##
    ##   ##  ######   ##  ##   ######   ######
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://localhost:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSEJA BEM-VINDO à NEXUS ENERGY\n`);
});
