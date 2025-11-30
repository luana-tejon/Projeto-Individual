

// kpi´s 

// pontução maxima 
document.getElementById('Pmaximo').textContent = sessionStorage.PONTOS_JOGO;
// segundo 
document.getElementById('Tsegundos').textContent = sessionStorage.SEGUNDOS_JOGO;
// jogadas 
document.getElementById('Pjogadas').textContent = sessionStorage.JOGADAS_JOGO;
// ranks  
document.getElementById('Jranks').textContent = sessionStorage.RANKS_JOGO;
//  apelido 
document.getElementById('Capelido').textContent = sessionStorage.APELIDO_USUARIO;


var partidas = sessionStorage.ID_PARTIDAS;
var Pontuacao = sessionStorage.PONTOS_PARTIDAS;
var jogadas = sessionStorage.JOGADAS_PARTIDAS;
var idUsuario = sessionStorage.FK_USUARIO;
var segundos = sessionStorage.SEGUNDOS_PARTIDAS;

function coresKpi() {
  let letra = document.getElementById('Jranks')

  if (letra.textContent == 'S') {
    letra.style.color = `rgba(245, 238, 48, 1)`;
  } else if (letra.textContent == 'A') {
    letra.style.color = `rgb(0, 204, 255)`;
  } else if (letra.textContent == 'B') {
    letra.style.color = `rgb(4, 182, 4)`;
  } else if (letra.textContent == 'C') {
    letra.style.color = `rgb(245, 15, 172)`;
  } else if (letra.textContent == 'D') {
    letra.style.color = `rgba(245, 15, 15, 1)`;
  }

}
coresKpi();


function inserirDados() {

  var idUsuarioVar = sessionStorage.FK_USUARIO;

  if (idUsuarioVar == '') {
    console.log('fkUsuario não encontrada')
  } else {

    fetch("/partidas/autenticar", {
      method: "POST",// inserir algo ou permição total
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fkUsuarioServer: idUsuarioVar,
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")
      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.ID_PARTIDAS = json.partidas;
          sessionStorage.PONTOS_PARTIDAS = json.pontuacao;
          sessionStorage.JOGADAS_PARTIDAS = json.jogadas;
          sessionStorage.SEGUNDOS_PARTIDAS = json.segundos;
          grafico();
        });

      } else {
        console.log("Houve um erro ao tentar a inserção do dados!");
        resposta.text().then(texto => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }

    }).catch(function (erro) {
      console.log(erro);
    })

    return false;

  }

}
inserirDados();

function tops() {

  fetch("/partidas/puxarRanks", {
    method: "POST",// inserir algo ou permição total
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.APELIDO_JOGADOR = json.Jogador;
        sessionStorage.MELHORRANK_JOGADOR = json.MelhorRank;
        sessionStorage.PONTUACAOMAX_JOGADOR = json.PontuacaoMaxima;
        sessionStorage.TEMPOMIN_JOGADOR = json.TempoMinimo;
      });

    } else {
      console.log("Houve um erro ao tentar a inserção do dados!");
      resposta.text().then(texto => {
        console.error(texto);
        // finalizarAguardar(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;

}
tops();

function tabelaConquistas() {

  var idUsuarioVar = sessionStorage.FK_USUARIO;

  if (idUsuarioVar == '') {
    console.log('fkUsuario não encontrada')
  } else {

    fetch("/partidas/puxarConquistas", {
      method: "POST",// inserir algo ou permição total
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fkUsuarioServer: idUsuarioVar
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")
      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.CONQUISTAS_JOGADOR = json.conquistas;
          sessionStorage.NIVEL_JOGADOR = json.nivel;
        });

      } else {
        console.log("Houve um erro ao tentar a inserção dos dados das conquistas!");
        resposta.text().then(texto => {
          console.error(texto);
          // finalizarAguardar(texto);
        });
      }

    }).catch(function (erro) {
      console.log(erro);
    })

    return false;
  }
}
tabelaConquistas();

function conquistas(){

let nome = sessionStorage.CONQUISTAS_JOGADOR;
let dificuldade = sessionStorage.NIVEL_JOGADOR;

  // conquistas 
  let CONQUISTAS = [];

  let msg1 = '';

  for (let i = 0; i <= nome.length; i++) {

    if (i == nome.length) {
      CONQUISTAS.push(msg1)
    } else if (nome[i] != ',') {
      msg1 += nome[i]
    } else {
      CONQUISTAS.push(msg1)
      msg1 = '';
    }

  }

  // dificuldade

  let DIFICULDADE = [];

  let msg2 = '';

  for (let i = 0; i <= dificuldade.length; i++) {

    if (i == dificuldade.length) {
      DIFICULDADE.push(msg2)
    } else if (dificuldade[i] != ',') {
      msg2 += dificuldade[i]
    } else {
      DIFICULDADE.push(msg2)
      msg2 = '';
    }

  }

 let conquistas = document.getElementById('conquistas')
 let nivel = document.getElementById('Nconquista')

 let usoConquista = [];
 let usoDificuldade = [];


 for(var i = 0; i < CONQUISTAS.length; i++){
  
  if(!usoConquista.includes(CONQUISTAS[i])){

      usoConquista.push(CONQUISTAS[i])
      usoDificuldade.push(DIFICULDADE[i])

      let ultimo = usoConquista.length - 1 // O novo item foi inserido no final do array, mas o índice dele é usoConquista.length - 1, NÃO i (pois sempre ira puxar no final mesmo não tendo nada)

      conquistas.innerHTML += `<p>${usoConquista[ultimo]}</p><br>`
      nivel.innerHTML += `<p>${usoDificuldade[ultimo]}</p><br>`;

   }
 }

}
conquistas();

// tabela ranks 
function tabelaRank() {

  let apelidos = sessionStorage.APELIDO_JOGADOR;
  let melhorRanks = sessionStorage.MELHORRANK_JOGADOR;
  let pontuacaoMax = sessionStorage.PONTUACAOMAX_JOGADOR;
  let tempoMin = sessionStorage.TEMPOMIN_JOGADOR;

  // apelido 
  let APELIDO = [];

  let bagulho1 = '';

  for (let i = 0; i <= apelidos.length; i++) {

    if (i == apelidos.length) {
      APELIDO.push(bagulho1)
    } else if (apelidos[i] != ',') {
      bagulho1 += apelidos[i]
    } else {
      APELIDO.push(bagulho1)
      bagulho1 = '';
    }

  }

  // RANKS 

  let MELHORRANK = [];

  let bagulho2 = '';

  for (let i = 0; i <= melhorRanks.length; i++) {

    if (i == melhorRanks.length) {
      MELHORRANK.push(bagulho2)
    } else if (melhorRanks[i] != ',') {
      bagulho2 += melhorRanks[i]
    } else {
      MELHORRANK.push(bagulho2)
      bagulho2 = '';
    }

  }

  // pontuação maxima 

  let PONTUACAOMAX = [];

  let bagulho3 = '';

  for (let i = 0; i <= pontuacaoMax.length; i++) {

    if (i == pontuacaoMax.length) {
      PONTUACAOMAX.push(Number(bagulho3))
    } else if (pontuacaoMax[i] != ',') {
      bagulho3 += pontuacaoMax[i]
    } else {
      PONTUACAOMAX.push(Number(bagulho3))
      bagulho3 = '';
    }

  }

  // tempo minimo 

  let TEMPOMIN = [];

  let bagulho4 = '';

  for (let i = 0; i <= tempoMin.length; i++) {

    if (i == tempoMin.length) {
      TEMPOMIN.push(Number(bagulho4))
    } else if (tempoMin[i] != ',') {
      bagulho4 += tempoMin[i]
    } else {
      TEMPOMIN.push(Number(bagulho4))
      bagulho4 = '';
    }

  }

  // puxei os id das div 

  let apelido = document.getElementById('apelido');
  let ranksU = document.getElementById('ranks_usuario');
  let pontuacaoM = document.getElementById('pontuacao_max');
  let tempoS = document.getElementById('tempo_segundos');

  var msg1 = ``;
  var msg2 = ``;
  var msg3 = ``;
  var msg4 = ``;

  let classe = ``;
  // anunciei com o as classes de cada usuario e cor 

  for (let i = 0; i < APELIDO.length; i++) {

    if (MELHORRANK[i] == 'S') {
      classe = `ranksS`;
    } else if (MELHORRANK[i] == 'A') {
      classe = `ranksA`;
    } else if (MELHORRANK[i] == 'B') {
      classe = `ranksB`;
    } else if (MELHORRANK[i] == 'C') {
      classe = `ranksC`;
    } else if (MELHORRANK[i] == 'D') {
      classe = `ranksD`;
    }

    msg1 += `<p class="${classe}">${APELIDO[i]}</p>`;
    msg2 += `<p class="${classe}">${MELHORRANK[i]}</p>`;
    msg3 += `<p class="${classe}">${PONTUACAOMAX[i]}</p>`;
    msg4 += `<p class="${classe}">${TEMPOMIN[i]}</p>`;

  }

  apelido.innerHTML = msg1;

  ranksU.innerHTML = msg2;

  pontuacaoM.innerHTML = msg3;

  tempoS.innerHTML = msg4;

}

setTimeout(() => {
  tabelaRank();
}, 500);



function carregarDadosS() {

  let segundoD = sessionStorage.SEGUNDOS_PARTIDAS;

  let segundo = [];

  let bagulho = '';

  for (let i = 0; i <= segundoD.length; i++) {

    if (i == segundoD.length) {
      segundo.push(Number(bagulho))
    } else if (segundoD[i] != ',') {
      bagulho += segundoD[i]
    } else {
      console.log(bagulho)
      console.log(Number(bagulho))
      segundo.push(Number(bagulho))
      bagulho = '';
    }

  }

  return segundo;
}

function carregarDadosP() {

  let pontuacaoD = sessionStorage.PONTOS_PARTIDAS;

  let pontuacao = [];

  let bagulho = '';

  for (let i = 0; i <= pontuacaoD.length; i++) {

    if (i == pontuacaoD.length) {
      pontuacao.push(Number(bagulho))
    } else if (pontuacaoD[i] != ',') {
      bagulho += pontuacaoD[i]
    } else {
      pontuacao.push(Number(bagulho))
      bagulho = '';
    }
  }

  return pontuacao;
}


function desempenho(pontos, segundos) { // calculo do desempenho do usuario
  var desempenho = (0.8 * (pontos / 1000) + 0.2 * ((120 - segundos) / 110)) * 100
  return desempenho;
}

function desempenhoArry(pontosArry, segundosArry) {

  let dadosS = carregarDadosS(segundosArry);
  let dadosP = carregarDadosP(pontosArry);

  if (dadosP.length == 1) {
    dadosS.push(dadosS[0])
    dadosP.push(dadosP[0])
  }

  let desempenhosArry = []

  for (var i = 0; i < dadosP.length; i++) {

    desempenhosArry.push(desempenho(dadosP[i], dadosS[i]));
  }

  return desempenhosArry;
}


function grafico() {
  const ctx = document.getElementById('graficoDesempenho');

  let segundosArry = carregarDadosS();
  let pontuacaoArry = carregarDadosP();
  let labels = [];


  for (let i = 0; i < pontuacaoArry.length; i++) {
    labels.push(`Partida ${i + 1}`);
  }

  if (segundosArry.length == 1) {
    segundosArry.push(segundosArry[0])
    pontuacaoArry.push(pontuacaoArry[0])
    labels.push(`Partida 1`);
  }

  console.log(segundosArry)
  console.log(pontuacaoArry)


  const graficoDesempenho = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels, // variavel do id parttidas do usuario
      datasets: [
        {
          label: 'Pontuação',
          data: pontuacaoArry, // variavel
          borderColor: '#d4a5ff',
          backgroundColor: 'rgba(212, 165, 255, 0.15)',
          borderWidth: 3,
          pointBackgroundColor: '#e3c97a',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Indicador de Desempenho (%)',
          data: desempenhoArry(Pontuacao, segundos), // variavel
          borderColor: '#e3c97a',
          backgroundColor: 'rgba(227, 201, 122, 0.2)',
          borderDash: [5, 5],
          borderWidth: 2,
          pointBackgroundColor: '#d4a5ff',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      stacked: false,
      plugins: {
        legend: {
          labels: {
            color: '#e3c97a',
            font: { size: 28 }
          }
        },
        tooltip: { // ve o dado e seu valores expecificos
          padding: 16,
          bodyFont: { size: 20 },
          titleFont: { size: 22 },
          caretSize: 8,       // aumenta a setinha do tooltip
          cornerRadius: 10,   // deixa o quadrado mais arredondado
          backgroundColor: '#2e2438',
          titleColor: '#d4a5ff',
          bodyColor: '#fff'
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#e3c97a',
            font: { size: 25 }
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y: {
          type: 'linear',
          position: 'left',
          ticks: {
            color: '#d4a5ff',
            font: { size: 26 }
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          title: {
            display: true,
            text: 'Pontuação',
            color: '#d4a5ff',
            font: { size: 25 }
          },
          min: 0,
          max: 1000
        },
        y2: {
          type: 'linear',
          position: 'right',
          ticks: {
            color: '#e3c97a',
            font: { size: 25 }
          },
          grid: { drawOnChartArea: false },
          title: {
            display: true,
            text: 'Desempenho (%)',
            color: '#e3c97a',
            font: { size: 25 }
          },
          min: 0,
          max: 100
        }
      }
    }
  });

}