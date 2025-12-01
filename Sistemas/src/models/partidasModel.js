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
                    SELECT
                        u.apelido AS Jogador,
                        par.ranks AS MelhorRank,
                        par.pontos AS PontuacaoMaxima,
                        par.segundos AS TempoMinimo
                    FROM partidas par
                    JOIN usuario u ON par.fkUsuario = u.IdUsuario
                    WHERE par.pontos = (
                        SELECT MAX(p2.pontos)
                        FROM partidas p2
                        WHERE p2.fkUsuario = par.fkUsuario
                    )
                    ORDER BY PontuacaoMaxima DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirConquistas(Conquistas, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirConquistas():", Conquistas, fkUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    let fkConquistas = [];

    for(var i = 0; i < Conquistas.length; i++){
        if(Conquistas[i] == 'Primeira Par'){
            fkConquistas.push(1)
        } else if(Conquistas[i] == 'Sortudo'){
            fkConquistas.push(2)
        } else if(Conquistas[i] == 'Rápido e Preciso'){
            fkConquistas.push(3)
        } else if(Conquistas[i] == 'Sobrevivente'){
            fkConquistas.push(4)
        } else if(Conquistas[i] == 'Sem Pressa'){
            fkConquistas.push(5)
        } else if(Conquistas[i] == 'Mestre dos Desenhos'){
            fkConquistas.push(6)
        } else if(Conquistas[i] == 'Rank S pelo primeira vez!'){
            fkConquistas.push(7)
        } else if(Conquistas[i] == 'Memória de Ouro'){
            fkConquistas.push(8)
        } 
    }

    for(var i = 0; i < fkConquistas.length; i++){
        var instrucaoSql = `
        INSERT INTO premios (fkConquistas, fkUsuario) values
           ('${fkConquistas[i]}', '${fkUsuario}') ;
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);

        database.executar(instrucaoSql);
    }
    return 'conquistas inseridas';
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

function puxarConquistas(fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarConquistas(): ")
    var instrucaoSql = `
                    select distinct
                    p.fkUsuario as Usuario,
                    c.nome as conquista,
                    c.dificuldade as nivel
                    from premios p join conquistas c
                    on c.idConquistas = p.fkConquistas join
                    usuario u on u.idUsuario = p.fkUsuario
                    where fkUsuario = '${fkUsuario}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    puxarRanks,
    inserirConquistas,
    puxarConquistas
};