export interface OrdemTopico {
  topicId: string;
  ordem: number;
  motivo: string;
}

export interface OrdemMateria {
  subjectId: string;
  topicos: OrdemTopico[];
}

/**
 * Ordem de estudo recomendada dentro de cada matéria — do assunto que
 * deve ser estudado primeiro (base necessária pros outros) até o que
 * pode/deve ficar por último. Não é sobre qual matéria pesa mais na
 * prova, é sobre a sequência didática dentro de cada uma.
 */
export const ORDEM_ESTUDO: OrdemMateria[] = [
  {
    subjectId: "portugues",
    topicos: [
      { topicId: "port-morfologia", ordem: 1, motivo: "Base de tudo: classes de palavras, pronomes, preposições. Sem isso, sintaxe e crase ficam difíceis de entender." },
      { topicId: "port-sintaxe", ordem: 2, motivo: "Concordância e regência dependem de já saber identificar sujeito, verbo e complementos." },
      { topicId: "port-crase", ordem: 3, motivo: "Depois de dominar regência, a crase fica muito mais lógica — é regência + artigo feminino." },
      { topicId: "port-pontuacao", ordem: 4, motivo: "A vírgula só faz sentido quando você já enxerga a estrutura sintática da frase." },
      { topicId: "port-coesao", ordem: 5, motivo: "Conectivos e coerência textual são mais fáceis depois de dominar a gramática da frase." },
      { topicId: "port-interpretacao", ordem: 6, motivo: "Teoria por último, mas pratique interpretação de texto desde o primeiro dia — é a parte que mais cai." },
    ],
  },
  {
    subjectId: "raciocinio-logico",
    topicos: [
      { topicId: "rl-proposicoes", ordem: 1, motivo: "Proposições e conectivos lógicos são a base de tudo em Raciocínio Lógico." },
      { topicId: "rl-negacao", ordem: 2, motivo: "Negação e equivalência dependem diretamente do que você aprendeu em proposições." },
      { topicId: "rl-combinatoria", ordem: 3, motivo: "Contagem é um bloco mais independente, bom para intercalar com a teoria de proposições." },
      { topicId: "rl-probabilidade", ordem: 4, motivo: "Probabilidade usa muito dos conceitos de combinatória — estude depois dela." },
      { topicId: "rl-raciocinio-sequencias", ordem: 5, motivo: "PA e PG são mais 'matemática pura' — fica bem para o final, exige menos dos blocos anteriores." },
    ],
  },
  {
    subjectId: "legislacao-transito",
    topicos: [
      { topicId: "ctb-snf", ordem: 1, motivo: "Entender o Sistema Nacional de Trânsito e seus órgãos é a base para tudo que vem depois no CTB." },
      { topicId: "ctb-circulacao", ordem: 2, motivo: "As regras de circulação são a referência que define o que vira infração mais adiante." },
      { topicId: "ctb-infracoes", ordem: 3, motivo: "Matéria mais cobrada da prova — estude assim que tiver a base de circulação." },
      { topicId: "ctb-alcool", ordem: 4, motivo: "É uma infração específica de altíssima incidência — aprofunde logo depois do geral de infrações." },
      { topicId: "ctb-habilitacao", ordem: 5, motivo: "Categorias, pontos e suspensão da CNH conectam diretamente com o que você já viu em infrações." },
      { topicId: "ctb-crimes", ordem: 6, motivo: "Os crimes de trânsito são a parte mais densa (penas, artigos do Código Penal) — deixe para quando já tiver a base pronta." },
    ],
  },
  {
    subjectId: "fisica",
    topicos: [
      { topicId: "fis-cinematica", ordem: 1, motivo: "Velocidade média e conversões de unidade são a base de toda a física de trânsito." },
      { topicId: "fis-forcas", ordem: 2, motivo: "As Leis de Newton explicam o 'porquê' por trás da frenagem — ajuda a entender os próximos tópicos." },
      { topicId: "fis-mruv", ordem: 3, motivo: "MRUV usa diretamente cinemática e o conceito de força/aceleração." },
      { topicId: "fis-reacao-frenagem", ordem: 4, motivo: "É uma aplicação direta do MRUV — estude logo em seguida." },
      { topicId: "fis-energia-colisao", ordem: 5, motivo: "Energia cinética e colisões é o bloco mais integrador — deixe por último, junta tudo que veio antes." },
    ],
  },
  {
    subjectId: "dir-administrativo",
    topicos: [
      { topicId: "da-principios", ordem: 1, motivo: "Os princípios (LIMPE) aparecem embutidos em quase toda questão de Administrativo — comece por eles." },
      { topicId: "da-atos", ordem: 2, motivo: "Atos administrativos é o conceito central da matéria, usado como base para os próximos tópicos." },
      { topicId: "da-licitacao", ordem: 3, motivo: "Licitação é uma aplicação prática dos princípios e atos que você acabou de ver." },
      { topicId: "da-agentes", ordem: 4, motivo: "Agentes públicos conecta com atos administrativos (quem pratica o ato)." },
      { topicId: "da-responsabilidade", ordem: 5, motivo: "Responsabilidade civil do Estado depende de entender agentes públicos e atos administrativos." },
      { topicId: "da-improbidade", ordem: 6, motivo: "É o tópico mais denso e integrador — junta agentes, responsabilidade e sanções. Deixe por último." },
    ],
  },
  {
    subjectId: "dir-constitucional",
    topicos: [
      { topicId: "dc-principios", ordem: 1, motivo: "Os fundamentos da CF/88 (arts. 1º a 4º) são a porta de entrada da matéria." },
      { topicId: "dc-direitos", ordem: 2, motivo: "Direitos e garantias fundamentais é o bloco mais extenso e mais cobrado — estude cedo, com calma." },
      { topicId: "dc-remedios", ordem: 3, motivo: "Os remédios constitucionais só fazem sentido depois de entender quais direitos eles protegem." },
      { topicId: "dc-controle", ordem: 4, motivo: "Controle de constitucionalidade é mais abstrato — exige memorização, então intercale com revisão." },
      { topicId: "dc-segpublica", ordem: 5, motivo: "Art. 144 é bastante específico da PRF — vale fechar a matéria consolidando esse ponto direto ao seu cargo." },
    ],
  },
  {
    subjectId: "dir-penal",
    topicos: [
      { topicId: "dp-teoria-crime", ordem: 1, motivo: "Fato típico, ilícito e culpável é a base conceitual de todo o Direito Penal." },
      { topicId: "dp-iter", ordem: 2, motivo: "Iter criminis e tentativa dependem diretamente da teoria do crime." },
      { topicId: "dp-crimes-especie", ordem: 3, motivo: "Crimes contra pessoa e patrimônio são os mais cobrados — estude com a base pronta." },
      { topicId: "dp-crimes-adm", ordem: 4, motivo: "Crimes contra a administração pública é um bloco mais específico, de menor incidência." },
      { topicId: "dp-hediondos", ordem: 5, motivo: "Hediondos é um regime especial que se aplica aos crimes já vistos — feche a matéria com ele." },
    ],
  },
  {
    subjectId: "dir-processual-penal",
    topicos: [
      { topicId: "dpp-prisoes", ordem: 1, motivo: "Prisão em flagrante, temporária e preventiva são o dia a dia da PRF — comece por aqui." },
      { topicId: "dpp-inquerito", ordem: 2, motivo: "O inquérito policial é a primeira fase do processo penal, conecta direto com as prisões." },
      { topicId: "dpp-provas", ordem: 3, motivo: "Teoria da prova é mais abstrata e conceitual — bom para fechar a matéria." },
    ],
  },
  {
    subjectId: "legislacao-especial",
    topicos: [
      { topicId: "le-lei-prf", ordem: 1, motivo: "Entender a própria PRF (criação, competências) é a base institucional da matéria." },
      { topicId: "le-drogas", ordem: 2, motivo: "Lei de Drogas tem alta incidência em prova e conecta com o trabalho da PRF nas rodovias." },
      { topicId: "le-abuso-autoridade", ordem: 3, motivo: "Abuso de autoridade é essencial para quem vai exercer poder de polícia." },
      { topicId: "le-estatuto-crianca", ordem: 4, motivo: "ECA é mais específico — mas ainda assim recorrente em questões de abordagem." },
      { topicId: "le-interceptacao", ordem: 5, motivo: "Interceptação telefônica é o tópico mais técnico e menos recorrente — deixe por último." },
    ],
  },
  {
    subjectId: "direitos-humanos",
    topicos: [
      { topicId: "dh-conceito", ordem: 1, motivo: "As gerações de direitos humanos dão o contexto histórico para todo o resto da matéria." },
      { topicId: "dh-dudh", ordem: 2, motivo: "A Declaração Universal é a referência central, construída sobre o que você viu em conceito." },
      { topicId: "dh-sistema-interamericano", ordem: 3, motivo: "O sistema interamericano aprofunda a proteção de direitos no contexto do Brasil." },
      { topicId: "dh-atividade-policial", ordem: 4, motivo: "É o tópico mais aplicado à rotina da PRF — feche a matéria conectando teoria e prática." },
    ],
  },
  {
    subjectId: "informatica",
    topicos: [
      { topicId: "inf-hardware", ordem: 1, motivo: "Hardware é o conceito mais básico — componentes físicos do computador." },
      { topicId: "inf-windows", ordem: 2, motivo: "Sistemas operacionais organizam o hardware — sequência natural depois de hardware." },
      { topicId: "inf-pacote-office", ordem: 3, motivo: "Word, Excel e PowerPoint rodam sobre o sistema operacional que você acabou de ver." },
      { topicId: "inf-internet", ordem: 4, motivo: "Redes e protocolos costumam ter mais questões técnicas — bom para fechar com atenção redobrada." },
    ],
  },
];

export function getOrdemMateria(subjectId: string): OrdemTopico[] | undefined {
  return ORDEM_ESTUDO.find((m) => m.subjectId === subjectId)?.topicos;
}
