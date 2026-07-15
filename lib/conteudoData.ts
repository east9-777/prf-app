export type HighlightBox = {
  type: "atencao" | "pegadinha" | "muito-cobrado" | "memorize" | "dica";
  text: string;
};

export type Example = {
  label: "CERTO" | "ERRADO" | "Exemplo" | "Correto" | "Incorreto";
  sentence: string;
  explanation?: string;
};

export type TableData = {
  title?: string;
  headers: string[];
  rows: string[][];
};

export type Exercise = {
  question: string;
  answer: "CERTO" | "ERRADO";
  explanation: string;
};

export type TopicItem = {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  incidencia: "alta" | "média" | "baixa";
  highlights?: HighlightBox[];
  examples?: Example[];
  tables?: TableData[];
  exercises?: Exercise[];
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
  // ─── LÍNGUA PORTUGUESA ───────────────────────────────────────────────────────
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
        highlights: [
          { type: "muito-cobrado", text: "Interpretação representa cerca de 30–40% das questões de Português na PRF. Domine este tópico antes de qualquer outro." },
          { type: "pegadinha", text: "A banca tenta 'completar' o texto afirmando algo que não está escrito. Se a informação não consta no texto, a afirmativa é ERRADA." },
          { type: "dica", text: "Ao responder CERTO/ERRADO, volte sempre ao trecho exato do texto que sustenta (ou contradiz) a afirmativa." },
        ],
        examples: [
          { label: "ERRADO", sentence: "O texto afirma que todo policial rodoviário federal é corajoso.", explanation: "Palavra absoluta 'todo' não sustentada pelo texto — quase sempre incorreta." },
          { label: "CERTO", sentence: "Depreende-se do texto que a atividade de fiscalização é essencial para a segurança viária.", explanation: "Inferência válida a partir das informações contidas no texto." },
          { label: "ERRADO", sentence: "O autor defende a extinção do sistema de multas de trânsito.", explanation: "Extrapolação: o texto não permite essa conclusão." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Considere o trecho: 'A fiscalização eficiente reduz acidentes, mas não elimina completamente o risco nas rodovias.' Com base nisso, é correto afirmar que o texto garante a eliminação total dos acidentes com uma boa fiscalização.",
            answer: "ERRADO",
            explanation: "O texto é explícito ao usar 'mas não elimina completamente o risco', o que contradiz diretamente a afirmativa. Atenção ao 'mas' adversativo e ao advérbio 'completamente'.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "A substituição de conectivos é cobrada toda prova. Confundir um adversativo (mas) com um conclusivo (portanto) altera radicalmente o sentido." },
          { type: "pegadinha", text: "'Pois' pode ser causal (antes do verbo: 'Estudei, pois queria passar') ou explicativo (depois: 'Estude, pois a prova é difícil'). O CEBRASPE cobra essa distinção." },
          { type: "memorize", text: "CONCLUSIVOS: logo, portanto, assim, por isso, então, por conseguinte, em suma. ADVERSATIVOS: mas, porém, contudo, todavia, entretanto, no entanto." },
        ],
        tables: [
          {
            title: "Principais conectivos e suas relações",
            headers: ["Relação", "Conectivos"],
            rows: [
              ["Adversidade", "mas, porém, contudo, todavia, entretanto, no entanto"],
              ["Causa",       "porque, pois, já que, visto que, uma vez que"],
              ["Concessão",   "embora, apesar de, conquanto, ainda que, mesmo que"],
              ["Conclusão",   "logo, portanto, assim, por isso, por conseguinte"],
              ["Condição",    "se, caso, desde que, contanto que, a menos que"],
              ["Tempo",       "quando, enquanto, depois que, antes que, assim que"],
              ["Adição",      "e, nem, não só…mas também, além disso"],
              ["Finalidade",  "para que, a fim de que, com o intuito de"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "O trecho 'Embora chova muito, as rodovias permanecem operacionais' apresenta relação de concessão entre as orações.", explanation: "'Embora' é conjunção concessiva." },
          { label: "ERRADO", sentence: "O conectivo 'portanto' no trecho estabelece relação de causa entre as orações.", explanation: "'Portanto' é conclusivo, não causal." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O conectivo 'contudo' em 'O candidato estudou muito; contudo, não foi aprovado' pode ser substituído, sem alteração de sentido, por 'porque'.",
            answer: "ERRADO",
            explanation: "'Contudo' é adversativo (ideia de oposição/restrição). 'Porque' é causal. A substituição altera completamente o sentido da frase.",
          },
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
        highlights: [
          { type: "pegadinha", text: "'Onde' refere-se a lugar físico: 'A cidade onde moro'. Para situações abstratas, use 'em que': 'A situação em que me encontro' (ERRADO usar 'onde' aqui)." },
          { type: "atencao", text: "'Cujo' é pronome relativo de posse e concorda com o possuído (o que está depois): 'O agente cujas funções são relevantes' — funções = feminino plural." },
        ],
        tables: [
          {
            title: "Pronomes pessoais do caso reto e oblíquo",
            headers: ["Pessoa", "Caso reto (sujeito)", "Oblíquo átono", "Oblíquo tônico"],
            rows: [
              ["1ª singular", "eu",   "me",       "mim, comigo"],
              ["2ª singular", "tu",   "te",       "ti, contigo"],
              ["3ª singular", "ele/ela", "o/a/lhe", "ele/ela, consigo"],
              ["1ª plural",  "nós",  "nos",      "nós, conosco"],
              ["2ª plural",  "vós",  "vos",      "vós, convosco"],
              ["3ª plural",  "eles/elas", "os/as/lhes", "eles/elas"],
            ],
          },
        ],
        examples: [
          { label: "ERRADO", sentence: "Esta é a empresa onde trabalho há dez anos.", explanation: "Empresa não é lugar físico no sentido estrito. O correto seria 'em que trabalho'." },
          { label: "CERTO", sentence: "O policial cujo veículo foi danificado registrou o boletim de ocorrência.", explanation: "'Cujo' concorda com 'veículo' (masculino singular) — correto." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Em 'O local onde ocorreu o acidente foi sinalizado', o pronome relativo 'onde' está empregado adequadamente.",
            answer: "CERTO",
            explanation: "'Onde' refere-se a 'local', que é um lugar físico. O emprego está correto.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "HAVER e FAZER impessoais NÃO variam: 'Havia muitos candidatos' (não 'haviam'). 'Faz dois dias' (não 'fazem'). A banca cobra isso toda prova." },
          { type: "pegadinha", text: "'Assistir' tem dois sentidos: (1) ver/presenciar → rege 'a' ('assisti ao filme'); (2) caber/beneficiar → rege 'a' ('assiste-lhe o direito'). Nunca use 'assistir' sem preposição no sentido de 'ver'." },
          { type: "memorize", text: "Verbos que exigem 'a': assistir (ver), aspirar (desejar), obedecer, desobedecer, responder, visar (almejar), aludir, referir-se." },
        ],
        tables: [
          {
            title: "Regência dos verbos mais cobrados",
            headers: ["Verbo", "Regência", "Exemplo correto"],
            rows: [
              ["Assistir (ver)",    "VTI — rege 'a'",    "Assisti ao julgamento"],
              ["Visar (almejar)",   "VTI — rege 'a'",    "Visa ao cargo de PRF"],
              ["Visar (cheque)",    "VTD — sem prep.",   "Visou o cheque"],
              ["Obedecer",          "VTI — rege 'a'",    "Obedece às leis"],
              ["Preferir",          "VTD+VTI — rege 'a'","Prefiro café a chá"],
              ["Implicar (acarretar)", "VTD — sem prep.", "Implica consequências"],
              ["Chegar / Ir",       "rege 'a'",           "Chegou a Brasília"],
            ],
          },
        ],
        examples: [
          { label: "ERRADO", sentence: "Haviam muitos candidatos inscritos no concurso da PRF.", explanation: "'Haver' no sentido de 'existir' é impessoal e não varia: 'Havia muitos candidatos'." },
          { label: "CERTO", sentence: "O policial obedeceu às ordens superiores sem questionar.", explanation: "'Obedecer' exige a preposição 'a' — correto." },
          { label: "ERRADO", sentence: "O candidato aspira o cargo de PRF há anos.", explanation: "'Aspirar' no sentido de desejar exige 'a': 'aspira ao cargo'." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF 2021) 'Fazem dois anos que não ocorrem acidentes neste trecho da rodovia.' A concordância do verbo 'fazer' está correta nessa frase.",
            answer: "ERRADO",
            explanation: "'Fazer' indicando tempo decorrido é impessoal e não varia: o correto é 'Faz dois anos'. Da mesma forma, 'ocorrer' deve concordar com 'acidentes' (plural) — 'não ocorrem' está correto nessa parte.",
          },
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
        highlights: [
          { type: "dica", text: "Teste da substituição: troque a palavra feminina por uma masculina. Se usar 'ao', há crase ('ao diretor' → 'à diretora'). Se usar 'a', não há crase ('a ele' → 'a ela')." },
          { type: "pegadinha", text: "'A partir de' sempre sem crase, pois 'partir' é verbo. 'À parte' (separadamente) tem crase; 'a parte' (uma parte) não tem. O CEBRASPE adora essa dupla." },
          { type: "atencao", text: "Nomes de cidades: há crase apenas quando a cidade aceita artigo ('à São Paulo' — pois dizemos 'a São Paulo'); não há crase em 'Fui a Brasília' (sem artigo antes de Brasília)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O policial chegou à delegacia às 8 horas da manhã.", explanation: "'à delegacia' = prep. a + artigo a; 'às 8 horas' = horas determinadas." },
          { label: "ERRADO", sentence: "Ele foi à pé até o local do acidente.", explanation: "'a pé' não tem crase pois 'pé' é masculino. Correto: 'a pé'." },
          { label: "ERRADO", sentence: "O relatório foi encaminhado à ela.", explanation: "Não há crase antes de pronomes pessoais. Correto: 'a ela'." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O uso do acento grave em 'O agente referiu-se à ocorrência registrada ontem' está correto.",
            answer: "CERTO",
            explanation: "'Referir-se' exige a preposição 'a' + artigo 'a' antes de palavra feminina ('ocorrência') → crase obrigatória.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Não se usa vírgula antes de 'que' quando ele é objeto direto: 'O policial confirmou que o suspeito fugiu' — ERRADO colocar vírgula antes de 'que'." },
          { type: "muito-cobrado", text: "Separar sujeito de predicado com vírgula é o ERRO mais cobrado. Ex: 'O policial rodoviário federal, fiscalizou a rodovia.' — vírgula errada." },
        ],
        examples: [
          { label: "ERRADO", sentence: "O candidato aprovado, comemorou a vitória com a família.", explanation: "Vírgula entre sujeito ('O candidato aprovado') e verbo ('comemorou') — proibida." },
          { label: "CERTO", sentence: "Ao chegar ao local, o agente registrou a ocorrência.", explanation: "Oração adverbial temporal ('Ao chegar ao local') anteposta → vírgula obrigatória." },
          { label: "CERTO", sentence: "Pedro, o melhor candidato da turma, foi aprovado na PRF.", explanation: "Aposto explicativo ('o melhor candidato da turma') entre vírgulas — correto." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A vírgula empregada em 'Os candidatos, aprovados na prova objetiva, serão convocados para a próxima fase' está correta.",
            answer: "CERTO",
            explanation: "'aprovados na prova objetiva' é aposto ou oração reduzida de particípio com valor adjetivo. A intercalação entre vírgulas é gramaticalmente correta.",
          },
        ],
      },
    ],
  },

  // ─── RACIOCÍNIO LÓGICO ───────────────────────────────────────────────────────
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
        highlights: [
          { type: "muito-cobrado", text: "A condicional (→) é o conectivo mais cobrado. Memorize: p→q é FALSA somente quando p é V e q é F. Em todos os outros casos, é VERDADEIRA." },
          { type: "pegadinha", text: "'Todo policial é corajoso' é uma proposição categórica universal, não uma condicional, mas pode ser reescrita como: 'Se é policial, então é corajoso'. O CEBRASPE usa ambas as formas." },
        ],
        tables: [
          {
            title: "Tabela-verdade dos conectivos principais",
            headers: ["p", "q", "p ∧ q (E)", "p ∨ q (OU)", "p → q (SE…ENTÃO)", "p ↔ q (SSE)"],
            rows: [
              ["V", "V", "V", "V", "V", "V"],
              ["V", "F", "F", "V", "F", "F"],
              ["F", "V", "F", "V", "V", "F"],
              ["F", "F", "F", "F", "V", "V"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "'2 + 2 = 4' é uma proposição verdadeira.", explanation: "Sentença declarativa com valor lógico definido." },
          { label: "ERRADO", sentence: "'Que horas são?' é uma proposição falsa.", explanation: "Frases interrogativas não são proposições — não têm valor lógico." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Dadas as proposições p (verdadeira) e q (falsa), a proposição composta p → q é verdadeira.",
            answer: "ERRADO",
            explanation: "p → q é FALSA somente quando p = V e q = F. Como p é V e q é F, a condicional é FALSA.",
          },
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
        highlights: [
          { type: "memorize", text: "Negação das categorias: NEG('Todo A é B') = 'Existe A que não é B'. NEG('Nenhum A é B') = 'Existe A que é B'. NEG('Algum A é B') = 'Nenhum A é B'." },
          { type: "dica", text: "Contrapositiva é a equivalente mais útil: 'Se chove, então o chão molha' ↔ 'Se o chão não molhou, então não choveu'. Use-a para resolver silogismos." },
        ],
        examples: [
          { label: "CERTO", sentence: "A negação de 'Todos os candidatos estudaram' é 'Algum candidato não estudou'.", explanation: "NEG(∀x P(x)) = ∃x ¬P(x)." },
          { label: "ERRADO", sentence: "A negação de 'p → q' é '¬p → ¬q'.", explanation: "A negação correta é 'p ∧ ¬q'. '¬p → ¬q' é a inversa, não a negação." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A negação de 'Se o policial está em serviço, então ele está fardado' é 'Se o policial não está em serviço, então ele não está fardado'.",
            answer: "ERRADO",
            explanation: "A negação de p → q é p ∧ ¬q: 'O policial está em serviço E não está fardado'. A afirmativa da questão é a 'inversa' da condicional, que não equivale à negação.",
          },
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
        highlights: [
          { type: "dica", text: "Quando o problema diz 'pelo menos um', use o complementar: P(pelo menos 1) = 1 - P(nenhum). É muito mais rápido." },
          { type: "muito-cobrado", text: "Probabilidade em urnas e baralhos é clássica. Sempre identifique: espaço amostral total, evento favorável, e se os eventos são com ou sem reposição." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Uma urna tem 4 bolas vermelhas e 6 azuis. P(tirar vermelha) = 4/10 = 2/5 = 0,4 = 40%.", explanation: "Casos favoráveis = 4; total = 10." },
          { label: "Exemplo", sentence: "P(cara em moeda honesta) = 1/2. Dois lances independentes: P(2 caras) = 1/2 × 1/2 = 1/4.", explanation: "Eventos independentes: multiplica as probabilidades." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Em um grupo de 10 agentes, 6 são do sexo masculino e 4 do feminino. Ao sortear 1 agente, a probabilidade de ser do sexo feminino é de 40%.",
            answer: "CERTO",
            explanation: "P(feminino) = 4/10 = 0,4 = 40%. Correto.",
          },
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
        highlights: [
          { type: "dica", text: "Para escolher r entre n quando a ORDEM NÃO importa (comissão, grupo, comitê) → Combinação. Quando a ordem importa (senha, fila, pódio) → Arranjo." },
          { type: "pegadinha", text: "C(5,2) = C(5,3) = 10. A banca pode apresentar valores equivalentes para confundir." },
        ],
        tables: [
          {
            title: "Quando usar cada fórmula",
            headers: ["Situação", "Fórmula", "Exemplo"],
            rows: [
              ["Todos os elementos, ordem importa", "P(n) = n!", "Anagramas da palavra PRF: 3! = 6"],
              ["Parte dos elementos, ordem importa", "A(n,r) = n!/(n-r)!", "Pódio de 3 em 5 atletas: A(5,3) = 60"],
              ["Parte dos elementos, ordem NÃO importa", "C(n,r) = n!/[r!(n-r)!]", "Comissão de 2 em 5: C(5,2) = 10"],
            ],
          },
        ],
        examples: [
          { label: "Exemplo", sentence: "Anagramas de 'PRF' (3 letras, sem repetição): P(3) = 3! = 6 arranjos.", explanation: "PRF, PFR, RPF, RFP, FPR, FRP." },
          { label: "Exemplo", sentence: "Escolher 2 delegados entre 5 candidatos (ordem não importa): C(5,2) = 5!/(2!×3!) = 10.", explanation: "Combinação pois o grupo é não ordenado." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) De um grupo de 6 policiais, deseja-se formar uma comissão de 3. O número de comissões possíveis é 20.",
            answer: "CERTO",
            explanation: "C(6,3) = 6! / (3! × 3!) = 720 / (6×6) = 720/36 = 20. Correto.",
          },
        ],
      },
      {
        id: "rl-raciocinio-sequencias",
        title: "Sequências e Progressões",
        incidencia: "média",
        content:
          "PA (Progressão Aritmética): diferença constante entre termos consecutivos.\nTermo geral: an = a1 + (n-1)d\nSoma dos termos: Sn = n(a1+an)/2\n\nPG (Progressão Geométrica): razão constante entre termos consecutivos.\nTermo geral: an = a1 × q^(n-1)\nSoma de PG finita: Sn = a1(q^n - 1)/(q-1)",
        keyPoints: [
          "PA: diferença entre termos consecutivos é constante (razão r)",
          "Termo geral PA: an = a1 + (n-1)d",
          "Soma PA: Sn = n × (a1 + an) / 2",
          "PG: quociente entre termos consecutivos é constante (razão q)",
          "Termo geral PG: an = a1 × q^(n-1)",
          "Em sequências figurais, identifique o padrão visual ou numérico",
        ],
        highlights: [
          { type: "dica", text: "Para identificar PA: as diferenças entre termos consecutivos são iguais. Para PG: os quocientes são iguais. Calcule sempre 2-3 diferenças/quocientes para confirmar." },
          { type: "atencao", text: "O CEBRASPE costuma apresentar sequências mistas ou com padrão não óbvio (diferença das diferenças, alternância). Vá além de simplesmente calcular a1+d." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Sequência 2, 5, 8, 11, 14... → PA com a1=2 e d=3. Próximo termo: 14+3 = 17.", explanation: "Diferença constante = 3." },
          { label: "Exemplo", sentence: "Sequência 3, 6, 12, 24... → PG com a1=3 e q=2. Próximo: 24×2 = 48.", explanation: "Razão constante = 2." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Na progressão aritmética (2, 5, 8, 11, ...), o décimo termo é 29.",
            answer: "CERTO",
            explanation: "a10 = a1 + (10-1) × d = 2 + 9 × 3 = 2 + 27 = 29. Correto.",
          },
        ],
      },
    ],
  },

  // ─── LEGISLAÇÃO DE TRÂNSITO ──────────────────────────────────────────────────
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
        highlights: [
          { type: "muito-cobrado", text: "CONTRAN é o órgão máximo normativo do SNT — não é a PRF, não é o DETRAN. O CEBRASPE costuma inverter as atribuições dos órgãos." },
          { type: "pegadinha", text: "A PRF fiscaliza RODOVIAS FEDERAIS — não vias estaduais, municipais ou urbanas. A banca frequentemente afirma que a PRF atua em 'todas as vias públicas'." },
        ],
        tables: [
          {
            title: "Órgãos do SNT e suas atribuições",
            headers: ["Órgão", "Nível", "Atribuição principal"],
            rows: [
              ["CONTRAN",   "Federal (máximo)", "Normatiza, coordena e fiscaliza o SNT"],
              ["SENATRAN",  "Federal (executivo)", "Executa a política nacional de trânsito"],
              ["PRF",       "Federal (rodoviário)", "Patrulha e fiscaliza rodovias federais"],
              ["DETRAN",    "Estadual",        "Registro, habilitação e fiscalização estadual"],
              ["PM",        "Estadual",        "Polícia ostensiva de trânsito em vias estaduais"],
              ["CTM/SMTT",  "Municipal",       "Trânsito urbano (quando constituído órgão)"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "O CONTRAN é o órgão máximo normativo e consultivo do Sistema Nacional de Trânsito.", explanation: "Correto conforme art. 7° do CTB." },
          { label: "ERRADO", sentence: "A PRF tem competência para fiscalizar vias estaduais quando solicitada.", explanation: "A atribuição da PRF é exclusivamente nas rodovias federais, conforme art. 20 do CTB." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) A PRF é subordinada hierarquicamente ao CONTRAN no exercício de suas funções de fiscalização de trânsito nas rodovias federais.",
            answer: "ERRADO",
            explanation: "A PRF é subordinada ao Ministério da Justiça e Segurança Pública. O CONTRAN é o órgão normativo máximo do SNT, mas não há subordinação hierárquica da PRF ao CONTRAN.",
          },
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
        highlights: [
          { type: "memorize", text: "Hierarquia da sinalização (do mais importante para o menos): 1° Agente de trânsito; 2° Semáforo; 3° Sinalização vertical; 4° Sinalização horizontal." },
          { type: "pegadinha", text: "'Rodovia' ≠ 'Estrada'. A rodovia tem pista, acostamento e faixa de domínio; a estrada é via rural sem essas características. O CEBRASPE troca os conceitos." },
        ],
        examples: [
          { label: "CERTO", sentence: "A sinalização do agente de trânsito prevalece sobre a sinalização semafórica.", explanation: "Art. 88, parágrafo único do CTB: o agente de trânsito tem prevalência sobre todos os sinais." },
          { label: "ERRADO", sentence: "Rodovia e estrada são termos sinônimos no CTB.", explanation: "São conceitos distintos: rodovia tem pista, acostamento e faixa de domínio; estrada não." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Conforme o CTB, em caso de sinal verde no semáforo, o condutor pode avançar mesmo que um agente de trânsito esteja determinando a parada.",
            answer: "ERRADO",
            explanation: "O agente de trânsito prevalece sobre todos os sinais, inclusive semafóricos. O condutor deve obedecer ao agente.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Dirigir sob efeito de álcool (art. 165 CTB): infração gravíssima, multa x10 (maior multiplicador), suspensão de 12 meses. Além da infração administrativa, pode configurar o crime do art. 306." },
          { type: "atencao", text: "Atenção ao art. 165-A: recusar o teste do bafômetro é infração gravíssima com multa x3 e suspensão de 12 meses — mesma penalidade de quem é flagrado embriagado." },
        ],
        tables: [
          {
            title: "Graduação das infrações de trânsito",
            headers: ["Gravidade", "Pontos na CNH", "Exemplos principais"],
            rows: [
              ["Gravíssima", "7 pontos", "Álcool, racha, cinto, celular, sinal vermelho"],
              ["Grave",      "5 pontos", "Ultrapassagem proibida, excesso de velocidade 20-50%"],
              ["Média",      "4 pontos", "Avançar preferencial, usar faixa errada"],
              ["Leve",       "3 pontos", "Documentação incompleta, outros"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "Dirigir utilizando telefone celular enquanto o veículo está em movimento é infração gravíssima com multa multiplicada por três.", explanation: "Art. 252, V do CTB — correto." },
          { label: "ERRADO", sentence: "O condutor que acumular 15 pontos em 12 meses terá a CNH suspensa.", explanation: "A suspensão ocorre com 20 ou mais pontos (art. 261 CTB), não 15." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Recusar-se a submeter ao teste de alcoolemia (bafômetro), quando solicitado pelo agente de autoridade de trânsito, configura infração de natureza leve.",
            answer: "ERRADO",
            explanation: "Art. 165-A do CTB: recusar o teste de alcoolemia é infração gravíssima (não leve), com multa multiplicada por 3 e suspensão do direito de dirigir por 12 meses.",
          },
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
        highlights: [
          { type: "memorize", text: "Art. 306 (embriaguez): concentração ≥ 0,3 mg/L ar alveolar OU ≥ 0,6 g/dL sangue → CRIME (detenção 6 meses a 3 anos + multa + suspensão)." },
          { type: "pegadinha", text: "Fuga do local do acidente (art. 305) é crime autônomo — mesmo que não haja lesão ou morte. Muitos candidatos acham que só há crime se houver vítima." },
        ],
        tables: [
          {
            title: "Crimes de trânsito — penas",
            headers: ["Art.", "Crime", "Pena"],
            rows: [
              ["302", "Homicídio culposo",       "2 a 4 anos de detenção"],
              ["303", "Lesão corporal culposa",   "6 meses a 2 anos"],
              ["304", "Omissão de socorro",       "6 meses a 1 ano + multa"],
              ["305", "Fuga do local",            "6 meses a 1 ano + suspensão"],
              ["306", "Embriaguez ao volante",    "6 meses a 3 anos + multa + suspensão"],
              ["307", "Violar suspensão da CNH",  "6 meses a 1 ano + multa"],
              ["308", "Racha (sem resultado)",    "1 a 3 anos + suspensão + multa"],
              ["308§2", "Racha com morte",        "5 a 10 anos + suspensão"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "O crime de racha com resultado morte (art. 308, §2°) prevê pena de reclusão de 5 a 10 anos.", explanation: "Após a Lei 13.546/2017 — correto." },
          { label: "ERRADO", sentence: "O crime de embriaguez ao volante exige que o condutor cause um acidente para sua configuração.", explanation: "O art. 306 é crime de perigo abstrato — configura-se pela condução com concentração ilícita de álcool, independentemente de acidente." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O crime de omissão de socorro (art. 304 CTB) só se configura quando a vítima vier a falecer em consequência da omissão.",
            answer: "ERRADO",
            explanation: "A omissão de socorro é crime formal — configura-se pelo simples ato de não prestar socorro quando possível, independentemente do resultado da vítima.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Para categoria D (transportar passageiros), a idade mínima é 21 anos — não 18. O CEBRASPE afirma '18 anos' para confundir." },
          { type: "memorize", text: "Validade da CNH: até 50 anos → 10 anos; 50 a 70 → 5 anos; acima de 70 → 3 anos." },
        ],
        tables: [
          {
            title: "Categorias da CNH — requisitos",
            headers: ["Categoria", "Veículo", "Idade mínima", "Pré-requisito"],
            rows: [
              ["A", "Motocicletas",              "18 anos", "—"],
              ["B", "Automóveis (≤3.500 kg)",    "18 anos", "—"],
              ["AB", "Moto + Automóvel",         "18 anos", "—"],
              ["C", "Carga (>3.500 kg)",          "21 anos", "B há 1 ano"],
              ["D", "Passageiros (>8 lugares)",   "21 anos", "B ou C há 1 ano"],
              ["E", "Combinações de veículos",    "21 anos", "C ou D há 1 ano"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "Um condutor com 22 anos, titular da categoria B há 2 anos, pode requerer a categoria C.", explanation: "21 anos e B há pelo menos 1 ano — requisitos atendidos." },
          { label: "ERRADO", sentence: "A PPD tem validade de 2 anos a partir da data de expedição.", explanation: "A PPD tem validade de 1 ano (art. 148 CTB)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Para obter a habilitação na categoria D, o condutor deve ter, no mínimo, 18 anos e possuir a categoria B há pelo menos 1 ano.",
            answer: "ERRADO",
            explanation: "Para a categoria D, a idade mínima é 21 anos (não 18). O requisito de ter a categoria B há pelo menos 1 ano está correto.",
          },
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
          "MP 1.327/2025: atualiza penalidades — suspensão de 12 meses e 10 multas",
          "Motorista profissional: mesmos limites, mas perda da CNH por 12 meses",
        ],
        highlights: [
          { type: "memorize", text: "Limites: Infração: 0,05 mg/L ar (ou 0,1 g/L sangue). Crime: 0,3 mg/L ar (ou 0,6 g/L sangue). A diferença entre os dois limites é 6x no bafômetro." },
          { type: "atencao", text: "A recusa ao teste de alcoolemia (bafômetro) gera infração gravíssima INDEPENDENTEMENTE do nível de álcool. A banca afirma que 'a recusa não gera penalidade' — ERRADO." },
          { type: "muito-cobrado", text: "O crime do art. 306 CTB é de perigo abstrato: basta a concentração ilícita para configurar o crime, mesmo sem causar acidente." },
        ],
        examples: [
          { label: "CERTO", sentence: "Conduzir veículo com concentração de 0,4 mg/L de álcool no ar alveolar configura crime, e não apenas infração administrativa.", explanation: "0,4 ≥ 0,3 mg/L → crime do art. 306 CTB." },
          { label: "ERRADO", sentence: "O condutor que recusar o bafômetro não poderá sofrer nenhuma penalidade administrativa.", explanation: "A recusa é infração gravíssima com multa x3 e suspensão de 12 meses." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Somente é possível caracterizar o crime de embriaguez ao volante (art. 306 CTB) se o condutor causar acidente de trânsito com vítimas.",
            answer: "ERRADO",
            explanation: "O crime do art. 306 é de perigo abstrato. Configura-se pela simples condução com concentração ≥ 0,3 mg/L de álcool no ar alveolar, independentemente de acidente ou vítimas.",
          },
        ],
      },
    ],
  },

  // ─── FÍSICA APLICADA AO TRÂNSITO ─────────────────────────────────────────────
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
        highlights: [
          { type: "dica", text: "Conversão rápida: para converter km/h em m/s, divida por 3,6. Para m/s em km/h, multiplique por 3,6. Memorize: 36 km/h = 10 m/s; 72 km/h = 20 m/s; 108 km/h = 30 m/s." },
          { type: "muito-cobrado", text: "Velocidade média ≠ média das velocidades. vm = distância total / tempo total. Se percorreu 60 km em 40 min: vm = 60/(40/60) = 90 km/h." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Um carro percorre 120 km em 1,5 h em MRU. Velocidade = 120/1,5 = 80 km/h.", explanation: "vm = Δx/Δt." },
          { label: "Exemplo", sentence: "Converter 90 km/h para m/s: 90 ÷ 3,6 = 25 m/s.", explanation: "Conversão padrão." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um veículo trafega a 72 km/h em MRU. Em 5 segundos, percorre 100 metros.",
            answer: "CERTO",
            explanation: "72 km/h = 20 m/s. Espaço em MRU: x = v × t = 20 × 5 = 100 m. Correto.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Torricelli (v² = v₀² + 2aΔx) é a equação mais cobrada quando o enunciado NÃO fornece o tempo. Use-a para calcular distância de frenagem." },
          { type: "atencao", text: "Dobrar a velocidade QUADRUPLICA a distância de frenagem (relação com v²). Triplicar a velocidade aumenta 9 vezes. Isso é fundamental para entender a física dos acidentes." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Frenagem de 60 km/h (16,7 m/s) com desaceleração de 5 m/s²: df = v²/(2a) = (16,7)²/10 ≈ 27,9 m.", explanation: "Torricelli: 0 = v₀² + 2(-5)Δx → Δx = v₀²/10." },
          { label: "Exemplo", sentence: "Se a velocidade dobra de 30 para 60 km/h, a distância de frenagem quadruplica.", explanation: "Δx ∝ v²: (60/30)² = 4." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um veículo trafegando a 60 km/h tem distância de frenagem 4 vezes maior que o mesmo veículo a 30 km/h, nas mesmas condições de pista.",
            answer: "CERTO",
            explanation: "A distância de frenagem é proporcional ao quadrado da velocidade. Como 60/30 = 2, a distância aumenta 2² = 4 vezes.",
          },
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
        highlights: [
          { type: "atencao", text: "Álcool aumenta o tempo de reação: a 60 km/h, cada 0,5 segundo extra de reação equivale a +8,3 metros percorridos ANTES de começar a frear." },
          { type: "muito-cobrado", text: "Distância TOTAL de parada = distância de REAÇÃO + distância de FRENAGEM. A banca costuma perguntar sobre cada componente separadamente." },
        ],
        examples: [
          { label: "Exemplo", sentence: "A 90 km/h (25 m/s) com reação de 1s: dr = 25 × 1 = 25 m. Com a = 5 m/s²: df = 625/10 = 62,5 m. Total: 87,5 m.", explanation: "Aplicação direta das fórmulas." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O uso de aparelho celular ao volante não influencia a distância de parada do veículo.",
            answer: "ERRADO",
            explanation: "O celular aumenta o tempo de reação do condutor, o que aumenta a distância de reação e, consequentemente, a distância total de parada.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Ec ∝ v²: dobrar a velocidade → Ec quadruplica. A 120 km/h, a energia de impacto é 4 vezes maior que a 60 km/h." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Carro de 1.000 kg a 20 m/s: Ec = ½ × 1000 × 400 = 200.000 J = 200 kJ.", explanation: "Ec = ½mv²." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um veículo que passa de 60 km/h para 120 km/h tem sua energia cinética multiplicada por 2.",
            answer: "ERRADO",
            explanation: "Ec ∝ v². Como a velocidade dobrou, a Ec é multiplicada por 2² = 4, não por 2.",
          },
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
        highlights: [
          { type: "atencao", text: "A 1ª Lei (inércia) explica por que o cinto de segurança é obrigatório: na frenagem brusca, o passageiro sem cinto continua em movimento e é projetado contra o para-brisa." },
        ],
        examples: [
          { label: "Exemplo", sentence: "Caminhão de 10t e carro de 1t em colisão: pela 3ª Lei, as forças mútuas são iguais. Mas a aceleração do carro (a=F/m) é 10x maior (mais prejudicial).", explanation: "F=ma: mesma força, menor massa = maior aceleração." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Em uma frenagem brusca, um passageiro sem cinto de segurança continuará se movendo para frente após o veículo parar, em decorrência da força de inércia.",
            answer: "CERTO",
            explanation: "Pela 1ª Lei de Newton (inércia), um corpo em movimento tende a continuar em movimento. Sem cinto, o passageiro continua se movendo para frente quando o veículo para abruptamente.",
          },
        ],
      },
    ],
  },

  // ─── DIREITO ADMINISTRATIVO ──────────────────────────────────────────────────
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
        highlights: [
          { type: "memorize", text: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência. Esses são os 5 princípios EXPRESSOS no art. 37 da CF. Os demais (razoabilidade, proporcionalidade, autotutela) são implícitos." },
          { type: "pegadinha", text: "Legalidade para a Adm. Pública é diferente da legalidade para o particular: o particular pode fazer tudo que a lei NÃO proíbe; a Adm. só pode fazer o que a lei PERMITE." },
        ],
        examples: [
          { label: "CERTO", sentence: "O princípio da eficiência foi inserido na Constituição Federal pela Emenda Constitucional n° 19, de 1998.", explanation: "Correto — antes da EC 19/1998 os princípios expressos eram apenas LIMP." },
          { label: "ERRADO", sentence: "Pelo princípio da legalidade, a Administração Pública pode fazer tudo que a lei não proíbe.", explanation: "Essa premissa vale para o PARTICULAR, não para a Adm. Pública. A Adm. só pode agir se a lei AUTORIZAR." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) O princípio da impessoalidade veda que o administrador público utilize a máquina estatal para promoção pessoal ou partidária.",
            answer: "CERTO",
            explanation: "A impessoalidade proíbe que o servidor use atos administrativos para promoção pessoal. O art. 37, §1° CF veda expressamente a propaganda que contenha nomes, símbolos ou imagens de autoridades.",
          },
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
        highlights: [
          { type: "memorize", text: "COMFIMO: Competência, Finalidade, Forma, Motivo, Objeto. Esses são os 5 elementos do ato. Só Competência, Finalidade e Forma são sempre vinculados." },
          { type: "pegadinha", text: "Revogação = ato VÁLIDO (mérito) → efeitos EX NUNC (só para frente). Anulação = ato INVÁLIDO (ilegal) → efeitos EX TUNC (retroage). A banca inverte os conceitos." },
        ],
        tables: [
          {
            title: "Revogação × Anulação",
            headers: ["Critério", "Revogação", "Anulação"],
            rows: [
              ["Motivo",       "Conveniência/oportunidade (mérito)", "Ilegalidade (vício de legalidade)"],
              ["Ato",         "Ato VÁLIDO",                        "Ato INVÁLIDO"],
              ["Efeitos",     "Ex nunc (não retroage)",            "Ex tunc (retroage à origem)"],
              ["Quem revoga", "Administração (poder de autotutela)", "Adm. ou Judiciário"],
              ["Direito adquirido", "Pode gerar",                  "Não gera (ato nulo)"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "A revogação de um ato administrativo produz efeitos apenas para o futuro, não atingindo situações já consolidadas.", explanation: "Efeito ex nunc — correto." },
          { label: "ERRADO", sentence: "A anulação de ato administrativo ilegal só pode ser feita pelo Poder Judiciário.", explanation: "A Administração também pode anular seus próprios atos (autotutela — Súmulas 346 e 473 do STF)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um ato administrativo discricionário praticado por agente competente, em conformidade com a lei e com a finalidade pública, pode ser revogado pela própria Administração por razões de conveniência e oportunidade.",
            answer: "CERTO",
            explanation: "O poder de autotutela permite que a Administração revogue atos válidos quando não mais convenientes. A discricionariedade não impede a revogação.",
          },
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
        highlights: [
          { type: "atencao", text: "DISPENSA ≠ INEXIGIBILIDADE. Dispensa: competição POSSÍVEL, mas dispensada por valor ou situação. Inexigibilidade: competição INVIÁVEL (exclusividade, singular)." },
          { type: "muito-cobrado", text: "Pregão é OBRIGATÓRIO para bens e serviços comuns. A outra modalidade comum é Concorrência (para obras e serviços de maior complexidade)." },
        ],
        examples: [
          { label: "CERTO", sentence: "A contratação de artista consagrado pela crítica especializada pode ser feita por inexigibilidade de licitação.", explanation: "Art. 74, III, d da Lei 14.133/2021." },
          { label: "ERRADO", sentence: "O pregão pode ser utilizado para a contratação de obras de engenharia de qualquer complexidade.", explanation: "O pregão é exclusivo para bens e serviços comuns. Para obras, usa-se Concorrência." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A inexigibilidade de licitação ocorre nas situações em que, embora viável a competição, o legislador optou por dispensar o procedimento licitatório.",
            answer: "ERRADO",
            explanation: "Essa é a definição de DISPENSA. Inexigibilidade ocorre quando a competição é INVIÁVEL — há apenas um fornecedor ou o objeto é singular e não permite comparação.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Estabilidade ≠ Efetividade. O servidor aprovado em concurso é EFETIVO desde a posse; a ESTABILIDADE vem após 3 anos de exercício + avaliação especial de desempenho." },
        ],
        examples: [
          { label: "CERTO", sentence: "O servidor efetivo adquire estabilidade após 3 anos de efetivo exercício, desde que aprovado em avaliação especial de desempenho.", explanation: "Art. 41 CF/88 com a redação da EC 19/98." },
          { label: "ERRADO", sentence: "O cargo em comissão exige aprovação em concurso público para sua investidura.", explanation: "Cargo em comissão é de livre nomeação (ad nutum) — não exige concurso." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um servidor público federal que ocupa cargo efetivo e que acumulou, de forma legal, outro cargo de magistério pode ser demitido sumariamente se cometer infração disciplinar grave.",
            answer: "ERRADO",
            explanation: "O servidor estável só pode ser demitido após processo administrativo disciplinar com ampla defesa e contraditório (art. 41, §1° CF). Não existe demissão sumária para servidor estável.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Estado = responsabilidade OBJETIVA (não precisa provar culpa). Agente = responsabilidade SUBJETIVA (precisa provar dolo ou culpa). A banca inverte os dois." },
          { type: "pegadinha", text: "Para omissão do Estado, o STF firmou que a responsabilidade é SUBJETIVA (precisa provar a culpa do serviço — faute du service). A responsabilidade objetiva é para ações (atos comissivos)." },
        ],
        examples: [
          { label: "CERTO", sentence: "Um cidadão atropelado por viatura policial em serviço pode ser indenizado pelo Estado independentemente de culpa.", explanation: "Responsabilidade objetiva do Estado — art. 37, §6° CF." },
          { label: "ERRADO", sentence: "O agente público que causa dano ao administrado com sua conduta responde objetivamente perante a vítima.", explanation: "O AGENTE responde SUBJETIVAMENTE (dolo ou culpa). É o ESTADO que responde objetivamente perante a vítima." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Em caso de dano causado por agente público no exercício de suas funções, o Estado responde de forma objetiva perante a vítima, podendo, posteriormente, acionar o agente regressivamente se ficar comprovado dolo ou culpa deste.",
            answer: "CERTO",
            explanation: "Art. 37, §6° CF: o Estado responde objetivamente (sem necessidade de provar culpa) perante a vítima. Em seguida, propõe ação de regresso contra o agente se comprovado dolo ou culpa.",
          },
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
        highlights: [
          { type: "atencao", text: "Mudança fundamental pela Lei 14.230/2021: CULPA não configura mais improbidade. Apenas DOLO. A banca vai afirmar que 'culpa configura improbidade' — ERRADO agora." },
          { type: "muito-cobrado", text: "Após 2021, somente o MINISTÉRIO PÚBLICO tem legitimidade para ajuizar ação de improbidade. O cidadão, associações e a Fazenda Pública perderam essa legitimidade." },
        ],
        examples: [
          { label: "CERTO", sentence: "Após a Lei 14.230/2021, somente o dolo configura ato de improbidade administrativa, sendo insuficiente a mera culpa.", explanation: "Mudança central da reforma de 2021." },
          { label: "ERRADO", sentence: "Qualquer cidadão pode ajuizar ação de improbidade administrativa contra servidor público.", explanation: "Após 2021, apenas o Ministério Público tem legitimidade ativa para a ação de improbidade." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Conforme a redação atual da Lei de Improbidade Administrativa, um servidor que, por negligência, causa dano ao erário pratica ato de improbidade administrativa.",
            answer: "ERRADO",
            explanation: "A Lei 14.230/2021 exige DOLO para configurar improbidade. A negligência (modalidade de culpa) não configura mais improbidade administrativa após essa reforma.",
          },
        ],
      },
    ],
  },

  // ─── DIREITO CONSTITUCIONAL ──────────────────────────────────────────────────
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
        highlights: [
          { type: "memorize", text: "FUNDAMENTOS (art. 1 — SCDVP): Soberania, Cidadania, Dignidade da pessoa humana, Valores sociais do trabalho e livre iniciativa, Pluralismo político. OBJETIVOS (art. 3): construir, garantir, erradicar, promover." },
          { type: "pegadinha", text: "Fundamentos ≠ Objetivos. 'Erradicar a pobreza' é OBJETIVO (art. 3), não fundamento. 'Soberania' é FUNDAMENTO (art. 1), não objetivo. A banca troca os dois." },
        ],
        tables: [
          {
            title: "Art. 1° × Art. 3° da CF/88",
            headers: ["Art. 1° — Fundamentos (SCDVP)", "Art. 3° — Objetivos"],
            rows: [
              ["Soberania",           "Construir sociedade livre, justa e solidária"],
              ["Cidadania",           "Garantir o desenvolvimento nacional"],
              ["Dignidade da pessoa humana", "Erradicar a pobreza e a marginalização"],
              ["Valores sociais do trabalho", "Reduzir as desigualdades sociais e regionais"],
              ["Pluralismo político", "Promover o bem de todos sem preconceitos"],
            ],
          },
        ],
        examples: [
          { label: "ERRADO", sentence: "A erradicação da pobreza é um dos fundamentos da República Federativa do Brasil.", explanation: "Erradicar a pobreza é um OBJETIVO (art. 3), não fundamento (art. 1)." },
          { label: "CERTO", sentence: "A dignidade da pessoa humana é um dos fundamentos da República, previsto no art. 1° da CF/88.", explanation: "Correto — é um dos 5 fundamentos do art. 1°." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) De acordo com a CF/88, a promoção do bem de todos sem preconceito de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação constitui objetivo fundamental da República.",
            answer: "CERTO",
            explanation: "Art. 3°, IV da CF/88: 'promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação' é um dos objetivos fundamentais.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Remédios constitucionais (art. 5°): HC (locomoção), MS (liquidez e certeza), MI (norma faltante), HD (dados pessoais), AP (patrimônio público). O CEBRASPE cobra qual remédio se aplica a cada situação." },
          { type: "pegadinha", text: "Mandado de Segurança tem prazo de 120 dias. Habeas Corpus é imprescritível. A banca afirma que o HC também tem prazo — ERRADO." },
        ],
        examples: [
          { label: "CERTO", sentence: "O Habeas Corpus pode ser impetrado por qualquer pessoa, em benefício próprio ou de terceiro, sem pagamento de custas.", explanation: "Art. 5°, LXVIII CF — gratuito e de legitimação ampla." },
          { label: "ERRADO", sentence: "O mandado de injunção é o remédio constitucional adequado para proteger dados pessoais constantes de registros governamentais.", explanation: "Para dados pessoais, o remédio é o Habeas Data (HD), não o Mandado de Injunção." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Um servidor público cujo salário foi reduzido ilegalmente, sem processo administrativo, deve impetrar habeas corpus para proteção de seu direito.",
            answer: "ERRADO",
            explanation: "Habeas corpus protege a liberdade de locomoção. Para direito líquido e certo violado por autoridade pública, o remédio correto é o Mandado de Segurança.",
          },
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
        highlights: [
          { type: "memorize", text: "Mnemônico dos remédios: HC = Habeas Corpus (locomoção); MS = Mandado Segurança (liquidez/certeza); MI = Mandado Injunção (omissão legislativa); HD = Habeas Data (dados); AP = Ação Popular (patrimônio)." },
          { type: "atencao", text: "Ação Popular: só CIDADÃO (precisa estar no gozo dos direitos políticos). Não pode ser proposta por pessoa jurídica nem por estrangeiro. Prazo: 5 anos." },
        ],
        tables: [
          {
            title: "Remédios constitucionais — resumo comparativo",
            headers: ["Remédio", "Protege", "Legitimidade ativa", "Prazo"],
            rows: [
              ["Habeas Corpus",  "Liberdade de locomoção", "Qualquer pessoa",       "Imprescritível"],
              ["Mand. Segurança","Direito líquido e certo","Qualquer interessado",  "120 dias"],
              ["Mand. Injunção", "Direito constitucional sem norma", "Titular do direito", "Imprescritível"],
              ["Habeas Data",    "Informações pessoais",  "Titular dos dados",     "Imprescritível"],
              ["Ação Popular",   "Patrimônio público",    "Cidadão (eleitor)",     "5 anos"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "O Mandado de Injunção é cabível quando a falta de norma regulamentadora tornar inviável o exercício de direito constitucional.", explanation: "Art. 5°, LXXI CF." },
          { label: "ERRADO", sentence: "A Ação Popular pode ser proposta por qualquer pessoa física, mesmo que estrangeira.", explanation: "AP exige ser CIDADÃO (eleitor em gozo dos direitos políticos). Estrangeiro não tem essa legitimidade." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O habeas corpus é o remédio adequado para impugnar ato de autoridade pública que afaste ilegalmente servidor de suas funções, sem processo administrativo.",
            answer: "ERRADO",
            explanation: "O afastamento ilegal de servidor não envolve liberdade de locomoção. O remédio correto é o Mandado de Segurança, para proteger direito líquido e certo.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "A PRF está prevista no art. 144, II da CF/88. Sua função constitucional é o PATRULHAMENTO OSTENSIVO das RODOVIAS FEDERAIS. Não julga, não investiga crimes em geral — fiscaliza rodovias." },
          { type: "pegadinha", text: "Polícia Penal (EC 104/2019) é órgão de segurança pública criado para a custódia de presos. O CEBRASPE pode perguntar se ela está no art. 144 — SIM, foi adicionada pela EC 104/2019." },
        ],
        examples: [
          { label: "CERTO", sentence: "A Polícia Rodoviária Federal tem previsão constitucional expressa no art. 144 da CF/88, com competência para o patrulhamento ostensivo das rodovias federais.", explanation: "Art. 144, II e §2° CF." },
          { label: "ERRADO", sentence: "A Polícia Civil é o órgão responsável pelo patrulhamento ostensivo em vias federais quando a PRF não está presente.", explanation: "A Polícia Civil é órgão estadual judiciário. O patrulhamento de rodovias federais é exclusivo da PRF." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) A Polícia Rodoviária Federal, além do patrulhamento ostensivo das rodovias federais, pode exercer funções de polícia judiciária em qualquer parte do território nacional.",
            answer: "ERRADO",
            explanation: "A PRF tem competência constitucional para o patrulhamento ostensivo das rodovias federais. Funções de polícia judiciária em geral são da Polícia Federal e Polícias Civis.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Controle DIFUSO é feito por qualquer juiz, tem efeito INTER PARTES (só entre as partes do processo). Controle CONCENTRADO é exclusivo do STF, efeito ERGA OMNES (para todos). A banca inverte os efeitos." },
        ],
        examples: [
          { label: "CERTO", sentence: "A ADI é ação que visa declarar a inconstitucionalidade de lei ou ato normativo federal ou estadual, com efeito vinculante e erga omnes.", explanation: "Correto — ADI é ação do controle concentrado no STF." },
          { label: "ERRADO", sentence: "No controle difuso de constitucionalidade, a decisão produz efeito erga omnes, atingindo todos os jurisdicionados.", explanation: "Controle difuso = efeito INTER PARTES (entre as partes). Erga omnes é do controle concentrado." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A arguição de descumprimento de preceito fundamental (ADPF) é ação de caráter subsidiário, cabível quando não houver outro meio eficaz para sanar a lesividade.",
            answer: "CERTO",
            explanation: "A ADPF tem natureza subsidiária (art. 4°, §1° da Lei 9.882/1999): só cabe quando não existir outro meio apto a sanar a inconstitucionalidade.",
          },
        ],
      },
    ],
  },

  // ─── DIREITO PENAL ──────────────────────────────────────────────────────────
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
        highlights: [
          { type: "memorize", text: "Excludentes de ILICITUDE (justificantes): Legítima defesa, Estado de necessidade, Estrito cumprimento do dever legal, Exercício regular do direito. Agente pratica fato típico, mas NÃO é crime." },
          { type: "pegadinha", text: "Excesso na legítima defesa é punível! Se o agente usa mais força do que o necessário para repelir a agressão, responde pelo excesso (doloso ou culposo)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O policial que usa a força necessária para deter um suspeito que o ataca com faca age em legítima defesa.", explanation: "Estrito cumprimento do dever legal ou legítima defesa — ambos excluem a ilicitude." },
          { label: "ERRADO", sentence: "O erro de tipo inevitável exclui a culpabilidade do agente.", explanation: "O erro de tipo inevitável exclui o DOLO e a CULPA, e portanto exclui a própria TIPICIDADE — não a culpabilidade." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O agente que pratica o crime em legítima defesa não comete crime, pois a ilicitude de sua conduta fica excluída.",
            answer: "CERTO",
            explanation: "A legítima defesa é causa excludente de ilicitude (art. 23, II CP). Sem ilicitude, não há crime (falta elemento necessário da tripartição).",
          },
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
        highlights: [
          { type: "pegadinha", text: "Desistência voluntária ≠ Tentativa. Na tentativa, o agente NÃO consegue consumar por causa alheia à sua vontade. Na desistência, ele PODE prosseguir, mas decide parar (ponte de ouro de Von Liszt)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O ladrão que entra na casa para furtar mas desiste voluntariamente antes de subtrair qualquer coisa pratica desistência voluntária e responde apenas pela violação de domicílio.", explanation: "Desistência voluntária = responde pelos atos já praticados." },
          { label: "ERRADO", sentence: "Crimes culposos admitem a forma tentada.", explanation: "Não é possível tentativa em crimes culposos, pois o agente não quer o resultado — falta o elemento subjetivo da tentativa." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Aquele que inicia a execução de um homicídio mas desiste voluntariamente de consumá-lo responde apenas pelos atos já praticados, e não pela tentativa de homicídio.",
            answer: "CERTO",
            explanation: "Art. 15 CP: na desistência voluntária e no arrependimento eficaz, o agente só responde pelos atos já praticados. É a chamada 'ponte de ouro'.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Latrocínio é julgado pelo JUIZ SINGULAR (vara criminal), não pelo Tribunal do Júri. O Júri julga apenas homicídios dolosos. Muitos candidatos erram isso." },
          { type: "muito-cobrado", text: "Feminicídio é QUALIFICADORA do homicídio (art. 121 §2°, VI CP). Não é crime autônomo — é homicídio doloso qualificado. Pena: 12 a 30 anos." },
        ],
        examples: [
          { label: "CERTO", sentence: "O latrocínio, embora resulte em morte, não é julgado pelo Tribunal do Júri, pois se trata de crime contra o patrimônio.", explanation: "Júri julga apenas crimes dolosos contra a vida." },
          { label: "ERRADO", sentence: "O furto qualificado praticado durante o repouso noturno tem pena de 1 a 4 anos.", explanation: "Furto qualificado tem pena de 2 a 8 anos (art. 155, §4° CP)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O crime de latrocínio deve ser julgado pelo Tribunal do Júri por resultar na morte da vítima.",
            answer: "ERRADO",
            explanation: "O Tribunal do Júri tem competência apenas para os crimes dolosos contra a vida (homicídio doloso, infanticídio, etc.). Latrocínio é crime contra o patrimônio — julgado pelo juiz singular.",
          },
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
        highlights: [
          { type: "pegadinha", text: "Peculato culposo TEM uma peculiaridade: se o servidor REPARA o dano antes da sentença irrecorrível, a pena é REDUZIDA À METADE. Se repara antes da denúncia, a punibilidade é EXTINTA." },
          { type: "memorize", text: "Corrupção PASSIVA = servidor que RECEBE. Corrupção ATIVA = particular que OFERECE. O servidor é passivo (recebe a corrupção); o particular é ativo (corrompe)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O policial que solicita propina para não multar um condutor infrator pratica corrupção passiva.", explanation: "Art. 317 CP: servidor que solicita ou recebe vantagem indevida." },
          { label: "ERRADO", sentence: "A prevaricação e a corrupção passiva têm a mesma pena mínima e máxima.", explanation: "Corrupção passiva: 2 a 12 anos. Prevaricação: 3 meses a 1 ano. São penas muito diferentes." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O crime de peculato culposo se extingue se o autor reparar o dano antes do oferecimento da denúncia.",
            answer: "CERTO",
            explanation: "Art. 312, §3° CP: 'No caso do parágrafo anterior, a reparação do dano, se precede à sentença irrecorrível, extingue a punibilidade; se lhe é posterior, reduz de metade a pena imposta.'",
          },
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
        highlights: [
          { type: "memorize", text: "Equiparados a hediondos (NÃO são hediondos, mas têm o mesmo tratamento): Tráfico de drogas, Tortura, Terrorismo (os '3 T's')." },
          { type: "atencao", text: "Progressão de regime nos crimes hediondos: réu primário = 40% da pena; reincidente em crime hediondo = 60%. Esses percentuais foram alterados pelo Pacote Anticrime (Lei 13.964/2019)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O tráfico de drogas não é considerado crime hediondo, mas é equiparado a hediondo pela CF/88.", explanation: "Art. 5°, XLIII CF: tráfico ilícito de entorpecentes é equiparado a hediondo." },
          { label: "ERRADO", sentence: "Em crimes hediondos, é vedada a liberdade provisória em qualquer hipótese.", explanation: "O STF declarou inconstitucional a vedação absoluta à liberdade provisória em crimes hediondos. Analisa-se caso a caso." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A tortura, o tráfico ilícito de entorpecentes e o terrorismo são crimes hediondos conforme a Lei 8.072/90.",
            answer: "ERRADO",
            explanation: "Tortura, tráfico e terrorismo são EQUIPARADOS a hediondos (art. 5°, XLIII CF), mas não são tecnicamente hediondos. Crimes hediondos são os listados na Lei 8.072/90.",
          },
        ],
      },
    ],
  },

  // ─── DIREITO PROCESSUAL PENAL ────────────────────────────────────────────────
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
        highlights: [
          { type: "muito-cobrado", text: "IP é procedimento ADMINISTRATIVO (não processo judicial). O delegado PRESIDE mas não julga. O MP é o titular da ação penal (não o delegado)." },
          { type: "pegadinha", text: "O DELEGADO não pode arquivar o inquérito — isso cabe ao JUIZ, a pedido do MP. Se o MP requer o arquivamento e o juiz discorda, remete ao PGR/PGJ." },
        ],
        examples: [
          { label: "CERTO", sentence: "O inquérito policial pode ser dispensado quando o MP dispuser de elementos suficientes para oferecer a denúncia.", explanation: "O IP é dispensável — o MP pode oferecer denúncia com base em outros elementos de prova." },
          { label: "ERRADO", sentence: "O delegado de polícia pode determinar o arquivamento do inquérito policial quando entender que não há indícios de autoria.", explanation: "O arquivamento do IP compete ao JUIZ, mediante requerimento do MP — nunca ao delegado." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O inquérito policial tem natureza jurisdicional, razão pela qual as provas nele produzidas têm o mesmo valor das provas judiciais.",
            answer: "ERRADO",
            explanation: "O inquérito policial tem natureza ADMINISTRATIVA (pré-processual), não jurisdicional. As provas do IP servem de base para o oferecimento da denúncia, mas devem ser repetidas em juízo sob contraditório.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Teoria dos frutos da árvore envenenada: prova ilícita contamina as derivadas. Ex: confissão obtida sob tortura + localização do cadáver com base na confissão → ambas ilícitas." },
          { type: "pegadinha", text: "'In dubio pro reo' é na instrução (absolvição). 'In dubio pro societate' é na fase de pronúncia no Júri (manda a julgamento). Não confundir os momentos." },
        ],
        examples: [
          { label: "CERTO", sentence: "A prova obtida por meio de interceptação telefônica sem autorização judicial é ilícita e deve ser desentranhada dos autos.", explanation: "Art. 5°, LVI CF: são inadmissíveis as provas obtidas por meios ilícitos." },
          { label: "ERRADO", sentence: "A confissão do réu, por si só, é suficiente para embasar uma condenação criminal.", explanation: "A confissão não é rainha das provas. O juiz pode absolver mesmo com confissão se não houver outros elementos de convicção (sistema do livre convencimento motivado)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Uma prova lícita descoberta exclusivamente a partir de uma confissão obtida mediante tortura é considerada prova ilícita por derivação.",
            answer: "CERTO",
            explanation: "Teoria dos frutos da árvore envenenada (art. 157, §1° CPP): são inadmissíveis as provas derivadas das ilícitas, salvo quando não evidenciado o nexo de causalidade ou quando puderem ser obtidas por uma fonte independente.",
          },
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
        highlights: [
          { type: "memorize", text: "Espécies de flagrante: (1) Próprio (cometendo ou acabou de cometer); (2) Impróprio (perseguido logo após); (3) Presumido/Ficto (encontrado com instrumentos do crime pouco depois)." },
          { type: "atencao", text: "Prisão temporária tem prazo FIXO (5+5 dias; hediondos: 30+30). Preventiva não tem prazo fixo. Se não houver justificativa para a preventiva, o réu deve ser solto." },
        ],
        tables: [
          {
            title: "Espécies de prisão processual",
            headers: ["Espécie", "Prazo", "Autoridade", "Característica"],
            rows: [
              ["Flagrante",    "Até 24h (lavra auto)", "Policial (até delegado)", "Preso em ato/logo após"],
              ["Temporária",  "5+5 dias (30+30 hediondo)", "Juiz (a pedido)", "Investigação de crimes graves"],
              ["Preventiva",  "Sem prazo fixo",       "Juiz",              "Ordem pública, instrução, lei penal"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "A prisão em flagrante presumido ocorre quando o suspeito é encontrado, pouco tempo depois do crime, com objetos que indiquem ser ele o autor.", explanation: "Art. 302, IV CPP — flagrante ficto ou presumido." },
          { label: "ERRADO", sentence: "A prisão preventiva pode ser decretada de ofício pelo juiz a qualquer tempo, mesmo sem requerimento do MP.", explanation: "Após o Pacote Anticrime (Lei 13.964/2019), a preventiva não pode ser decretada de ofício pelo juiz — exige requerimento do MP, delegado ou querelante." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A prisão temporária pode ser decretada pelo juiz de ofício, independentemente de representação da autoridade policial ou requerimento do Ministério Público.",
            answer: "ERRADO",
            explanation: "A prisão temporária exige representação da autoridade policial OU requerimento do MP (Lei 7.960/89, art. 3°). O juiz não pode decretá-la de ofício.",
          },
        ],
      },
    ],
  },

  // ─── LEGISLAÇÃO ESPECIAL PRF ─────────────────────────────────────────────────
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
        highlights: [
          { type: "pegadinha", text: "PRF NÃO é subordinada à Polícia Federal. São órgãos distintos, ambos vinculados ao MJSP. O CEBRASPE afirma que 'a PRF é subordinada à PF' — ERRADO." },
        ],
        examples: [
          { label: "CERTO", sentence: "A Polícia Rodoviária Federal é órgão autônomo, distinto da Polícia Federal, ambos vinculados ao Ministério da Justiça.", explanation: "Correto — são carreiras e órgãos distintos." },
          { label: "ERRADO", sentence: "O Policial Rodoviário Federal exerce suas funções em qualquer via pública do território nacional.", explanation: "A PRF atua principalmente nas RODOVIAS FEDERAIS." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) A Polícia Rodoviária Federal é subordinada hierarquicamente à Polícia Federal no exercício de suas atribuições constitucionais.",
            answer: "ERRADO",
            explanation: "PRF e PF são órgãos autônomos e distintos. Ambos são vinculados ao Ministério da Justiça e Segurança Pública, mas não há subordinação da PRF à PF.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Usuário (art. 28): NÃO há pena privativa de liberdade — apenas advertência, prestação de serviços ou medida educativa. O CEBRASPE afirma que o usuário 'pode ser preso' — ERRADO." },
          { type: "pegadinha", text: "Tráfico privilegiado (§4° do art. 33) PODE ser reconhecido mesmo se o réu for preso com quantidade razoável de droga, desde que atendidos os requisitos (primário, bons antecedentes, não integra organização)." },
        ],
        examples: [
          { label: "CERTO", sentence: "O usuário de drogas, nos termos do art. 28 da Lei 11.343/2006, não está sujeito à pena privativa de liberdade.", explanation: "Art. 28 prevê advertência, prestação de serviços e medida educativa — sem prisão." },
          { label: "ERRADO", sentence: "O tráfico de drogas é crime hediondo, nos termos da Lei 8.072/90.", explanation: "Tráfico é EQUIPARADO a hediondo (art. 5°, XLIII CF), mas NÃO consta na lista da Lei 8.072/90. A distinção é técnica mas cobrada." },
        ],
        exercises: [
          {
            question: "(CEBRASPE – PRF) Conforme a Lei 11.343/2006, o porte de droga para consumo pessoal é conduta penalmente descriminalizada.",
            answer: "ERRADO",
            explanation: "O porte para uso pessoal (art. 28) foi DESPENALIZADO (sem pena privativa de liberdade), mas NÃO descriminalizado — continua sendo conduta ilícita e sujeita a sanções (advertência, prestação de serviços, medida educativa).",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Abuso de autoridade exige DOLO ESPECÍFICO: prejudicar outrem, beneficiar a si ou terceiro, ou capricho/satisfação pessoal. Ato praticado por erro ou negligência NÃO configura abuso." },
          { type: "atencao", text: "A Lei 13.869/2019 criou novos crimes e trouxe conflitos com o exercício policial. O agente que atua dentro dos limites legais NÃO pratica abuso — o excludente de ilicitude ('estrito cumprimento do dever legal') se aplica." },
        ],
        examples: [
          { label: "CERTO", sentence: "Um policial que prende alguém em flagrante de forma legal não pratica abuso de autoridade, mesmo que o preso reclame do procedimento.", explanation: "Cumprimento do dever legal exclui a ilicitude do abuso de autoridade." },
          { label: "ERRADO", sentence: "O abuso de autoridade pode ser cometido de forma culposa, bastando a imprudência ou negligência do agente.", explanation: "O art. 1°, §1° da Lei 13.869/2019 exige dolo específico. Culpa não configura abuso de autoridade." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O policial que, por excesso de cautela e sem má-fé, mantém preso por 2 horas a mais um suspeito que deveria ter sido solto pratica crime de abuso de autoridade.",
            answer: "ERRADO",
            explanation: "O abuso de autoridade exige dolo específico de prejudicar, beneficiar ou por capricho. O mero excesso por cautela, sem esse elemento subjetivo específico, não configura o crime.",
          },
        ],
      },
      {
        id: "le-estatuto-crianca",
        title: "ECA — Estatuto da Criança e do Adolescente",
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
        highlights: [
          { type: "pegadinha", text: "Criança = até 12 anos INCOMPLETOS (antes do aniversário de 12 anos). Com 12 anos feitos, já é adolescente. A banca afirma 'até 12 anos' sem especificar 'incompletos'." },
          { type: "atencao", text: "Internação: prazo máximo de 3 anos para o mesmo ato infracional. Mas o adolescente é liberado compulsoriamente aos 21 anos, independentemente do saldo de internação." },
        ],
        examples: [
          { label: "CERTO", sentence: "O adolescente com 16 anos que comete homicídio pratica ato infracional análogo a crime, sujeito a medidas socioeducativas, e não à pena criminal.", explanation: "Menor de 18 anos é inimputável — responde pelo ECA." },
          { label: "ERRADO", sentence: "A internação do adolescente infrator pode durar até 5 anos.", explanation: "A internação tem prazo máximo de 3 anos pelo mesmo ato infracional (art. 121, §3° ECA)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O Conselho Tutelar é órgão integrante do Poder Judiciário, responsável por zelar pelo cumprimento dos direitos da criança e do adolescente.",
            answer: "ERRADO",
            explanation: "O Conselho Tutelar é órgão autônomo, de caráter não jurisdicional, vinculado ao município (não ao Poder Judiciário). Tem natureza administrativa.",
          },
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
        highlights: [
          { type: "atencao", text: "Interceptação sem autorização judicial = crime de 2 a 4 anos + nulidade da prova. A prova obtida também é ilícita (fruto da árvore envenenada)." },
          { type: "pegadinha", text: "Gravação clandestina (um dos interlocutores grava) ≠ interceptação (terceiro capta). Gravação clandestina em geral pode ser usada como prova, especialmente em legítima defesa." },
        ],
        examples: [
          { label: "CERTO", sentence: "A interceptação telefônica somente pode ser autorizada para investigação de crime punido com reclusão.", explanation: "Art. 2°, III da Lei 9.296/96 — crimes punidos apenas com detenção não admitem interceptação." },
          { label: "ERRADO", sentence: "A interceptação telefônica pode ser determinada por delegado de polícia em caso de urgência.", explanation: "A interceptação SEMPRE exige autorização JUDICIAL — nunca pode ser determinada pelo delegado." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Conforme a Lei 9.296/1996, a interceptação de comunicações telefônicas pode ser autorizada para investigar crimes punidos com detenção.",
            answer: "ERRADO",
            explanation: "Art. 2°, III da Lei 9.296/96: não será admitida interceptação quando o fato investigado constituir infração penal punida, no máximo, com pena de detenção. Apenas crimes punidos com reclusão admitem interceptação.",
          },
        ],
      },
    ],
  },

  // ─── DIREITOS HUMANOS ────────────────────────────────────────────────────────
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
        highlights: [
          { type: "memorize", text: "1ª geração = LIBERDADE (civis e políticos — 'não fazer' do Estado). 2ª geração = IGUALDADE (sociais — 'fazer' do Estado). 3ª geração = FRATERNIDADE (coletivos/difusos)." },
          { type: "pegadinha", text: "Direitos de 1ª geração são 'negativos' porque exigem que o Estado se ABSTENHA (não torture, não prenda ilegalmente). Não são 'negativos' por serem ruins." },
        ],
        examples: [
          { label: "CERTO", sentence: "O direito à educação é classificado como direito de segunda geração, de natureza positiva, pois exige prestação do Estado.", explanation: "2ª geração = direitos sociais, que exigem ação do Estado." },
          { label: "ERRADO", sentence: "A liberdade de expressão é direito de segunda geração.", explanation: "Liberdade de expressão é direito civil (1ª geração), de natureza negativa." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Os direitos de terceira geração são chamados de direitos negativos por exigirem uma abstenção do Estado.",
            answer: "ERRADO",
            explanation: "Direitos NEGATIVOS são os de 1ª geração (civis e políticos), que exigem abstenção do Estado. Os de 3ª geração (fraternidade) são direitos coletivos e difusos, como o direito ao meio ambiente.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "A DUDH NÃO é tratado — não tem força vinculante formal. É uma resolução da Assembleia Geral da ONU. Para ter força de lei, são necessários os tratados (Pactos de 1966)." },
          { type: "memorize", text: "Data: 10 de dezembro de 1948. Resolução 217-A. 30 artigos. Dia 10 de dezembro = Dia Internacional dos Direitos Humanos." },
        ],
        examples: [
          { label: "CERTO", sentence: "A Declaração Universal dos Direitos Humanos foi adotada como resolução da Assembleia Geral da ONU, não tendo, portanto, força normativa vinculante formal.", explanation: "Correto — é soft law, não hard law (tratado)." },
          { label: "ERRADO", sentence: "A DUDH é um tratado internacional que obriga os Estados a cumprirem suas disposições sob pena de sanções.", explanation: "A DUDH é resolução (não tratado) e não prevê sanções. A força vinculante vem dos tratados posteriores." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A Declaração Universal dos Direitos Humanos, por ser um tratado internacional, vincula juridicamente todos os Estados-membros da ONU.",
            answer: "ERRADO",
            explanation: "A DUDH é uma resolução da Assembleia Geral da ONU, não um tratado. Portanto, não tem força vinculante formal de um tratado. Tratados de DH vinculantes são o PIDCP e o PIDESC (1966).",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Hierarquia da CADH no Brasil (STF — RE 349.703): SUPRALEGAL. Está acima das leis ordinárias mas abaixo da CF. Por isso a prisão civil por dívida foi abolida (a CADH a proíbe, exceto alimentos)." },
          { type: "atencao", text: "Comissão IDH ≠ Corte IDH. A Comissão recebe denúncias, investiga e pode encaminhar à Corte. A Corte julga e emite sentenças vinculantes. O Brasil só reconheceu a jurisdição da Corte em 1998." },
        ],
        examples: [
          { label: "CERTO", sentence: "A Convenção Americana de Direitos Humanos tem hierarquia supralegal no Brasil, estando acima das leis ordinárias e abaixo da Constituição Federal.", explanation: "STF (RE 349.703): tratados de DH não aprovados pelo rito especial têm status supralegal." },
          { label: "ERRADO", sentence: "A Corte Interamericana de Direitos Humanos integra o sistema onusiano de proteção.", explanation: "A Corte IDH integra o sistema INTERAMERICANO (OEA), não o sistema da ONU (onusiano)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) A Comissão Interamericana de Direitos Humanos tem competência para julgar e emitir sentenças vinculantes contra os Estados que violem direitos humanos.",
            answer: "ERRADO",
            explanation: "Quem julga e emite sentenças vinculantes é a CORTE IDH. A Comissão tem função investigativa e pode encaminhar casos à Corte, mas não emite sentenças.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Súmula Vinculante 11 do STF: algemas só podem ser usadas em caso de resistência e de fundado receio de fuga ou de perigo à integridade física própria ou alheia. Uso abusivo = abuso de autoridade." },
          { type: "memorize", text: "Tortura: proibição ABSOLUTA (jus cogens — norma imperativa do direito internacional). Não admite exceção, nem em estado de guerra, emergência ou qualquer outra circunstância." },
        ],
        examples: [
          { label: "CERTO", sentence: "O uso de algemas pelo policial é permitido apenas em situações de resistência do detento ou perigo à segurança, conforme a Súmula Vinculante 11 do STF.", explanation: "SV 11 STF." },
          { label: "ERRADO", sentence: "Em situações de guerra, a proibição da tortura pode ser temporariamente suspensa por decreto de emergência.", explanation: "A proibição da tortura é absoluta (jus cogens) — não admite derrogação em nenhuma circunstância, nem em guerra ou emergência." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) Segundo a Súmula Vinculante n° 11 do STF, o uso de algemas em presos é sempre obrigatório para garantir a segurança dos agentes.",
            answer: "ERRADO",
            explanation: "A SV 11 estabelece que o uso de algemas é EXCEPCIONAL — permitido apenas em caso de resistência ou fundado receio de fuga ou perigo à integridade física. O uso indiscriminado configura abuso de autoridade.",
          },
        ],
      },
    ],
  },

  // ─── INFORMÁTICA ─────────────────────────────────────────────────────────────
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
        highlights: [
          { type: "pegadinha", text: "RAM é VOLÁTIL (perde dados ao desligar). HD/SSD são NÃO-VOLÁTEIS (guardam dados permanentemente). A banca troca os conceitos." },
          { type: "memorize", text: "Periférico de ENTRADA: teclado, mouse, scanner, microfone, webcam, joystick. Periférico de SAÍDA: monitor, impressora, som. ENTRADA+SAÍDA: touchscreen, pen drive, modem." },
        ],
        examples: [
          { label: "CERTO", sentence: "A memória RAM é volátil, perdendo seu conteúdo quando o computador é desligado.", explanation: "RAM = Random Access Memory = memória de trabalho, volátil." },
          { label: "ERRADO", sentence: "O SSD é um tipo de memória RAM de alta capacidade.", explanation: "SSD é armazenamento secundário (não volátil), não é RAM." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O HD (Hard Disk) armazena dados de forma volátil, perdendo as informações quando o computador é desligado.",
            answer: "ERRADO",
            explanation: "O HD é memória secundária NÃO VOLÁTIL — mantém os dados mesmo sem energia. A memória VOLÁTIL é a RAM.",
          },
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
        highlights: [
          { type: "dica", text: "Atalhos Windows mais cobrados: Ctrl+C (copiar), Ctrl+V (colar), Ctrl+Z (desfazer), Ctrl+Alt+Del (segurança/tarefas), Win+L (bloquear tela), Alt+F4 (fechar)." },
        ],
        examples: [
          { label: "CERTO", sentence: "No Linux, o comando 'ls' lista os arquivos e diretórios do diretório atual.", explanation: "Equivalente ao 'dir' do CMD do Windows." },
          { label: "ERRADO", sentence: "O sistema operacional Linux é pago e proprietário da empresa RedHat.", explanation: "Linux é open-source e gratuito. A RedHat é uma das empresas que oferecem distribuições comerciais, mas o kernel Linux em si é livre." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O sistema de arquivos NTFS é utilizado nativamente pelo sistema operacional Linux.",
            answer: "ERRADO",
            explanation: "NTFS é o sistema de arquivos padrão do Windows. O Linux utiliza nativamente ext4 (ou ext2/ext3). O Linux PODE ler NTFS, mas não o usa nativamente.",
          },
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
        highlights: [
          { type: "muito-cobrado", text: "Referência absoluta no Excel: $A$1 — o $ trava a linha e/ou coluna ao copiar a fórmula. $A1 = trava só a coluna; A$1 = trava só a linha; $A$1 = trava os dois." },
          { type: "dica", text: "Função SE: =SE(condição; valor_se_verdadeiro; valor_se_falso). Exemplo: =SE(B2>=5;\"Aprovado\";\"Reprovado\"). Pode ser aninhada até 64 níveis." },
        ],
        examples: [
          { label: "CERTO", sentence: "No Excel, a fórmula =SOMA(A1:A5) soma os valores das células A1, A2, A3, A4 e A5.", explanation: "O operador ':' indica intervalo." },
          { label: "ERRADO", sentence: "No Word, o atalho Ctrl+B serve para salvar o documento.", explanation: "Ctrl+B = negrito (Bold). Para salvar: Ctrl+S (Save)." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) No Microsoft Excel, ao inserir a fórmula =SE(A1>100;\"Alto\";\"Baixo\"), se o valor em A1 for 50, o resultado exibido será 'Alto'.",
            answer: "ERRADO",
            explanation: "50 não é maior que 100, portanto a condição é FALSA e o resultado é o terceiro argumento: 'Baixo'.",
          },
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
          "DNS: converte domínios (google.com) em endereços IP",
          "SMTP: envio de e-mail; POP3: recebimento (baixa e apaga); IMAP: acesso sincronizado",
          "IPv4: 32 bits (4 grupos de até 3 dígitos); IPv6: 128 bits (8 grupos hexadecimais)",
          "Firewall: controla tráfego de rede; VPN: rede privada virtual (criptografada)",
          "Wi-Fi: padrão IEEE 802.11; Ethernet: cabo — IEEE 802.3",
        ],
        highlights: [
          { type: "muito-cobrado", text: "HTTP (porta 80) vs HTTPS (porta 443): HTTPS usa criptografia TLS/SSL. Sites com HTTPS têm o cadeado no navegador. O CEBRASPE cobra a diferença de segurança." },
          { type: "pegadinha", text: "POP3 baixa os e-mails e os remove do servidor. IMAP mantém os e-mails no servidor e sincroniza em vários dispositivos. A banca troca as definições." },
        ],
        tables: [
          {
            title: "Protocolos de rede e suas funções",
            headers: ["Protocolo", "Porta", "Função"],
            rows: [
              ["HTTP",  "80",  "Transferência de páginas web (sem criptografia)"],
              ["HTTPS", "443", "HTTP seguro (com criptografia TLS/SSL)"],
              ["FTP",   "21",  "Transferência de arquivos"],
              ["SMTP",  "25",  "Envio de e-mail"],
              ["POP3",  "110", "Recebimento de e-mail (remove do servidor)"],
              ["IMAP",  "143", "Recebimento de e-mail (mantém no servidor)"],
              ["DNS",   "53",  "Resolução de nomes de domínio para IP"],
              ["DHCP",  "67/68","Configuração automática de IP"],
            ],
          },
        ],
        examples: [
          { label: "CERTO", sentence: "O protocolo HTTPS utiliza criptografia para proteger a comunicação entre o navegador e o servidor web.", explanation: "HTTPS = HTTP + TLS/SSL = comunicação segura." },
          { label: "ERRADO", sentence: "O protocolo POP3 mantém os e-mails no servidor para acesso sincronizado em múltiplos dispositivos.", explanation: "POP3 baixa os e-mails e remove do servidor. Quem mantém sincronizado é o IMAP." },
        ],
        exercises: [
          {
            question: "(CEBRASPE) O protocolo DNS é responsável pelo envio seguro de e-mails entre servidores de correio eletrônico.",
            answer: "ERRADO",
            explanation: "DNS (Domain Name System) resolve nomes de domínio para endereços IP. O protocolo responsável pelo envio de e-mails é o SMTP.",
          },
        ],
      },
    ],
  },
];
