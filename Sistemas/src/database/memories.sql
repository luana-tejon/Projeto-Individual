use memories;

CREATE TABLE usuario (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45) NOT NULL,
apelido VARCHAR (50) UNIQUE NOT NULL,
email VARCHAR (255) UNIQUE NOT NULL,
senha VARCHAR (60) NOT NULL
);

create table partidas (
idPartida int,
fkUsuario int,
constraint fkusuario_partidas
	foreign key (fkUsuario)
		references usuario (idUsuario),
constraint fkUsuario_partidas
	primary key (idPartida, fkUsuario),
segundos int not null,
pontos int not null,
jogadas int not null,
ranks char(1) not null
);

CREATE TABLE conquistas (
idConquistas INT,
fkUsuario int,
constraint fkusuario_conquistas
	foreign key (fkUsuario)
		references usuario (idUsuario),
fkPartidas int,
constraint fkPartida_conquistas
	foreign key (fkPartidas)
		references partidas (idPartida),
constraint pkComposta
	primary key (fkPartidas, fkUsuario, idConquistas),    
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(255),
dificuldade VARCHAR(50)
);

select * from partidas;
select * from usuario;
select * from conquistas;

drop table partidas;
drop table usuario;
drop table conquistas;

INSERT INTO conquistas (nome, descricao, dificuldade) VALUES
('Primeiro Par', 'Encontrou seu primeiro par de cartas.', 'Fácil'),
('Acertador', 'Completou uma partida sem errar nenhuma jogada.', 'Difícil'),
('Rápido e Preciso', 'Finalizou a partida em menos de 60 segundos.', 'Médio'),
('Sobrevivente', 'Terminou a partida com pelo menos 500 pontos.', 'Fácil'),
('Sem Pressa', 'Concluiu a partida gastando mais de 100 segundos.', 'Fácil'),
('Especialista', 'Completou a partida com pontuação máxima (1000 pontos).', 'Muito Difícil'),
('Rank S', 'Alcançou rank S em uma partida.', 'Muito Difícil'),
('Consistente', 'Completou 5 partidas consecutivas sem perder mais de 200 pontos por jogo.', 'Médio'),
('Detetive', 'Encontrou todos os pares em sequência correta sem errar.', 'Muito Difícil'),
('Maratona de Memória', 'Completou 10 partidas independentemente da pontuação.', 'Médio'),
('Caçador de Recordes', 'Superou sua melhor pontuação anterior.', 'Médio'),
('Memória de Ouro', 'Concluiu a partida sem errar nenhuma jogada e dentro de 60 segundos.', 'Extremamente Difícil');

select
    u.apelido AS Jogador,
    MIN(par.ranks) AS MelhorRank,  -- S é melhor, depois A, B, C...
    MAX(par.pontos) AS PontuacaoMaxima,
    MIN(par.segundos) AS TempoMinimo
FROM partidas par
JOIN usuario u ON par.fkUsuario = u.IdUsuario
GROUP BY u.IdUsuario, u.apelido
ORDER BY MAX(par.pontos) DESC;  -- ordena pelo jogador com maior pontuação

select
	par.fkUsuario as Usuario,
    par.idPartida as Partidas,
    par.pontos AS Pontuacao,
    par.jogadas as Jogadas,
    (erros - 6) * 100 / 6 as Desempenho
from partidas par join usuario u
	on par.fkUsuario = u.IdUsuario
    where fkUsuario = 1
    order by par.partidas desc
    limit 5;
