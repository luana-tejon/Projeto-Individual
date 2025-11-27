var partidasModel = require("../models/partidasModel");


function autenticar(req, res) {
    var fkUsuario = req.body.fkUsuarioServer


    if (fkUsuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else { 

        partidasModel.autenticar(fkUsuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length >= 1 && resultadoAutenticar.length <= 5) {
                        console.log(resultadoAutenticar);
                        let partidasArry = [];
                        let pontuacaoArry = [];
                        let jogadasArry = [];
                        let segundosArry = [];

                        for(var i = 0; i < resultadoAutenticar.length; i++){

                            partidasArry.push(resultadoAutenticar[i].Partidas)
                            pontuacaoArry.push(resultadoAutenticar[i].Pontuacao)
                            jogadasArry.push(resultadoAutenticar[i].jogadas)
                            segundosArry.push(resultadoAutenticar[i].segundos)

                        }
                          res.json({
                              partidas: partidasArry,
                              pontuacao: pontuacaoArry,
                              jogadas: jogadasArry,
                              segundos: segundosArry,
                          });
                        
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("fkUsuario, idPartidas, Pontuacao ou jogadas não foi encontrado");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo fkUsuario, idPartidas, Pontuacao ou jogadas");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o a captura Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}



function puxarRanks(req, res) {

        partidasModel.puxarRanks()
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length >= 1) {
                        console.log(resultadoAutenticar);
                        console.log(resultadoAutenticar);
                        let jogadorArry = [];
                        let melhorRankArry = [];
                        let pontuacaoMaxArry = [];
                        let tempoMinArry = [];

                        for(var i = 0; i < resultadoAutenticar.length; i++){

                           jogadorArry.push(resultadoAutenticar[i].Jogador)
                           melhorRankArry.push(resultadoAutenticar[i].MelhorRank)
                           pontuacaoMaxArry.push(resultadoAutenticar[i].PontuacaoMaxima)
                           tempoMinArry.push(resultadoAutenticar[i].TempoMinimo)

                        }

                          res.json({
                              Jogador: jogadorArry,
                              MelhorRank: melhorRankArry,
                              PontuacaoMaxima: pontuacaoMaxArry,
                              TempoMinimo: tempoMinArry
                          });
                        
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



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var pontos = req.body.pontosServer;
    var segundos = req.body.segundosServer;
    var jogadas = req.body.jogadasServer;
    var ranks = req.body.ranksServer;
    var fkUsuario = req.body.fkUsuarioServer;
    
    
    // Faça as validações dos valores
    if (pontos == undefined) {
        res.status(400).send("Seu pontos está undefined!");
    } else if (segundos == undefined) {
        res.status(400).send("Seu segundos está undefined!");
    } else if (jogadas == undefined) {
        res.status(400).send("Sua jogadas está undefined!");
    } else if (ranks == undefined) { 
         res.status(400).send("Seu rank está undefined!");
    } else if (fkUsuario == undefined) { 
         res.status(400).send("Seu idUsuario está undefined!");
    } else { 

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        partidasModel.cadastrar(pontos,segundos,jogadas,ranks,fkUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar a partida! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    puxarRanks
}