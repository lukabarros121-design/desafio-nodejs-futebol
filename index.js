// ==========================================
// MODELAGEM DE DADOS (Uso de Objetos)
// ==========================================

const times = [
    { nome: "Aliança FC", ataque: 80, defesa: 75, pontos: 0, golsMarcados: 0 },
    { nome: "União Paulista", ataque: 85, defesa: 70, pontos: 0, golsMarcados: 0 },
    { nome: "Sporting Recife", ataque: 78, defesa: 82, pontos: 0, golsMarcados: 0 },
    { nome: "Porto Digital", ataque: 88, defesa: 65, pontos: 0, golsMarcados: 0 }
];

// ==========================================
// FUNÇÕES DE LÓGICA (Responsabilidades Definidas)
// ==========================================

// Função que gera um número aleatório de gols baseado no poder de ataque e defesa
function calcularGols(ataqueTimeA, defesaTimeB) {
    const fatorAleatorio = Math.random() * 4; // 0 a 4
    const saldoForca = (ataqueTimeA - defesaTimeB) / 10;
    const totalGols = Math.max(0, Math.floor(fatorAleatorio + saldoForca));
    return totalGols;
}

// Função para simular uma partida entre dois objetos "time"
function simularPartida(timeCasa, timeVisitante) {
    const golsCasa = calcularGols(timeCasa.ataque, timeVisitante.defesa);
    const golsVisitante = calcularGols(timeVisitante.ataque, timeCasa.defesa);

    timeCasa.golsMarcados += golsCasa;
    timeVisitante.golsMarcados += golsVisitante;

    console.log(`🏟️  ${timeCasa.nome} ${golsCasa} x ${golsVisitante} ${timeVisitante.nome}`);

    // Distribuição de pontos de acordo com o resultado
    if (golsCasa > golsVisitante) {
        timeCasa.pontos += 3;
    } else if (golsVisitante > golsCasa) {
        timeVisitante.pontos += 3;
    } else {
        timeCasa.pontos += 1;
        timeVisitante.pontos += 1;
    }
}

// Função para rodar a rodada do campeonato (Desafio Extra: Todos jogam contra todos)
function executarCampeonato(listaTimes) {
    console.log("=== INÍCIO DO JOGOS ===");
    
    // Simulação simples de rodada (Turno Único)
    for (let i = 0; i < listaTimes.length; i++) {
        for (let j = i + 1; j < listaTimes.length; j++) {
            simularPartida(listaTimes[i], listaTimes[j]);
        }
    }
}

// Função para exibir a tabela de classificação organizada por pontos
function exibirTabela(listaTimes) {
    // Ordena os times: maior pontuação primeiro. Se empatar, usa gols marcados.
    const tabelaOrdenada = [...listaTimes].sort((a, b) => {
        if (b.pontos !== a.pontos) return b.pontos - a.pontos;
        return b.golsMarcados - a.golsMarcados;
    });

    console.log("\n🏆 TABELA DE CLASSIFICAÇÃO FINAL 🏆");
    console.log("-------------------------------------------");
    tabelaOrdenada.forEach((time, index) => {
        console.log(`${index + 1}º ${time.nome.padEnd(18)} | Pts: ${time.pontos} | Gols: ${time.golsMarcados}`);
    });
    console.log("-------------------------------------------");
    console.log(`🎉 CAMPEÃO: ${tabelaOrdenada[0].nome}! 🎉\n`);
}

// ==========================================
// EXECUÇÃO PRINCIPAL
// ==========================================
executarCampeonato(times);
exibirTabela(times);
