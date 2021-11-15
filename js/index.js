const $switcherBot = document.querySelector(".switcher-bot");
const $switcherMd = document.querySelector(".switcher-md");

const $itensDoTabuleiro = document.querySelectorAll(".item-tabuleiro");

const $placar1 = document.querySelector(".placar-1");
const $placar2 = document.querySelector(".placar-2");

const $nomeJogador1 = document.querySelector(".nome-jogador-1");
const $nomeJogador2 = document.querySelector(".nome-jogador-2");
const $nomeGanhador = document.querySelector(".nome-do-ganhador");

const $nomeBot = document.querySelector(".nome-bot");

const $botaoReiniciar = document.querySelector(".botão-reiniciar");
const $botaoJogar = document.querySelector(".botão-jogar");

const $caixaHistóricoPartidas = document.querySelector(".caixa-histórico-partidas");
const $movimentoJogadas = document.querySelector(".movimento-jogadas");

const linha1 = [$itensDoTabuleiro[0],$itensDoTabuleiro[1],$itensDoTabuleiro[2]];
const linha2 = [$itensDoTabuleiro[3],$itensDoTabuleiro[4],$itensDoTabuleiro[5]];
const linha3 = [$itensDoTabuleiro[6],$itensDoTabuleiro[7],$itensDoTabuleiro[8]];

const coluna1 = [$itensDoTabuleiro[0],$itensDoTabuleiro[3],$itensDoTabuleiro[6]];
const coluna2 = [$itensDoTabuleiro[1],$itensDoTabuleiro[4],$itensDoTabuleiro[7]];
const coluna3 = [$itensDoTabuleiro[2],$itensDoTabuleiro[5],$itensDoTabuleiro[8]];

const diagonal1 = [$itensDoTabuleiro[0],$itensDoTabuleiro[4],$itensDoTabuleiro[8]];
const diagonal2 = [$itensDoTabuleiro[2],$itensDoTabuleiro[4],$itensDoTabuleiro[6]];

const TodasAsLinhas = [linha1,linha2,linha3,coluna1,coluna2,coluna3,diagonal1,diagonal2];

const históricoDeMovimentos = [];

let vencedor = "";
let jogadaAtual = "X";
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let jogo = true;
let bot = false;
let iniciarJogo = false;
let partidas = 0;
let melhorDe5 = false;

const movimentoJogador = ($itemTabuleiro) => {
  $itemTabuleiro.textContent = jogadaAtual;
};

const revezarJogada = () => {
  if (jogadaAtual == "X") {
    jogadaAtual = "O";
  } else if (jogadaAtual == "O") {
    jogadaAtual = "X";
  }
};

const AnimaçãoVencedor = (linhaTabuleiro) => {
  for (const linhaTab of linhaTabuleiro) {
    linhaTab.classList.add("linha-destaque");

    setTimeout(function () {
      linhaTab.classList.remove("linha-destaque");
    }, 1500);
  }
};

const verificandoVencedor = () => {
  for (const linha of TodasAsLinhas) {
    if (linha[0].textContent && linha[0].textContent == linha[1].textContent && linha[1].textContent == linha[2].textContent) {
      vencedor = jogadaAtual;
      AnimaçãoVencedor(linha);
    }

    const tabuleiroCheio = checarTabuleiro();

    if (!vencedor && tabuleiroCheio) {
      vencedor = "empate";
    }
  }
};

const checarTabuleiro = () => {
  let cheio = true;
  for (const $itemTab of $itensDoTabuleiro) {
    if (!$itemTab.textContent) {
      cheio = false;
    }
  }
  return cheio;
};

const adicionarPontos = (jogador) => {
  if (jogador == "X") {
    pontosJogador1 += 1;
  } else if (jogador == "O") {
    pontosJogador2 += 1;
  }
};

const imprimeirPlacar = () => {
  if (pontosJogador1 < 10) {
    $placar1.textContent = "0" + pontosJogador1;
  } else {
    $placar1.textContent = pontosJogador1;
  }
  if (pontosJogador2 < 10) {
    $placar2.textContent = "0" + pontosJogador2;
  } else {
    $placar2.textContent = pontosJogador2;
  }
};

const imprimirNomeDoJogador = () => {
  if (vencedor === "X") {
    const valor1 = $nomeJogador1.value;
    $nomeGanhador.textContent = `${valor1} ganhou !`;
  } else if (vencedor === "O") {
    const valor2 = $nomeJogador2.value;
    $nomeGanhador.textContent = `${valor2} ganhou !`;
  } else {
    $nomeGanhador.textContent = "Empatou !";
  }
};

const imprimirCenário = () => {
  const cenário = [];

  for (const $itensTab of $itensDoTabuleiro) {
    const movimento = $itensTab.textContent;
    cenário.push(movimento);
  }
  return cenário;
};

const HistoricoDePartidas = () => {
  const cenário = imprimirCenário();

  const _históricoPartidas = document.createElement("li");
  _históricoPartidas.classList.add("histórico-partidas");

  const _vencedor = document.createElement("div");
  _vencedor.classList.add("vencedor");

  const _palavraVencedor = document.createElement("strong");
  _palavraVencedor.classList.add("palavra-vencedor");
  _palavraVencedor.textContent = "Vencedor";

  const _nomeJogadorVencedor = document.createElement("span");
  _nomeJogadorVencedor.classList.add("nome-jogador-vencedor");
  _nomeJogadorVencedor.textContent = imprimirNomeNoMovimento(vencedor);

  const _palavraCenário = document.createElement("strong");
  _palavraCenário.classList.add("palavra-cenário");
  _palavraCenário.textContent = "Cenário";

  const _miniCenário = document.createElement("div");
  _miniCenário.classList.add("mini-cenário");

  _históricoPartidas.appendChild(_vencedor);
  _históricoPartidas.appendChild(_palavraCenário);
  _históricoPartidas.appendChild(_miniCenário);
  _vencedor.appendChild(_palavraVencedor);
  _vencedor.appendChild(_nomeJogadorVencedor);

  $caixaHistóricoPartidas.appendChild(_históricoPartidas);

  for (const movimento of cenário) {
    const _movimento = document.createElement("span");
    _movimento.classList.add("mini-campo");
    _movimento.textContent = movimento;

    _miniCenário.appendChild(_movimento);
  }
};

const quantidadeDeMovimentos = () => {
  let index = -1;

  for (const $itemTab of $itensDoTabuleiro) {
    if ($itemTab.textContent) {
      index += 1;
    }
  }
  return index;
};

const pegarCenário = () => {
  const cenário = imprimirCenário();
  históricoDeMovimentos.push(cenário);
};

const imprimirMovimento = (cenário) => {
  for (let i = 0; i < cenário.length; i++) {
    const $itensTab = $itensDoTabuleiro[i];
    const movimento = cenário[i];
    $itensTab.textContent = movimento;
  }
};

const imprimirNomeNoMovimento = (moviemntoAtual) => {
  const jogador1Valor = $nomeJogador1.value;
  const jogador2Valor = $nomeJogador2.value;

  if (moviemntoAtual === "X") {
    return jogador1Valor;
  } else if (moviemntoAtual === "O") {
    return jogador2Valor;
  }
};

const imprimirMovimentoJogadas = (movimento, indexTabuleiro) => {
  const imprimirJogador = imprimirNomeNoMovimento(movimento);
  const movimentoIndex = quantidadeDeMovimentos();
  const _jogadas = document.createElement("li");
  _jogadas.classList.add("jogadas");
  _jogadas.setAttribute("index", movimentoIndex);

  const _jogadaAtual = document.createElement("strong");
  _jogadaAtual.classList.add("jogada-atual");
  _jogadaAtual.textContent = movimento;

  const _jogadorPosição = document.createElement("div");
  _jogadorPosição.classList.add("jogador-posição");

  const _jogadaAtualJogador = document.createElement("span");
  _jogadaAtualJogador.classList.add("jogada-atual-jogador");
  _jogadaAtualJogador.textContent = imprimirJogador;

  const _posiçãoTabuleiro = document.createElement("span");
  _posiçãoTabuleiro.classList.add("posição-tabuleiro");
  _posiçãoTabuleiro.textContent = indexTabuleiro;

  _jogadas.appendChild(_jogadaAtual);
  _jogadas.appendChild(_jogadorPosição);
  _jogadorPosição.appendChild(_jogadaAtualJogador);
  _jogadorPosição.appendChild(_posiçãoTabuleiro);

  $movimentoJogadas.appendChild(_jogadas);

  _jogadas.addEventListener("click", function () {
    const cenárioAdd = históricoDeMovimentos[movimentoIndex];
    imprimirMovimento(cenárioAdd);
  });
};

const informarCampoJogado = (posiçãoIndex) => {
  const listaPosições = ["Primeiro","Segundo","Terceiro","Quarto","Quinto","Sexto","Sétimo","Oitavo","Nono"];
  
  return listaPosições[posiçãoIndex];
};

const pararJogadaPorUmMomento = (tempo) => {
  jogo = false;

  setTimeout(function () {
    jogo = true;
  }, tempo);
};

const limparElementos = (limpar) => {
  const $elemento = document.querySelector(limpar);
  $elemento.textContent = "";
};

const resetartabuleiro = () => {
  for (const $itemTab of $itensDoTabuleiro) {
    if ($itemTab.textContent) {
      $itemTab.textContent = "";
    }
  }
};

const resetarVariaveis = () => {
  vencedor = "";
  jogadaAtual = "X";
  históricoDeMovimentos.length = 0;
};

const resetarCenario = () => {
  $caixaHistóricoPartidas.innerHTML = "";
};

const resetarHistoricoDeJogadas = () => {
  $movimentoJogadas.innerHTML = "";
};

const resetarPlacar = () => {
  $placar1.textContent = "00";
  $placar2.textContent = "00";
};

const resetraNomeGanhador = () => {
  $nomeGanhador.textContent = "Ganhador";
};

const resetarNomeJogador = () => {
  $nomeJogador1.value = "";
  $nomeJogador2.value = "";
};

const resetarPontosDosJogadores = ()=>{
  pontosJogador1 = 0
  pontosJogador2 = 0
}

const reiniciarBotaoJogar = () => {
  if (iniciarJogo == true) {
    iniciarJogo = false;
    $botaoJogar.classList.remove("botão-ativado");
    $botaoJogar.textContent = "Jogar";
  }
};

const reiniciarJogo = () => {
  resetartabuleiro();
  resetarPlacar();
  resetraNomeGanhador();
  resetarCenario();
  resetarHistoricoDeJogadas();
  resetarNomeJogador();
  reiniciarBotaoJogar();
  resetarVariaveis()
  resetarPontosDosJogadores()
};

const verificarMD = () => {
  if (!melhorDe5 && pontosJogador1 === 3 || pontosJogador2 === 3) {
    reiniciarJogo();
  }
  if (melhorDe5 && pontosJogador1 === 5 || pontosJogador2 === 5) {
    reiniciarJogo();
  }
};

const posiçãoBot = () => {
  return Math.floor(Math.random() * 9);
};

const botNome = () => {
  if (bot == true) {
    $nomeBot.setAttribute("placeholder", "Bot");
    $nomeJogador2.value = "Bot";
  } else {
    bot = false;
    $nomeBot.setAttribute("placeholder", "jogador 2");
  }
};

const BotJoga = () => {
  const posição = posiçãoBot();
  const $itemTabuleiro = $itensDoTabuleiro[posição];
  const textoPosição = informarCampoJogado(posição);
  const TabCheio = checarTabuleiro();

  if ($itemTabuleiro.textContent && !TabCheio) return BotJoga();
  if ($itemTabuleiro.textContent || !jogo) return;
  movimentoJogador($itemTabuleiro);
  verificandoVencedor();
  imprimirMovimentoJogadas(jogadaAtual, textoPosição + " campo");
  revezarJogada();
  pegarCenário();
  if (vencedor) {
    pararJogadaPorUmMomento(1500);
    setTimeout(resetartabuleiro, 1500);
    setTimeout(function () {
      limparElementos(".movimento-jogadas");
    }, 1500);
    adicionarPontos(vencedor);
    imprimeirPlacar();
    imprimirNomeDoJogador();
    HistoricoDePartidas();
    setTimeout(verificarMD , 1500) 
    resetarVariaveis();
  }
};

for (let index = 0; index < $itensDoTabuleiro.length; index++) {
  const $itemTabuleiro = $itensDoTabuleiro[index];
  $itemTabuleiro.addEventListener("click", function () {
    if (iniciarJogo == false) return;
    const textoPosição = informarCampoJogado(index);
    if ($itemTabuleiro.textContent || !jogo) return;
    movimentoJogador($itemTabuleiro);
    verificandoVencedor();
    imprimirMovimentoJogadas(jogadaAtual, textoPosição + " campo");
    revezarJogada();
    pegarCenário();
    if (vencedor) {
      pararJogadaPorUmMomento(1500);
      setTimeout(resetartabuleiro, 1500);
      setTimeout(function () {
        limparElementos(".movimento-jogadas");
      }, 1500);
      adicionarPontos(vencedor);
      imprimeirPlacar();
      imprimirNomeDoJogador();
      HistoricoDePartidas();
      setTimeout(verificarMD , 1500) 
      resetarVariaveis();
    }
    bot && BotJoga();
  });
}

$botaoJogar.addEventListener("click", function () {
  if (iniciarJogo == false) {
    iniciarJogo = true;
    $botaoJogar.classList.add("botão-ativado");
    $botaoJogar.textContent = "Parar";
  } else if (iniciarJogo == true) {
    iniciarJogo = false;
    $botaoJogar.classList.remove("botão-ativado");
    $botaoJogar.textContent = "Jogar";
  }
});

$botaoReiniciar.addEventListener("click", reiniciarJogo);

$switcherMd.addEventListener("click", function () {
  if(melhorDe5 == false){
    melhorDe5 = true
    $switcherMd.classList.toggle("ativo");
  }else{
    melhorDe5 = false
    $switcherMd.classList.remove("ativo");
  }
});

$switcherBot.addEventListener("click", function () {
  $switcherBot.classList.toggle("ativo");
  bot = !bot;
  botNome();
});
