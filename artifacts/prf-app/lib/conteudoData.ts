export type HighlightType = 'atencao' | 'pegadinha' | 'muito_cobrado' | 'memorize' | 'dica_banca';

export interface HighlightBox {
  type: HighlightType;
  text: string;
}

export interface ExemploItem {
  title?: string;
  correct?: string;
  incorrect?: string;
  explanation: string;
}

export interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface Exercicio {
  enunciado: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  fonte?: string;
}

export interface TopicItem {
  id: string;
  title: string;
  incidencia: 'alta' | 'média' | 'baixa';
  content: string;
  keyPoints: string[];
  highlights?: HighlightBox[];
  examples?: ExemploItem[];
  tables?: TableData[];
  exercises?: Exercicio[];
}

export interface ConteudoSubject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  topics: TopicItem[];
}

export const CONTEUDO_SUBJECTS: ConteudoSubject[] = [
  // ─── 1. LÍNGUA PORTUGUESA ───────────────────────────────────────────────────
  {
    id: 'portugues',
    name: 'Língua Portuguesa',
    icon: 'book',
    color: '#1565C0',
    description: 'Interpretação, gramática e redação para concursos PRF',
    topics: [
      {
        id: 'port-interpretacao',
        title: 'Interpretação de Texto',
        incidencia: 'alta',
        content:
          'Interpretação de texto é o tema mais cobrado em Língua Portuguesa na PRF. O CEBRASPE usa questões do tipo CERTO ou ERRADO sobre fragmentos de textos autênticos.\n\nO candidato deve identificar: (1) a ideia central do texto, (2) o ponto de vista do autor, (3) inferências que o texto permite — e as que ele não permite.\n\nLeia o texto inteiro antes de ir para as questões. Depois, leia a afirmativa e verifique se ela é comprovável no texto.',
        keyPoints: [
          'Leia o texto COMPLETO antes de responder qualquer questão',
          'A afirmativa deve ser comprovada no texto, não apenas "parecer" verdadeira',
          'Inferência válida: o que o texto permite concluir, mesmo sem afirmar diretamente',
          'Palavras absolutas (sempre, nunca, todo, nenhum) geralmente indicam item ERRADO',
          'Diferença entre FATO e OPINIÃO do autor — o CEBRASPE cobra isso',
          'Denotação = sentido literal; Conotação = sentido figurado — atenção no contexto',
          'O texto MENCIONAR algo ≠ o autor DEFENDER esse algo',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: 'O CEBRASPE transforma "o texto menciona" em "o autor defende" — isso é uma pegadinha clássica! Verificar se o texto realmente toma posição ou apenas cita um dado.',
          },
          {
            type: 'muito_cobrado',
            text: 'Questões sobre INFERÊNCIA e IDEIA CENTRAL representam ~45% das questões de interpretação nas provas da PRF.',
          },
          {
            type: 'dica_banca',
            text: 'O CEBRASPE adora afirmativas com "apenas", "exclusivamente", "somente" — cheque se o texto realmente limita dessa forma.',
          },
          {
            type: 'atencao',
            text: 'Nunca responda com base no seu conhecimento prévio sobre o assunto! A resposta DEVE estar no texto.',
          },
        ],
        examples: [
          {
            title: 'Texto mencionar ≠ autor defender',
            correct: '"O texto indica que a violência no trânsito é crescente" — se o texto cita dados, isso é válido.',
            incorrect: '"O autor defende que o governo é incompetente" — se o texto apenas menciona uma estatística governamental.',
            explanation: 'Citar um dado não é defender uma tese. O autor precisa explicitamente se posicionar para você afirmar que ele "defende" algo.',
          },
          {
            title: 'Palavras absolutas',
            incorrect: '"O texto afirma que SEMPRE que há chuva, acidentes ocorrem"',
            explanation: 'Se o texto usa "frequentemente" ou "em geral", jamais afirme "sempre". Palavras absolutas ampliam o sentido e tornam o item errado.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Considere o trecho: "A imprudência ao volante ceifa milhares de vidas por ano, mas políticas efetivas de fiscalização ainda são escassas no país." Com base nesse fragmento, julgue: O autor do texto defende que a imprudência é o único fator responsável pelos acidentes de trânsito no Brasil.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. O texto menciona a imprudência como um fator, mas não afirma que é o "único" fator. A palavra "único" extrapola o que o fragmento afirma. Além disso, o autor fala também de "fiscalização", indicando que há outros elementos envolvidos.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
          {
            enunciado:
              'Com base no fragmento: "Embora o número de radares tenha aumentado, a velocidade média nas rodovias federais não diminuiu significativamente". Julgue: Pode-se inferir do texto que o aumento de radares não foi suficiente para alterar o comportamento dos condutores.',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. Se os radares aumentaram mas a velocidade média não diminuiu significativamente, a inferência lógica é que o aumento de radares não foi suficiente para mudar o comportamento. Essa conclusão é sustentada pelo texto.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'port-coesao',
        title: 'Coesão e Coerência Textual',
        incidencia: 'alta',
        content:
          'Coesão é a articulação gramatical entre as partes do texto (pronomes, conectivos, elipses). Coerência é a lógica e unidade temática — as ideias devem se encadear sem contradições.\n\nOs conectivos (conjunções e locuções) são os mais cobrados porque seu uso errado muda completamente o sentido da frase. Aprenda as categorias e seus exemplos de cor.',
        keyPoints: [
          'Adversativos: mas, porém, contudo, todavia, entretanto, no entanto',
          'Causais: porque, pois, já que, visto que, uma vez que, porquanto',
          'Concessivos: embora, apesar de, conquanto, ainda que, mesmo que',
          'Conclusivos: logo, portanto, assim, por isso, então, por conseguinte',
          'Condicionais: se, caso, desde que, contanto que, a não ser que',
          'Temporais: quando, enquanto, depois que, antes que, assim que, logo que',
          'Elipse = omissão de palavra já mencionada para evitar repetição',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: '"Pois" pode ser CAUSAL ("Ela passou, pois estudou muito") ou EXPLICATIVO, nunca conclusivo. O CEBRASPE troca conectivos para testar se você percebe a mudança de sentido.',
          },
          {
            type: 'memorize',
            text: 'MASTCETO = Mas, Apesar, Sem embargo, Todavia, Contudo, Entretanto, Todavia, Outrossim — adversativos para memorizar.',
          },
        ],
        tables: [
          {
            title: 'Principais Conectivos por Categoria',
            headers: ['Categoria', 'Exemplos', 'Sentido'],
            rows: [
              ['Adversativo', 'mas, porém, contudo, todavia', 'Ideia contrária / restrição'],
              ['Causal', 'porque, pois, já que, visto que', 'Causa / motivo'],
              ['Concessivo', 'embora, apesar de, ainda que', 'Concessão (contradiz e confirma)'],
              ['Conclusivo', 'logo, portanto, assim, por isso', 'Conclusão / consequência'],
              ['Condicional', 'se, caso, desde que', 'Condição para algo ocorrer'],
              ['Temporal', 'quando, enquanto, após, logo que', 'Relação de tempo'],
              ['Aditivo', 'e, nem, também, além disso', 'Adição de ideias'],
              ['Alternativo', 'ou, ora...ora, quer...quer', 'Alternância / escolha'],
            ],
          },
        ],
        examples: [
          {
            title: 'Conectivo errado muda o sentido',
            correct: '"Ele estudou muito, por isso passou na prova." (conclusivo: correto)',
            incorrect: '"Ele estudou muito, mas passou na prova." (adversativo: indica que passar foi inesperado — sentido estranho)',
            explanation: 'Trocar "por isso" por "mas" não é apenas uma troca de palavra — muda completamente a relação lógica entre as orações.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Assinale a alternativa em que o conectivo está usado corretamente conforme o sentido da frase:\n"O motorista ultrapassou o sinal vermelho, _______ foi multado pela PRF."',
            options: [
              'embora — correto, pois indica concessão',
              'por isso — correto, pois indica consequência',
              'mas — correto, pois indica oposição',
              'visto que — correto, pois indica causa',
            ],
            correctIndex: 1,
            explanation:
              '"Por isso" é o conectivo conclusivo/consequencial correto: a multa é a consequência de ter ultrapassado o sinal. "Embora" indicaria concessão (não faz sentido). "Mas" indicaria oposição (o que seria estranho). "Visto que" é causal — a ordem das orações ficaria invertida.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'port-concordancia-verbal',
        title: 'Concordância Verbal',
        incidencia: 'alta',
        content:
          'Concordância verbal é a relação de número e pessoa entre o verbo e seu sujeito. O CEBRASPE é especialista em criar armadilhas com sujeitos pós-verbais, orações intercaladas e verbos impessoais.\n\nRegra geral: o verbo concorda em número e pessoa com o sujeito. Mas existem casos especiais que são os favoritos da banca.',
        keyPoints: [
          'Verbo HAVER no sentido de "existir" = IMPESSOAL (sempre 3ª pessoa singular)',
          'Verbo FAZER indicando tempo = IMPESSOAL (sempre 3ª pessoa singular)',
          '"Faz dois anos" — não "Fazem dois anos"',
          '"Há muitos candidatos" — não "Hão muitos candidatos"',
          'Sujeito coletivo → verbo no singular: "A multidão gritou"',
          '"Um dos que" → verbo no plural: "É um dos que mais trabalham"',
          'Sujeito pós-verbal com sujeitos no singular ligados por "ou": verbo no singular',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: '"Fazem cinco anos que não o vejo" — ERRADO! "Fazer" indicando tempo é impessoal: "Faz cinco anos". O CEBRASPE cobra esse caso em praticamente toda prova.',
          },
          {
            type: 'pegadinha',
            text: '"Haviam muitos candidatos inscritos" — ERRADO! "Haver" = existir é impessoal: "Havia muitos candidatos".',
          },
          {
            type: 'muito_cobrado',
            text: 'Os verbos impessoais HAVER (existir) e FAZER (tempo) são os mais cobrados em concordância verbal na PRF. Decorar esses dois resolve cerca de 30% das questões.',
          },
          {
            type: 'memorize',
            text: 'IMPESSOAIS que ficam no singular: HAVER (existir), FAZER (tempo/clima), SER (horas/datas quando o sujeito é pronome/numeral).',
          },
        ],
        tables: [
          {
            title: 'Casos Especiais de Concordância Verbal',
            headers: ['Caso', 'Regra', 'Exemplo Correto'],
            rows: [
              ['Haver (existir)', 'Impessoal — singular', '"Havia muitos candidatos"'],
              ['Fazer (tempo)', 'Impessoal — singular', '"Faz dois anos que..."'],
              ['Sujeito coletivo', 'Singular', '"A multidão gritou"'],
              ['"Um dos que"', 'Plural', '"É um dos que mais viajam"'],
              ['Sujeito = pronome relativo', 'Concorda com antecedente', '"Sou eu que faço"'],
              ['Sujeito composto antes do verbo', 'Plural', '"Pedro e Maria foram"'],
              ['Sujeito composto pós-verbal', 'Pode ser singular (1º)', '"Chegou o policial e a viatura"'],
            ],
          },
        ],
        examples: [
          {
            title: 'Verbo HAVER — impessoal',
            correct: 'Havia muitos candidatos inscritos no concurso.',
            incorrect: 'Haviam muitos candidatos inscritos no concurso.',
            explanation: '"Haver" no sentido de "existir" é impessoal e fica sempre no singular. "Muitos candidatos" é objeto direto, não sujeito.',
          },
          {
            title: 'Verbo FAZER — tempo',
            correct: 'Faz dez anos que ele ingressou na PRF.',
            incorrect: 'Fazem dez anos que ele ingressou na PRF.',
            explanation: '"Fazer" indicando tempo decorrido é impessoal. Nunca vai para o plural.',
          },
          {
            title: '"Um dos que"',
            correct: 'Ele é um dos policiais que mais trabalham nesta delegacia.',
            incorrect: 'Ele é um dos policiais que mais trabalha nesta delegacia.',
            explanation: 'Na construção "um dos que", o verbo da oração relativa vai para o plural, pois o sujeito real é "dos policiais" (plural).',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue o item: "Houveram muitas irregularidades nas rodovias fiscalizadas pela equipe da PRF."',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. "Haver" no sentido de "existir/ocorrer" é verbo impessoal e deve ficar no singular: "Houve muitas irregularidades". "Muitas irregularidades" é objeto direto, não sujeito.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
          {
            enunciado:
              'Julgue o item: "Fazem dois meses que o policial rodoviário federal está lotado naquela unidade operacional."',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. "Fazer" indicando tempo decorrido é verbo impessoal e fica sempre no singular: "Faz dois meses". É uma das pegadinhas mais cobradas pela banca CEBRASPE.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'port-crase',
        title: 'Crase',
        incidencia: 'alta',
        content:
          'Crase é a fusão da preposição "a" com o artigo feminino "a" (as), resultando em "à" (às). Só ocorre quando AMBOS estão presentes: a preposição que o verbo exige + o artigo definido que acompanha o substantivo feminino.\n\nTeste da crase: substitua o substantivo feminino por um masculino. Se aparecer "ao", coloca crase; se aparecer "a", não coloca.',
        keyPoints: [
          'Teste: troque por masculino — "ao" → crase; "a" sem artigo → sem crase',
          'Jamais há crase antes de palavra masculina',
          'Jamais há crase antes de verbo no infinitivo',
          'Jamais há crase antes de pronomes pessoais (ela, você, mim)',
          'SEMPRE há crase em "à", "às" + horas: "às 10h", "à meia-noite"',
          'SEMPRE há crase nas expressões: à medida que, à proporção que, às vezes, à toa',
          'FACULTATIVA: nomes próprios de pessoas femininas e pronomes possessivos femininos',
        ],
        highlights: [
          {
            type: 'dica_banca',
            text: 'O teste mais rápido: troque o substantivo feminino pelo masculino. "Fui à escola" → "Fui ao colégio" (apareceu "ao" = tem crase). "Fui a pé" → "Fui a pé" (não mudou = sem crase).',
          },
          {
            type: 'pegadinha',
            text: '"Ela chegou à duas horas" — ERRADO! Horas no plural: "às duas horas". Horas no singular: "à uma hora". A banca mistura singular e plural para confundir.',
          },
          {
            type: 'memorize',
            text: 'NUNCA usa crase: antes de palavra masculina, antes de verbo, antes de pronomes pessoais retos e oblíquos (eu, tu, ele, me, te, se), antes de "uma".',
          },
        ],
        tables: [
          {
            title: 'Quando Usar e Não Usar Crase',
            headers: ['Situação', 'Uso', 'Exemplo'],
            rows: [
              ['Antes de substantivo feminino + artigo', 'USA crase', '"Fui à delegacia"'],
              ['Expressões fixas femininas', 'USA crase', '"às vezes, à toa, à vontade"'],
              ['Horas', 'USA crase', '"às 14h, à meia-noite"'],
              ['Antes de substantivo masculino', 'NÃO usa', '"Fui a pé, a cavalo"'],
              ['Antes de verbo', 'NÃO usa', '"Começou a chover"'],
              ['Antes de pronome pessoal', 'NÃO usa', '"Dirijo-me a ela"'],
              ['Antes de "uma"', 'NÃO usa', '"Chegou a uma hora"'],
              ['Nomes de cidades sem artigo', 'NÃO usa (geralmente)', '"Fui a Brasília" (sem artigo)'],
            ],
          },
        ],
        examples: [
          {
            title: 'Uso correto e incorreto da crase',
            correct: 'O policial rodoviário foi à delegacia regional registrar o acidente.',
            incorrect: 'O policial rodoviário foi a delegacia regional registrar o acidente.',
            explanation: '"Delegacia" é substantivo feminino precedido de artigo definido. Verbo "ir" exige preposição "a". Logo: a + a = à.',
          },
          {
            title: 'Crase antes de verbo — nunca!',
            correct: 'O agente começou a redigir o relatório.',
            incorrect: 'O agente começou à redigir o relatório.',
            explanation: 'Antes de verbo não há artigo definido, portanto jamais há crase. "Redigir" é verbo no infinitivo.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: "A PRF iniciou a operação às 06h00min, visando à redução dos acidentes nas rodovias federais."',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. "às 06h00min" — crase correta com horas (às = preposição a + artigo as). "visando à redução" — o verbo "visar" (quando significa "ter como objetivo") exige preposição "a" + artigo feminino "a" = crase. Tudo correto.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
          {
            enunciado:
              'Julgue: "O condutor se recusou à realizar o teste do etilômetro quando solicitado pelo agente de trânsito."',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. Antes de verbo no infinitivo (realizar), jamais se usa crase. O correto é "recusou a realizar". Não há artigo definido antes de verbo.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'port-regencia',
        title: 'Regência Verbal e Nominal',
        incidencia: 'alta',
        content:
          'Regência é a relação de dependência entre um verbo (ou nome) e seus complementos. A regência verbal determina qual preposição usar com cada verbo. A regência nominal determina qual preposição um substantivo, adjetivo ou advérbio exige.\n\nErros de regência são muito cobrados porque o uso popular frequentemente difere da norma culta.',
        keyPoints: [
          'ASSISTIR: a um espetáculo (VTI) / assistir o paciente (VTD — como médico)',
          'VISAR: a (ter como objetivo) / visar (mirar, assinar — VTD)',
          'OBEDECER e DESOBEDECER: sempre com preposição "a"',
          'ASPIRAR: a (almejar) / aspirar (inalar — VTD)',
          'PREFERIR: A em vez de B (não "mais que")',
          'AGRADAR: a alguém (satisfazer) / agradar alguém (fazer carinho)',
          'IMPLICAR: em (acarretar) / implicar com (antipatizar)',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: '"Eu assisti o filme" — ERRADO na norma culta! O correto (no sentido de ver) é "Assisti ao filme". A banca cobra essa diferença frequentemente.',
          },
          {
            type: 'muito_cobrado',
            text: 'Os verbos VISAR, ASSISTIR, ASPIRAR, OBEDECER e PREFERIR são os mais cobrados em regência verbal na PRF. Memorize a regência de cada um.',
          },
        ],
        tables: [
          {
            title: 'Verbos de Regência Mais Cobrados na PRF',
            headers: ['Verbo', 'Sentido', 'Regência', 'Exemplo'],
            rows: [
              ['ASSISTIR', 'ver, presenciar', 'a (VTI)', '"Assisti ao acidente"'],
              ['ASSISTIR', 'ajudar, socorrer', 'direto (VTD)', '"O médico assistiu o ferido"'],
              ['VISAR', 'ter como objetivo', 'a (VTI)', '"A lei visa à segurança"'],
              ['VISAR', 'mirar, assinar', 'direto (VTD)', '"O policial visou o alvo"'],
              ['ASPIRAR', 'almejar', 'a (VTI)', '"Aspiro à aprovação"'],
              ['ASPIRAR', 'inalar', 'direto (VTD)', '"Aspirou o gás"'],
              ['OBEDECER', 'cumprir ordens', 'a (VTI)', '"Obedeceu ao sinal"'],
              ['PREFERIR', 'ter preferência', 'a (VTI)', '"Prefiro café a chá"'],
              ['AGRADAR', 'satisfazer', 'a (VTI)', '"Agradou aos presentes"'],
              ['IMPLICAR', 'acarretar', 'em (VTI)', '"Implica em multa"'],
            ],
          },
        ],
        examples: [
          {
            title: 'VISAR — objetivo vs. assinar',
            correct: 'A operação visava à redução dos acidentes. / O agente visou o documento.',
            incorrect: 'A operação visava reduzir os acidentes (sem preposição no sentido de objetivo).',
            explanation: 'No sentido de "ter como objetivo", VISAR exige preposição "a". No sentido de "assinar" ou "mirar", é transitivo direto, sem preposição.',
          },
          {
            title: 'PREFERIR — uso com "a"',
            correct: 'Prefiro estudar a tarde a estudar à noite.',
            incorrect: 'Prefiro estudar de tarde do que de noite. / Prefiro mais o café.',
            explanation: 'Na norma culta, "preferir" exige complemento com "a", não "do que" e nunca "mais". "Prefiro A a B" — não "prefiro A mais que B".',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: "O projeto de lei visa garantir maior segurança nas rodovias federais brasileiras."',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. "Visar" no sentido de "ter como objetivo" é transitivo indireto e exige a preposição "a": "visa a garantir" ou "visa à garantia". Sem a preposição, o uso está incorreto conforme a norma culta.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'port-classes',
        title: 'Classes de Palavras',
        incidencia: 'média',
        content:
          'As dez classes de palavras (morfologia) são: substantivo, adjetivo, artigo, numeral, pronome, verbo, advérbio, preposição, conjunção e interjeição. O CEBRASPE cobra principalmente a classificação contextual — a mesma palavra pode ser de classes diferentes dependendo do uso na frase.',
        keyPoints: [
          'Pronomes relativos: que, quem, onde (apenas para lugar real), cujo, qual',
          '"Onde" apenas para lugar físico — "em que" para situações abstratas',
          'Advérbio modifica verbo, adjetivo ou outro advérbio',
          'Preposição essenciais: a, ante, até, com, contra, de, desde, em, entre, para, por, sem, sob, sobre, trás',
          '"Mesmo", "próprio", "certo", "bastante" podem ser adjetivos OU advérbios',
          'Variável: substantivo, adjetivo, artigo, numeral, pronome, verbo',
          'Invariável: advérbio, preposição, conjunção, interjeição',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: '"Onde" só se usa para lugar físico. "A situação onde tudo piorou" — ERRADO! O correto é "A situação em que tudo piorou". O CEBRASPE usa esse erro em itens.',
          },
          {
            type: 'dica_banca',
            text: 'A banca gosta de testar se "mesmo", "bastante", "certo" são adjetivos ou advérbios. Se estiverem antes de verbo ou adjetivo, são advérbios (invariáveis). Se acompanharem substantivo e concordarem com ele, são adjetivos.',
          },
        ],
        tables: [
          {
            title: 'Pronomes Relativos e Seu Uso',
            headers: ['Pronome', 'Antecedente', 'Exemplo Correto'],
            rows: [
              ['que', 'Pessoa ou coisa', '"O agente que chegou"'],
              ['quem', 'Pessoa (após preposição)', '"O policial de quem falo"'],
              ['onde', 'Lugar físico', '"A delegacia onde trabalho"'],
              ['em que', 'Situação abstrata', '"A condição em que foi preso"'],
              ['cujo/cuja', 'Posse (sem artigo após)', '"O réu cuja defesa foi negada"'],
              ['o qual / a qual', 'Pessoa ou coisa (ênfase)', '"A lei pela qual foi condenado"'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: "A situação onde o policial se encontrava exigia ação imediata."',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. "Onde" refere-se a lugar físico real. "Situação" é um substantivo abstrato, portanto o pronome relativo correto é "em que": "A situação em que o policial se encontrava". Esse é um erro clássico cobrado pelo CEBRASPE.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
    ],
  },

  // ─── 2. RACIOCÍNIO LÓGICO E MATEMÁTICO ───────────────────────────────────────
  {
    id: 'rlm',
    name: 'Raciocínio Lógico e Matemático',
    icon: 'activity',
    color: '#7B1FA2',
    description: 'Lógica proposicional, probabilidade, combinatória e matemática',
    topics: [
      {
        id: 'rl-logica',
        title: 'Lógica Proposicional',
        incidencia: 'alta',
        content:
          'Lógica proposicional estuda as relações entre proposições usando conectivos lógicos. Uma proposição é uma sentença declarativa que pode ser verdadeira (V) ou falsa (F).\n\nOs conectivos mais cobrados: negação (¬p), conjunção (p ∧ q), disjunção (p ∨ q), condicional (p → q) e bicondicional (p ↔ q).',
        keyPoints: [
          'Negação (¬p): inverte o valor — V vira F, F vira V',
          'Conjunção (p ∧ q): só é V quando AMBAS são V',
          'Disjunção (p ∨ q): só é F quando AMBAS são F',
          'Condicional (p → q): só é F quando p=V e q=F',
          'Negação de p→q: p ∧ ¬q (o antecedente ocorre mas o consequente não)',
          'Contrapositiva de p→q é ¬q→¬p (equivalente — mesma tabela verdade)',
          'Negação de "Todo A é B" = "Algum A não é B"',
          'Negação de "Nenhum A é B" = "Algum A é B"',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'O CONDICIONAL (p → q) é o conectivo mais cobrado. Lembre: só é FALSO quando a premissa (p) é VERDADEIRA e a conclusão (q) é FALSA. Em todos os outros casos é VERDADEIRO.',
          },
          {
            type: 'memorize',
            text: 'Regra para negar o condicional: Se a frase é "Se P então Q", a negação é "P e não Q". Ex: "Se chover, irei ao clube" → negação: "Choveu e não fui ao clube".',
          },
          {
            type: 'pegadinha',
            text: 'A contrapositiva de "Se P então Q" é "Se não Q então não P" — É EQUIVALENTE à original! O CEBRASPE pede para identificar equivalências.',
          },
        ],
        tables: [
          {
            title: 'Tabela Verdade dos Conectivos',
            headers: ['p', 'q', '¬p', 'p∧q', 'p∨q', 'p→q', 'p↔q'],
            rows: [
              ['V', 'V', 'F', 'V', 'V', 'V', 'V'],
              ['V', 'F', 'F', 'F', 'V', 'F', 'F'],
              ['F', 'V', 'V', 'F', 'V', 'V', 'F'],
              ['F', 'F', 'V', 'F', 'F', 'V', 'V'],
            ],
          },
          {
            title: 'Negações dos Quantificadores',
            headers: ['Proposição Original', 'Negação'],
            rows: [
              ['"Todo A é B"', '"Algum A não é B"'],
              ['"Nenhum A é B"', '"Algum A é B"'],
              ['"Algum A é B"', '"Nenhum A é B"'],
              ['"Algum A não é B"', '"Todo A é B"'],
            ],
          },
        ],
        examples: [
          {
            title: 'Negando o condicional',
            correct: 'Original: "Se o condutor beber, será multado." → Negação: "O condutor bebeu E não foi multado."',
            incorrect: 'Negação: "Se o condutor não beber, não será multado." — essa é a INVERSA, não a negação!',
            explanation: 'A negação de (p → q) é (p ∧ ¬q). A inversa (¬p → ¬q) e a recíproca (q → p) NÃO são equivalentes ao condicional original.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Considere a proposição: "Se o condutor está alcoolizado, então ele comete infração gravíssima." A negação dessa proposição é:',
            options: [
              'O condutor não está alcoolizado e comete infração gravíssima.',
              'O condutor está alcoolizado e não comete infração gravíssima.',
              'Se o condutor não está alcoolizado, então não comete infração gravíssima.',
              'Se o condutor comete infração gravíssima, então está alcoolizado.',
            ],
            correctIndex: 1,
            explanation:
              'A negação de (p → q) é (p ∧ ¬q). Portanto: "O condutor está alcoolizado" (p=V) E "não comete infração gravíssima" (¬q). As outras opções são a inversa, recíproca e contrapositiva — todas diferentes da negação.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
          {
            enunciado:
              'Julgue: A proposição "Nenhum policial rodoviário federal é corrupto" é equivalente, em termos de negação lógica, a "Algum policial rodoviário federal é corrupto".',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. A negação de "Nenhum A é B" é "Algum A é B". Portanto, negar "Nenhum policial é corrupto" resulta em "Algum policial é corrupto". As duas proposições são logicamente opostas.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'rl-probabilidade',
        title: 'Probabilidade',
        incidencia: 'alta',
        content:
          'Probabilidade é a medida da chance de um evento ocorrer. P(A) = número de casos favoráveis / total de casos possíveis.\n\nEventos podem ser independentes (não se influenciam) ou dependentes (a ocorrência de um altera a probabilidade do outro).',
        keyPoints: [
          'P(A) = casos favoráveis / casos possíveis (sempre entre 0 e 1)',
          'P(A) + P(Ā) = 1 (complementar)',
          'Eventos mutuamente exclusivos: P(A ∪ B) = P(A) + P(B)',
          'Eventos não exclusivos: P(A ∪ B) = P(A) + P(B) − P(A ∩ B)',
          'Eventos independentes: P(A ∩ B) = P(A) × P(B)',
          'Probabilidade condicional: P(A|B) = P(A ∩ B) / P(B)',
          'Ao retirar sem reposição: o total diminui a cada retirada',
        ],
        highlights: [
          {
            type: 'dica_banca',
            text: 'O CEBRASPE adora contextualizar probabilidade com fiscalização da PRF: "Em uma blitz, X% dos veículos têm irregularidade. Sorteando 2 veículos, qual a probabilidade de ambos terem irregularidade?"',
          },
          {
            type: 'memorize',
            text: 'Complementar é seu melhor amigo! Se quer P("ao menos 1"), calcule 1 − P("nenhum"). É sempre mais fácil.',
          },
        ],
        examples: [
          {
            title: 'Uso do complementar',
            correct: 'P(ao menos 1 acidente) = 1 − P(nenhum acidente)',
            explanation: 'Calcular "ao menos um" diretamente pode ser trabalhoso. O complemento "nenhum" geralmente é mais simples de calcular.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Em uma caixa há 5 bolas vermelhas e 3 azuis. Retirando-se 2 bolas sem reposição, qual a probabilidade de ambas serem vermelhas?',
            options: ['5/14', '25/64', '10/56', '2/7'],
            correctIndex: 3,
            explanation:
              'P(1ª vermelha) = 5/8. Após retirar 1 vermelha, restam 4 vermelhas em 7 bolas. P(2ª vermelha) = 4/7. P(ambas vermelhas) = (5/8) × (4/7) = 20/56 = 5/14. Verifique: a opção correta é 5/14.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'rl-combinatoria',
        title: 'Análise Combinatória',
        incidencia: 'alta',
        content:
          'Análise combinatória resolve problemas de contagem. O Princípio Multiplicativo diz: se uma escolha tem m possibilidades e outra tem n, o total de combinações é m × n.\n\nAs três ferramentas principais: Permutação (ordem importa, todos os elementos), Arranjo (ordem importa, parte dos elementos) e Combinação (ordem NÃO importa, parte dos elementos).',
        keyPoints: [
          'Pergunta-chave: "A ORDEM IMPORTA?" — SIM → Permutação/Arranjo; NÃO → Combinação',
          'Permutação simples: P(n) = n! (todos os n elementos, ordem importa)',
          'Arranjo: A(n,r) = n! / (n−r)! (r de n, ordem importa)',
          'Combinação: C(n,r) = n! / [r! × (n−r)!] (r de n, ordem não importa)',
          'C(n,r) = C(n, n−r) — propriedade útil para calcular',
          'Anagramas com letras repetidas: n! dividido pelo fatorial de cada grupo repetido',
          'Princípio aditivo: eventos excludentes → SOME; eventos simultâneos → MULTIPLIQUE',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'PAC: P=Permutação (todos, ordem sim), A=Arranjo (parte, ordem sim), C=Combinação (parte, ordem não). Decore essa sigla.',
          },
          {
            type: 'pegadinha',
            text: '"Quantas comissões de 3 pessoas podem ser formadas com 10 candidatos?" — ordem não importa → Combinação. "Quantos times com capitão, vice e terceiro?" — ordem importa → Arranjo.',
          },
        ],
        tables: [
          {
            title: 'Fórmulas de Análise Combinatória',
            headers: ['Tipo', 'Condição', 'Fórmula', 'Exemplo'],
            rows: [
              ['Permutação', 'Todos os n, ordem importa', 'P(n) = n!', '3 pessoas em fila: 3! = 6'],
              ['Arranjo', 'r de n, ordem importa', 'A(n,r) = n!/(n−r)!', '2 de 5 para cargo: 5!/3! = 20'],
              ['Combinação', 'r de n, ordem não importa', 'C(n,r) = n!/[r!(n−r)!]', '2 de 5 para comissão: 10'],
              ['Perm. c/ rep.', 'Letras/obj. repetidos', 'n! / (a!b!...)', 'ARARA = 5!/3!2! = 10'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Uma equipe da PRF precisa selecionar 3 agentes de um grupo de 8 para uma operação especial. De quantas maneiras diferentes essa seleção pode ser feita, sabendo que a função de todos os selecionados é a mesma?',
            options: ['336', '56', '24', '512'],
            correctIndex: 1,
            explanation:
              'Como a função é a mesma para todos (ordem não importa), usamos Combinação: C(8,3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56 maneiras.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
      {
        id: 'rl-porcentagem',
        title: 'Porcentagem e Matemática Financeira',
        incidencia: 'alta',
        content:
          'Porcentagem é uma fração de 100. Taxa percentual p% aplicada a um valor V resulta em V × p/100.\n\nJuros simples: M = P(1 + it). Juros compostos: M = P(1 + i)^t. O CEBRASPE frequentemente cobra desconto, aumento percentual e variação percentual em contextos de trânsito e fiscalização.',
        keyPoints: [
          'Aumento de p%: multiplica por (1 + p/100)',
          'Desconto de p%: multiplica por (1 − p/100)',
          'Aumento de 20% seguido de desconto de 20% ≠ 0% (resultado: −4%)',
          'Variação %: [(Vf − Vi) / Vi] × 100',
          'Juros simples: M = P(1 + it)',
          'Juros compostos: M = P(1 + i)^t',
          'Regra de três: proporção direta e inversa',
        ],
        highlights: [
          {
            type: 'pegadinha',
            text: 'Aumentar 50% e depois descontar 50% NÃO volta ao valor original! 100 → +50% = 150 → −50% = 75. O CEBRASPE adora essa armadilha.',
          },
          {
            type: 'muito_cobrado',
            text: 'Variação percentual e regra de três aparecem em quase todas as provas da PRF. Pratique calcular variação percentual rapidamente.',
          },
        ],
        exercises: [
          {
            enunciado:
              'O número de acidentes em uma rodovia federal diminuiu 20% em 2024 em relação a 2023. Se em 2023 ocorreram 250 acidentes, quantos ocorreram em 2024?',
            options: ['200', '210', '220', '230'],
            correctIndex: 0,
            explanation:
              'Diminuição de 20%: 250 × (1 − 0,20) = 250 × 0,80 = 200 acidentes. Alternativamente: 20% de 250 = 50; 250 − 50 = 200.',
            fonte: 'Estilo CEBRASPE — PRF',
          },
        ],
      },
    ],
  },

  // ─── 3. LEGISLAÇÃO DE TRÂNSITO (CTB) ─────────────────────────────────────────
  {
    id: 'ctb',
    name: 'Legislação de Trânsito (CTB)',
    icon: 'truck',
    color: '#E65100',
    description: 'Código de Trânsito Brasileiro, infrações, crimes e habilitação',
    topics: [
      {
        id: 'ctb-normas',
        title: 'Normas Gerais de Circulação',
        incidencia: 'alta',
        content:
          'O Código de Trânsito Brasileiro (Lei 9.503/1997) estabelece as normas de circulação válidas em todo o território nacional. A segurança de trânsito é responsabilidade compartilhada entre Estado e cidadãos.\n\nArt. 26: os usuários das vias terrestres devem abster-se de todo ato que possa pôr em perigo a segurança e fluidez do trânsito.',
        keyPoints: [
          'CTB: Lei 9.503/1997 — vigência desde 22 de janeiro de 1998',
          'Trânsito: uso das vias por pessoas, veículos e animais para fins de circulação',
          'Via pública: espaço aberto à circulação, de uso comum',
          'Prioridade de passagem em cruzamento sem sinalização: quem vem pela direita',
          'Ciclistas: à direita da via, no sentido do fluxo; se houver ciclovia, usar ciclovia',
          'Pedestre tem preferência na faixa de pedestres e nas calçadas',
          'Proibido: trafegar nas vias expressas, de trânsito rápido e rodovias sem capacete (moto)',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'A prioridade em cruzamentos sem sinalização é para quem vem pela DIREITA do condutor. Esse tema aparece em quase todas as provas do CTB.',
          },
          {
            type: 'atencao',
            text: 'Via pública ≠ via aberta ao público. O CTB define via pública como aquela de uso COMUM, não necessariamente pública. Condomínios com acesso irrestrito podem ser considerados vias abertas ao público.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Dois veículos chegam simultaneamente a um cruzamento sem sinalização. O veículo A vem pela direita do veículo B. Qual tem preferência de passagem?',
            options: [
              'O veículo B, por ser o que está à frente',
              'O veículo A, por vir pela direita',
              'Ambos têm igual preferência',
              'O veículo maior tem preferência',
            ],
            correctIndex: 1,
            explanation:
              'Art. 29, III, a do CTB: em cruzamentos sem sinalização, tem preferência o veículo que vem pela direita do outro condutor. Portanto, o veículo A tem preferência.',
            fonte: 'CTB — Art. 29',
          },
        ],
      },
      {
        id: 'ctb-velocidades',
        title: 'Velocidades e Limites',
        incidencia: 'alta',
        content:
          'O CTB estabelece limites máximos de velocidade por tipo de via. A velocidade mínima é sempre a metade da máxima permitida. Velocidade regulamentada por placa prevalece sobre os limites gerais.\n\nArt. 61 do CTB: os limites são os estabelecidos pelo CONTRAN, pelo órgão competente ou pelo responsável pela via.',
        keyPoints: [
          'Rodovias: 110 km/h (automóveis), 90 km/h (motos e caminhões)',
          'Vias de trânsito rápido: 80 km/h',
          'Vias arteriais: 60 km/h',
          'Vias coletoras: 40 km/h',
          'Vias locais: 30 km/h',
          'Velocidade MÍNIMA: sempre metade da máxima permitida para a via',
          'Placa de limite prevalece sobre o limite geral da via',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'Mnemônico: RodoViA — 110/90/80/60/40/30 (Rodovias, trânsito rápido, Arteriais, coletoras, locais). Velocidade mínima = metade da máxima.',
          },
          {
            type: 'muito_cobrado',
            text: 'A PRF opera principalmente em rodovias. A velocidade de 110 km/h para automóveis e 90 km/h para motos em rodovias é extremamente cobrada no concurso.',
          },
          {
            type: 'pegadinha',
            text: 'Ultrapassar o limite em mais de 50% é infração GRAVÍSSIMA com multiplicador × 3 na multa. Confira: se o limite é 60 km/h, trafegar a 91 km/h já ultrapassa 50%.',
          },
        ],
        tables: [
          {
            title: 'Limites de Velocidade por Tipo de Via',
            headers: ['Tipo de Via', 'Velocidade Máxima', 'Veículo'],
            rows: [
              ['Rodovias', '110 km/h', 'Automóveis e camionetes'],
              ['Rodovias', '90 km/h', 'Motos, ônibus, caminhões'],
              ['Trânsito rápido', '80 km/h', 'Todos'],
              ['Arterial', '60 km/h', 'Todos'],
              ['Coletora', '40 km/h', 'Todos'],
              ['Local', '30 km/h', 'Todos'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Em uma rodovia federal com limite de 110 km/h, um condutor de automóvel trafega a 95 km/h. Qual a velocidade mínima que ele deve respeitar?',
            options: ['55 km/h', '60 km/h', '45 km/h', '50 km/h'],
            correctIndex: 0,
            explanation:
              'A velocidade mínima é sempre a metade da velocidade máxima permitida para aquela via. Metade de 110 km/h = 55 km/h. Trafegar abaixo dessa velocidade é infração.',
            fonte: 'CTB — Art. 61',
          },
        ],
      },
      {
        id: 'ctb-infracoes',
        title: 'Infrações e Penalidades',
        incidencia: 'alta',
        content:
          'As infrações de trânsito classificam-se pela gravidade: gravíssima (7 pontos), grave (5 pontos), média (4 pontos) e leve (3 pontos). Pontos acumulam na CNH por 12 meses. Acumular 20+ pontos resulta em suspensão da habilitação.\n\nAlgumas infrações gravíssimas têm multiplicadores na multa: até 10x o valor base.',
        keyPoints: [
          'Gravíssima: 7 pontos | Grave: 5 pontos | Média: 4 pontos | Leve: 3 pontos',
          'Suspensão: 20+ pontos em 12 meses contínuos',
          'Avançar sinal vermelho: gravíssima, multa × 3',
          'Dirigir embriagado (art. 165 CTB): gravíssima, multa × 10, suspensão 12 meses',
          'Usar celular ao volante: gravíssima, multa × 3',
          'Disputar racha: gravíssima, multa × 7, suspensão imediata',
          'Não usar cinto de segurança: gravíssima (motorista e cada passageiro)',
          'Ultrapassar em local proibido: gravíssima, multa × 3',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Os multiplicadores de multa são frequentemente cobrados. Memorize: celular = ×3, sinal vermelho = ×3, racha = ×7, embriaguez = ×10.',
          },
          {
            type: 'memorize',
            text: 'Pontuação: G7-G5-M4-L3. "7 graves aG3nte" — Gravíssima=7, Grave=5 (grave com 5 dedos), Média=4, Leve=3.',
          },
          {
            type: 'atencao',
            text: 'Recusar o teste do bafômetro (etilômetro) também é infração gravíssima com multa × 3, além da suspensão imediata do direito de dirigir.',
          },
        ],
        tables: [
          {
            title: 'Principais Infrações Gravíssimas com Multiplicador',
            headers: ['Infração', 'Artigo CTB', 'Multa', 'Suspensão'],
            rows: [
              ['Embriaguez ao volante', 'Art. 165', '× 10', '12 meses'],
              ['Racha/velocidade competição', 'Art. 173', '× 7', 'Imediata'],
              ['Avançar sinal vermelho', 'Art. 208', '× 3', 'Não'],
              ['Usar celular ao volante', 'Art. 252, IX', '× 3', 'Não'],
              ['Ultrapassar proibido', 'Art. 214', '× 3', 'Não'],
              ['Recusar etilômetro', 'Art. 165-A', '× 3', 'Imediata'],
              ['Sem cinto de segurança', 'Art. 167', '× 1', 'Não'],
              ['Excesso de velocidade >50%', 'Art. 218, III', '× 3', 'Sim'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Um condutor foi flagrado usando o celular ao volante enquanto dirigia em rodovia federal. Além dos 7 pontos na CNH, qual é o multiplicador aplicado sobre o valor da multa?',
            options: ['× 2', '× 3', '× 5', '× 7'],
            correctIndex: 1,
            explanation:
              'O uso de celular ao volante (art. 252, IX do CTB) é infração gravíssima com multa multiplicada por 3 (× 3). O valor base da multa gravíssima é R$ 293,47, que multiplicado por 3 resulta em R$ 880,41.',
            fonte: 'CTB — Art. 252, IX',
          },
          {
            enunciado:
              'Julgue: Um condutor que acumular 18 pontos em sua CNH em um período de 12 meses consecutivos terá sua habilitação suspensa automaticamente.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. A suspensão ocorre ao acumular 20 ou mais pontos em 12 meses consecutivos. Com 18 pontos, o condutor ainda não atingiu o limite para suspensão automática.',
            fonte: 'CTB — Art. 261',
          },
        ],
      },
      {
        id: 'ctb-crimes',
        title: 'Crimes de Trânsito',
        incidencia: 'alta',
        content:
          'Os crimes de trânsito estão previstos nos artigos 291 a 312 do CTB. São crimes punidos com detenção ou reclusão, além das sanções administrativas.\n\nTodos os crimes de trânsito têm ação penal pública incondicionada — o Ministério Público age de ofício, sem necessidade de representação da vítima.',
        keyPoints: [
          'Art. 302: homicídio culposo — 2 a 4 anos de detenção',
          'Art. 303: lesão corporal culposa — 6 meses a 2 anos',
          'Art. 306: embriaguez ao volante — 6 meses a 3 anos (≥ 0,3 mg/L ou 0,6 g/dL sangue)',
          'Art. 308: racha sem resultado grave — 1 a 3 anos | com lesão grave — 3 a 6 | com morte — 5 a 10',
          'Art. 305: fuga do local do acidente — 6 meses a 1 ano + suspensão',
          'Todos os crimes: ação penal pública incondicionada',
          'Cautelares possíveis em flagrante: suspensão da habilitação, recolhimento do veículo',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Os artigos 302, 306 e 308 são os mais cobrados. Memorize as penas: 302 (2-4 anos), 306 (6m-3a), 308 variando com o resultado.',
          },
          {
            type: 'memorize',
            text: 'Limite criminal de álcool: 0,3 mg/L de ar alveolar (bafômetro) ou 0,6 g/dL de sangue. Limite administrativo (infração): 0,05 mg/L ou 0,1 g/dL. O crime começa no dobro do limite administrativo.',
          },
          {
            type: 'atencao',
            text: 'A fuga do local do acidente (art. 305) é crime mesmo que o condutor não tenha causado o acidente. É crime de perigo — não importa se houve vítima.',
          },
        ],
        tables: [
          {
            title: 'Principais Crimes de Trânsito e Penas',
            headers: ['Art.', 'Crime', 'Pena', 'Observação'],
            rows: [
              ['302', 'Homicídio culposo na direção', '2 a 4 anos (detenção)', 'Aumenta com embriaguez, racha, excesso de veloc.'],
              ['303', 'Lesão corporal culposa', '6 meses a 2 anos', 'Pena pode dobrar em certas condições'],
              ['304', 'Omissão de socorro', '6 meses a 1 ano', 'Aumenta se o condutor foi o causador'],
              ['305', 'Fuga do local', '6 meses a 1 ano', 'Crime mesmo sem vítima'],
              ['306', 'Embriaguez ao volante', '6 meses a 3 anos', '≥ 0,3 mg/L ar alveolar'],
              ['307', 'Violação de suspensão', '6 meses a 1 ano', 'Dirigir com CNH suspensa/cassada'],
              ['308', 'Racha', '1 a 3 anos (sem resultado)', 'Aumenta com resultado lesão/morte'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Um condutor está envolvido em um acidente de trânsito com vítima. Ele não causou o acidente, mas foge do local sem prestar socorro. Julgue: A fuga do local caracteriza crime de trânsito previsto no CTB.',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. O art. 305 do CTB tipifica como crime a fuga do local do acidente, para se furtar à responsabilidade penal ou civil — independentemente de quem causou o acidente. Mesmo não sendo o culpado, a fuga é crime.',
            fonte: 'CTB — Art. 305',
          },
        ],
      },
      {
        id: 'ctb-alcool',
        title: 'Álcool e Direção',
        incidencia: 'alta',
        content:
          'O Brasil adota a Lei Seca com tolerância ZERO ao álcool. Qualquer concentração detectada pode gerar infração administrativa. Os limites criminais são mais elevados.\n\nA PRF é o principal órgão executivo de trânsito federal — realiza as blitze e aplica as penalidades nas rodovias federais.',
        keyPoints: [
          'Tolerância zero: qualquer concentração detectada = infração possível',
          'Infração administrativa: ≥ 0,05 mg/L ar alveolar ou ≥ 0,1 g/dL sangue',
          'Crime (art. 306): ≥ 0,3 mg/L ar alveolar ou ≥ 0,6 g/dL sangue',
          'Recusar etilômetro = infração gravíssima + suspensão imediata',
          'Penalidade administrativa: multa × 10 + suspensão 12 meses + retenção do veículo',
          'Na reincidência em 12 meses: suspensão de 2 anos',
          'Sinais de alteração visível podem ser usados mesmo sem etilômetro',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'Dois limites: INFRAÇÃO = 0,05 mg/L (ar) / 0,1 g/dL (sangue). CRIME = 0,3 mg/L (ar) / 0,6 g/dL (sangue). O crime começa no sêxtuplo do limite de tolerância zero.',
          },
          {
            type: 'pegadinha',
            text: 'A recusa ao etilômetro NÃO evita a punição! Ela própria é infração gravíssima com multa × 3 e acarreta as mesmas penalidades da embriaguez comprovada (suspensão imediata).',
          },
          {
            type: 'atencao',
            text: 'A blitz de álcool pode usar sinais clínicos (olhos vermelhos, fala alterada, odor) quando o condutor recusa o etilômetro. O agente pode encaminhar o condutor para exame de sangue.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Durante uma blitz da PRF, o condutor X apresenta concentração de 0,28 mg/L de álcool no ar alveolar, apurada pelo etilômetro. Julgue: O condutor X praticou crime de embriaguez ao volante previsto no art. 306 do CTB.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. O limite para caracterização do crime (art. 306) é de 0,3 mg/L de álcool por litro de ar alveolar. O condutor X apresentou 0,28 mg/L, que é inferior ao limite criminal. Contudo, praticou infração administrativa, pois superou 0,05 mg/L.',
            fonte: 'CTB — Arts. 165 e 306',
          },
        ],
      },
    ],
  },

  // ─── 4. DIREITO CONSTITUCIONAL ───────────────────────────────────────────────
  {
    id: 'constitucional',
    name: 'Direito Constitucional',
    icon: 'shield',
    color: '#1B5E20',
    description: 'Constituição Federal, direitos fundamentais e administração pública',
    topics: [
      {
        id: 'const-art5',
        title: 'Direitos e Garantias Fundamentais (Art. 5º)',
        incidencia: 'alta',
        content:
          'O art. 5º da CF/88 consagra os direitos e garantias individuais. São cláusulas pétreas — não podem ser abolidas nem por PEC. Aplicam-se imediatamente e vinculam tanto o Estado quanto particulares (eficácia horizontal).\n\nOs direitos fundamentais têm aplicabilidade imediata (art. 5º, §1º) e não são absolutos — podem ser limitados por lei.',
        keyPoints: [
          'Aplicabilidade imediata (§1º): normas definidoras de direitos têm aplicação direta',
          'Cláusulas pétreas: não podem ser abolidas, mas podem ser ampliadas',
          'Habeas corpus: tutela liberdade de locomoção (salvo pena militar em tempo de guerra)',
          'Habeas data: acesso e retificação de informações do próprio interessado',
          'Mandado de segurança: protege direito líquido e certo não amparado por HC ou HD',
          'Mandado de injunção: quando falta norma regulamentadora de direito constitucional',
          'Ação popular: cidadão pode anular ato lesivo ao patrimônio público',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Os remédios constitucionais (HC, HD, MS, MI, Ação Popular) são cobradíssimos. Memorize qual remédio protege cada direito.',
          },
          {
            type: 'memorize',
            text: 'Mnemônico para remédios: "Habeas Corpus cuida do Corpo, Habeas Data dos Dados, Mandado de Segurança da Segurança, Mandado de Injunção da Inércia legislativa".',
          },
          {
            type: 'pegadinha',
            text: 'Habeas corpus NÃO cabe para pena de multa ou suspensão de direitos — apenas para ameaça à liberdade de locomoção física. O CEBRASPE adora criar situações onde o remédio cabível é outro.',
          },
        ],
        tables: [
          {
            title: 'Remédios Constitucionais',
            headers: ['Remédio', 'Tutela', 'Legitimado', 'Gratuito?'],
            rows: [
              ['Habeas Corpus', 'Liberdade de locomoção', 'Qualquer pessoa', 'Sim'],
              ['Habeas Data', 'Informações pessoais em banco de dados', 'O próprio interessado', 'Sim'],
              ['Mandado de Segurança', 'Dir. líquido e certo contra ato ilegal/abusivo', 'Qualquer pessoa', 'Não'],
              ['Mandado de Injunção', 'Inércia legislativa — direito constitucional', 'Titular do direito', 'Não'],
              ['Ação Popular', 'Patrimônio público, moralidade, meio ambiente', 'Cidadão (eleitor)', 'Sim (salvo má-fé)'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'João descobriu que o DENATRAN possui informações incorretas sobre sua habilitação em seus registros. Qual é o remédio constitucional adequado para que João acesse e corrija essas informações?',
            options: [
              'Habeas Corpus',
              'Habeas Data',
              'Mandado de Segurança',
              'Mandado de Injunção',
            ],
            correctIndex: 1,
            explanation:
              'O Habeas Data (art. 5º, LXXII) é o remédio adequado para assegurar o conhecimento de informações relativas ao impetrante constantes de registros ou bancos de dados de entidades governamentais, bem como para a retificação de dados.',
            fonte: 'CF/88 — Art. 5º, LXXII',
          },
        ],
      },
      {
        id: 'const-art37',
        title: 'Administração Pública (Art. 37)',
        incidencia: 'alta',
        content:
          'O art. 37 da CF/88 consagra os princípios da Administração Pública e trata de licitações, concurso público, responsabilidade do Estado, improbidade e controle.\n\nOs cinco princípios expressos são: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência — formam o acrônimo LIMPE.',
        keyPoints: [
          'LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência',
          'Legalidade: o administrador só faz o que a lei permite (≠ particular que faz o que a lei não proíbe)',
          'Impessoalidade: atos para o interesse público, não para interesses próprios',
          'Moralidade: ética, boa-fé e honestidade na gestão pública',
          'Publicidade: transparência — atos devem ser divulgados (exceto segurança nacional)',
          'Eficiência: busca dos melhores resultados com menor custo (EC 19/1998)',
          'Concurso público obrigatório para cargos efetivos e empregos públicos',
          'Teto remuneratório: subsídio dos Ministros do STF (art. 37, XI)',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'LIMPE = Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência. O CEBRASPE frequentemente cita um dos princípios e pede que o candidato identifique qual foi violado.',
          },
          {
            type: 'pegadinha',
            text: '"Legalidade para a Administração é diferente para o particular." O particular pode fazer tudo que a lei NÃO proíbe. A Administração só faz o que a lei PERMITE. O CEBRASPE cobra essa distinção.',
          },
          {
            type: 'muito_cobrado',
            text: 'O princípio da Eficiência foi inserido pela EC 19/1998. A banca pode perguntar qual princípio foi acrescentado pela reforma administrativa.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Um servidor público desvia verbas públicas em benefício próprio, violando claramente normas de conduta ética. Qual princípio da administração pública foi violado de forma mais direta?',
            options: ['Legalidade', 'Impessoalidade', 'Moralidade', 'Eficiência'],
            correctIndex: 2,
            explanation:
              'O desvio de verbas para benefício próprio viola primariamente o princípio da Moralidade (e também a Legalidade). Moralidade exige que o administrador paute sua conduta pela ética, boa-fé e honestidade. Legalidade também é violada, mas a característica do desvio em benefício próprio aponta diretamente para a imoralidade administrativa.',
            fonte: 'CF/88 — Art. 37',
          },
        ],
      },
      {
        id: 'const-seg-publica',
        title: 'Segurança Pública (Art. 144)',
        incidencia: 'alta',
        content:
          'O art. 144 da CF/88 define a segurança pública como dever do Estado e responsabilidade de todos. Prevê os órgãos de segurança e suas competências exclusivas.\n\nA PRF é órgão permanente, organizado e mantido pela União, com atribuições específicas nas rodovias federais.',
        keyPoints: [
          'Órgãos: Polícia Federal, PRF, Polícia Ferroviária Federal, Polícias Civis, Militares, Bombeiros',
          'PRF: patrulhar rodovias federais — competência exclusiva (art. 144, II)',
          'Polícia Federal: crimes de repercussão interestadual, tráfico, segurança das fronteiras',
          'Polícia Civil: investigação criminal, exceto crimes militares',
          'PM: policiamento ostensivo e preservação da ordem pública',
          'Segurança pública: dever do Estado + responsabilidade de todos (§10)',
          'Guardas municipais: proteção de bens, serviços e instalações do município',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'As competências de cada órgão de segurança pública são cobradíssimas. A PRF patrulha rodovias FEDERAIS — não estaduais. A Polícia Rodoviária Estadual cuida das estaduais.',
          },
          {
            type: 'atencao',
            text: 'A Polícia Ferroviária Federal (PFF) está prevista na CF mas não foi organizada. Na prática, a PRF exerce funções similares nas ferrovias federais.',
          },
        ],
        tables: [
          {
            title: 'Órgãos de Segurança Pública — Competências',
            headers: ['Órgão', 'Âmbito', 'Atribuição Principal'],
            rows: [
              ['Polícia Federal', 'União', 'Crimes federais, drogas, fronteiras, imigração'],
              ['PRF', 'União', 'Patrulhar rodovias e estradas federais'],
              ['Polícia Civil', 'Estado', 'Investigação criminal (exceto militar)'],
              ['Polícia Militar', 'Estado', 'Policiamento ostensivo, ordem pública'],
              ['Corpo de Bombeiros', 'Estado', 'Defesa civil, combate a incêndios'],
              ['Guarda Municipal', 'Município', 'Proteção dos bens municipais'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: A Polícia Rodoviária Federal tem competência constitucional para realizar o patrulhamento ostensivo das rodovias federais, podendo, ainda, exercer atribuições de polícia judiciária nessas rodovias.',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. A CF/88 atribui à PRF o patrulhamento ostensivo das rodovias federais (art. 144, II). Além disso, a legislação (Lei 9.503/97 e Lei 9.654/98) outorga à PRF atribuições de polícia judiciária nos limites de sua competência territorial.',
            fonte: 'CF/88 — Art. 144, II',
          },
        ],
      },
    ],
  },

  // ─── 5. DIREITO ADMINISTRATIVO ───────────────────────────────────────────────
  {
    id: 'administrativo',
    name: 'Direito Administrativo',
    icon: 'briefcase',
    color: '#BF360C',
    description: 'Princípios, atos administrativos, servidores e licitações',
    topics: [
      {
        id: 'adm-principios',
        title: 'Princípios Administrativos — LIMPE',
        incidencia: 'alta',
        content:
          'Além dos cinco princípios expressos no art. 37 da CF (LIMPE), o Direito Administrativo reconhece princípios implícitos: razoabilidade, proporcionalidade, supremacia do interesse público, indisponibilidade do interesse público, continuidade dos serviços públicos, autotutela e segurança jurídica.',
        keyPoints: [
          'Legalidade: Administração só faz o que a lei autoriza',
          'Impessoalidade: vedada a promoção pessoal do agente público',
          'Moralidade: conduta ética e honesta',
          'Publicidade: transparência dos atos — prazo de 15 dias para resposta ao administrado',
          'Eficiência: melhor resultado com menor custo — introduzido pela EC 19/1998',
          'Razoabilidade/Proporcionalidade: meios adequados e necessários para os fins',
          'Autotutela: Administração revoga atos inoportunos e anula atos ilegais de ofício',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Autotutela: a Administração pode ANULAR (ato ilegal) e REVOGAR (ato inconveniente/inoportunos) seus próprios atos, sem necessidade de intervenção judicial. Súmula 473/STF.',
          },
          {
            type: 'pegadinha',
            text: 'ANULAR ≠ REVOGAR: anulação é por ILEGALIDADE (efeito ex tunc — retroativo); revogação é por CONVENIÊNCIA/OPORTUNIDADE (efeito ex nunc — sem retroatividade). O CEBRASPE troca os dois.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: Aplicando o princípio da autotutela, a Administração Pública pode revogar um ato administrativo por razões de ilegalidade, com efeitos retroativos à data da prática do ato.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. A revogação ocorre por razões de CONVENIÊNCIA e OPORTUNIDADE (mérito administrativo), com efeito ex nunc (sem retroatividade). A anulação ocorre por ILEGALIDADE com efeito ex tunc (retroativo). O enunciado misturou os dois institutos.',
            fonte: 'Estilo CEBRASPE — Dir. Adm.',
          },
        ],
      },
      {
        id: 'adm-atos',
        title: 'Atos Administrativos',
        incidencia: 'alta',
        content:
          'Ato administrativo é a manifestação unilateral da vontade da Administração que produz efeitos jurídicos. Seus atributos são: presunção de legitimidade, imperatividade, autoexecutoriedade e tipicidade.\n\nElementos do ato: competência, finalidade, forma, motivo e objeto.',
        keyPoints: [
          'Atributos: PIAT — Presunção de legitimidade, Imperatividade, Autoexecutoriedade, Tipicidade',
          'Competência: quem pratica o ato (vinculado — não discricionário)',
          'Finalidade: sempre o interesse público (vinculado)',
          'Forma: modo de exteriorização (vinculado)',
          'Motivo: situação de fato e de direito que enseja o ato (pode ser discricionário)',
          'Objeto: conteúdo — efeito jurídico produzido (pode ser discricionário)',
          'Mérito administrativo: conveniência e oportunidade — insuscetível de controle judicial',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'COFFE = Competência, Objeto, Forma, Finalidade, Motivo — os 5 elementos do ato administrativo. Competência, Forma e Finalidade são sempre VINCULADOS.',
          },
          {
            type: 'muito_cobrado',
            text: 'Discricionariedade está no MOTIVO e no OBJETO. O Judiciário pode controlar a legalidade, mas NÃO o mérito (conveniência/oportunidade) do ato administrativo.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: O Poder Judiciário pode anular ato administrativo praticado com desvio de finalidade, pois, nesse caso, o vício recai sobre a legalidade, não sobre o mérito administrativo.',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. O desvio de finalidade (o agente pratica o ato visando fim diverso do interesse público) é vício de LEGALIDADE, não de mérito. O Judiciário pode e deve anular atos ilegais — inclusive por desvio de finalidade. O mérito (conveniência/oportunidade) sim é insuscetível de controle judicial.',
            fonte: 'Estilo CEBRASPE — Dir. Adm.',
          },
        ],
      },
      {
        id: 'adm-licitacoes',
        title: 'Licitações — Lei 14.133/2021',
        incidencia: 'alta',
        content:
          'A Nova Lei de Licitações (Lei 14.133/2021) revogou a Lei 8.666/93, a Lei 10.520/02 (Pregão) e o RDC. As modalidades de licitação são: Pregão, Concorrência, Concurso, Leilão e Diálogo Competitivo.\n\nO Pregão (sempre eletrônico, prioritariamente) é a modalidade padrão para bens e serviços comuns.',
        keyPoints: [
          'Modalidades: Pregão, Concorrência, Concurso, Leilão, Diálogo Competitivo',
          'Pregão: bens e serviços comuns — preferência pelo eletrônico',
          'Concorrência: obras, serviços especiais e grandes compras',
          'Concurso: escolha de trabalho técnico, científico ou artístico',
          'Leilão: alienação de bens inservíveis ou imóveis',
          'Dispensa de licitação: situações taxativas (emergência, segurança nacional, valores baixos)',
          'Inexigibilidade: quando a competição for inviável (fornecedor exclusivo, notória especialização)',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Dispensa ≠ Inexigibilidade. Dispensa: a licitação é viável mas a lei dispensa. Inexigibilidade: a competição é inviável por natureza. O CEBRASPE cobra essa diferença.',
          },
          {
            type: 'atencao',
            text: 'A Lei 14.133/2021 eliminou a Tomada de Preços e o Convite como modalidades. Quem citar essas modalidades como existentes na legislação VIGENTE estará errado.',
          },
        ],
        tables: [
          {
            title: 'Modalidades de Licitação — Lei 14.133/2021',
            headers: ['Modalidade', 'Objeto', 'Critério de Julgamento'],
            rows: [
              ['Pregão', 'Bens e serviços comuns', 'Menor preço ou maior desconto'],
              ['Concorrência', 'Obras, serviços especiais, concessões', 'Vários critérios'],
              ['Concurso', 'Trabalho técnico, científico, artístico', 'Melhor técnica'],
              ['Leilão', 'Alienação de bens / concessões', 'Maior lance'],
              ['Diálogo Competitivo', 'Soluções inovadoras complexas', 'Variável'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'O Ministério da Justiça pretende contratar empresa exclusiva para fornecer software de reconhecimento facial, sendo o fornecedor o único detentor da tecnologia no país. Nessa situação, cabe:',
            options: [
              'Pregão eletrônico',
              'Concorrência',
              'Dispensa de licitação',
              'Inexigibilidade de licitação',
            ],
            correctIndex: 3,
            explanation:
              'Trata-se de inexigibilidade de licitação (art. 74 da Lei 14.133/2021), pois a competição é inviável quando existe fornecedor exclusivo. A dispensa (art. 75) cabe quando a competição é possível mas a lei excepciona; aqui, a competição é impossível por natureza.',
            fonte: 'Lei 14.133/2021 — Art. 74',
          },
        ],
      },
    ],
  },

  // ─── 6. DIREITO PENAL ─────────────────────────────────────────────────────────
  {
    id: 'penal',
    name: 'Direito Penal',
    icon: 'alert-triangle',
    color: '#4A148C',
    description: 'Princípios, crimes e legislação especial para o concurso PRF',
    topics: [
      {
        id: 'pen-principios',
        title: 'Princípios do Direito Penal',
        incidencia: 'alta',
        content:
          'O Direito Penal é regido por princípios que limitam o poder punitivo do Estado. O CEBRASPE cobra a identificação dos princípios e suas aplicações práticas — especialmente legalidade, intervenção mínima e insignificância.',
        keyPoints: [
          'Legalidade: não há crime sem lei anterior que o defina — nullum crimen sine lege',
          'Anterioridade: lei penal não retroage para prejudicar — só para beneficiar',
          'Intervenção mínima: Direito Penal como última ratio (ultima ratio)',
          'Fragmentariedade: só os bens jurídicos mais importantes são protegidos pelo DP',
          'Subsidiariedade: DP só age quando outros ramos são insuficientes',
          'Insignificância (bagatela): excluí tipicidade material para lesões mínimas',
          'Culpabilidade: ninguém pode ser punido pelo que é, só pelo que fez',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'Princípio da Insignificância (STJ/STF): para sua aplicação, exige 4 vetores: (1) mínima ofensividade da conduta, (2) ausência de periculosidade social, (3) reduzido grau de reprovabilidade, (4) inexpressividade da lesão jurídica.',
          },
          {
            type: 'pegadinha',
            text: 'A insignificância NÃO se aplica a crimes cometidos com violência ou grave ameaça, crimes contra a fé pública (moeda falsa), tráfico de drogas e crimes praticados por reincidentes contumaces.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: O princípio da legalidade no Direito Penal proíbe a criação de crimes por analogia ou por costume, exigindo lei formal e anterior que descreva a conduta criminosa.',
            options: ['Certo', 'Errado'],
            correctIndex: 0,
            explanation:
              'CERTO. O princípio da legalidade estrita (nullum crimen nulla poena sine lege scripta, stricta, certa et praevia) exige lei formal escrita, estrita (sem analogia para criar crimes) e prévia (antes do fato). Costume e analogia não podem criar tipos penais.',
            fonte: 'CP — Art. 1º; CF/88 — Art. 5º, XXXIX',
          },
        ],
      },
      {
        id: 'pen-drogas',
        title: 'Lei de Drogas — Lei 11.343/2006',
        incidencia: 'alta',
        content:
          'A Lei 11.343/2006 (Lei de Drogas) distingue tráfico (art. 33) de uso pessoal (art. 28). O tráfico é crime hediondo; o uso pessoal não é mais criminalizado com pena privativa de liberdade.\n\nA distinção entre tráfico e uso é feita pelo juiz com base em conjunto de circunstâncias: local, quantidade, instrumentos, precedentes.',
        keyPoints: [
          'Art. 28: usar/portar para uso pessoal — não há prisão, apenas advertência/serviço comunitário',
          'Art. 33: tráfico de drogas — pena de 5 a 15 anos de reclusão (crime hediondo)',
          'Art. 33, §4º: traficante de primeiro crime, sem violência, sem quadrilha = redução de 1/6 a 2/3',
          'Crime hediondo: insuscetível de anistia, graça, indulto; fiança proibida',
          'Associação para o tráfico (art. 35): 3 a 10 anos',
          'Financiamento do tráfico (art. 36): 8 a 20 anos',
          'Causa de aumento: tráfico nas proximidades de escolas, clubes, igrejas, unidades militares',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'O §4º do art. 33 (traficante privilegiado) é muito cobrado: primeiro crime + sem violência ou grave ameaça + não integra organização criminosa = redução de 1/6 a 2/3.',
          },
          {
            type: 'atencao',
            text: 'O STF declarou inconstitucional criminalizar o uso (art. 28) com pena de prisão, mas o porte para uso pessoal ainda é ilícito — sujeito a medidas educativas, não prisão.',
          },
        ],
        exercises: [
          {
            enunciado:
              'João foi preso em flagrante portando pequena quantidade de maconha. O delegado constatou que se tratava de usuário, não de traficante. Julgue: João poderá ser preso em flagrante e mantido preso preventivamente por posse de droga para uso pessoal.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. O art. 28 da Lei de Drogas não prevê pena privativa de liberdade para o usuário. As sanções são: advertência, prestação de serviços à comunidade e medida educativa. O STF (RE 635.659) consolidou que a criminalização do uso para fins pessoais é inconstitucional.',
            fonte: 'Lei 11.343/2006 — Art. 28',
          },
        ],
      },
    ],
  },

  // ─── 7. INFORMÁTICA ────────────────────────────────────────────────────────────
  {
    id: 'informatica',
    name: 'Informática',
    icon: 'monitor',
    color: '#006064',
    description: 'Sistemas, Office, internet, segurança e LGPD',
    topics: [
      {
        id: 'inf-office',
        title: 'Microsoft Office (Word, Excel, PowerPoint)',
        incidencia: 'alta',
        content:
          'O pacote Microsoft Office é cobrado em quase todas as provas de informática para concursos. O CEBRASPE privilegia funcionalidades práticas: atalhos de teclado, funções do Excel, formatação no Word e recursos do PowerPoint.',
        keyPoints: [
          'Word: Ctrl+B (negrito), Ctrl+I (itálico), Ctrl+U (sublinhado), Ctrl+Z (desfazer)',
          'Word: Ctrl+Enter = quebra de página; F7 = verificar ortografia',
          'Excel: célula = coluna + linha (A1, B3); $A$1 = referência absoluta',
          'Excel: =SOMA(A1:A10); =MÉDIA(A1:A10); =SE(condição;verdadeiro;falso)',
          'Excel: =PROCV(valor;tabela;coluna;0) — busca vertical',
          'Excel: Ctrl+; = data atual; Ctrl+Shift+; = hora atual',
          'PowerPoint: F5 = iniciar apresentação; Ctrl+M = novo slide',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'A função =SE() do Excel é uma das mais cobradas: =SE(condição;"se verdadeiro";"se falso"). Ex: =SE(A1>=7;"Aprovado";"Reprovado").',
          },
          {
            type: 'memorize',
            text: 'Referência absoluta no Excel: $ trava a coluna e/ou linha. $A$1 = trava tudo; $A1 = trava só coluna; A$1 = trava só linha.',
          },
          {
            type: 'pegadinha',
            text: '"Salvar" (Ctrl+S) ≠ "Salvar como" (F12 ou Ctrl+Shift+S). O CEBRASPE mistura esses atalhos. "Salvar como" cria uma nova cópia do arquivo.',
          },
        ],
        tables: [
          {
            title: 'Principais Funções do Excel',
            headers: ['Função', 'Sintaxe', 'O que faz'],
            rows: [
              ['SOMA', '=SOMA(A1:A10)', 'Soma os valores do intervalo'],
              ['MÉDIA', '=MÉDIA(A1:A10)', 'Calcula a média aritmética'],
              ['MÁXIMO', '=MÁXIMO(A1:A10)', 'Retorna o maior valor'],
              ['MÍNIMO', '=MÍNIMO(A1:A10)', 'Retorna o menor valor'],
              ['SE', '=SE(cond;V;F)', 'Retorna V se cond é verdadeira, F se falsa'],
              ['PROCV', '=PROCV(val;tab;col;0)', 'Busca vertical em tabela'],
              ['CONT.SE', '=CONT.SE(range;crit)', 'Conta células que atendem ao critério'],
              ['SOMASE', '=SOMASE(range;crit;soma)', 'Soma se atende ao critério'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'No Excel, a célula A1 contém o valor 8 e a célula B1 contém a fórmula =SE(A1>=7;"Aprovado";"Reprovado"). Qual será o resultado exibido em B1?',
            options: ['Reprovado', 'Aprovado', '#ERRO!', '8'],
            correctIndex: 1,
            explanation:
              'A função SE verifica se A1 >= 7. Como A1 = 8 (que é maior ou igual a 7), a condição é verdadeira, e a função retorna "Aprovado".',
            fonte: 'Estilo CEBRASPE — Informática',
          },
        ],
      },
      {
        id: 'inf-internet',
        title: 'Internet, Protocolos e Redes',
        incidencia: 'alta',
        content:
          'A internet é uma rede mundial de computadores baseada no protocolo TCP/IP. O CEBRASPE cobra os principais protocolos e suas portas, a diferença entre HTTP e HTTPS, e conceitos de segurança.\n\nConheça os protocolos mais importantes e suas portas padronizadas.',
        keyPoints: [
          'HTTP: porta 80 — transferência de hipertexto (não criptografado)',
          'HTTPS: porta 443 — HTTP com criptografia TLS/SSL',
          'FTP: porta 21 — transferência de arquivos',
          'SMTP: porta 25/587 — envio de e-mail',
          'POP3: porta 110 — recebimento de e-mail (baixa e remove do servidor)',
          'IMAP: porta 143 — acesso ao e-mail no servidor (sincronizado)',
          'DNS: porta 53 — converte nome de domínio em IP',
          'DHCP: atribui IP automaticamente na rede local',
        ],
        highlights: [
          {
            type: 'memorize',
            text: 'HTTP(80), HTTPS(443), FTP(21), SMTP(25), POP3(110), IMAP(143), DNS(53). Memorize as portas principais!',
          },
          {
            type: 'pegadinha',
            text: 'POP3 ≠ IMAP: POP3 baixa e-mail e geralmente remove do servidor (sem sincronização). IMAP mantém os e-mails no servidor e sincroniza em todos os dispositivos.',
          },
          {
            type: 'muito_cobrado',
            text: 'O HTTPS usa certificado digital e criptografia TLS/SSL. O "cadeado" no navegador indica HTTPS. Isso NÃO garante que o site é legítimo — apenas que a conexão é criptografada.',
          },
        ],
        tables: [
          {
            title: 'Protocolos de Internet e Portas',
            headers: ['Protocolo', 'Porta', 'Função'],
            rows: [
              ['HTTP', '80', 'Transferência de páginas web (sem criptografia)'],
              ['HTTPS', '443', 'HTTP com criptografia TLS/SSL'],
              ['FTP', '21', 'Transferência de arquivos entre computadores'],
              ['SMTP', '25 / 587', 'Envio de e-mails'],
              ['POP3', '110', 'Recebimento de e-mails (baixa do servidor)'],
              ['IMAP', '143', 'Acesso sincronizado a e-mails no servidor'],
              ['DNS', '53', 'Resolução de nomes de domínio para IP'],
              ['DHCP', '67/68', 'Atribuição automática de IPs na rede'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: O protocolo HTTPS garante que o site acessado é confiável e legítimo, além de criptografar a comunicação entre o navegador e o servidor.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. O HTTPS garante apenas a CRIPTOGRAFIA da conexão, não a legitimidade do site. Sites falsos (phishing) também podem usar HTTPS com certificado digital válido. O "cadeado" indica que a comunicação é criptografada, não que o site é confiável.',
            fonte: 'Estilo CEBRASPE — Informática',
          },
        ],
      },
      {
        id: 'inf-seguranca',
        title: 'Segurança da Informação e LGPD',
        incidencia: 'alta',
        content:
          'Segurança da informação tem como pilares: Confidencialidade, Integridade e Disponibilidade (CID). A LGPD (Lei 13.709/2018) regula o tratamento de dados pessoais no Brasil.\n\nConheça os principais tipos de malware e as práticas de segurança exigidas no concurso.',
        keyPoints: [
          'CID: Confidencialidade (acesso autorizado), Integridade (não alterado), Disponibilidade (acesso quando necessário)',
          'Vírus: precisa de arquivo hospedeiro para se propagar',
          'Worm: propaga-se sozinho pela rede, sem hospedeiro',
          'Trojan (Cavalo de Troia): abre backdoor — parece útil mas é malicioso',
          'Ransomware: criptografa arquivos e exige resgate (ex.: WannaCry)',
          'Phishing: e-mail ou site falso para roubar credenciais',
          'LGPD: dados pessoais só podem ser tratados com base legal',
          'ANPD: Autoridade Nacional de Proteção de Dados — fiscaliza a LGPD',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'A diferença entre vírus, worm e trojan é frequentíssima: Vírus = hospedeiro necessário; Worm = propaga sozinho; Trojan = disfarçado de programa legítimo.',
          },
          {
            type: 'memorize',
            text: 'LGPD — Direitos do titular: acesso, correção, exclusão, portabilidade, informação, revogação do consentimento. A ANPD é o órgão fiscalizador.',
          },
          {
            type: 'atencao',
            text: 'Ransomware NÃO rouba dados — ele SEQUESTRA o acesso (criptografa). Spyware SIM rouba dados ao monitorar silenciosamente. O CEBRASPE troca esses conceitos.',
          },
        ],
        tables: [
          {
            title: 'Tipos de Malware',
            headers: ['Malware', 'Características', 'Exemplo'],
            rows: [
              ['Vírus', 'Precisa de arquivo hospedeiro; se replica ao ser executado', 'ILOVEYOU'],
              ['Worm', 'Auto-replica pela rede sem hospedeiro; usa vulnerabilidades', 'WannaCry (parcialmente)'],
              ['Trojan', 'Disfarçado de programa legítimo; abre backdoor', 'Zeus, njRAT'],
              ['Ransomware', 'Criptografa arquivos; exige pagamento (resgate)', 'WannaCry, LockBit'],
              ['Spyware', 'Monitora atividades e envia ao atacante', 'Keylogger'],
              ['Adware', 'Exibe propagandas indesejadas', 'Vários plugins'],
              ['Rootkit', 'Oculta presença de outros malwares', 'Bury, Necurs'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Um funcionário recebeu um e-mail aparentemente do banco solicitando que atualizasse seus dados em um link. Ao clicar, foi para um site falso idêntico ao do banco. Esse ataque chama-se:',
            options: ['Ransomware', 'Phishing', 'Worm', 'Spyware'],
            correctIndex: 1,
            explanation:
              'Phishing é o ataque que usa e-mails ou sites falsos que imitam entidades legítimas para enganar vítimas e roubar credenciais ou dados. O termo vem de "fishing" (pesca) — o criminoso "pesca" vítimas com uma isca.',
            fonte: 'Estilo CEBRASPE — Informática',
          },
        ],
      },
    ],
  },

  // ─── 8. DIREITOS HUMANOS ──────────────────────────────────────────────────────
  {
    id: 'direitos_humanos',
    name: 'Direitos Humanos',
    icon: 'users',
    color: '#880E4F',
    description: 'DUDH, Pacto de São José, sistemas de proteção e PRF',
    topics: [
      {
        id: 'dh-dudh',
        title: 'Declaração Universal dos Direitos Humanos',
        incidencia: 'alta',
        content:
          'A Declaração Universal dos Direitos Humanos (DUDH) foi proclamada pela ONU em 10 de dezembro de 1948. Composta de 30 artigos, não é tratado — é resolução da Assembleia Geral, sem força vinculante formal, mas com enorme autoridade moral e política.\n\nSeus princípios foram incorporados por constituições e tratados internacionais, tornando-se parte do Direito Internacional costumeiro.',
        keyPoints: [
          'Data: 10 de dezembro de 1948 — Dia Internacional dos Direitos Humanos',
          'Órgão: Assembleia Geral da ONU — Resolução 217 A(III)',
          'Não é tratado: não tem força vinculante direta, mas é soft law influente',
          'Princípios: universalidade, inalienabilidade, indivisibilidade, interdependência',
          'Arts. 1-2: dignidade, igualdade e não discriminação',
          'Arts. 3-11: direitos civis (vida, liberdade, integridade, proibição de tortura)',
          'Arts. 22-28: direitos econômicos, sociais e culturais',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'A DUDH NÃO é tratado internacional — é resolução. Não pode ser ratificada pelos Estados. Mas seus princípios integram o costume internacional e inspiram tratados vinculantes.',
          },
          {
            type: 'memorize',
            text: '10/12/1948 = DUDH. "10 de Dezembro" é fácil de lembrar: é o Dia dos Direitos Humanos. Resolução 217 A (III) da AGNU.',
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: A Declaração Universal dos Direitos Humanos, por ser um tratado internacional ratificado pelo Brasil, tem força de lei no ordenamento jurídico brasileiro.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. A DUDH NÃO é um tratado internacional — é uma Resolução da Assembleia Geral da ONU. Por isso, não pode ser ratificada pelos estados. Trata-se de soft law, com autoridade moral mas sem força vinculante formal de tratado.',
            fonte: 'Estilo CEBRASPE — Dir. Humanos',
          },
        ],
      },
      {
        id: 'dh-pacto-sj',
        title: 'Pacto de São José da Costa Rica',
        incidencia: 'alta',
        content:
          'A Convenção Americana sobre Direitos Humanos (CADH), conhecida como Pacto de São José da Costa Rica, foi assinada em 1969 e ratificada pelo Brasil em 1992. É o principal tratado de direitos humanos do sistema interamericano.\n\nCria dois órgãos de monitoramento: Comissão Interamericana de DH (CIDH) e Corte Interamericana de DH.',
        keyPoints: [
          'Assinatura: 22 de novembro de 1969 (São José, Costa Rica)',
          'Ratificação pelo Brasil: 1992 — incorporado ao sistema jurídico brasileiro',
          'Órgãos: Comissão Interamericana (CIDH) + Corte Interamericana de DH',
          'CIDH: analisa petições individuais — pode recomendar mas não tem força obrigatória direta',
          'Corte IDH: jurisdição contenciosa — sentenças são vinculantes para os Estados',
          'Art. 7: direito à liberdade e segurança pessoais',
          'Art. 8: garantias judiciais (devido processo legal, contraditório, ampla defesa)',
          'Art. 5: direito à integridade pessoal — proibição de tortura e tratamentos degradantes',
        ],
        highlights: [
          {
            type: 'muito_cobrado',
            text: 'CIDH ≠ Corte IDH: A CIDH (Comissão) não tem poder jurisdicional — ela faz recomendações. A Corte IDH tem jurisdição contenciosa e suas decisões são vinculantes para os estados que aceitaram sua competência.',
          },
          {
            type: 'atencao',
            text: 'O Brasil reconheceu a jurisdição obrigatória da Corte IDH em 1998. Isso significa que o Brasil pode ser condenado internacionalmente e deve cumprir as sentenças da Corte.',
          },
        ],
        tables: [
          {
            title: 'Sistemas de Proteção dos Direitos Humanos',
            headers: ['Sistema', 'Âmbito', 'Órgãos Principais', 'Instrumento'],
            rows: [
              ['ONU (Global)', 'Universal', 'Conselho de DH, Comitês de Tratados', 'DUDH, Pactos ONU'],
              ['OEA (Americano)', 'Américas', 'CIDH, Corte IDH', 'CADH (Pacto São José)'],
              ['Europa', 'Europa', 'Corte Europeia de DH', 'Convenção Europeia'],
              ['África', 'África', 'Comissão Africana', 'Carta Africana'],
            ],
          },
        ],
        exercises: [
          {
            enunciado:
              'Julgue: A Comissão Interamericana de Direitos Humanos tem competência para proferir sentenças vinculantes condenando Estados que violaram direitos previstos na Convenção Americana.',
            options: ['Certo', 'Errado'],
            correctIndex: 1,
            explanation:
              'ERRADO. A Comissão Interamericana (CIDH) não tem competência jurisdicional — ela recebe petições, faz relatórios e recomendações, e pode encaminhar casos à Corte IDH. Quem profere sentenças vinculantes é a CORTE Interamericana de Direitos Humanos, não a Comissão.',
            fonte: 'Estilo CEBRASPE — Dir. Humanos',
          },
        ],
      },
    ],
  },
];
