/** Indica se a opção, como está publicada, sustenta um pedido de visto de estudos. */
export type VisaFit = 'ok' | 'confirm' | 'no'

export interface StudyOption {
  name: string
  program: string
  location: string
  modality: string
  price: string
  fit: VisaFit
  fitNote: string
  url: string
}

export interface StudyGroup {
  title: string
  description: string
  options: StudyOption[]
}

export interface StudyPath {
  intro: string[]
  steps: string[]
  spotlight: { title: string; items: string[] }
  groups: StudyGroup[]
  priceNote: string
}

const MADRID_ADMISSION =
  'https://www.comunidad.madrid/docs/2026-05/instrucciones_admision_cfgs_26-27_vf_sello.pdf?VersionId=40ognLSqPs8I_C7P2YP28aK8bcPMTeVR'

export const TECH_STUDY_PATH: StudyPath = {
  intro: [
    'Cursos de FP de Grado Superior em informática: DAW (desenvolvimento web), DAM (aplicações multiplataforma) e ASIR (sistemas e redes). Duram 2 anos e 2.000 horas, com prática em empresa.',
    'FP de Grado Superior faz parte da educação superior na Espanha (LOE, art. 3.5). Por isso, a leitura é que entra no art. 52.1.a do Reglamento, em tempo integral e com pelo menos 50% presencial. FP 100% online não serve para o visto.',
    'Nessa leitura, o estudante pode trabalhar até 30 horas semanais, na comunidade autônoma da autorização, e o estágio do curso já está coberto. Ao se formar, pode pedir residência e trabalho sem novo visto e sem avaliação da situação nacional de emprego.',
    'Conta mínima por pessoa: €7.200 por ano de sustento (100% do IPREM), mais curso e seguro. Se os dois estudarem, cada um paga o próprio curso, e ambos podem trabalhar. Se um for como familiar, esse não pode trabalhar.',
    'As aulas tendem a ser em espanhol, e algumas regiões têm língua própria: confirme o idioma com a escola.',
  ],
  steps: [
    'Comece meses antes: homologue o diploma de ensino médio ao título de Bachiller no Ministerio de Educación, com documentos legalizados e tradução. O volante do pedido permite matrícula condicional em Madrid e na iLERNA.',
    'Escolha um curso presencial, ou com pelo menos 50% presencial, em centro oficial, e peça por escrito a confirmação de que serve para visto.',
    'Consiga a admissão, pague a matrícula e guarde a carta de aceitação assinada eletronicamente.',
    'Peça o visto com pelo menos 2 meses de antecedência do início. Para início em setembro, isso significa até julho.',
  ],
  spotlight: {
    title: 'Por que olhar a Andaluzia',
    items: [
      'Faculdade pública: €12,62 por crédito, cerca de €757/ano em 60 créditos. Sevilha e Jaén informam o mesmo preço para estrangeiros. Em Madrid, quem é de fora da UE paga cerca de €7.714/ano.',
      'Málaga: TechPark com 719 empresas e 29.018 trabalhadores no fim de 2025, com peso forte de microeletrônica e telecomunicações (52% do emprego). É o polo mais conhecido, mas o aluguel não é barato: média de €1.863 em agosto de 2026, ou €1.016 em imóveis de até 60 m².',
      'Sevilha: Sevilla TechPark com 602 empresas e 35.806 empregos em 2025, em vários setores além de software. Aluguel médio entre €1.404 e €1.510.',
      'Granada: Parque Tecnológico de la Salud voltado a saúde, biotecnologia, TIC e IA. Polo menor e sem número atual confirmado, mas com o menor aluguel dos três: €1.029 em junho de 2026.',
      'Para comparar: aluguel médio em Madrid de €2.567 em julho de 2026. Valores de anúncios, com filtros diferentes, servem só como referência.',
    ],
  },
  groups: [
    {
      title: 'Andaluzia: FP pública',
      description: 'Institutos públicos, sem mensalidade publicada: não confirmei taxas para estrangeiros. O pedido é feito pela Secretaría Virtual, com iANDE ou certificado digital, ou entregue em pessoa no centro, o que dificulta pedir do Brasil. A Junta não trata de candidatos no exterior: confirme antes.',
      options: [
        {
          name: 'CPIFP Alan Turing',
          program: 'DAM',
          location: 'Campanillas (Málaga)',
          modality: 'Presencial',
          price: 'Público; valor não confirmado.',
          fit: 'confirm',
          fitNote: 'Centro público integrado de FP. Confirme admissão de quem está fora da Espanha.',
          url: 'https://www.educaweb.com/ciclos-formativos-grado-superior/programacion/malaga/',
        },
        {
          name: 'IES em Málaga capital',
          program: 'DAM e DAW: IES Politécnico Jesús Marín, IES Belén e IES Portada Alta. DAM: IES Pablo Picasso.',
          location: 'Málaga',
          modality: 'Presencial',
          price: 'Público; valor não confirmado.',
          fit: 'confirm',
          fitNote: 'Confirme vagas, nota de corte e admissão de quem está fora da Espanha.',
          url: 'https://www.educaweb.com/ciclos-formativos-grado-superior/programacion/malaga/',
        },
        {
          name: 'IES na região de Sevilha',
          program: 'DAW: IES Hermanos Machado, IES Camas-Antonio Brisquet, IES Alixar e IES Cristóbal de Monroy',
          location: 'Dos Hermanas, Camas, Castilleja de la Cuesta e Alcalá de Guadaíra',
          modality: 'Presencial',
          price: 'Público; valor não confirmado.',
          fit: 'confirm',
          fitNote: 'Ficam em cidades da região, e não na capital: considere o transporte.',
          url: 'https://www.educaweb.com/cursos/programacion/sevilla/?p=4',
        },
        {
          name: 'Oferta pública da Junta de Andalucía',
          program: 'Busca oficial de ciclos, inclusive em Granada, onde não confirmei instituto público',
          location: 'Toda a Andaluzia',
          modality: 'Presencial e outras',
          price: 'Público; valor não confirmado.',
          fit: 'confirm',
          fitNote: 'Acesso com Bachiller: 45% das vagas no cupo principal.',
          url: 'https://www.juntadeandalucia.es/educacion/secretariavirtual/consulta/oferta-educativa-formacion-profesional-completa/',
        },
      ],
    },
    {
      title: 'Andaluzia: FP privada presencial',
      description: 'A maioria não publica preço, então não dá para dizer que é mais barata que em Madrid. Peça orçamento a várias escolas.',
      options: [
        {
          name: 'Accedia FP Sevilha',
          program: 'DAW, título oficial',
          location: 'Sevilha',
          modality: 'Presencial (também há online)',
          price: '€3.600/ano em promoção (normal €6.000/ano). Ciclo: cerca de €7.200 a €12.000.',
          fit: 'ok',
          fitNote: 'Único preço presencial confirmado na página da própria escola na Andaluzia.',
          url: 'https://www.accediafp.es/grado-superior/tecnico-superior-en-desarrollo-de-aplicaciones-web',
        },
        {
          name: 'Davante MEDAC Málaga',
          program: 'DAW, título oficial (também há DAM e ASIR em Málaga)',
          location: 'Málaga',
          modality: 'Presencial',
          price: 'Sem preço na página do DAW. Dupla titulação DAM-DAW: desde €112/mês.',
          fit: 'ok',
          fitNote: 'Escolha o formato presencial, e não a distância.',
          url: 'https://medac.es/grado-superior/daw-malaga-desarrollo-aplicaciones-web',
        },
        {
          name: 'DIGITECH',
          program: 'DAW e DAM, título oficial',
          location: 'Málaga e Sevilha',
          modality: 'Presencial',
          price: 'Sem preço publicado: peça orçamento.',
          fit: 'ok',
          fitNote: 'A escola pede para confirmar modalidade e turma.',
          url: 'https://digitechfp.com/fp-grado-superior/daw-malaga/',
        },
        {
          name: 'CESUR Málaga',
          program: 'DAM, título oficial',
          location: 'Málaga',
          modality: 'Presencial',
          price: 'Sem preço publicado: peça orçamento.',
          fit: 'ok',
          fitNote: 'Escolha o formato presencial, e não o online.',
          url: 'https://www.cesurformacion.com/fp/desarrollo-de-aplicaciones-multiplataforma/malaga',
        },
        {
          name: 'Mercedarias Granada FP',
          program: 'DAW, título oficial',
          location: 'Granada',
          modality: 'Presencial, tarde, 15:00–21:00',
          price: 'Sem preço publicado: peça orçamento.',
          fit: 'ok',
          fitNote: 'Dados de diretório: confirme com a escola.',
          url: 'https://www.educaweb.com/curso/ciclo-formativo-grado-superior-desarrollo-aplicaciones-web-granada-394680/',
        },
        {
          name: 'CEI',
          program: 'DAW, título oficial',
          location: 'Sevilha',
          modality: 'Não confirmada',
          price: '€6.000, segundo comparador, sem dizer se é por ano ou ciclo.',
          fit: 'confirm',
          fitNote: 'Confirme modalidade e preço com a escola.',
          url: 'https://dondeestudiar.eu/fp/grado-superior/daw/',
        },
      ],
    },
    {
      title: 'Andaluzia: faculdades de informática',
      description: 'Menor preço de faculdade encontrado. Atenção: a fase de estrangeiros de 2026/27 exige diploma obtido depois de 1/1/2023, nota mínima e homologação pedida, com inscrição em março. Diploma mais antigo precisa de outra via: confirme com a universidade.',
      options: [
        {
          name: 'Universidad de Sevilla',
          program: 'Grado en Ingeniería Informática-Ingeniería del Software (225 vagas)',
          location: 'Sevilha',
          modality: 'Presencial, em espanhol',
          price: '€12,62 por crédito (cerca de €757/ano em 60 créditos). A US informa o mesmo preço para nacionais e internacionais.',
          fit: 'ok',
          fitNote: 'Bonificação de 99% por créditos aprovados vale a partir do 2º ano: confirme se aplica a quem não é residente.',
          url: 'https://www.us.es/estudiar/que-estudiar/oferta-de-grados/grado-en-ingenieria-informatica-ingenieria-del-software',
        },
        {
          name: 'Universidad de Málaga',
          program: 'Ingeniería del Software, Ingeniería Informática, Ciberseguridad e IA',
          location: 'Málaga',
          modality: 'Presencial, em espanhol e inglês (Ingeniería del Software, 75 vagas)',
          price: '€12,62 por crédito no preço geral (cerca de €757/ano). Preço para não residente não confirmado.',
          fit: 'confirm',
          fitNote: 'O decreto de 2020 permite que a universidade mude o preço de não residentes: confirme.',
          url: 'https://www.uma.es/grado-en-ingenieria-del-software',
        },
        {
          name: 'Universidad de Granada',
          program: 'Grado en Ingeniería Informática, com especialidade em Ingeniería del Software',
          location: 'Granada',
          modality: 'Não informada',
          price: '€12,62 por crédito no preço geral (cerca de €757/ano). Preço para não residente não confirmado.',
          fit: 'confirm',
          fitNote: 'Confirme modalidade e preço de não residentes.',
          url: 'https://www.ugr.es/estudiantes/grados/grado-ingenieria-informatica',
        },
      ],
    },
    {
      title: 'FP pública em Madrid',
      description: 'Vagas limitadas, com concorrência e calendário regional. O resultado pode sair perto do prazo do visto, então vale ter plano B.',
      options: [
        {
          name: 'Centros públicos da Comunidad de Madrid',
          program: 'DAW, DAM e ASIR, conforme o centro',
          location: 'Madrid (outras regiões têm processo próprio)',
          modality: 'Presencial, além de vagas virtuais e semipresenciais',
          price: 'Em geral gratuita ou com taxa baixa; guia não oficial cita cerca de €50/ano. Não confirmei o valor para estrangeiros.',
          fit: 'confirm',
          fitNote: 'Instruções aceitam visto de estudos ou passaporte como identificação, e homologação ou volante. O calendário de 2026 mudou em julho por causa de incêndios: confirme o do próximo ano.',
          url: MADRID_ADMISSION,
        },
      ],
    },
    {
      title: 'FP privada presencial em Madrid e redes nacionais',
      description: 'Mais previsível para conseguir a carta de aceitação a tempo que a FP pública.',
      options: [
        {
          name: 'Accedia FP',
          program: 'DAW, título oficial',
          location: 'Madrid e Sevilha',
          modality: 'Presencial (também há online)',
          price: '€3.600/ano em promoção (normal €6.000/ano). Ciclo: cerca de €7.200 a €12.000.',
          fit: 'ok',
          fitNote: 'Escolha o formato presencial, e não o online.',
          url: 'https://www.accediafp.es/grado-superior/tecnico-superior-en-desarrollo-de-aplicaciones-web',
        },
        {
          name: 'Andel FP',
          program: 'DAW e ASIR, título oficial',
          location: 'Alcorcón (Madrid)',
          modality: 'Turno da tarde, 15:15–21:00; a página não usa a palavra presencial',
          price: '€4.350/ano + €350 de reserva em 2026/27. Ciclo: cerca de €9.400.',
          fit: 'confirm',
          fitNote: 'Confirme a modalidade e a emissão da carta para visto.',
          url: 'https://fp.andel.es/precios/',
        },
        {
          name: 'MEDAC',
          program: 'DAW, título oficial',
          location: 'Madrid, Sevilha, Málaga, Granada, Córdoba, Murcia e outras',
          modality: 'Presencial (também há a distância)',
          price: 'Sem preço publicado: peça orçamento.',
          fit: 'ok',
          fitNote: 'Escolha o formato presencial, e não a distância.',
          url: 'https://www.medac.es/grado-superior/daw-desarrollo-aplicaciones-web',
        },
        {
          name: 'iLERNA Presencial',
          program: 'FP de informática, título oficial',
          location: 'Madrid, Barcelona, Sevilha, Valladolid, Córdoba, Lleida e outras',
          modality: 'Presencial',
          price: 'Preço presencial não encontrado: peça orçamento.',
          fit: 'confirm',
          fitNote: 'Confirme se DAW presencial é oferecido na cidade desejada.',
          url: 'https://www.ilerna.es',
        },
        {
          name: 'Linkia FP',
          program: 'DAW, título oficial',
          location: 'Madrid (San Blas-Canillejas)',
          modality: 'Página ambígua: cita online e aulas no centro',
          price: 'Desde €2.300/ano, segundo comparador. A escola usa simulador.',
          fit: 'confirm',
          fitNote: 'Confirme por escrito pelo menos 50% presencial.',
          url: 'https://linkiafp.es/fp-ciclo-superior-desarrollo-de-aplicaciones-web-en-madrid/',
        },
        {
          name: 'Prometeo by thePower',
          program: 'DAW, título oficial',
          location: 'Madrid',
          modality: 'Não confirmada',
          price: '€2.999, segundo comparador, sem dizer se é por ano ou ciclo.',
          fit: 'confirm',
          fitNote: 'Confirme modalidade e preço com a escola.',
          url: 'https://dondeestudiar.eu/fp/grado-superior/daw/madrid/',
        },
      ],
    },
    {
      title: 'Faculdades de informática em outras regiões',
      description: 'Grado universitário de 4 anos. Mais tempo e, nestas públicas, preço maior para estrangeiros de fora da UE. Admissão de diploma estrangeiro segue regras próprias: confirme em cada universidade.',
      options: [
        {
          name: 'Universidad de Alicante',
          program: 'Grado en Ingeniería en Informática',
          location: 'Alicante',
          modality: 'Não informada na página de preços',
          price: 'Cerca de €2.080/ano para fora da UE (dobro de €17,34 por crédito, em 60 créditos).',
          fit: 'confirm',
          fitNote: 'Menor preço confirmado para fora da UE nesta lista, mas acima de Sevilha. Confirme a modalidade.',
          url: 'https://web.ua.es/es/oia/acceso-preinscripcion-y-matricula/matricula/precios-publicos-universitarios.html',
        },
        {
          name: 'Universitat Politècnica de València',
          program: 'Grado en Ingeniería Informática',
          location: 'Valência',
          modality: 'Não informada',
          price: '€17,34 por crédito em 2026/27 (cerca de €1.040/ano). Preço para fora da UE não informado e pode ser maior.',
          fit: 'confirm',
          fitNote: 'Confirme o preço para fora da UE. Nota de corte 9,67.',
          url: 'https://www.upv.es/titulaciones/GII/',
        },
        {
          name: 'Universidad Autónoma de Madrid',
          program: 'Grado en Ingeniería Informática',
          location: 'Madrid',
          modality: 'Presencial',
          price: '€7.714/ano para fora da UE (€1.166/ano no preço geral).',
          fit: 'ok',
          fitNote: 'Nota de corte alta: 10,531 em 2026/27.',
          url: 'https://www.uam.es/uam/informatica',
        },
        {
          name: 'Universidad Complutense de Madrid',
          program: 'Ingeniería Informática, Ingeniería del Software e outros',
          location: 'Madrid',
          modality: 'Não informada na página de preços',
          price: '€128,57 por crédito para não residentes de fora da UE (cerca de €7.714 em 60 créditos).',
          fit: 'confirm',
          fitNote: 'Autorização de estudos não dá direito ao preço de residente. Confirme a modalidade.',
          url: 'https://www.ucm.es/informacion/precios-de-grado',
        },
        {
          name: 'U-tad',
          program: 'Grados oficiais voltados a tecnologia e desenvolvimento',
          location: 'Las Rozas e Madrid',
          modality: 'Presencial e online',
          price: 'Sem preço publicado na página lida: peça orçamento.',
          fit: 'confirm',
          fitNote: 'Universidade privada. Tem página para estudantes internacionais.',
          url: 'https://u-tad.com/estudios/grado-ingenieria-en-desarrollo-de-contenidos-digitales/',
        },
        {
          name: 'Universidad Europea',
          program: 'Grado en Ingeniería Informática',
          location: 'Madrid',
          modality: 'Presencial e online',
          price: 'Sem preço publicado na página lida: peça orçamento.',
          fit: 'confirm',
          fitNote: 'Universidade privada. Confirme o formato presencial.',
          url: 'https://www.universidadeuropea.com/grado-ingenieria-informatica-madrid/',
        },
      ],
    },
    {
      title: 'Baratos, mas não servem para este visto',
      description: 'Boas formações, mas sem os requisitos do visto. Podem complementar os estudos de quem já estiver na Espanha.',
      options: [
        {
          name: '42 Madrid e Campus 42',
          program: 'Formação em programação, sem professores',
          location: 'Madrid, Barcelona, Málaga, Urduliz e Alicante',
          modality: 'Presencial',
          price: 'Gratuito.',
          fit: 'no',
          fitNote: 'A própria 42 informa que não oferece título acadêmico oficial.',
          url: 'https://www.42madrid.com/que-es-42-madrid/',
        },
        {
          name: 'iLERNA Online',
          program: 'DAW, título oficial',
          location: 'Online, com provas presenciais',
          modality: 'Online',
          price: '€2.882 no ciclo (€2.305,60 em promoção).',
          fit: 'no',
          fitNote: 'Não atinge 50% presencial.',
          url: 'https://www.ilerna.es/es/ciclo-grado-superior-desarrollo-aplicaciones-web-72',
        },
        {
          name: 'Accedia FP Online',
          program: 'DAW, título oficial',
          location: 'Online',
          modality: 'Online',
          price: '€2.250/ano em promoção (normal €4.500/ano).',
          fit: 'no',
          fitNote: 'Não atinge 50% presencial.',
          url: 'https://www.accediafp.es/grado-superior/tecnico-superior-en-desarrollo-de-aplicaciones-web',
        },
        {
          name: 'ID Digital School',
          program: 'Bootcamp Full Stack, 450 horas',
          location: 'Madrid',
          modality: 'Presencial, híbrido ou online',
          price: '€6.250. Guia não oficial cita €4.000 a €7.000 para bootcamps médios.',
          fit: 'no',
          fitNote: 'Curso curto e sem título oficial informado.',
          url: 'https://iddigitalschool.com/bootcamps/madrid/bootcamp-en-programacion-y-desarrollo-web-full-stack/',
        },
      ],
    },
  ],
  priceNote:
    'Preços aproximados, consultados em 05/11/2026. Valores anuais de faculdade e totais de ciclo são cálculos nossos. Promoções mudam e nem sempre incluem material ou taxas: peça orçamento por escrito.',
}
