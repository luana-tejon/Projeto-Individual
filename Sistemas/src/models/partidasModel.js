var database = require("../database/config")

function autenticar(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", fkUsuario)
    var instrucaoSql = `
                    select
                    par.idPartida as Partidas,
                    par.pontos as Pontuacao,
                    par.jogadas as Jogadas,
                    par.segundos as segundos
                    from partidas par join usuario u
                	on par.fkUsuario = u.IdUsuario
                    where fkUsuario = ${fkUsuario}
                    order by par.idPartida desc
                    limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarRanks() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")
    var instrucaoSql = `
                    select
                     u.apelido AS Jogador,
                     MIN(par.ranks) AS MelhorRank,
                     MAX(par.pontos) AS PontuacaoMaxima,
                     MIN(par.segundos) AS TempoMinimo
                     FROM partidas par
                     JOIN usuario u ON par.fkUsuario = u.IdUsuario
                     GROUP BY u.IdUsuario, u.apelido
                     ORDER BY MAX(par.pontos) DESC; `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(pontos, segundos, jogadas, ranks, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", pontos, segundos, jogadas, ranks, fkUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO partidas (idPartida, pontos, segundos, jogadas, ranks, fkUsuario)
       SELECT ifnull(max(idPartida), 0) + 1, '${pontos}','${segundos}','${jogadas}','${ranks}','${fkUsuario}' from(select * from partidas) as temp;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    puxarRanks
};