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
idConquistas INT primary key auto_increment,  
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(255),
dificuldade VARCHAR(50)
);

CREATE TABLE premios (
idPremios INT,
fkConquistas INT,
fkUsuario INT,
constraint fkConquistas_premios
	foreign key (fkConquistas)
		references conquistas (idConquistas),
constraint fkUsuario_premios
	foreign key (fkUsuario)
		references usuario (IdUsuario),
constraint pkComposta_premio
	primary key (idPremios, fkConquistas, fkUsuario),
dtPremios DATETIME default current_timestamp
);



select * from partidas;
SELECT * FROM usuario;
SELECT * FROM conquistas;

drop table partidas;
drop table usuario;
drop table conquistas;

INSERT INTO conquistas (nome, descricao, dificuldade) VALUES
('Primeiro Par', 'Encontrou seu primeiro par de cartas.', 'Fácil'),
('Sortudo', 'Completou uma partida sem errar nenhuma jogadae terminou em 10 segundos.', 'Difícil'),
('Rápido e Preciso', 'Finalizou a partida em menos de 60 segundos.', 'Médio'),
('Sobrevivente', 'Terminou a partida com pelo menos 200 pontos.', 'Fácil'),
('Sem Pressa', 'Concluiu a partida gastando mais de 100 segundos.', 'Fácil'),
('Mestre dos Desenhos', 'Completou a partida com pontuação máxima (1000 pontos).', 'Muito Difícil'),
('Rank S', 'Alcançou rank S pela primeira vez.', 'Difícil'),
('Consistente', 'Completou 5 partidas consecutivas sem perder mais de 200 pontos por jogo.', 'Médio'),
('Memória de Ouro', 'Concluiu a partida sem errar nenhuma jogada e dentro de 10 segundos.', 'Extremamente Difícil');

truncate table conquistas;
truncate partidas;

SELECT
    u.apelido AS Jogador,
    MIN(par.ranks) AS MelhorRank,  -- S é melhor, depois A, B, C...
    MAX(par.pontos) AS PontuacaoMaxima,
    MIN(par.segundos) AS TempoMinimo
FROM partidas par
JOIN usuario u ON par.fkUsuario = u.IdUsuario
GROUP BY u.IdUsuario, u.apelido
ORDER BY MAX(par.pontos) DESC;  -- ordena pelo jogador com maior pontuação
-- SELECT JOAO
-- select para selecionar o maximo e o minimo dos jogadores e ir alterando conforme o maior foi atualizado
SELECT u.apelido AS Jogador, 
MIN(par.ranks) AS MelhorRank, 
MAX(par.pontos) AS PontuacaoMaxima,
MIN(par.segundos) AS TempoMinimo
	FROM partidas par
		JOIN usuario u ON par.fkUsuario = u.idUsuario  
        GROUP BY u.IdUsuario, u.apelido 
        ORDER BY MAX(par.pontos) DESC;

 -- grafico
select
	par.fkUsuario as Usuario,
    par.idPartida as Partida,
    par.pontos AS Pontuacao,
    par.segundos AS TempoMinimo,
    par.jogadas as Jogadas
from partidas par join usuario u
	on par.fkUsuario = u.IdUsuario
    where fkUsuario = 1;

