export type TopicItem = {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  incidencia: "alta" | "média" | "baixa";
};

export type ConteudoSubject = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  topics: TopicItem[];
};

export const CONTEUDO_SUBJECTS: ConteudoSubject[] = [
  {
    id: "portugues",
    name: "Língua Portuguesa",
    icon: "book",
    color: "#3B82F6",
    description: "Interpretação, gramática e redação para concursos",
    topics: [
      {
        id: "port-interpretacao",
        title: "Interpretação de Texto",
        incidencia: "alta",
        content:
          "A interpretação de texto é o tema mais cobrado em Língua Portuguesa nos concursos da PRF (banca CEBRASPE). O candidato deve identificar a ideia central do texto, inferências implícitas, o ponto de vista do autor e o significado de expressões no contexto.\n\nO CEBRASPE cobra questões do tipo 'certo ou errado', exigindo leitura precisa. Fique atento a palavras absolutas (sempre, nunca, todo, nenhum) que costumam tornar afirmativas incorretas.",
        keyPoints: [
          "Leia o texto por completo antes de responder",
          "Identifique a tese/ideia central do texto",
          "Atenção a inferências: o que o texto permite concluir, não afirma diretamente",
          "Palavras absolutas (sempre, nunca, todo) costumam estar erradas",
          "Distingua fatos de opiniões do autor",
          "Denotação vs. conotação de palavras no contexto",
        ],
      },
      {
        id: "port-coesao",
        title: "Coesão e Coerência Textual",
        incidencia: "alta",
        content:
          "Coesão é a articulação gramatical entre as partes do texto (conectivos, pronomes, elipses). Coerência é a lógica e unidade temática do texto.\n\nOs conectivos são os mais cobrados: adversativos (mas, porém, contudo, todavia), causais (porque, pois, já que), concessivos (embora, apesar de, ainda que), conclusivos (logo, portanto, assim), condicionais (se, caso, desde que) e temporais (quando, enquanto, depois que).",
        keyPoints: [
          "Adversativos: mas, porém, contudo, todavia, entretanto, no entanto",
          "Causais: porque, pois, já que, visto que, uma vez que",
          "Concessivos: embora, apesar de, conquanto, ainda que",
          "Conclusivos: logo, portanto, assim, por isso, então",
          "Condicionais: se, caso, desde que, contanto que",
          "Pronomes e elipses garantem a coesão referencial",
        ],
      },
      {
        id: "port-morfologia",
        title: "Classes de Palavras (Morfologia)",
        incidencia: "média",
        content:
          "As classes de palavras são 10: substantivo, adjetivo, artigo, numeral, pronome, verbo, advérbio, preposição, conjunção e interjeição. O CEBRASPE cobra principalmente o emprego e a classificação contextual dessas classes, especialmente pronomes, verbos e advérbios.",
        keyPoints: [
          "Pronomes relativos: que, quem, onde, cujo, qual — uso com antecedente",
          "Pronomes pessoais oblíquos: me, te, se, nos, lhe, o, a",
          "Emprego de 'onde' apenas com lugar; 'em que' para situações abstratas",
          "Advérbios de modo: terminados em -mente",
          "Preposições essenciais: a, ante, até, com, contra, de, desde, em, entre, para, por, sem, sob, sobre, trás",
          "Cuidado com a transitividade verbal para regência",
        ],
      },
      {
        id: "port-sintaxe",
        title: "Sintaxe: Concordância e Regência",
        incidencia: "alta",
        content:
          "Concordância verbal: o verbo concorda em número e pessoa com o sujeito. Concordância nominal: o adjetivo concorda em gênero e número com o substantivo. Regência verbal define a preposição que acompanha o verbo.\n\nPrincipais casos de concordância especial: sujeito composto, sujeito coletivo, pronomes relativos (que/quem), verbos impessoais (haver, fazer, ser) e numerais.",
        keyPoints: [
          "Verbo HAVER impessoal: não varia — 'Houve muitos acidentes'",
          "Verbo FAZER (tempo): não varia — 'Faz dois anos'",
          "Sujeito composto antes do verbo: plural",
          "Sujeito composto pós-verbal: pode concordar com o mais próximo",
          "Assistir (ver): exige 'a' — assisto ao filme",
          "Visar (almejar): exige 'a' — visa ao cargo; Visar (cheque): sem preposição",
          "Obedecer: exige 'a' — obedece às leis",
        ],
      },
      {
        id: "port-crase",
        title: "Crase",
        incidencia: "média",
        content:
          "A crase é a fusão da preposição 'a' com o artigo 'a' ou com o pronome demonstrativo 'a(s)'. Ocorre obrigatoriamente antes de palavras femininas que admitem artigo, após verbos que exigem preposição 'a'.\n\nNão há crase: antes de palavras masculinas, antes de verbos, antes de pronomes pessoais, antes de 'uma', antes de nomes de cidades que não admitem artigo (Brasília, Curitiba, Fortaleza).",
        keyPoints: [
          "OBRIGATÓRIA: 'Refiro-me à PRF' (prep. a + artigo a)",
          "OBRIGATÓRIA: horas determinadas — 'às 8h', 'à meia-noite'",
          "OBRIGATÓRIA: expressões femininas — 'à direita', 'à esquerda', 'às vezes'",
          "PROIBIDA antes de verbos: 'começou a trabalhar'",
          "PROIBIDA antes de pronomes: 'a ela', 'a você', 'a nós'",
          "Cidades sem artigo: 'Fui a Brasília' (sem crase)",
          "Teste: substitua por palavra masculina — se aparecer 'ao', há crase",
        ],
      },
      {
        id: "port-pontuacao",
        title: "Pontuação",
        incidencia: "média",
        content:
          "A vírgula é o sinal mais cobrado. Regras fundamentais: não se coloca vírgula entre sujeito e predicado, nem entre verbo e complemento direto. Usa-se vírgula para separar adjunto adverbial deslocado, aposto, vocativo, orações coordenadas, orações adverbiais antecipadas.",
        keyPoints: [
          "PROIBIDO separar sujeito do verbo com vírgula",
          "PROIBIDO separar verbo transitivo do seu objeto com vírgula",
          "Adjunto adverbial deslocado: separado por vírgula",
          "Aposto e vocativo: sempre entre vírgulas",
          "Orações coordenadas assindéticas: separadas por vírgula",
          "Oração adverbial anteposta à principal: seguida de vírgula",
          "Ponto e vírgula: separa itens de enumeração ou orações com vírgulas internas",
        ],
      },
    ],
  },
  {
    id: "raciocinio-logico",
    name: "Raciocínio Lógico",
    icon: "cpu",
    color: "#8B5CF6",
    description: "Lógica proposicional, probabilidade e raciocínio matemático",
    topics: [
      {
        id: "rl-proposicoes",
        title: "Proposições e Conectivos Lógicos",
        incidencia: "alta",
        content:
          "Uma proposição é uma sentença declarativa que pode ser verdadeira ou falsa. Não são proposições: frases interrogativas, imperativas, exclamativas, sentenças abertas (com variável) e paradoxos.\n\nConectivos lógicos: negação (¬), conjunção (∧ — E), disjunção (∨ — OU), condicional (→ — SE...ENTÃO) e bicondicional (↔ — SE E SOMENTE SE).",
        keyPoints: [
          "Conjunção (E): verdadeira apenas quando ambas são verdadeiras",
          "Disjunção (OU): falsa apenas quando ambas são falsas",
          "Condicional (→): falsa apenas quando antecedente V e consequente F",
          "Bicondicional (↔): verdadeira quando têm mesmo valor lógico",
          "Negação inverte o valor lógico da proposição",
          "Sentença interrogativa NÃO é proposição",
        ],
      },
      {
        id: "rl-negacao",
        title: "Negação e Equivalência Lógica",
        incidencia: "alta",
        content:
          "Negações das proposições compostas seguem leis de Morgan:\n• Neg(p ∧ q) = ¬p ∨ ¬q\n• Neg(p ∨ q) = ¬p ∧ ¬q\n• Neg(p → q) = p ∧ ¬q\n\nEquivalências importantes: a condicional p→q equivale a ¬p∨q, ¬q→¬p (contrapositiva). A contrapositiva tem o mesmo valor lógico da condicional.",
        keyPoints: [
          "Negação de E (∧): troca para OU e nega os dois",
          "Negação de OU (∨): troca para E e nega os dois",
          "Negação de SE...ENTÃO: mantém o antecedente e nega o consequente",
          "Contrapositiva de p→q é ¬q→¬p (equivalente)",
          "Negação de 'Todo A é B': 'Algum A não é B'",
          "Negação de 'Nenhum A é B': 'Algum A é B'",
        ],
      },
      {
        id: "rl-probabilidade",
        title: "Probabilidade",
        incidencia: "alta",
        content:
          "Probabilidade de um evento A: P(A) = número de casos favoráveis / número de casos possíveis.\n\nEventos mutuamente exclusivos: P(A ou B) = P(A) + P(B).\nEventos independentes: P(A e B) = P(A) × P(B).\nEventos dependentes: P(A e B) = P(A) × P(B|A).\nProbabilidade condicional: P(A|B) = P(A∩B) / P(B).",
        keyPoints: [
          "P(A) sempre entre 0 e 1",
          "P(A) + P(¬A) = 1 (complementar)",
          "Eventos exclusivos: P(A∪B) = P(A) + P(B)",
          "Eventos não exclusivos: P(A∪B) = P(A) + P(B) - P(A∩B)",
          "Eventos independentes: P(A∩B) = P(A) × P(B)",
          "O CEBRASPE costuma contextualizar com situações policiais",
        ],
      },
      {
        id: "rl-combinatoria",
        title: "Combinatória e Contagem",
        incidencia: "alta",
        content:
          "Princípio Multiplicativo: se uma escolha tem m opções e outra tem n, o total é m×n.\n\nPermutação simples (ordem importa, sem repetição): P(n) = n!\nArranjo (ordem importa, escolhendo r de n): A(n,r) = n!/(n-r)!\nCombinação (ordem não importa): C(n,r) = n! / [r! × (n-r)!]",
        keyPoints: [
          "Permutação: todos os elementos, ordem importa — P(n) = n!",
          "Arranjo: parte dos elementos, ordem importa — A(n,r)",
          "Combinação: parte dos elementos, ordem NÃO importa — C(n,r)",
          "C(n,r) = C(n, n-r) — propriedade da combinação",
          "Anagramas com letras repetidas: n! dividido pelo fatorial de cada repetição",
          "Princípio aditivo: para eventos mutuamente exclusivos, some as quantidades",
        ],
      },
      {
        id: "rl-raciocinio-sequencias",
        title: "Sequências e Progressões",
        incidencia: "média",
        content:
          "PA (Progressão Aritmética): diferença constante entre termos consecutivos.\nTermo geral: an = a1 + (n-1)d\nSoma dos termos: Sn = n(a1+an)/2\n\nPG (Progressão Geométrica): razão constante entre termos consecutivos.\nTermo geral: an = a1 × q^(n-1)\nSoma de PA finita: Sn = a1(q^n - 1)/(q-1)",
        keyPoints: [
          "PA: diferença entre termos consecutivos é constante (razão r)",
          "Termo geral PA: an = a1 + (n-1)d",
          "Soma PA: Sn = n × (a1 + an) / 2",
          "PG: quociente entre termos consecutivos é constante (razão q)",
          "Termo geral PG: an = a1 × q^(n-1)",
          "Em sequências figurais, identifique o padrão visual ou numérico",
        ],
      },
    ],
  },
  {
    id: "legislacao-transito",
    name: "Legislação de Trânsito",
    icon: "navigation",
    color: "#EF4444",
    description: "CTB, infrações, crimes de trânsito e Resoluções CONTRAN",
    topics: [
      {
        id: "ctb-snf",
        title: "Sistema Nacional de Trânsito (SNT)",
        incidencia: "alta",
        content:
          "O SNT é o conjunto de órgãos e entidades da União, dos Estados, do DF e dos Municípios com atribuições no trânsito. Órgão máximo: CONTRAN (Conselho Nacional de Trânsito). Órgão executivo de trânsito da União: SENATRAN/DENATRAN. PRF: órgão executivo rodoviário federal.\n\nCompetências da PRF: patrulhamento ostensivo, fiscalização de trânsito nas rodovias federais, atendimento de acidentes.",
        keyPoints: [
          "CONTRAN: normatiza, coordena e fiscaliza o SNT",
          "SENATRAN: executa a política nacional de trânsito",
          "DETRAN: órgão executivo de trânsito dos Estados",
          "PRF: fiscalização nas RODOVIAS FEDERAIS",
          "PM: fiscalização em vias estaduais e municipais (quando delegada)",
          "Municípios: trânsito urbano (quando constituído órgão próprio)",
        ],
      },
      {
        id: "ctb-circulacao",
        title: "Circulação, Via e Sinalização",
        incidencia: "alta",
        content:
          "Conceitos fundamentais do CTB: Via pública é a área de domínio público para circulação. Rodovia: via rural com pista, acostamento e faixa de domínio. Estrada: via rural sem as especificações de rodovia.\n\nSinalização: prevalência — vertical (regulamentação) > horizontal > dispositivos auxiliares. Sinalização do agente prevalece sobre equipamentos e sinalização.",
        keyPoints: [
          "Hierarquia da sinalização: agente > semáforo > sinalização vertical > horizontal",
          "Rodovia: via rural pavimentada com pista, acostamento e faixa de domínio",
          "Estrada: via rural (não pavimentada ou sem as especificações de rodovia)",
          "Via preferencial: indicada por sinalização especifica",
          "Velocidade máxima em rodovias federais: 110 km/h (automóveis)",
          "Velocidade mínima: metade da velocidade máxima permitida",
        ],
      },
      {
        id: "ctb-infracoes",
        title: "Infrações e Penalidades",
        incidencia: "alta",
        content:
          "Infrações classificam-se por gravidade: gravíssima (7 pontos), grave (5 pontos), média (4 pontos) e leve (3 pontos). A pontuação acumula na CNH. O condutor que acumular 20 ou mais pontos em 12 meses tem a CNH suspensa.\n\nInfrações gravíssimas com multa multiplicada: ultrapassar sinal vermelho (x3), dirigir sob efeito de álcool (x3), disputar racha (x7), usar celular ao dirigir (x3), não usar cinto de segurança.",
        keyPoints: [
          "Gravíssima: 7 pontos; Grave: 5; Média: 4; Leve: 3",
          "Suspensão de CNH: 20+ pontos em 12 meses",
          "Dirigir embriagado (art. 165): gravíssima, multa x10, suspensão de 12 meses",
          "Racha (art. 308): crime + infração gravíssima (multa x7)",
          "Ultrapassar sinal vermelho: gravíssima, multa x3",
          "Celular ao volante: gravíssima, multa x3",
          "Não usar cinto: gravíssima (motorista e passageiros)",
        ],
      },
      {
        id: "ctb-crimes",
        title: "Crimes de Trânsito (Arts. 302 a 312)",
        incidencia: "alta",
        content:
          "O CTB prevê crimes no capítulo XIX (arts. 302-312). Principais crimes:\n• Homicídio culposo (art. 302): 2 a 4 anos de detenção\n• Lesão corporal culposa (art. 303): 6 meses a 2 anos\n• Embriaguez ao volante (art. 306): 6 meses a 3 anos\n• Racha/Pelotão (art. 308): 1 a 3 anos / 3 a 6 anos (se resultado lesão/morte)\n• Fuga do local do acidente (art. 305): 6 meses a 1 ano",
        keyPoints: [
          "Art. 302: homicídio culposo — 2 a 4 anos (causas de aumento: embriaguez, racha, excesso de velocidade)",
          "Art. 303: lesão corporal culposa — 6 meses a 2 anos",
          "Art. 306: embriaguez ao volante — 6 meses a 3 anos (0,3 mg/L ar alveolar)",
          "Art. 308: racha sem resultado — 1 a 3 anos; com lesão grave — 3 a 6 anos; com morte — 5 a 10 anos",
          "Art. 305: fuga do local — 6 meses a 1 ano + suspensão",
          "Ação penal pública incondicionada para todos os crimes de trânsito",
        ],
      },
      {
        id: "ctb-habilitacao",
        title: "Habilitação de Condutores (CNH)",
        incidencia: "média",
        content:
          "Categorias da CNH: A (moto), B (carro), C (veículo de carga), D (passageiros 9+), E (combinações). Requisitos para primeira habilitação: 18 anos (B), exames médico, psicológico, teórico e prático.\n\nPermissão para Dirigir (PPD): 1 ano. Após 1 ano sem infração grave/gravíssima ou reincidência em média: converte em CNH definitiva.",
        keyPoints: [
          "Categoria A: motocicletas (18 anos)",
          "Categoria B: automóveis até 3.500 kg (18 anos)",
          "Categoria C: veículos de carga acima de 3.500 kg (21 anos, ter B há 1 ano)",
          "Categoria D: passageiros (mais de 8 passageiros) — 21 anos, ter B ou C há 1 ano",
          "Categoria E: combinações de veículos — ter C ou D há 1 ano",
          "PPD: 1 ano; sem infração grave → converte em CNH",
          "Validade da CNH: 10 anos (até 50 anos), 5 anos (50-70), 3 anos (acima de 70)",
        ],
      },
      {
        id: "ctb-alcool",
        title: "Álcool e Direção",
        incidencia: "alta",
        content:
          "O Brasil adota tolerância zero ao álcool. A fiscalização é feita por etilômetro (bafômetro) ou exame de sangue. Recusar o teste: infração gravíssima.\n\nLimites: infração administrativa: 0,05 mg/L de ar alveolar ou 0,1 g/dL de sangue. Crime (art. 306): igual ou superior a 0,3 mg/L de ar alveolar ou 0,6 g/dL de sangue.",
        keyPoints: [
          "Tolerância ZERO: qualquer concentração já pode gerar infração",
          "Infração administrativa: 0,05 mg/L ar alveolar (ou sinais de alteração)",
          "CRIME (art. 306): ≥ 0,3 mg/L ar alveolar ou ≥ 0,6 g/dL sangue",
          "Recusar bafômetro: infração gravíssima + suspensão CNH",
          "MP 1.327/2025: atualiza penalidades — suspenção de 12 meses e 10 multas",
          "Motorista profissional: mesmos limites, mas perda da CNH por 12 meses",
        ],
      },
    ],
  },
  {
    id: "fisica",
    name: "Física Aplicada ao Trânsito",
    icon: "zap",
    color: "#F59E0B",
    description: "Cinemática, dinâmica e física de acidentes de trânsito",
    topics: [
      {
        id: "fis-cinematica",
        title: "Cinemática: Conceitos Básicos",
        incidencia: "alta",
        content:
          "Grandezas fundamentais:\n• Posição (x): onde o objeto está\n• Deslocamento (Δx): variação da posição\n• Velocidade média: vm = Δx/Δt\n• Aceleração média: am = Δv/Δt\n\nMRU (Movimento Retilíneo Uniforme): velocidade constante, aceleração nula.\n• Equação horária: x = x₀ + v·t",
        keyPoints: [
          "Velocidade média: vm = Δx/Δt (não é média aritmética das velocidades)",
          "MRU: v constante, a = 0; x = x₀ + v·t",
          "Conversão: 1 m/s = 3,6 km/h → divida por 3,6",
          "Conversão: 1 km/h = 1/3,6 m/s → divida por 3,6 ou multiplique por 5/18",
          "Espaço percorrido em MRU = área sob o gráfico v × t",
          "Gráfico x × t do MRU: reta com inclinação = velocidade",
        ],
      },
      {
        id: "fis-mruv",
        title: "MRUV e Frenagem",
        incidencia: "alta",
        content:
          "MRUV: aceleração constante, velocidade varia linearmente.\n• v = v₀ + a·t\n• x = x₀ + v₀t + ½a·t²\n• v² = v₀² + 2a·Δx (Torricelli)\n\nFrenagem: o veículo desacelera (a negativa). A distância de frenagem depende do quadrado da velocidade. Dobrar a velocidade quadruplica a distância de frenagem.",
        keyPoints: [
          "MRUV: a = constante ≠ 0",
          "Equação de Torricelli: v² = v₀² + 2·a·Δx (não tem tempo)",
          "Frenagem: a < 0 (desaceleração)",
          "Distância de frenagem ∝ v² (quadruplica ao dobrar velocidade)",
          "Distância total = distância de reação + distância de frenagem",
          "Tempo de reação médio humano: 0,7s a 1,5s",
        ],
      },
      {
        id: "fis-reacao-frenagem",
        title: "Tempo de Reação e Distância de Parada",
        incidencia: "alta",
        content:
          "Distância total de parada = distância de reação + distância de frenagem.\n\n• Distância de reação: d_r = v × t_r (MRU durante o tempo de reação)\n• Distância de frenagem: d_f = v²/(2·a) ou usando Torricelli\n\nFatores que aumentam o tempo de reação: álcool, cansaço, uso de celular, idade avançada.",
        keyPoints: [
          "Distância de reação: dr = v × tr (v em m/s, tr em segundos)",
          "A 60 km/h (≈16,7 m/s) e tr=1s: dr ≈ 16,7 m apenas para reagir",
          "Distância de frenagem: df = v²/(2μg)",
          "Distância de parada = dr + df",
          "Álcool, celular e cansaço aumentam o tempo de reação",
          "Piso molhado reduz o coeficiente de atrito → maior distância de frenagem",
        ],
      },
      {
        id: "fis-energia-colisao",
        title: "Energia Cinética e Colisões",
        incidencia: "média",
        content:
          "Energia Cinética: Ec = ½mv²\n\nSe a velocidade dobra, a Ec quadruplica. Isso explica por que impactos em velocidades maiores são muito mais destrutivos.\n\nConservação da energia: em colisões, a energia cinética se transforma em deformação, calor e som. Em colisões perfeitamente elásticas, a energia cinética se conserva (não ocorre com veículos reais).",
        keyPoints: [
          "Ec = ½mv² → dobrar v: Ec multiplica por 4",
          "Impulso: I = F·Δt = m·Δv (variação da quantidade de movimento)",
          "Colisão perfeitamente inelástica: os corpos ficam juntos após o choque",
          "Conservação do momento linear: m₁v₁ + m₂v₂ = (m₁+m₂)·vf",
          "Triângulo de segurança: afastar-se 30m (pista) e 100m (rodovia)",
          "Impacto a 60 km/h equivale a cair de um prédio de ~7 andares",
        ],
      },
      {
        id: "fis-forcas",
        title: "Leis de Newton Aplicadas",
        incidencia: "média",
        content:
          "1ª Lei (Inércia): o corpo em repouso ou MRU permanece assim se a força resultante for nula. Explica por que passageiros sem cinto são lançados para frente em frenagem brusca.\n\n2ª Lei (F = ma): a aceleração é proporcional à força e inversamente proporcional à massa.\n\n3ª Lei (Ação e Reação): para cada ação há uma reação de mesma intensidade e direção, sentido oposto.",
        keyPoints: [
          "1ª Lei: inércia — passageiro sem cinto continua em movimento na frenagem",
          "2ª Lei: F = m·a → maior massa exige maior força para mesma aceleração",
          "3ª Lei: ação-reação — os dois veículos exercem força igual em colisão",
          "Força de atrito: Fat = μ × N (μ = coeficiente; N = força normal)",
          "Atrito estático > atrito cinético",
          "Peso: P = m·g (g ≈ 10 m/s² nas provas)",
        ],
      },
    ],
  },
  {
    id: "dir-administrativo",
    name: "Direito Administrativo",
    icon: "briefcase",
    color: "#10B981",
    description: "Princípios, atos, licitações e responsabilidade do Estado",
    topics: [
      {
        id: "da-principios",
        title: "Princípios da Administração Pública",
        incidencia: "alta",
        content:
          "Princípios expressos na CF/88 (art. 37): LIMPE — Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.\n\n• Legalidade: a Adm. só pode fazer o que a lei autoriza (diferente do particular, que pode fazer tudo que a lei não proíbe)\n• Impessoalidade: vedado uso do cargo para promoção pessoal\n• Moralidade: ética e boa-fé\n• Publicidade: transparência (sigilo é exceção)\n• Eficiência: melhor resultado com menor custo",
        keyPoints: [
          "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência",
          "Legalidade: Adm. só faz o que lei permite; particular faz o que lei não proíbe",
          "Impessoalidade: veda promoção pessoal em atos oficiais",
          "Eficiência foi acrescentado pela EC 19/1998",
          "Princípio da Supremacia do Interesse Público: implícito na CF",
          "Princípio da Autotutela: Adm. pode revogar/anular seus próprios atos",
          "Razoabilidade e Proporcionalidade: princípios implícitos cobrados pelo CEBRASPE",
        ],
      },
      {
        id: "da-atos",
        title: "Atos Administrativos",
        incidencia: "alta",
        content:
          "Elementos (requisitos de validade) do ato administrativo: Competência, Finalidade, Forma, Motivo e Objeto (COMFIMO).\n\nAtributos: presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade.\n\nExtinção: revogação (mérito, ato válido, efeitos ex nunc — para frente) e anulação (ilegalidade, efeitos ex tunc — retroativos).",
        keyPoints: [
          "Elementos: Competência, Finalidade, Forma, Motivo, Objeto",
          "Revogação: ato VÁLIDO por razões de conveniência/oportunidade (ex nunc)",
          "Anulação: ato INVÁLIDO por ilegalidade (ex tunc — desfaz efeitos)",
          "Presunção de legitimidade: o ato é presumido legal até prova em contrário",
          "Imperatividade: impõe obrigações independente da concordância",
          "Autoexecutoriedade: Adm. executa sem precisar do Judiciário (nem sempre)",
          "Vinculados × Discricionários: vinculado não tem margem; discricionário tem",
        ],
      },
      {
        id: "da-licitacao",
        title: "Licitações (Lei 14.133/2021)",
        incidencia: "alta",
        content:
          "A Nova Lei de Licitações (Lei 14.133/2021) substituiu a Lei 8.666/93. Modalidades: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo.\n\nDispensa de licitação: contratações abaixo dos limites (R$ 50.000 para obras; R$ 100.000 para serviços — art. 75). Inexigibilidade: inviabilidade de competição (fornecedor exclusivo, serviço técnico singular, artista consagrado).",
        keyPoints: [
          "Lei 14.133/2021: substituiu a 8.666/93 e demais normas",
          "Modalidades: Pregão (mais usado), Concorrência, Concurso, Leilão, Diálogo Competitivo",
          "Pregão: sempre para bens/serviços comuns; eletrônico como regra",
          "Dispensa por valor: obras ≤ R$100k (art. 75, I); outros ≤ R$50k",
          "Inexigibilidade: inviabilidade de competição (fornecedor exclusivo, artista)",
          "Contratação direta: dispensa + inexigibilidade",
          "Improbidade administrativa se houver irregularidade grave em licitação",
        ],
      },
      {
        id: "da-agentes",
        title: "Agentes Públicos e Servidores",
        incidencia: "média",
        content:
          "Agentes públicos: gênero que engloba todos que exercem função pública. Espécies: agentes políticos, servidores públicos (estatutários e celetistas), temporários e particulares colaboradores.\n\nRégime Jurídico Único (RJU): servidores federais regidos pela Lei 8.112/90. Cargo em comissão: livre nomeação e exoneração (ad nutum). Cargo efetivo: exige concurso público.",
        keyPoints: [
          "Concurso público: exigido para cargo efetivo e emprego público",
          "Cargo em comissão: livre nomeação — não exige concurso",
          "Estabilidade: 3 anos no cargo efetivo (EC 19/98) + avaliação especial",
          "Demissão de servidor estável: processo administrativo ou judicial",
          "Acumulação de cargos: regra proibitiva; exceções = profissionais de saúde + magistério",
          "Subsídio: remuneração em parcela única (vedados adicionais — agentes políticos)",
        ],
      },
      {
        id: "da-responsabilidade",
        title: "Responsabilidade Civil do Estado",
        incidencia: "alta",
        content:
          "Teoria adotada no Brasil: responsabilidade objetiva (independe de culpa ou dolo) — art. 37, §6º da CF. Elementos: conduta administrativa, dano e nexo causal.\n\nExcludentes: caso fortuito/força maior, culpa exclusiva da vítima, culpa de terceiro. Para o AGENTE que causou o dano: responsabilidade subjetiva (só responde se houver dolo ou culpa).",
        keyPoints: [
          "Estado: responsabilidade OBJETIVA (prescinde de dolo ou culpa)",
          "Fundamento: teoria do risco administrativo (art. 37, §6º CF)",
          "Elementos: conduta (ação ou omissão), dano e nexo causal",
          "Excludentes: caso fortuito, força maior, culpa exclusiva da vítima",
          "Agente: responsabilidade subjetiva (dolo ou culpa) — ação de regresso",
          "Omissão do Estado: STF — responsabilidade subjetiva (necessita culpa)",
          "Prescrição: 5 anos para ações contra o Estado",
        ],
      },
      {
        id: "da-improbidade",
        title: "Improbidade Administrativa (Lei 8.429/92 c/ Lei 14.230/2021)",
        incidencia: "alta",
        content:
          "A Lei 14.230/2021 reformou a Lei de Improbidade. Atualmente exige-se dolo (não mais culpa) para qualquer ato de improbidade. Os atos de improbidade são:\n• Enriquecimento ilícito (art. 9): pena mais grave\n• Dano ao erário (art. 10): requer dolo\n• Violação de princípios (art. 11): requer dolo específico",
        keyPoints: [
          "Após a Lei 14.230/2021: APENAS dolo configura improbidade (culpa não basta)",
          "Enriquecimento ilícito (art. 9): mais grave — suspensão de direitos por 14 anos",
          "Dano ao erário (art. 10): exige dolo + efetivo dano",
          "Violação de princípios (art. 11): dolo + lesividade ao erário ou à sociedade",
          "Prescrição: 8 anos a partir do término do exercício de cargo",
          "Legitimidade ativa: apenas o MP (cidadão perdeu a legitimidade)",
        ],
      },
    ],
  },
  {
    id: "dir-constitucional",
    name: "Direito Constitucional",
    icon: "shield",
    color: "#6366F1",
    description: "CF/88, direitos fundamentais e organização do Estado",
    topics: [
      {
        id: "dc-principios",
        title: "Princípios Fundamentais (Arts. 1º a 4º)",
        incidencia: "alta",
        content:
          "Art. 1º — Fundamentos da República: Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e da livre iniciativa, e Pluralismo político (SCDVP).\n\nArt. 2º — Poderes: Legislativo, Executivo e Judiciário (independentes e harmônicos).\n\nArt. 3º — Objetivos: construir sociedade livre, justa e solidária; desenvolvimento nacional; erradicar a pobreza; promover o bem de todos sem discriminações.\n\nArt. 4º — Relações internacionais: soberania, autodeterminação, não-intervenção, igualdade entre Estados, defesa da paz.",
        keyPoints: [
          "Fundamentos (art. 1): SCDVP — Soberania, Cidadania, Dignidade, Valores sociais, Pluralismo",
          "Objetivos (art. 3): erradicar pobreza, construir sociedade justa, reduzir desigualdades",
          "Separação dos Poderes (art. 2): independentes e harmônicos entre si",
          "Forma de governo: República; Forma de Estado: Federação",
          "Regime de governo: Presidencialismo",
          "Art. 4: prevalência dos direitos humanos nas relações internacionais",
        ],
      },
      {
        id: "dc-direitos",
        title: "Direitos e Garantias Fundamentais (Arts. 5º a 17)",
        incidencia: "alta",
        content:
          "O art. 5º consagra os direitos individuais e coletivos. São autoaplicáveis (aplicação imediata). Características: universalidade, inalienabilidade, imprescritibilidade, irrenunciabilidade.\n\nDireitos sociais (art. 6º): educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância, assistência aos desamparados.",
        keyPoints: [
          "Art. 5°: igualdade, liberdade, vida, segurança e propriedade",
          "Direitos fundamentais: cláusula pétrea — não podem ser abolidos",
          "Remédios constitucionais: HC (liberdade de locomoção), MS (direito líquido e certo), MI (omissão legislativa), HD (informações pessoais), AP (atos lesivos ao patrimônio público)",
          "HC preventivo: salvo-conduto (ameaça à liberdade)",
          "HC liberatório: habeas corpus já preso ilegalmente",
          "Mandado de segurança: prazo de 120 dias do ato coator",
        ],
      },
      {
        id: "dc-remedios",
        title: "Remédios Constitucionais",
        incidencia: "alta",
        content:
          "Habeas Corpus (HC): liberdade de locomoção ameaçada ou violada. Cabível contra ato de particular também.\n\nMandado de Segurança (MS): direito líquido e certo, não amparado por HC ou HD, contra autoridade pública. Prazo: 120 dias.\n\nMandado de Injunção (MI): falta de norma regulamentadora que torne inviável exercício de direito constitucional.\n\nHabeas Data (HD): acesso ou retificação de informações pessoais em banco de dados governamental.\n\nAção Popular (AP): ato lesivo ao patrimônio público, à moralidade, ao meio ambiente ou ao patrimônio histórico-cultural.",
        keyPoints: [
          "HC: liberdade de locomoção; gratuito; qualquer pessoa pode impetrar",
          "MS individual: prazo de 120 dias do ato coator",
          "MS coletivo: partido, sindicato ou associação (em defesa de membros)",
          "MI: norma constitucional sem regulamentação que impeça exercício de direito",
          "HD: só para informações sobre o próprio impetrante",
          "AP: qualquer cidadão (no gozo dos direitos políticos) contra ato lesivo ao erário",
        ],
      },
      {
        id: "dc-segpublica",
        title: "Segurança Pública (Art. 144)",
        incidencia: "alta",
        content:
          "Art. 144 CF/88 — Órgãos de segurança pública:\n• Polícia Federal\n• Polícia Rodoviária Federal\n• Polícia Ferroviária Federal\n• Polícias Civis\n• Polícias Militares e Corpos de Bombeiros\n• Polícias Penais\n\nPRF: patrulhamento ostensivo das rodovias federais.",
        keyPoints: [
          "PRF: patrulhamento ostensivo das RODOVIAS FEDERAIS",
          "PF: crimes de repercussão interestadual/internacional, tráfico, apuração de infrações contra a União",
          "PM: polícia ostensiva e preservação da ordem pública nos Estados",
          "PC: polícia judiciária dos Estados (exceto militares)",
          "Polícia Penal: custódia de presos (EC 104/2019)",
          "PRF e PF: subordinadas ao Ministério da Justiça e Segurança Pública",
        ],
      },
      {
        id: "dc-controle",
        title: "Controle de Constitucionalidade",
        incidencia: "média",
        content:
          "Controle preventivo: feito antes de a norma entrar em vigor (Comissão de Constituição e Justiça — CCJ, veto presidencial). Controle repressivo: após a norma entrar em vigor — pode ser difuso (qualquer juízo, efeitos inter partes) ou concentrado (STF, efeitos erga omnes).\n\nAções no STF: ADI (ação direta de inconstitucionalidade), ADC (ação declaratória de constitucionalidade), ADPF (arguição de descumprimento de preceito fundamental).",
        keyPoints: [
          "Controle difuso: qualquer juiz pode declarar inconstitucionalidade (efeitos inter partes)",
          "Controle concentrado: STF — efeitos erga omnes e vinculantes",
          "ADI: questionar constitucionalidade de lei ou ato normativo federal/estadual",
          "ADC: confirmar constitucionalidade de lei federal",
          "ADPF: descumprimento de preceito fundamental (subsidiária)",
          "Cláusulas pétreas: não podem ser abolidas nem por PEC",
        ],
      },
    ],
  },
  {
    id: "dir-penal",
    name: "Direito Penal",
    icon: "alert-triangle",
    color: "#DC2626",
    description: "Teoria do crime, aplicação da pena e crimes em espécie",
    topics: [
      {
        id: "dp-teoria-crime",
        title: "Teoria do Crime",
        incidencia: "alta",
        content:
          "Crime: fato típico, ilícito (antijurídico) e culpável. Analítico (tripartido).\n\nFato típico: conduta, resultado, nexo causal e tipicidade.\nIlicitude: ausência de causas excludentes (legítima defesa, estado de necessidade, estrito cumprimento do dever legal, exercício regular do direito).\nCulpabilidade: imputabilidade, potencial consciência da ilicitude, exigibilidade de conduta diversa.",
        keyPoints: [
          "Crime: FATO TÍPICO + ILÍCITO + CULPÁVEL",
          "Excludentes de ilicitude: legítima defesa, estado de necessidade, estrito cumprimento do dever, exercício regular do direito",
          "Legítima defesa: moderação + repelir injusta agressão + atual/iminente",
          "Estado de necessidade: sacrificar bem menor para salvar bem maior",
          "Excludentes de culpabilidade: inimputabilidade, erro de proibição inevitável, coação moral irresistível",
          "Inimputável: menor de 18 anos e doente mental (sem discernimento)",
        ],
      },
      {
        id: "dp-iter",
        title: "Iter Criminis e Tentativa",
        incidencia: "média",
        content:
          "Iter criminis: caminho do crime. Fases: cogitação (impunível) → preparação (regra: impunível) → execução (punível) → consumação.\n\nTentativa (art. 14, II): iniciou a execução, não consumou por circunstâncias alheias à vontade. Punição: pena reduzida de 1/3 a 2/3.\n\nDesistência voluntária e arrependimento eficaz: o agente abandona/impede voluntariamente — responde pelos atos já praticados (ponte de ouro).",
        keyPoints: [
          "Cogitação e preparação: regra geral — não puníveis",
          "Execução: fase punível (tentativa)",
          "Tentativa: iniciou, não consumou por circunstância alheia à vontade do agente",
          "Redução de pena na tentativa: 1/3 a 2/3 (quanto mais próximo da consumação, menor a redução)",
          "Crimes que não admitem tentativa: culposos, preterdolosos, omissivos próprios, contravenções",
          "Arrependimento eficaz: impede o resultado → responde pelos atos praticados",
        ],
      },
      {
        id: "dp-crimes-especie",
        title: "Crimes Contra a Pessoa e o Patrimônio",
        incidencia: "alta",
        content:
          "Homicídio doloso simples (art. 121): 6 a 20 anos. Qualificado: 12 a 30 anos (motivo torpe, meio cruel, emboscada, feminicídio). Culposo: 1 a 3 anos.\n\nFurto (art. 155): 1 a 4 anos. Qualificado (noturno, destruição, escalada, chave falsa, concurso): 2 a 8 anos.\nRoubo (art. 157): 4 a 10 anos (violência ou grave ameaça). Latrocínio (morte): 20 a 30 anos (crime hediondo).",
        keyPoints: [
          "Homicídio doloso simples: 6 a 20 anos de reclusão",
          "Homicídio qualificado: 12 a 30 anos (crime hediondo)",
          "Feminicídio: qualificadora do homicídio — razões de condição do sexo feminino",
          "Furto simples: 1 a 4 anos; qualificado: 2 a 8 anos",
          "Roubo: 4 a 10 anos (violência ou grave ameaça)",
          "Latrocínio (art. 157 §3º): 20 a 30 anos — crime hediondo; competência: JÚRI não julga",
          "Extorsão mediante sequestro com morte: crime hediondo, 24 a 30 anos",
        ],
      },
      {
        id: "dp-crimes-adm",
        title: "Crimes Contra a Administração Pública",
        incidencia: "alta",
        content:
          "Peculato (art. 312): apropriar-se de bem pertencente ao erário. Peculato doloso: 2 a 12 anos. Peculato culposo: 3 meses a 1 ano.\n\nCorrupção passiva (art. 317): servidor solicita/recebe vantagem indevida — 2 a 12 anos.\nCorrupção ativa (art. 333): oferecer/prometer vantagem ao servidor — 2 a 12 anos.\nPrevaricação (art. 319): retardar/deixar de praticar ato de ofício por interesse pessoal — 3 meses a 1 ano.",
        keyPoints: [
          "Peculato-apropriação: funcionário se apropria de bem que tem posse — 2 a 12 anos",
          "Peculato-furto: subtrai bem (sem posse) — mesma pena",
          "Peculato culposo: 3 meses a 1 ano; reparação antes da denúncia: extinção da punibilidade",
          "Corrupção passiva: servidor solicita/recebe — 2 a 12 anos",
          "Corrupção ativa: particular oferece/promete — 2 a 12 anos",
          "Prevaricação: retarda/omite ato de ofício por interesse — 3 meses a 1 ano",
          "Abuso de autoridade (Lei 13.869/2019): dolo específico de prejudicar + ato que não seria praticado",
        ],
      },
      {
        id: "dp-hediondos",
        title: "Crimes Hediondos (Lei 8.072/90)",
        incidencia: "alta",
        content:
          "Crimes hediondos: homicídio qualificado, latrocínio, extorsão mediante sequestro (com resultado morte), estupro, estupro de vulnerável, epidemia com resultado morte, genocídio, posse/porte ilegal de arma de uso restrito, comércio ilegal de armas, favorecimento da prostituição de menor.\n\nEfeitos: insuscetíveis de anistia, graça e indulto; a liberdade provisória é possível; prisão inicialmente em regime fechado (STF: inconstitucional a vedação absoluta — analisa-se caso a caso).",
        keyPoints: [
          "Hediondos: homicídio qualificado, latrocínio, estupro, extorsão c/ morte, entre outros",
          "Vedados: anistia, graça e indulto",
          "Progressão de regime: 40% (réu primário) e 60% (reincidente) da pena",
          "Tráfico de drogas: equiparado a hediondo (não é hediondo, mas tem mesmo tratamento)",
          "Tortura e terrorismo: também equiparados",
          "Livramento condicional em hediondos: cumpridos 2/3 da pena (não reincidente)",
        ],
      },
    ],
  },
  {
    id: "dir-processual-penal",
    name: "Direito Processual Penal",
    icon: "file-text",
    color: "#7C3AED",
    description: "Inquérito policial, provas, prisões e processo penal",
    topics: [
      {
        id: "dpp-inquerito",
        title: "Inquérito Policial",
        incidencia: "alta",
        content:
          "Inquérito policial (IP): procedimento administrativo presidido pelo delegado de polícia, destinado a apurar a autoria e materialidade do delito.\n\nCaracterísticas: inquisitório (não há contraditório pleno), sigiloso, escrito, indisponível (o delegado não pode arquivar), dispensável (pode haver denúncia sem IP).\n\nPrazo: indiciado solto — 30 dias (prorrogável); indiciado preso — 10 dias.",
        keyPoints: [
          "IP: procedimento ADMINISTRATIVO — não é processo judicial",
          "Presidido pelo Delegado de Polícia",
          "Natureza inquisitória: não há contraditório e ampla defesa plenos",
          "Prazo para conclusão: preso — 10 dias; solto — 30 dias (prorrogável)",
          "Arquivamento: só o juiz pode arquivar, mediante pedido do MP",
          "IP é dispensável: MP pode oferecer denúncia com outros elementos",
          "Notitia criminis: comunicação da infração penal à polícia",
        ],
      },
      {
        id: "dpp-provas",
        title: "Provas no Processo Penal",
        incidencia: "alta",
        content:
          "Princípios probatórios: livre convencimento motivado (juiz forma sua convicção livremente, mas fundamentado), in dubio pro reo (na dúvida, absolve-se), e vedação de provas ilícitas.\n\nProvas ilícitas: obtidas em violação às normas constitucionais ou legais. São inadmissíveis (art. 5º, LVI CF). Teoria dos frutos da árvore envenenada: a prova derivada de ilícita também é ilícita.",
        keyPoints: [
          "In dubio pro reo: dúvida → absolvição (na instrução); in dubio pro societate → pronúncia",
          "Provas ilícitas: inadmissíveis — art. 5º, LVI, CF",
          "Frutos da árvore envenenada: prova derivada de ilícita também é ilícita",
          "Prova emprestada: produzida em outro processo, submetida ao contraditório",
          "Confissão: valor probatório relativo — não é rainha das provas",
          "Cadeia de custódia: conjunto de medidas para preservar a integridade da prova",
          "Interceptação telefônica: exige autorização judicial, prazo de 15 dias (renovável)",
        ],
      },
      {
        id: "dpp-prisoes",
        title: "Prisões e Medidas Cautelares",
        incidencia: "alta",
        content:
          "Espécies de prisão processual:\n• Prisão em flagrante: próprio, impróprio, presumido ou ficto (art. 302 CPP)\n• Prisão preventiva: garantia da ordem pública, econômica, conveniência da instrução, assegurar a aplicação da lei penal\n• Prisão temporária (Lei 7.960/89): 5 dias (prorrogável mais 5); hediondos: 30 dias (+ 30)\n\nMedidas cautelares alternativas (art. 319): comparecimento periódico, proibição de ausentar-se, monitoração eletrônica, entre outras.",
        keyPoints: [
          "Flagrante próprio: preso cometendo ou acabou de cometer",
          "Flagrante impróprio: perseguido logo após",
          "Flagrante presumido/ficto: encontrado com instrumentos do crime pouco depois",
          "Prisão preventiva: sem prazo determinado; pressupostos — fumus comissi delicti + periculum libertatis",
          "Prisão temporária: 5 + 5 dias; hediondos: 30 + 30 dias",
          "Liberdade provisória com fiança: autoridade policial pode conceder para crimes com pena até 4 anos",
          "Medidas cautelares alternativas devem ser preferidas à prisão preventiva",
        ],
      },
    ],
  },
  {
    id: "legislacao-especial",
    name: "Legislação Especial PRF",
    icon: "flag",
    color: "#059669",
    description: "Lei da PRF, Estatuto Policial, Lei de Drogas e outras",
    topics: [
      {
        id: "le-lei-prf",
        title: "Lei Orgânica e Estatuto da PRF",
        incidencia: "alta",
        content:
          "A PRF foi criada pelo Decreto nº 9.583/2018. Sua lei orgânica está em construção. A Lei 9.503/1997 (CTB) define as atribuições no trânsito. A PRF é órgão da Polícia Federal? NÃO — é órgão próprio, vinculado ao Ministério da Justiça.\n\nAtribuições da PRF: patrulhamento ostensivo das rodovias federais, fiscalização e controle do trânsito, prestação de socorro às vítimas, repressão ao crime no âmbito das rodovias.",
        keyPoints: [
          "PRF: órgão policial autônomo — não é subordinada à PF",
          "Vinculada ao Ministério da Justiça e Segurança Pública",
          "Atribuições: patrulhamento, fiscalização, socorro, repressão ao crime nas rodovias federais",
          "Cargo: Policial Rodoviário Federal — carreira única",
          "PRF opera principalmente nas RODOVIAS FEDERAIS (não em vias estaduais/municipais)",
          "Lei 9.503/97 (CTB): base legal das atribuições de trânsito da PRF",
        ],
      },
      {
        id: "le-drogas",
        title: "Lei de Drogas (Lei 11.343/2006)",
        incidencia: "alta",
        content:
          "A Lei 11.343/2006 (Lei de Drogas) distingue o usuário do traficante pelo contexto, não apenas pela quantidade.\n\nTráfico (art. 33): 5 a 15 anos + multa. Equiparado ao hediondo.\nUso/porte (art. 28): não é prisão — admoestação verbal, multa ou medida educativa.\nTráfico privilegiado (art. 33 §4º): réu primário, bons antecedentes, não integrante de organização — redução de 1/6 a 2/3.",
        keyPoints: [
          "Tráfico (art. 33): 5 a 15 anos — equiparado a hediondo",
          "Usuário (art. 28): NÃO há prisão — advertência, serviços comunitários ou medida educativa",
          "Diferença usuário/traficante: juiz avalia quantidade, local, circunstâncias",
          "Tráfico privilegiado: réu primário + sem antecedentes + não integra organização → redução 1/6 a 2/3",
          "Associação para o tráfico (art. 35): 3 a 10 anos",
          "Financiamento do tráfico (art. 36): 8 a 20 anos",
          "Agravante: tráfico próximo a escolas, presídios, hospitais",
        ],
      },
      {
        id: "le-abuso-autoridade",
        title: "Lei de Abuso de Autoridade (Lei 13.869/2019)",
        incidencia: "alta",
        content:
          "A lei exige dolo específico: a finalidade de prejudicar outrem, beneficiar a si ou a terceiro, ou mero capricho/satisfação pessoal. Sem esse elemento subjetivo, não há crime.\n\nPrincipais condutas: decretar medida privativa de liberdade sem justa causa, manter preso além do prazo, constrangimento com violência para obter confissão, violação domiciliar sem fundamento.",
        keyPoints: [
          "Elemento subjetivo específico: dolo de prejudicar, beneficiar ou capricho/satisfação pessoal",
          "Erro ou excesso culposo: NÃO configura abuso de autoridade",
          "Penas: detenção + multa + perda do cargo/mandato (dependendo do tipo)",
          "Decretar prisão sem justa causa: crime de abuso",
          "Manter preso além do prazo legal: crime de abuso",
          "Deixar de identificar-se ao preso: crime de abuso",
          "Cumprimento do dever legal exclui o crime (excludente de ilicitude)",
        ],
      },
      {
        id: "le-estatuto-crianca",
        title: "ECA — Estatuto da Criança e do Adolescente (Lei 8.069/90)",
        incidencia: "média",
        content:
          "Criança: até 12 anos incompletos. Adolescente: 12 a 18 anos. O ECA adota a Doutrina da Proteção Integral.\n\nAto infracional: conduta descrita como crime ou contravenção praticada por menor. Medidas socioeducativas: advertência, obrigação de reparar o dano, prestação de serviços, liberdade assistida, semiliberdade, internação.\n\nInternação: máximo de 3 anos; liberação compulsória aos 21 anos.",
        keyPoints: [
          "Criança: 0 a 12 anos incompletos; Adolescente: 12 a 18 anos",
          "Menor de 18 anos: inimputável penalmente (sujeito ao ECA)",
          "Ato infracional: conduta descrita como crime/contravenção praticada por adolescente",
          "Medidas socioeducativas: advertência, liberdade assistida, internação (máx. 3 anos)",
          "Liberação compulsória: 21 anos de idade",
          "Conselho Tutelar: não é órgão do Judiciário; é órgão municipal autônomo",
        ],
      },
      {
        id: "le-interceptacao",
        title: "Interceptação Telefônica (Lei 9.296/1996)",
        incidencia: "média",
        content:
          "A interceptação telefônica exige: ordem judicial, indícios razoáveis de autoria/participação, crime punido com reclusão, impossibilidade de provar por outros meios.\n\nPrazo: 15 dias, prorrogável por igual período (STF: possibilidade de múltiplas prorrogações quando necessário). Crime praticar interceptação sem autorização: 2 a 4 anos.",
        keyPoints: [
          "Requisitos: autorização judicial + crime punido com reclusão + indícios de autoria",
          "Prazo: 15 dias prorrogável por mais 15 dias (sem limite de vezes, segundo o STF)",
          "Interceptação SEM autorização: crime de 2 a 4 anos",
          "Gravação clandestina: feita por um dos interlocutores — não é interceptação (pode ser usada como prova em legítima defesa)",
          "Escuta ambiental: captação por terceiro sem conhecimento dos interlocutores (requer autorização)",
          "Comunicações entre advogado e cliente: protegidas pelo sigilo profissional",
        ],
      },
    ],
  },
  {
    id: "direitos-humanos",
    name: "Direitos Humanos",
    icon: "users",
    color: "#F97316",
    description: "Sistemas de proteção, tratados e atividade policial",
    topics: [
      {
        id: "dh-conceito",
        title: "Conceito e Gerações de Direitos",
        incidencia: "média",
        content:
          "Direitos humanos: direitos inerentes a todos os seres humanos, independente de nacionalidade, raça, sexo, etnia, idioma, religião ou qualquer condição.\n\nGerações (dimensões) dos direitos:\n• 1ª Geração: direitos civis e políticos (liberdade) — negativos\n• 2ª Geração: direitos econômicos, sociais e culturais (igualdade) — positivos\n• 3ª Geração: direitos de solidariedade (fraternidade) — paz, meio ambiente, desenvolvimento\n• 4ª Geração: democracia, informação e pluralismo",
        keyPoints: [
          "1ª geração: direitos civis e políticos — liberdades individuais (negativos)",
          "2ª geração: direitos sociais, econômicos e culturais (positivos — prestações do Estado)",
          "3ª geração: difusos e coletivos — paz, meio ambiente, desenvolvimento",
          "Características: universalidade, indivisibilidade, interdependência, inalienabilidade",
          "Relatividade: podem ser limitados em conflito com outros direitos",
          "Histórico: Magna Carta (1215), Declaração francesa (1789), Declaração Universal (1948)",
        ],
      },
      {
        id: "dh-dudh",
        title: "Declaração Universal dos Direitos Humanos (1948)",
        incidencia: "alta",
        content:
          "A DUDH foi adotada pela ONU em 10 de dezembro de 1948 (resolução 217-A). Não é tratado — é resolução da Assembleia Geral (não vinculante formalmente, mas dotada de soft law).\n\nProclamou 30 artigos com os direitos civis, políticos, econômicos, sociais e culturais. Princípios: dignidade, igualdade, liberdade, solidariedade, responsabilidade, democracia, pluralismo e sustentabilidade.",
        keyPoints: [
          "Adotada em 10 de dezembro de 1948 — Dia Internacional dos Direitos Humanos",
          "Não é tratado: é resolução da Assembleia Geral da ONU (soft law)",
          "30 artigos — arts. 1-2: dignidade e igualdade; arts. 3-21: direitos civis e políticos; arts. 22-28: direitos econômicos e sociais",
          "Nenhum Estado pode invocar sua soberania para violar direitos humanos",
          "Base para os dois Pactos de 1966: PIDCP e PIDESC",
        ],
      },
      {
        id: "dh-sistema-interamericano",
        title: "Sistema Interamericano de Proteção",
        incidencia: "alta",
        content:
          "O sistema interamericano funciona no âmbito da OEA (Organização dos Estados Americanos). Dois órgãos principais: Comissão Interamericana de Direitos Humanos e Corte Interamericana de Direitos Humanos (CIDH).\n\nPacto de São José da Costa Rica (CADH — 1969): principal tratado. Incorporado no Brasil em 1992. Hierarquia: supralegal (acima das leis, abaixo da CF).",
        keyPoints: [
          "Convenção Americana de Direitos Humanos (CADH): 'Pacto de São José' — 1969, em vigor 1978",
          "Brasil ratificou a CADH em 1992 e reconheceu a jurisdição da Corte IDH em 1998",
          "Hierarquia da CADH no Brasil: SUPRALEGAL (acima das leis, abaixo da CF) — STF",
          "Comissão IDH: recebe petições individuais, medidas cautelares, relatórios",
          "Corte IDH: julgamento de casos submetidos pela Comissão — sentenças vinculantes",
          "Brasil já foi condenado pela Corte IDH (caso Damião Ximenes, Araguaia, etc.)",
        ],
      },
      {
        id: "dh-atividade-policial",
        title: "Direitos Humanos e Atividade Policial",
        incidencia: "alta",
        content:
          "O uso da força policial deve respeitar os princípios da legalidade, necessidade, proporcionalidade, não discriminação e precaução.\n\nPrincípios básicos sobre uso da força (ONU — 1990): o uso da força letal é medida extrema, após esgotamento das alternativas. Tortura é absolutamente vedada, sem exceções.",
        keyPoints: [
          "Princípios do uso da força: legalidade, necessidade, proporcionalidade, não discriminação",
          "Força letal: medida extrema; apenas quando há risco iminente à vida",
          "Tortura: PROIBIÇÃO ABSOLUTA — não admite exceções (jus cogens)",
          "Trato humanitário: preso tem direito a ser tratado com dignidade",
          "Prisão arbitrária: vedada — só mediante ordem judicial ou flagrante",
          "Código de Conduta para funcionários da Lei (ONU 1979): norteador da atividade policial",
          "Uso de algemas: STF Súmula Vinculante 11 — apenas em caso de resistência ou perigo à segurança",
        ],
      },
    ],
  },
  {
    id: "informatica",
    name: "Informática",
    icon: "monitor",
    color: "#0EA5E9",
    description: "Hardware, software, internet, segurança e LGPD",
    topics: [
      {
        id: "inf-hardware",
        title: "Hardware: Componentes e Periféricos",
        incidencia: "média",
        content:
          "Componentes principais: processador (CPU), memória RAM (volátil), placa-mãe (motherboard), HD/SSD (armazenamento não-volátil), placa de vídeo, placa de rede.\n\nMemória RAM: volátil, perde dados ao desligar. ROM: não-volátil, contém a BIOS. HD: armazenamento magnético. SSD: armazenamento em chips flash (mais rápido).",
        keyPoints: [
          "CPU: executa instruções — unidade de processamento central",
          "RAM: volátil — perde dados ao desligar; quanto mais RAM, melhor o desempenho",
          "ROM: não volátil — contém a BIOS/UEFI do computador",
          "SSD: mais rápido que HD, menor consumo, sem partes mecânicas",
          "Placa-mãe (motherboard): conecta todos os componentes",
          "Periféricos de entrada: teclado, mouse, scanner, webcam",
          "Periféricos de saída: monitor, impressora, caixas de som",
        ],
      },
      {
        id: "inf-windows",
        title: "Sistemas Operacionais (Windows e Linux)",
        incidencia: "média",
        content:
          "Windows: sistema proprietário da Microsoft. Versões relevantes: Windows 10 e 11. Linux: sistema open-source (código aberto), núcleo desenvolvido por Linus Torvalds (1991). Distribuições: Ubuntu, Debian, Fedora, CentOS.\n\nO CEBRASPE cobra comandos básicos do Windows (CMD) e do terminal Linux.",
        keyPoints: [
          "Windows: proprietário — pago; Linux: código aberto — gratuito",
          "Gerenciador de tarefas: Ctrl+Alt+Del (Windows)",
          "Extensões: .exe (executável), .docx (Word), .xlsx (Excel), .pdf",
          "Linux — comandos básicos: ls (listar), cd (mudar dir.), mkdir (criar pasta), rm (remover), cp (copiar)",
          "Partições: formatação divide o HD — NTFS (Windows), ext4 (Linux), FAT32",
          "Bits e bytes: 1 byte = 8 bits; 1 KB = 1024 bytes; 1 MB = 1024 KB",
        ],
      },
      {
        id: "inf-pacote-office",
        title: "Microsoft Office (Word, Excel, PowerPoint)",
        incidencia: "alta",
        content:
          "Word: editor de texto. Formatação de parágrafo (recuo, espaçamento, alinhamento), estilos, mala direta, revisão ortográfica.\n\nExcel: planilha eletrônica. Funções mais cobradas: SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE (=SE(condição;se_verdadeiro;se_falso)), PROCV, CONT.SE.\n\nPowerPoint: apresentações. Slide mestre, animações, transições.",
        keyPoints: [
          "Word: Ctrl+B (negrito), Ctrl+I (itálico), Ctrl+U (sublinhado)",
          "Excel: célula = linha + coluna (A1, B3); $A$1 = referência absoluta",
          "Função SOMA: =SOMA(A1:A10) ou =A1+A2+A3",
          "Função SE: =SE(A1>10;\"Aprovado\";\"Reprovado\")",
          "PROCV: busca vertical em tabela — =PROCV(valor;matriz;coluna;0)",
          "PowerPoint: Ctrl+M (novo slide); F5 (iniciar apresentação)",
          "LibreOffice: versão gratuita — Writer (Word), Calc (Excel), Impress (PowerPoint)",
        ],
      },
      {
        id: "inf-internet",
        title: "Internet, Navegadores e Redes",
        incidencia: "alta",
        content:
          "Protocolos: HTTP (hipertexto), HTTPS (seguro), FTP (transferência de arquivos), SMTP/POP3/IMAP (e-mail), DNS (resolução de nomes), DHCP (configuração automática de IP).\n\nNavegadores: Google Chrome, Mozilla Firefox, Microsoft Edge. Cache: armazenamento temporário de páginas. Cookies: arquivo com dados do usuário.\n\nRedes: topologias (estrela, barramento, anel, malha). Protocolos TCP/IP (IPv4 — 4 números; IPv6 — 128 bits).",
        keyPoints: [
          "HTTP (80) × HTTPS (443): HTTPS é criptografado (TLS/SSL)",
          "SMTP (25/587): envio de e-mail; POP3 (110): baixa e-mail; IMAP (143): acesso ao servidor",
          "DNS: converte nome de domínio em IP (ex.: www.google.com → 142.250.x.x)",
          "DHCP: atribui IP automaticamente na rede",
          "IPv4: 4 octetos (ex.: 192.168.0.1); IPv6: 128 bits em hexadecimal",
          "VPN: rede privada virtual — criptografa a conexão",
          "Firewall: filtra o tráfego de rede (entrada/saída)",
        ],
      },
      {
        id: "inf-seguranca",
        title: "Segurança da Informação e LGPD",
        incidencia: "alta",
        content:
          "Princípios da segurança da informação: Confidencialidade, Integridade, Disponibilidade, Autenticidade e Irretratabilidade (CIDAI).\n\nAmeaças: vírus (auto-replica em arquivo), worm (auto-replica sem arquivo hospedeiro), trojan (cavalo de troia, abre backdoor), ransomware (sequestra arquivos por criptografia), phishing (fraude por e-mail/site falso).\n\nLGPD (Lei 13.709/2018): protege dados pessoais. Titular tem direito de acesso, correção, exclusão, portabilidade.",
        keyPoints: [
          "CIA: Confidencialidade, Integridade, Disponibilidade — tríade básica",
          "Vírus: precisa de arquivo hospedeiro para se propagar",
          "Worm: propaga sozinho pela rede, sem hospedeiro",
          "Ransomware: criptografa arquivos e exige resgate",
          "Phishing: e-mail ou site falso para roubar credenciais",
          "LGPD: dados pessoais só podem ser tratados com base legal (consentimento, legítimo interesse, etc.)",
          "ANPD: Autoridade Nacional de Proteção de Dados — órgão de fiscalização da LGPD",
        ],
      },
    ],
  },
];
