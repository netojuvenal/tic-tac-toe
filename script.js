// ELEMENTOS DO DOM

const quadradoUm = document.getElementById("grade_quadrado-1");
const quadradoDois = document.getElementById("grade_quadrado-2");
const quadradoTres = document.getElementById("grade_quadrado-3");
const quadradoQuatro = document.getElementById("grade_quadrado-4");
const quadradoCinco = document.getElementById("grade_quadrado-5");
const quadradoSeis = document.getElementById("grade_quadrado-6");
const quadradoSete = document.getElementById("grade_quadrado-7");
const quadradoOito = document.getElementById("grade_quadrado-8");
const quadradoNove = document.getElementById("grade_quadrado-9");
const todosQuadrados = document.querySelectorAll(".quadrado");

const jogadorUmPontuacao = document.getElementById("info___jogador__pontos1");
const jogadorDoisPontuacao = document.getElementById("info___jogador__pontos2");

const infoTexto = document.getElementById("instrucoes__texto");
const comecarJogoBotao = document.getElementById("instrucoes__botao");

const modal = document.getElementById("modal");

// VARIÁVEIS

const jogadores = {
    jogadorUm: { nome: "João", ganhos: 0 },
    jogadorDois: { nome: "Maria", ganhos: 0 }
};

let movimento = 1;
let proximoJogador = jogadores.jogadorUm.nome;
let jogadorAnterior;
let imagemAtual = "cross";
let jogadorGanhou = false;

// CLIQUE NOS QUADRADOS

function adicionarCliqueQuadrado() {
    todosQuadrados.forEach((quadrado) => {
        quadrado.addEventListener("click", cliqueQuadrado);
    });
}

function removerCliqueQuadrado() {
    todosQuadrados.forEach((quadrado) => {
        quadrado.removeEventListener("click", cliqueQuadrado);
    });
}

function cliqueQuadrado() {
    if (!this.classList.contains("cross") && !this.classList.contains("circle")) {
        this.classList.add(imagemAtual);
        incrementarMovimento();
    }
}

// INCREMENTAR MOVIMENTO

function incrementarMovimento() {
    movimento += 1;
    
    if (movimento % 2 !== 0) {
        // Vez do jogador 1 (movimento ímpar)
        proximoJogador = jogadores.jogadorUm.nome;
        jogadorAnterior = jogadores.jogadorDois.nome;
        imagemAtual = "cross";
        infoTexto.innerHTML = `Vez de ${jogadores.jogadorUm.nome}`;
    } else {
        // Vez do jogador 2 (movimento par)
        proximoJogador = jogadores.jogadorDois.nome;
        jogadorAnterior = jogadores.jogadorUm.nome;
        imagemAtual = "circle";
        infoTexto.innerHTML = `Vez de ${jogadores.jogadorDois.nome}`;
    }
    
    verificarVencedor();
    verificarEmpate();
}

// VERIFICAR VENCEDOR

function verificarVencedor() {
    const linhas = [
        [quadradoUm, quadradoDois, quadradoTres],
        [quadradoQuatro, quadradoCinco, quadradoSeis],
        [quadradoSete, quadradoOito, quadradoNove],
        [quadradoUm, quadradoQuatro, quadradoSete],
        [quadradoDois, quadradoCinco, quadradoOito],
        [quadradoTres, quadradoSeis, quadradoNove],
        [quadradoUm, quadradoCinco, quadradoNove],
        [quadradoTres, quadradoCinco, quadradoSete]
    ];
    
    for (const linha of linhas) {
        const temCross = linha.every((quadrado) => quadrado.classList.contains("cross"));
        const temCircle = linha.every((quadrado) => quadrado.classList.contains("circle"));

        if (temCross || temCircle) {
            const vencedor = temCross ? jogadores.jogadorUm : jogadores.jogadorDois;
            vencedor.ganhos += 1;
            atualizarPontuacoes();
            jogadorVenceu();
            return;
        }
    }
}

function atualizarPontuacoes() {
    jogadorUmPontuacao.innerHTML = jogadores.jogadorUm.ganhos;
    jogadorDoisPontuacao.innerHTML = jogadores.jogadorDois.ganhos;
}

function jogadorVenceu() {
    infoTexto.innerHTML = `${jogadorAnterior} venceu!`;
    jogadorGanhou = true;
    continuarJogo();
}

// VERIFICAR EMPATE

function verificarEmpate() {
    const quadrados = [
        quadradoUm,
        quadradoDois,
        quadradoTres,
        quadradoQuatro,
        quadradoCinco,
        quadradoSeis,
        quadradoSete,
        quadradoOito,
        quadradoNove
    ];

    const todosPreenchidos = quadrados.every((quadrado) => {
        return (
            quadrado.classList.contains("cross") || quadrado.classList.contains("circle")
        );
    });
    
    if (todosPreenchidos && !jogadorGanhou) {
        infoTexto.innerHTML = "Empate!";
        continuarJogo();
    }
}

// CONTINUAR / REINICIAR / RESETAR JOGO

function continuarJogo() {
    removerCliqueQuadrado();

    setTimeout(() => {
        resetar();
    }, 2000);

}

function reiniciarJogo() {
    removerCliqueQuadrado();
    resetar();
}

function resetar() {
    todosQuadrados.forEach((quadrado) => {
        quadrado.classList = "quadrado";
    });
    adicionarCliqueQuadrado();
    jogadorGanhou = false;
    infoTexto.innerHTML = `Vez de ${proximoJogador} começar`;
}

// INICIAR JOGO

function iniciarJogo() {
    comecarJogoBotao.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const jogadorUmNomeInput = document.getElementById("jogador1").value.trim().toLowerCase();
        const jogadorDoisNomeInput = document.getElementById("jogador2").value.trim().toLowerCase();

        const jogadorUmNomeInputCap = jogadorUmNomeInput.charAt(0).toUpperCase() + jogadorUmNomeInput.slice(1);
        const jogadorDoisNomeInputCap = jogadorDoisNomeInput.charAt(0).toUpperCase() + jogadorDoisNomeInput.slice(1);

        jogadores.jogadorUm.nome = jogadorUmNomeInputCap;
        jogadores.jogadorDois.nome = jogadorDoisNomeInputCap;

        proximoJogador = jogadorUmNomeInputCap;

        document.getElementById("info__jogador_nome1").innerHTML = jogadores.jogadorUm.nome;
        document.getElementById("info__jogador_nome2").innerHTML = jogadores.jogadorDois.nome;

        jogadores.jogadorUm.ganhos = 0;
        jogadores.jogadorDois.ganhos = 0;
        atualizarPontuacoes();

        infoTexto.innerHTML = `Vez de ${proximoJogador} começar`;

        modal.style.display = "none";

        comecarJogoBotao.innerHTML = "Reiniciar Jogo";

        adicionarCliqueQuadrado();
        reiniciarJogo();
    });
}

iniciarJogo();