import { TECH_STUDY_PATH } from './techStudies'
import type { StudyPath } from './techStudies'

export const VISAS_CHECKED_AT = '05/11/2026'

export type VisaCategory = 'emprego' | 'turista' | 'estudos' | 'sem-emprego' | 'familia'

/** Formas de ir para a Espanha. Cada visto pertence a uma forma. */
export const VISA_CATEGORIES: { id: VisaCategory; label: string; desc: string }[] = [
  { id: 'emprego', label: 'Conseguir emprego antes e ir', desc: 'Uma empresa na Espanha contrata e faz o trâmite da autorização.' },
  { id: 'turista', label: 'Ir como turista e aplicar lá', desc: 'Entrar sem visto e pedir a autorização já na Espanha.' },
  { id: 'estudos', label: 'Ir estudar com visto do Brasil', desc: 'Pedir o visto de estudos no consulado antes de viajar.' },
  { id: 'sem-emprego', label: 'Ir com visto, sem empregador espanhol', desc: 'Trabalho remoto, negócio próprio, renda ou busca de emprego.' },
  { id: 'familia', label: 'Ir por vínculo familiar', desc: 'Familiar de residente legal, de espanhol ou de cidadão da UE.' },
]

export interface VisaSource {
  label: string
  url: string
}

export interface Visa {
  id: string
  /** Nome oficial, como publicado pelo consulado ou pela lei espanhola. Rotas de entrada como turista usam nome descritivo. */
  name: string
  category: VisaCategory
  summary: string
  notice?: string
  eligibility: string[]
  requirements: string[]
  pros: string[]
  cons: string[]
  steps: string[]
  validity: string[]
  family: string[]
  studyPath?: StudyPath
  sources: VisaSource[]
}

const SAO_PAULO_VISAS =
  'https://www.exteriores.gob.es/Consulados/saopaulo/es/ServiciosConsulares/Paginas/index.aspx?scca=Visados&scco=Brasil&scd=263&scs='
const BOE_REGLAMENTO = 'https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099'
const BOE_LEY_14_2013 = 'https://www.boe.es/buscar/act.php?id=BOE-A-2013-10074'
const BOE_RD_240_2007 = 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-4184'
const BOE_CODIGO_CIVIL = 'https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763'
const BOE_SMI_2026 = 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-3815'
const BOE_UMBRAL_TARJETA_AZUL = 'https://www.boe.es/buscar/doc.php?id=BOE-A-2026-2142'
const IPREM_2026 = 'https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Documents/IPREM.pdf'
const CITA_SAO_PAULO =
  'https://www.exteriores.gob.es/Consulados/saopaulo/es/ServiciosConsulares/Paginas/Procedimiento-para-obtener-una-cita-de-Visados.aspx'
const TASAS_SAO_PAULO =
  'https://www.exteriores.gob.es/Consulados/SAOPAULO/es/ServiciosConsulares/Documents/Tasas%20Consulares.pdf'

const SOURCE_CITA: VisaSource = { label: 'Consulado em São Paulo — como obter cita', url: CITA_SAO_PAULO }
const SOURCE_TASAS: VisaSource = { label: 'Consulado em São Paulo — taxas consulares', url: TASAS_SAO_PAULO }
const SOURCE_REGLAMENTO: VisaSource = { label: 'BOE — Real Decreto 1155/2024 (Reglamento de Extranjería)', url: BOE_REGLAMENTO }
const SOURCE_LEY_14_2013: VisaSource = { label: 'BOE — Ley 14/2013', url: BOE_LEY_14_2013 }
const SOURCE_NACIONALIDADE: VisaSource = { label: 'BOE — Código Civil, art. 22', url: BOE_CODIGO_CIVIL }
const SOURCE_IPREM: VisaSource = { label: 'Ministério de Exteriores — tabela IPREM 2026', url: IPREM_2026 }
const SOURCE_LEY_EXTRANJERIA: VisaSource = { label: 'BOE — Ley Orgánica 4/2000 (Ley de Extranjería)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2000-544' }
const SOURCE_EES: VisaSource = { label: 'Comissão Europeia — Entry/Exit System (EES)', url: 'https://home-affairs.ec.europa.eu/policies/schengen/smart-borders/entry-exit-system_en' }

const PASSPORT = 'Passaporte com validade superior a 1 ano, 2 páginas em branco e emitido há no máximo 10 anos.'
const CRIMINAL_RECORD_5Y = 'Antecedentes criminais dos países de residência nos últimos 5 anos, apostilados.'
const CRIMINAL_RECORD_2Y =
  'Antecedentes criminais dos países de residência nos últimos 2 anos, apostilados, mais declaração responsável cobrindo 5 anos.'
const MEDICAL = 'Atestado médico conforme o Regulamento Sanitário Internacional de 2005, apostilado.'
const RESIDENCE_PROOF = 'Comprovante de residência na demarcação do consulado.'
const LONG_TERM =
  'Residência legal conta para a residência de longa duração (5 anos) e, para brasileiros de origem, para a nacionalidade (2 anos de residência legal, contínua e imediatamente anterior ao pedido).'

function citaByEmailA(code: string, attachment: string) {
  return `Peça a cita pelo e-mail cog.saopaulo.citasvis@maec.es, assunto "CITAS VISADOS", com a linha NOME E SOBRENOMES;DATA DE NASCIMENTO;CPF;${code}. Anexe comprovante de residência, foto segurando o documento e ${attachment}. O consulado envia credenciais, válidas por 2 meses, para escolher dia e hora.`
}

function citaByEmailB(attachment: string) {
  return `Peça a cita pelo e-mail cog.saopaulo.vis@maec.es com nome completo, CPF, passaporte, e-mail, telefone, data de nascimento, tipo de visto, comprovante de residência, foto segurando o passaporte e ${attachment}.`
}

const CITA_NOT_LISTED =
  'A página de citas do consulado em São Paulo não lista este visto: confirme com o consulado qual canal usar antes de reunir os documentos.'
const TRACK_AND_COLLECT =
  'Acompanhe o processo em sutramiteconsular.maec.es com o código do recibo e retire o visto pessoalmente, sem cita.'

export const VISAS: Visa[] = [
  {
    id: 'residencia-no-lucrativa',
    name: 'Visado de residencia no lucrativa',
    category: 'sem-emprego',
    summary: 'Para morar na Espanha sem trabalhar, vivendo de renda ou patrimônio próprios.',
    eligibility: [
      'Quem tem meios suficientes para viver na Espanha sem exercer atividade profissional.',
      'Quem reside na demarcação do consulado onde faz o pedido.',
    ],
    requirements: [
      'Meios econômicos em 2026: €2.400 por mês (400% do IPREM) para o titular, mais €600 por mês (100%) para cada familiar a cargo.',
      'Formulário de visto e formulário EX-01 assinados, e foto.',
      PASSPORT,
      'Seguro de saúde de seguradora autorizada na Espanha, cobrindo todos os riscos do sistema público.',
      CRIMINAL_RECORD_5Y,
      MEDICAL,
      RESIDENCE_PROOF,
      'Taxa: Modelo 790 código 052, epígrafe 2.1, em duas vias assinadas (valores na tabela do consulado).',
      'Documentos estrangeiros legalizados ou apostilados, e traduzidos ao espanhol quando necessário.',
    ],
    pros: [
      'Não depende de emprego, empresa ou faculdade na Espanha.',
      'Cônjuge ou parceiro e filhos podem pedir junto.',
      'Renovação concedida por 2 anos.',
      LONG_TERM,
    ],
    cons: [
      'Não autoriza trabalhar. O consulado em Los Angeles informa que também não permite teletrabalho.',
      'Exige comprovar valor alto todo ano: €28.800 anuais para o titular, mais €7.200 por familiar a cargo.',
      'A renovação exige ter residido de forma real e efetiva na Espanha por mais de 183 dias no ano.',
      'Passar a trabalhar exige modificar a autorização. Antes de 1 ano como titular, a situação nacional de emprego também é avaliada.',
    ],
    steps: [
      citaByEmailB('antecedentes criminais e atestado médico apostilados'),
      'Compareça pessoalmente ao consulado com todos os documentos. Visto e autorização de residência são tramitados juntos.',
      'Após autorização de residência favorável, o consulado decide o visto em até 1 mês.',
      TRACK_AND_COLLECT,
      'Depois de entrar na Espanha, solicite o TIE em até 1 mês na Oficina de Extranjeros ou Comisaría de Policía.',
    ],
    validity: [
      'Visto: 365 dias.',
      'Autorização inicial: 1 ano.',
      'Renovação: 2 anos, salvo se já couber residência de longa duração.',
    ],
    family: [
      'Podem pedir junto: cônjuge ou parceiro, filhos menores solteiros e filhos maiores com deficiência ou sem condições de se sustentar por motivo de saúde.',
      'Cada familiar a cargo soma €600 por mês à exigência financeira.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — visto de residência não lucrativa', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+residencia+no+lucrativa` },
      SOURCE_TASAS,
      { label: 'Consulado em Los Angeles — restrição de teletrabalho', url: 'https://www.exteriores.gob.es/Consulados/losangeles/en/ServiciosConsulares/Paginas/Consular/Visado-de-residencia-no-lucrativa.aspx' },
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      SOURCE_IPREM,
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'teletrabajo',
    name: 'Visado de residencia para teletrabajo (nómada digital)',
    category: 'sem-emprego',
    summary: 'Para morar na Espanha trabalhando remotamente para empresas ou clientes de fora do país.',
    eligibility: [
      'Empregados que trabalham remotamente apenas para empresas fora da Espanha.',
      'Profissionais autônomos, que podem ter clientes espanhóis em até 20% da atividade total.',
      'Graduados ou pós-graduados de instituições reconhecidas, ou profissionais com pelo menos 3 anos de experiência.',
    ],
    requirements: [
      'Meios econômicos em 2026: €2.442 por mês (200% do SMI) para o titular, mais €915,75 (75%) para o primeiro familiar e €305,25 (25%) para cada familiar adicional.',
      'Vínculo com a empresa ou cliente há pelo menos 3 meses. Empregados precisam de autorização expressa para trabalhar remotamente.',
      'Certidão comercial provando que a empresa existe há pelo menos 1 ano, e qual sua atividade.',
      'Comprovação de Seguridade Social: inscrição na Espanha, certificado de legislação aplicável por convênio (se o país emitir), ou RETA para autônomos.',
      'Diploma, ou prova de 3 anos de experiência. Profissões regulamentadas exigem homologação.',
      'Formulário de visto, foto e pedido de NIE simultâneo ao visto.',
      PASSPORT,
      CRIMINAL_RECORD_2Y,
      'Seguro de saúde privado de seguradora registrada na DGSFP, salvo cobertura pela Seguridade Social.',
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Mantém renda em empresa ou cliente de fora, sem precisar de empregador espanhol.',
      'Decisão rápida: 10 dias, prorrogáveis se pedirem documentos ou entrevista.',
      'Residência de até 3 anos, renovável por períodos de 2 anos.',
      'O próprio visto comprova a residência; o TIE é opcional.',
      LONG_TERM,
    ],
    cons: [
      'Empregado não pode trabalhar para empresa espanhola; autônomo tem limite de 20%.',
      'A empresa precisa ter pelo menos 1 ano de atividade real e o vínculo, 3 meses.',
      'Exigência de renda cresce com cada familiar.',
      'A Seguridade Social precisa estar resolvida antes de começar a trabalhar da Espanha.',
    ],
    steps: [
      CITA_NOT_LISTED,
      'Reúna a documentação e peça o NIE junto com o visto.',
      'Apresente o pedido pessoalmente ou por representante credenciado.',
      'O consulado decide em 10 dias, contados do dia seguinte ao protocolo, com possível prorrogação.',
      'Retire o visto pessoalmente em até 1 mês após a notificação favorável, sem cita.',
      'Para ficar além do visto, peça a autorização de residência na Espanha nos 60 dias anteriores ao vencimento.',
    ],
    validity: [
      'Visto: até 1 ano, ou o período de trabalho, se menor.',
      'Autorização de residência: até 3 anos.',
      'Renovação: períodos de 2 anos.',
    ],
    family: [
      'Podem pedir: cônjuge ou parceiro, filhos menores, filhos maiores dependentes sem família própria e ascendentes a cargo.',
      'Fontes consultadas não confirmam direito de trabalho do familiar: confirme com o consulado.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — visto de teletrabalho', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+residencia+para+teletrabajo+%28n%C3%B3mada+digital%29` },
      SOURCE_TASAS,
      SOURCE_LEY_14_2013,
      { label: 'BOE — Real Decreto 126/2026 (SMI 2026)', url: BOE_SMI_2026 },
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'trabajo-cuenta-ajena',
    name: 'Visado de trabajo por cuenta ajena',
    category: 'emprego',
    summary: 'Para trabalhar na Espanha com contrato de um empregador espanhol.',
    eligibility: [
      'Maiores de 16 anos com oferta de empregador na Espanha.',
      'A ocupação deve constar no Catálogo de Ocupaciones de Difícil Cobertura, ou o empregador precisa provar que não encontrou trabalhador no mercado interno.',
    ],
    requirements: [
      'Autorização inicial de residência e trabalho obtida pelo empregador (original e cópia).',
      'Formulário de visto e foto.',
      PASSPORT,
      CRIMINAL_RECORD_5Y,
      MEDICAL,
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Trabalho e residência legais desde o início, com vínculo formal e Seguridade Social.',
      'Após 3 meses, é possível trocar de empregador na mesma ocupação.',
      'Renovação longa: 4 anos.',
      LONG_TERM,
    ],
    cons: [
      'Depende de empresa disposta a contratar e fazer o trâmite na Espanha.',
      'Autorização inicial limitada, em regra, a uma comunidade autônoma e uma ocupação.',
      'Reagrupar a família normalmente exige ter residido 1 ano e ter autorização para mais 1 ano.',
    ],
    steps: [
      'O empregador solicita a autorização inicial de residência e trabalho na Espanha.',
      citaByEmailA('TCA', 'a autorização de residência e trabalho'),
      'Apresente o pedido no consulado em até 1 mês, contado do dia seguinte à notificação favorável ao empregador.',
      'O consulado decide em até 1 mês.',
      TRACK_AND_COLLECT,
      'O empregador inscreve o trabalhador na Seguridade Social em até 3 dias da entrada na Espanha. Se a autorização passar de 6 meses, peça o TIE em até 1 mês após a inscrição.',
    ],
    validity: [
      'Visto: até 180 dias para autorização de até 6 meses; 365 dias para autorização maior.',
      'Autorização inicial: duração da atividade, com máximo de 1 ano.',
      'Renovação: 4 anos, salvo se já couber residência de longa duração.',
    ],
    family: [
      'Sem pedido conjunto: familiares entram depois, por reagrupação familiar.',
      'Cônjuge ou parceiro reagrupado pode trabalhar sem trâmite adicional.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — trabalho por conta alheia', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+trabajo+por+cuenta+ajena` },
      SOURCE_TASAS,
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      { label: 'BOE — Catálogo de Ocupaciones de Difícil Cobertura (3º trimestre de 2026)', url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18504' },
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'trabajador-altamente-cualificado',
    name: 'Visado para trabajador altamente cualificado y para traslado intraempresarial',
    category: 'emprego',
    summary: 'Para profissionais qualificados contratados na Espanha, incluindo a Tarjeta azul-UE, e transferências dentro de um mesmo grupo.',
    notice: 'O valor do salário mínimo em euros é publicado pela Unidad de Grandes Empresas (UGE). Não foi possível confirmar o valor atual porque o site bloqueou o acesso automático.',
    eligibility: [
      'Profissionais e diretores altamente qualificados, ou graduados e pós-graduados de instituições de prestígio.',
      'Transferidos dentro do mesmo grupo: diretores, especialistas ou trainees.',
      'Tarjeta azul-UE: diploma superior de pelo menos 3 anos, ou 5 anos de experiência equivalente. Em TI: 3 anos de experiência nos últimos 7.',
    ],
    requirements: [
      'Autorização de residência emitida pela Unidad de Grandes Empresas y Colectivos Estratégicos (UGE).',
      'Tarjeta azul-UE: contrato ou oferta firme de pelo menos 6 meses.',
      'Tarjeta azul-UE: salário bruto anual de pelo menos 1,4 vez a média anual do INE. Coeficiente 0,8 para certas ocupações do catálogo e para qualificação obtida há até 3 anos.',
      'Formulário de visto e foto.',
      PASSPORT,
      CRIMINAL_RECORD_2Y,
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Trâmite rápido: autorização em até 20 dias, com silêncio considerado aprovação, e visto em 10 dias.',
      'Tarjeta azul-UE vale 3 anos, ou o contrato mais 3 meses, se menor.',
      'Família pode pedir junto ou depois.',
      'O próprio visto comprova a residência; o TIE é opcional.',
      LONG_TERM,
    ],
    cons: [
      'Exige contrato e salário elevados.',
      'Tarjeta azul-UE pode ser revogada com desemprego acima de 3 meses (menos de 2 anos como titular) ou acima de 6 meses (2 anos ou mais).',
    ],
    steps: [
      'Obtenha a autorização de residência na UGE, com pedido eletrônico.',
      citaByEmailA('TAC (ou INT, para traslado intraempresarial)', 'a autorização de residência e trabalho'),
      'Apresente o pedido pessoalmente ou por representante credenciado. Cada familiar precisa de cita própria.',
      'O consulado decide em 10 dias, com possível prorrogação.',
      'Retire o visto pessoalmente em até 1 mês após a notificação favorável, sem cita.',
    ],
    validity: [
      'Visto: 1 ano, ou a duração da autorização, se menor.',
      'Tarjeta azul-UE: 3 anos, ou contrato mais 3 meses.',
      'Renovação: 2 anos. Residência de longa duração aos 5 anos.',
    ],
    family: [
      'Podem pedir: cônjuge ou parceiro registrado ou não, filhos menores, filhos maiores dependentes e ascendentes a cargo.',
      'Fontes consultadas não confirmam direito de trabalho do familiar: confirme com o consulado.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — trabalhador altamente qualificado', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+para+trabajador+altamente+cualificado+y+para+traslado+intraempresarial` },
      SOURCE_TASAS,
      SOURCE_CITA,
      SOURCE_LEY_14_2013,
      { label: 'BOE — Orden PJC/44/2026 (limite salarial da Tarjeta azul-UE)', url: BOE_UMBRAL_TARJETA_AZUL },
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'trabajo-cuenta-propia',
    name: 'Visado de trabajo por cuenta propia',
    category: 'sem-emprego',
    summary: 'Para abrir negócio ou trabalhar como autônomo na Espanha.',
    eligibility: [
      'Maiores de 18 anos que vão exercer atividade por conta própria.',
      'Quem tem projeto viável e cumpre os requisitos legais da atividade.',
    ],
    requirements: [
      'Projeto do negócio com investimento previsto, rentabilidade esperada e empregos a criar.',
      'Comprovação de investimento suficiente e de meios para se manter, ou compromisso de entidades financeiras.',
      'Lista de licenças necessárias e sua situação, e qualificação profissional, quando exigida.',
      'Formulário de visto, duas vias do EX-07, foto e cópia de todas as páginas do passaporte.',
      PASSPORT,
      CRIMINAL_RECORD_5Y,
      MEDICAL,
      RESIDENCE_PROOF,
      'Taxa de visto: €90. Taxas da residência: Modelo 790 código 052, epígrafe 2.1, e código 062, epígrafe 1.5.',
    ],
    pros: [
      'Não depende de empregador.',
      'O consulado lista cidadãos ibero-americanos entre os isentos das taxas Modelo 790: confirme a aplicação ao seu caso.',
      'Renovação longa: 4 anos.',
      LONG_TERM,
    ],
    cons: [
      'Autorização inicial limitada a uma comunidade autônoma e a um setor.',
      'Autorização leva até 3 meses, e o silêncio significa negativa.',
      'Exige investimento e plano convincentes antes de sair do Brasil.',
    ],
    steps: [
      citaByEmailB('o projeto de negócio, ou a autorização de residência e trabalho, se já tiver'),
      'Apresente visto e autorização de residência juntos, pessoalmente. O consulado envia o processo à Oficina de Extranjería.',
      'A Oficina decide a residência em até 3 meses; o silêncio equivale a negativa.',
      'O consulado decide o visto em até 1 mês após receber a decisão.',
      TRACK_AND_COLLECT,
      'Na Espanha, inscreva-se na Seguridade Social em até 3 meses, antes de começar a trabalhar, e peça o TIE em até 1 mês após a inscrição.',
    ],
    validity: [
      'Visto: 365 dias.',
      'Autorização inicial: 1 ano.',
      'Renovação: 4 anos, salvo se já couber residência de longa duração.',
    ],
    family: [
      'Sem pedido conjunto: familiares entram depois, por reagrupação familiar.',
      'Cônjuge ou parceiro reagrupado pode trabalhar sem trâmite adicional.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — trabalho por conta própria', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+trabajo+por+cuenta+propia` },
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'emprendedor',
    name: 'Visado para emprendedor',
    category: 'sem-emprego',
    summary: 'Para quem vai criar na Espanha um negócio inovador ou de especial interesse econômico.',
    eligibility: [
      'Quem desenvolve atividade inovadora ou de especial interesse econômico para a Espanha.',
      'O projeto precisa de informe favorável da ENISA, que avalia perfil, plano de negócio e valor agregado.',
    ],
    requirements: [
      'Cópia da autorização de residência e trabalho emitida pela UGE.',
      'Informe favorável da ENISA, solicitado pela UGE.',
      'NIE tramitado antes, ou pedido junto com o visto pelo formulário EX-15.',
      'Formulário de visto e foto.',
      PASSPORT,
      CRIMINAL_RECORD_2Y,
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Residência válida em todo o território espanhol.',
      'Prazo inicial longo: 3 anos, renováveis por 2.',
      'Autorização em até 20 dias, com silêncio considerado aprovação.',
      'Família pode pedir junto ou depois.',
      LONG_TERM,
    ],
    cons: [
      'Não basta abrir um negócio: o projeto precisa ser aprovado pela ENISA.',
      'Exige plano de negócio bem estruturado.',
    ],
    steps: [
      'Protocole o pedido eletronicamente na UGE, por conta própria ou com representante legal. A UGE solicita o informe da ENISA.',
      citaByEmailA('EMPRENDEDOR', 'a decisão de residência e os antecedentes criminais apostilados e traduzidos'),
      'Apresente o pedido pessoalmente ou por representante credenciado.',
      'O consulado decide em 10 dias, com possível prorrogação.',
      'Retire o visto pessoalmente em até 1 mês após a notificação favorável, sem cita.',
    ],
    validity: [
      'Visto: 1 ano.',
      'Autorização de residência: 3 anos.',
      'Renovação: 2 anos. Residência permanente aos 5 anos.',
    ],
    family: [
      'Podem pedir: cônjuge ou parceiro, filhos e ascendentes a cargo.',
      'Fontes consultadas não confirmam direito de trabalho do familiar: confirme com o consulado.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — visto para empreendedor', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+para+emprendedor` },
      SOURCE_TASAS,
      SOURCE_CITA,
      SOURCE_LEY_14_2013,
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'busqueda-de-empleo',
    name: 'Visado para la búsqueda de empleo',
    category: 'sem-emprego',
    summary: 'Para procurar emprego na Espanha por 12 meses, em vagas limitadas abertas pelo governo espanhol.',
    notice: 'Este visto não aparece na lista do consulado em São Paulo. Ele depende de quotas definidas em ordem ministerial, então confirme se há vagas abertas para o Brasil.',
    eligibility: [
      'Filhos ou netos de espanhol de origem.',
      'Candidatos a determinadas ocupações e regiões definidas na ordem ministerial.',
      'Número de vistos e critérios de seleção são definidos em cada ordem de gestão coletiva de contratações em origem.',
    ],
    requirements: [
      'Requisitos gerais de visto, incluindo passaporte com validade mínima de 1 ano.',
      'Requisitos específicos da ordem ministerial em vigor.',
    ],
    pros: [
      'Entra na Espanha sem ter contrato assinado.',
      'Filhos e netos de espanhol de origem ficam isentos da avaliação da situação nacional de emprego.',
      'Com contrato, não precisa de novo visto, e a decisão sai em 10 dias.',
      'O pedido do empregador prorroga a residência até a decisão.',
    ],
    cons: [
      'Não pode ser pedido a qualquer momento: depende de quotas.',
      'O perfil elegível é restrito.',
      'Sem contrato em 12 meses, o período de residência termina.',
    ],
    steps: [
      'Verifique a ordem ministerial em vigor e se há vagas para o seu perfil.',
      CITA_NOT_LISTED,
      'Apresente o pedido conforme a forma definida na ordem.',
      'Com contrato, o empregador solicita a autorização inicial de residência e trabalho.',
      'A inscrição na Seguridade Social deve ocorrer em até 1 mês da notificação.',
    ],
    validity: ['Residência para procurar emprego: 12 meses.'],
    family: ['Fontes consultadas não tratam de familiares neste visto: confirme com o consulado.'],
    sources: [SOURCE_REGLAMENTO],
  },
  {
    id: 'estudios',
    name: 'Visado de estudios',
    category: 'estudos',
    summary: 'Para cursos com mais de 90 dias, incluindo FP e faculdades de tecnologia para imigrar como desenvolvedor.',
    notice: 'Estudos de até 90 dias não exigem visto de estudos. Doutorado usa o visto de investigador.',
    studyPath: TECH_STUDY_PATH,
    eligibility: [
      'Alunos admitidos em educação superior, ensino secundário pós-obrigatório, mobilidade, voluntariado ou formação.',
      'Quem paga a matrícula e comprova meios para se manter.',
    ],
    requirements: [
      'Meios econômicos em 2026: €600 por mês (100% do IPREM), mais €450 (75%) para o primeiro familiar e €300 (50%) para cada adicional. Valor menor se a moradia estiver paga.',
      'Carta de admissão e comprovante de matrícula.',
      'Seguro de saúde de seguradora autorizada na Espanha, válido por toda a estada.',
      'Formulário de visto e foto.',
      PASSPORT,
      'Antecedentes criminais de 5 anos e atestado médico, quando a estada passa de 180 dias.',
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Exigência financeira menor que a dos vistos de residência não lucrativa e de teletrabalho.',
      'Em estudos superiores, permite trabalhar até 30 horas semanais, sem trâmite adicional.',
      'Em estudos superiores, a autorização acompanha a duração oficial do curso.',
      'Ao concluir, pode pedir residência e trabalho sem novo visto e sem avaliação da situação nacional de emprego.',
    ],
    cons: [
      'Familiares não podem trabalhar durante a vigência.',
      'Direito a levar familiares é específico de estudos superiores.',
      'Tempo como estudante conta só 50% para a residência de longa duração-UE.',
      'Passar de 30 horas semanais é causa de extinção da autorização.',
      'Em regra, o trabalho fica limitado à comunidade autônoma da autorização.',
    ],
    steps: [
      citaByEmailA('EST', 'a carta de aceitação assinada eletronicamente'),
      'Apresente o pedido com pelo menos 2 meses de antecedência do início do curso, pessoalmente ou por representante credenciado.',
      'Com autorização favorável, o consulado decide o visto em até 1 mês.',
      TRACK_AND_COLLECT,
      'Se a estada passar de 180 dias, peça o TIE em até 1 mês da entrada, na Comisaría de Policía.',
    ],
    validity: [
      'Visto: igual à atividade, até 365 dias.',
      'Autorização: igual ao curso, com limite de 1 ano, salvo estudos superiores.',
      'Prorrogações: até 2 ou 1 por autorização, conforme o tipo de atividade (art. 55.5 do Reglamento).',
      'Mudança para trabalho: pedido nos 2 meses antes ou 3 meses depois do fim da estada. Autorização de 1 ano.',
    ],
    family: [
      'Podem pedir: cônjuge ou parceiro e filhos menores ou que necessitem de apoio.',
      'Familiares não têm autorização para trabalhar.',
    ],
    sources: [
      { label: 'Consulado em São Paulo — visto de estudos', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+estudios` },
      SOURCE_TASAS,
      { label: 'BOE — Ley Orgánica de Educación, art. 3.5', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899' },
      { label: 'Ministerio de Educación — homologação de estudos do Brasil', url: 'https://educacionfpydeportes.gob.es/dam/jcr:43b222f9-e9bb-4e64-ba73-e09d110c5531/brasil.pdf' },
      { label: 'Comunidad de Madrid — admissão em FP de Grado Superior 2026/27', url: 'https://www.comunidad.madrid/docs/2026-05/instrucciones_admision_cfgs_26-27_vf_sello.pdf?VersionId=40ognLSqPs8I_C7P2YP28aK8bcPMTeVR' },
      { label: 'Comunidad de Madrid — novo calendário de admissão 2026/27', url: 'https://www.comunidad.madrid/docs/2026-07/2026_07_31-resolucion-nuevo-calendario-admision-gb-gm-y-gs-curso-2026-27.pdf?VersionId=k3NOdX87sqTncSAH6e6yxaa7050Ps.ng' },
      { label: 'Junta de Andalucía — preços universitários 2026/27', url: 'https://www.juntadeandalucia.es/organismos/viviendajuventudyordenaciondelterritorio/servicios/actualidad/noticias/detalle/681394.html' },
      { label: 'BOJA — decreto de preços públicos, art. 3 (estudantes de fora da UE)', url: 'https://www.uma.es/media/files/Decreto_Precios-Publicos_7tSufCi.pdf' },
      { label: 'Universidad de Sevilla — preços para nacionais e internacionais', url: 'https://cat.us.es/matricula/precios-de-la-matricula' },
      { label: 'Universidad de Jaén — preço para estudantes estrangeiros', url: 'https://www.ujaen.es/estudios/acceso-y-matricula/preguntas-frecuentes/si-soy-estudiante-extranjero-o-extranjera-que-precio-tengo-que-pagar-por-la' },
      { label: 'BOJA — fase de estudantes estrangeiros 2026/27', url: 'https://www.juntadeandalucia.es/boja/2025/244/52' },
      { label: 'Junta de Andalucía — requisitos de acesso a FP de Grado Superior', url: 'https://www.juntadeandalucia.es/educacion/portales/web/escolarizacion/w/requisitos-de-acceso-y-cupos-para-grado-superior' },
      { label: 'Junta de Andalucía — como pedir vaga em FP', url: 'https://www.juntadeandalucia.es/educacion/portales/web/escolarizacion/w/%C2%BFcomo-solicitar-una-plaza-en-grado-medio-o-grado-superior-' },
      { label: 'El Español — números do Málaga TechPark', url: 'https://www.elespanol.com/malaga/economia/tecnologia/20260316/pta-roza-empleados-millones-facturacion-agregada/1003744171713_0.html' },
      { label: 'El Español — números do Sevilla TechPark', url: 'https://www.elespanol.com/invertia/20260728/sevilla-techpark-mayor-parque-tecnologico-espana-supera-empresas-meur-empleos/1003744336319_0.html' },
      { label: 'APTE — infográfico do PTS Granada', url: 'https://apte.org/res/uploads/INFOGRAFIA%20PTS%20GRANADA%281%29.pdf' },
      { label: 'Enalquiler — aluguel em Málaga', url: 'https://www.enalquiler.com/precios/precio-alquiler-vivienda-malaga_12-31-27903-0.html' },
      { label: 'Enalquiler — aluguel em Sevilha', url: 'https://enalquiler.com/precios/precio-alquiler-vivienda-sevilla_32-43-46424-0.html' },
      { label: 'Enalquiler — aluguel em Granada', url: 'https://www.enalquiler.com/precios/precio-alquiler-vivienda-granada_31-21-0-0.html' },
      { label: 'Enalquiler — aluguel em Madrid', url: 'https://www.enalquiler.com/precios/precio-alquiler-vivienda-madrid_32-30-27745-0.html' },
      { label: 'Educalia — guia não oficial do FP DAW', url: 'https://www.educalia.es/que-es-daw-guia-completa-2026/' },
      { label: 'Trabajo y Personal — guia não oficial de bootcamps', url: 'https://trabajoypersonal.com/guia-de-bootcamps-en-espana/' },
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      SOURCE_IPREM,
    ],
  },
  {
    id: 'reagrupacion-familiar',
    name: 'Visado de reagrupación familiar en régimen general',
    category: 'familia',
    summary: 'Para familiares de um estrangeiro que já reside legalmente na Espanha.',
    eligibility: [
      'Cônjuge ou parceiro maior de 18 anos. Parceiro não registrado precisa provar 12 meses contínuos de relação.',
      'Filhos menores de 18 anos, ou maiores com deficiência ou sem condições de se sustentar.',
      'Ascendentes de primeiro grau a cargo, maiores de 65 anos, com exceção humanitária.',
      'Quem reagrupa precisa ter residido na Espanha por pelo menos 1 ano e ter autorização para mais 1, com exceções.',
    ],
    requirements: [
      'Renda de quem reagrupa em 2026: €900 por mês (150% do IPREM) para unidade de duas pessoas, mais €300 (50%) por membro adicional. Regra própria para menores.',
      'Moradia adequada, com informe válido por até 6 meses, e seguro de saúde.',
      'Autorização inicial de reagrupação familiar.',
      'Cópia autenticada do TIE de quem reagrupa e documentos do vínculo.',
      'Formulário de visto e foto.',
      PASSPORT,
      CRIMINAL_RECORD_5Y,
      MEDICAL,
      RESIDENCE_PROOF,
      'Taxa de visto (ver tabela do consulado).',
    ],
    pros: [
      'Cônjuge, parceiro e filhos reagrupados podem trabalhar sem trâmite adicional.',
      'Renovação longa: 4 anos.',
      'Após 1 ano, cônjuge ou parceiro pode obter residência independente de 4 anos.',
      LONG_TERM,
    ],
    cons: [
      'Uma pessoa precisa ir primeiro e esperar cerca de 1 ano.',
      'Decisão da autorização leva até 2 meses, e silêncio significa negativa.',
      'Depende da renda e da moradia de quem reagrupa.',
    ],
    steps: [
      'Quem reside na Espanha solicita a autorização de reagrupação na Delegación ou Subdelegación del Gobierno.',
      citaByEmailA('REA', 'a decisão de autorização de residência'),
      'Apresente o pedido pessoalmente em até 2 meses da notificação favorável.',
      'O consulado decide em até 1 mês.',
      TRACK_AND_COLLECT,
      'Peça o TIE em até 1 mês da entrada, na Comisaría de Policía da província onde a autorização foi tramitada.',
    ],
    validity: [
      'Visto: 365 dias.',
      'Autorização: igual à de quem reagrupa, com mínimo de 1 ano.',
      'Renovação: 4 anos.',
    ],
    family: ['Este visto é o próprio caminho para familiares. Não se aplica a familiares de cidadãos UE, EEE ou suíços.'],
    sources: [
      { label: 'Consulado em São Paulo — reagrupação familiar', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+reagrupaci%C3%B3n+familiar+en+r%C3%A9gimen+general` },
      SOURCE_TASAS,
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      SOURCE_IPREM,
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'familiares-nacionalidad-espanola',
    name: 'Visado de residencia de familiares de personas de nacionalidad española',
    category: 'familia',
    summary: 'Para familiares de cidadão espanhol que vão morar na Espanha por mais de 90 dias.',
    eligibility: [
      'Cônjuge maior de 18 anos.',
      'Parceiro registrado, ou parceiro estável com 12 meses contínuos de convivência (sem prazo mínimo, se tiverem filhos em comum).',
      'Filhos menores de 26 anos, filhos maiores dependentes ou com deficiência.',
      'Ascendentes de primeiro grau a cargo, ou por razões humanitárias.',
      'Filhos de pai ou mãe espanhóis de origem, e outras hipóteses listadas pelo consulado.',
    ],
    requirements: [
      'Prova do vínculo familiar, apostilada e traduzida.',
      'Passaporte ou DNI do familiar espanhol.',
      'Cônjuge ou parceiro: declaração de que nenhum outro cônjuge ou parceiro vive com o espanhol.',
      'Autorização inicial, se o espanhol está na Espanha; formulário EX-24, se ambos estão no exterior.',
      'Formulário de visto e foto.',
      PASSPORT,
      CRIMINAL_RECORD_5Y,
      MEDICAL,
      RESIDENCE_PROOF,
    ],
    pros: [
      'Visto gratuito.',
      'Autorização de 5 anos, renovável por mais 5.',
      'Permite trabalhar em qualquer região, ocupação ou setor, sem trâmite adicional.',
      'Não considera a situação nacional de emprego.',
      LONG_TERM,
    ],
    cons: [
      'Exige vínculo com cidadão espanhol.',
      'Vale pelo período previsto de residência do familiar espanhol, se menor que 5 anos.',
      'A autorização leva até 2 meses, e silêncio significa negativa.',
    ],
    steps: [
      citaByEmailB('a autorização de residência, cópia do passaporte do familiar espanhol e prova apostilada do vínculo'),
      'Se o espanhol está na Espanha, apresente o pedido em até 1 mês da notificação favorável. Se ambos estão fora, use o formulário EX-24.',
      'Apresente o pedido pessoalmente.',
      'O consulado decide o visto em 15 dias.',
      'Retire o visto pessoalmente, sem cita.',
      'Peça o TIE em até 1 mês da entrada, na Comisaría de Policía da província onde a autorização foi tramitada.',
    ],
    validity: [
      'Visto: 365 dias.',
      'Autorização: 5 anos, ou o período previsto do espanhol, se menor.',
      'Renovação: 5 anos.',
    ],
    family: ['Este visto é o próprio caminho para familiares de espanhóis.'],
    sources: [
      { label: 'Consulado em São Paulo — familiares de espanhóis', url: `${SAO_PAULO_VISAS}Visados+Nacionales+-+Visado+de+residencia+de+familiares+de+personas+de+nacionalidad+espa%C3%B1ola` },
      SOURCE_CITA,
      SOURCE_REGLAMENTO,
      SOURCE_NACIONALIDADE,
    ],
  },
  {
    id: 'familiares-ciudadanos-ue',
    name: 'Visados de familiares de ciudadanos UE y de beneficiarios Acuerdo de Retirada UE-Reino Unido',
    category: 'familia',
    summary: 'Para familiares de cidadão da UE, EEE ou Suíça, e de britânicos beneficiários do Acordo de Retirada, que acompanham ou encontram esse cidadão na Espanha.',
    notice: 'Este é um visto de entrada de até 90 dias. Para ficar mais tempo, é preciso pedir o cartão de residência na Espanha. Se o familiar é espanhol, o caminho indicado é o visto para familiares de espanhóis.',
    eligibility: [
      'Cônjuge e parceiro registrado.',
      'Parceiro não registrado com pelo menos 1 ano de convivência, ou filhos em comum.',
      'Filhos menores de 21 anos, ou maiores dependentes ou incapazes.',
      'Ascendentes diretos a cargo e outros parentes em situações específicas.',
    ],
    requirements: [
      'Prova do vínculo familiar, e de dependência quando aplicável.',
      'Prova de que viaja com o cidadão da UE ou vai encontrá-lo.',
      'Formulário Schengen e 1 foto.',
      'Passaporte com validade superior a 1 ano.',
      RESIDENCE_PROOF,
      'Cidadão da UE precisa trabalhar na Espanha, ou ter recursos e seguro de saúde, ou estudar com seguro e recursos.',
    ],
    pros: [
      'Visto gratuito e com tramitação preferente.',
      'Cartão de residência de 5 anos.',
      'Direito de trabalhar por conta própria ou alheia nas mesmas condições dos espanhóis, com exceção de certos filhos maiores e ascendentes a cargo.',
      'Residência permanente após 5 anos contínuos.',
    ],
    cons: [
      'Exige vínculo com cidadão da UE que se enquadre nas condições de residência.',
      'Parceiro não registrado depende de provar relação estável.',
      'O visto cobre só a entrada: o cartão precisa ser pedido dentro de 3 meses.',
    ],
    steps: [
      CITA_NOT_LISTED,
      'Apresente o pedido pessoalmente entre 6 meses e 15 dias antes da viagem, com biometria.',
      'O consulado decide em 15 dias corridos, prorrogáveis até 45.',
      'Depois de entrar na Espanha, peça a tarjeta de residencia de familiar de ciudadano de la Unión em até 3 meses.',
      'O cartão é emitido em até 3 meses do pedido.',
    ],
    validity: [
      'Visto: estadas de até 90 dias em qualquer período de 180 dias.',
      'Cartão de residência: 5 anos, ou o período previsto do cidadão da UE, se menor.',
      'Residência permanente: após 5 anos contínuos. Perde-se com mais de 2 anos consecutivos fora da Espanha.',
    ],
    family: ['Este visto é o próprio caminho para familiares de cidadãos da UE.'],
    sources: [
      { label: 'Consulado em São Paulo — familiares de cidadãos UE', url: `${SAO_PAULO_VISAS}Visados+de+familiares+de+ciudadanos+UE+y+de+beneficiarios+Acuerdo+de+Retirada+UE-Reino+Unido` },
      { label: 'BOE — Real Decreto 240/2007', url: BOE_RD_240_2007 },
    ],
  },
  {
    id: 'turista-estudios',
    name: 'Entrar como turista e pedir a estancia por estudios na Espanha',
    category: 'turista',
    summary: 'Entrar sem visto, dentro dos 90 dias legais, e pedir a autorização de estudos já na Espanha, sem passar pelo consulado.',
    notice: 'Prazo apertado: o pedido precisa ser feito pelo menos 2 meses antes do fim da estada legal (art. 54.3), ou seja, em cerca de 30 dias após a entrada, e também pelo menos 2 meses antes do início do curso (art. 54.1). Guias de advogados citam prazos diferentes, como 2 meses desde a entrada, mas essa regra não está no texto do BOE atualizado em 22/09/2026. Confirme com a Oficina de Extranjería antes de viajar.',
    eligibility: [
      'Maiores de idade que estejam em situação regular na Espanha.',
      'Só para educação superior em tempo integral (art. 52.1.a) ou formação em especialidades de saúde (art. 58). Curso de idiomas ou FP de Grado Medio não pode ser pedido assim por quem está como turista.',
      'FP de Grado Superior é educação superior na Espanha (LOE, art. 3.5), mas a aplicação a esta rota é nossa leitura: confirme com a Oficina de Extranjería.',
    ],
    requirements: [
      'Admissão em centro reconhecido e matrícula paga. Tempo integral significa pelo menos 90% dos créditos ou do programa.',
      'Fora da universidade, o curso precisa ser pelo menos 50% presencial.',
      'Meios econômicos em 2026: €600 por mês (100% do IPREM), mais €450 (75%) para o primeiro familiar e €300 (50%) para cada adicional.',
      'Seguro de saúde válido na Espanha.',
      'Antecedentes criminais, se a estada passar de 6 meses, e atestado médico. Providencie e apostile antes de sair do Brasil.',
      'Taxa da autorização paga. Pedido feito na província onde o curso acontece.',
      'Na fronteira, é preciso justificar o motivo e as condições da estada e ter meios suficientes (Ley Orgánica 4/2000, art. 25).',
    ],
    pros: [
      'Evita o trâmite no consulado e a retirada do visto no Brasil.',
      'Situação sempre legal: o pedido prorroga a estada até a decisão (art. 54.3).',
      'Em estudos superiores, permite trabalhar até 30 horas semanais, se compatível com os estudos.',
      'Ao concluir, pode pedir residência e trabalho sem visto (art. 190), nos 2 meses antes ou 3 meses depois do fim da autorização.',
    ],
    cons: [
      'Pouco tempo: cerca de 30 dias após a entrada para protocolar tudo.',
      'Decisão em até 2 meses, e silêncio significa negativa. Com pedido eletrônico feito pela instituição, 15 dias, e silêncio também é negativa (art. 54.6).',
      'Se negado, é preciso sair da Espanha ou a permanência passa a ser irregular.',
      'Calendário rígido: o curso precisa começar pelo menos 2 meses depois do pedido, e a admissão precisa estar pronta antes.',
      'Ter ou estar pedindo autorização de estudos impede pedir arraigo ao mesmo tempo (art. 126.h).',
      'Tempo como estudante conta só 50% para a residência de longa duração-UE.',
    ],
    steps: [
      'No Brasil, garanta a admissão em curso elegível e peça à escola confirmação por escrito de que serve para esta autorização.',
      'Ainda no Brasil, reúna antecedentes criminais, atestado médico, seguro e comprovantes financeiros, com apostila e tradução quando necessário.',
      'Entre na Espanha com o que a fronteira pede. Marque a data de entrada: os 90 dias começam nela.',
      'Pague a matrícula e protocole o pedido em até cerca de 30 dias da entrada, na Oficina de Extranjería da província do curso, ou por meio eletrônico pela instituição.',
      'Aguarde a decisão: o protocolo prorroga a situação legal até ela sair.',
      'Com autorização favorável e estada acima de 6 meses, peça o TIE.',
    ],
    validity: [
      'Autorização: duração oficial dos estudos superiores.',
      'Prorrogação: até 2, pedidas nos 2 meses antes do vencimento.',
      'Mudança para residência e trabalho: autorização de 1 ano (art. 190).',
    ],
    family: [
      'Cônjuge ou parceiro, filhos menores e filhos maiores com deficiência a cargo podem pedir autorização própria se a do estudante tiver pelo menos 90 dias restantes (art. 56).',
      'Familiares não podem trabalhar durante essa autorização.',
    ],
    sources: [SOURCE_REGLAMENTO, SOURCE_LEY_EXTRANJERIA, SOURCE_IPREM],
  },
  {
    id: 'turista-arraigo',
    name: 'Entrar como turista, ficar 2 anos irregular e pedir arraigo',
    category: 'turista',
    summary: 'Ficar além dos 90 dias sem autorização e, após 2 anos contínuos na Espanha, pedir residência excepcional por arraigo.',
    notice: 'Atenção: ficar além dos 90 dias é infração grave, com multa de €501 a €10.000 ou expulsão, e proibição de entrada de até 5 anos. O arraigo não é garantido e as regras podem mudar durante a espera. Consulte um advogado de extranjería antes de decidir.',
    eligibility: [
      'Presença contínua na Espanha por pelo menos 2 anos antes do pedido (art. 126.b).',
      'Sem antecedentes criminais na Espanha nem nos países onde morou nos 5 anos anteriores à entrada.',
      'Sem autorização de estada ou residência, e sem pedido desse tipo em andamento (art. 126.h).',
      'Não ser solicitante de proteção internacional, nem constar como inadmissível por acordos da Espanha.',
      'Cumprir um dos tipos de arraigo listados em "Requisitos e documentos".',
    ],
    requirements: [
      'Arraigo sociolaboral: contrato(s) de pelo menos 20 horas semanais, com salário mínimo ou de convênio proporcional. O empregador precisa cumprir os requisitos do art. 74.',
      'Arraigo social: vínculo familiar com residente legal e meios de €600 por mês (100% do IPREM), ou avaliação do esforço de integração sem esse vínculo. Exige informe de integração da comunidade autônoma ou do município.',
      'Arraigo socioformativo: matrícula em ensino secundário pós-obrigatório, FP de grau C ou formação do serviço público de emprego, com informe de integração. Universidade não consta na lista (art. 127.d).',
      'Provas de permanência contínua por 2 anos. Confirme com advogado quais documentos são aceitos.',
      'Antecedentes criminais dos países onde morou nos 5 anos anteriores à entrada, e taxa paga.',
    ],
    pros: [
      'Não exige visto nem sair da Espanha para pedir.',
      'Autorização permite trabalhar sem limite de região ou ocupação. No socioformativo, até 30 horas semanais.',
      'No sociolaboral, a admissão do pedido já dá permissão provisória para viver e trabalhar, com inscrição na Seguridade Social em até 1 mês (art. 130.5).',
    ],
    cons: [
      'Situação irregular por 2 anos: risco de multa de €501 a €10.000 ou expulsão, com proibição de entrada de até 5 anos (Ley Orgánica 4/2000, arts. 53.1.a, 55, 57 e 58).',
      'Sem autorização, não é permitido trabalhar por 2 anos. A falta de autorização também impede receber seguro-desemprego (art. 36.5).',
      'O Entry/Exit System (EES) substitui o carimbo e detecta automaticamente quem passou do prazo.',
      'Sair da Espanha nesse período pode comprometer a presença contínua e a volta. Visita ao Brasil ou emergência familiar fica muito arriscada.',
      'Arraigo não é garantido: se negado, a situação irregular continua.',
      'Regras já mudaram em 2026 (RD 316/2026), e novos requisitos podem surgir antes dos 2 anos.',
      'A regularização extraordinária de 2026 não serve: era para quem chegou antes de 1/1/2026, com pedido até 30/6/2026.',
    ],
    steps: [
      'Antes de viajar, consulte um advogado de extranjería e veja como obter e apostilar antecedentes criminais do Brasil estando na Espanha.',
      'Com 2 anos contínuos, defina o tipo de arraigo e reúna contrato, matrícula ou informe de integração.',
      'Apresente o pedido pessoalmente na Espanha, sem visto. Correções podem ser pedidas com prazo de até 15 dias.',
      'Com concessão, peça o TIE em até 1 mês.',
    ],
    validity: [
      'Autorização: 1 ano (arraigo familiar: 5 anos).',
      'Renovação: 1 ano, nos 2 meses antes do vencimento. Exige busca ativa de emprego; no socioformativo, também prova de progresso nos estudos.',
    ],
    family: [
      'Cada pessoa precisa cumprir os requisitos. As fontes consultadas não preveem pedido conjunto.',
      'Arraigo familiar não exige 2 anos, mas é para pai, mãe ou responsável de menor da UE, EEE ou Suíça, ou apoio a pessoa com deficiência dessas nacionalidades.',
    ],
    sources: [
      SOURCE_REGLAMENTO,
      SOURCE_LEY_EXTRANJERIA,
      SOURCE_EES,
      { label: 'La Moncloa — regularização extraordinária 2026', url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Documents/2026/160426-preguntas-frecuentes-regularizacion-extraordinaria.pdf' },
      SOURCE_IPREM,
    ],
  },
]

export const VISA_GENERAL_SOURCES: VisaSource[] = [
  SOURCE_CITA,
  SOURCE_TASAS,
  { label: 'La Moncloa — fim dos vistos por investimento', url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/vivienda-agenda-urbana/paginas/2025/020425-fin-golden-visa.aspx' },
]
