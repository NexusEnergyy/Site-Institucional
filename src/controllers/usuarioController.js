var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.status(200).json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarResponsavel(req, res) {
    var nome_responsavel = req.body.nome_responsavelServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;
    var nome_empresa = req.body.nome_empresaServer;

    if (nome_responsavel == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está indefinido!");
    } else if (nome_empresa == undefined) {
        res.status(400).send("O nome da empresa está indefinido!");
    } else {

        usuarioModel.cadastrarResponsavel(cpf, nome_responsavel, email, telefone, nome_empresa)
            .then(
                function (resultadoCadastrar) {
                    console.log(`\nResultados encontrados: ${resultadoCadastrar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoCadastrar)}`); // transforma JSON em String

                    if (resultadoCadastrar.affectedRows == 1) {
                        console.log(resultadoCadastrar);

                        res.status(201).json(resultadoCadastrar);
                    } else {
                        res.status(403).send("Erro ao cadastrar usuário");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrarResponsavel
}