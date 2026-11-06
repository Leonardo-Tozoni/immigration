export const PLACES_CHECKED_AT = '06/11/2026'
export const EPA_PERIOD = '3º trimestre de 2026'
export const NATIONAL_UNEMPLOYMENT = 10.18

export type JobSector = 'ti' | 'obra' | 'restaurante' | 'limpeza' | 'apps'

export const JOB_SECTORS: { id: JobSector; label: string }[] = [
  { id: 'ti', label: 'TI' },
  { id: 'obra', label: 'Obra' },
  { id: 'restaurante', label: 'Restaurante' },
  { id: 'limpeza', label: 'Limpeza' },
  { id: 'apps', label: 'App de faxina' },
]

/** Ocupados por província, em milhares (INE, EPA 3T 2026). */
const EMPLOYED_THOUSANDS: Record<string, number> = {
  'Málaga': 825.6, 'Sevilla': 830.1, 'Granada': 381.8, 'Zaragoza': 466.4, 'Huesca': 111.7, 'Astúrias': 432.7,
  'Ilhas Baleares': 708.7, 'Santa Cruz de Tenerife': 516, 'Las Palmas': 557.6, 'Cantábria': 272.3, 'Burgos': 167.9,
  'Valladolid': 240.3, 'Guadalajara': 151.5, 'Albacete': 190.8, 'Barcelona': 2948, 'Girona': 401.6, 'Tarragona': 420,
  'Alicante': 950.5, 'Valência': 1262.9, 'Badajoz': 277.2, 'Cáceres': 154.7, 'A Coruña': 508, 'Pontevedra': 427.7,
  'Madrid': 3582.1, 'Múrcia': 749.3, 'Navarra': 322.3, 'Gipuzkoa': 327.2, 'Álava': 157.7, 'Bizkaia': 535.5,
  'La Rioja': 151.9, 'Ceuta': 37.6, 'Melilla': 31,
}

/** Vagas por província na busca "IT" da Tecnoempleo (543 vagas). Foto de um dia: serve só para comparar. */
const IT_OFFERS: Record<string, number> = {
  'Madrid': 295, 'Barcelona': 107, 'Málaga': 36, 'Valência': 19, 'Albacete': 18, 'Sevilla': 14, 'Bizkaia': 10,
  'Zaragoza': 8, 'Astúrias': 5, 'Santa Cruz de Tenerife': 5, 'Alicante': 4, 'A Coruña': 2, 'Gipuzkoa': 1,
  'Múrcia': 1, 'Pontevedra': 1,
}

/** Cidades marcadas como TI: província com 5 vagas ou mais, ou polo tecnológico com fonte. Marbella e Arona ficam de fora por serem turísticas. */
const IT_CITIES = new Set([
  'madrid', 'getafe', 'alcala', 'barcelona', 'hospitalet', 'malaga', 'valencia', 'albacete', 'sevilla', 'bilbao',
  'zaragoza', 'gijon', 'oviedo', 'santa-cruz', 'granada',
])

/** Vagas no ranking de províncias da Tecnoempleo. Só as 6 primeiras foram lidas. Foto diferente da busca "IT". */
const IT_RANKING: Record<string, number> = {
  'Madrid': 889, 'Barcelona': 305, 'Zaragoza': 59, 'Málaga': 58, 'Valência': 52, 'Sevilla': 48,
}

export type ItRating = 'forte' | 'boa' | 'moderada' | 'confirmar'

export const IT_RATINGS: Record<ItRating, { label: string; color: string; rule: string }> = {
  forte: { label: 'TI forte', color: '#2e7d32', rule: '300 vagas ou mais no ranking' },
  boa: { label: 'TI boa', color: '#1565c0', rule: 'Entre as 6 províncias do ranking' },
  moderada: { label: 'TI moderada', color: '#f9a825', rule: '5 vagas ou mais na busca "IT"' },
  confirmar: { label: 'TI a confirmar', color: '#757575', rule: 'Polo tecnológico, sem número de vagas' },
}

function itRatingFor(province: string): ItRating {
  const ranking = IT_RANKING[province]
  if (ranking >= 300) return 'forte'
  if (ranking) return 'boa'
  return (IT_OFFERS[province] ?? 0) >= 5 ? 'moderada' : 'confirmar'
}

/** Aluguel SERPAVI, em €/m² por mês. Serve para comparar municípios: fica abaixo dos preços de anúncio. */
const HUB_RENT: Record<string, number> = {
  madrid: 13.97, barcelona: 13.68, malaga: 9.55, sevilla: 9.17, valencia: 8.18, zaragoza: 7.72, bilbao: 11.51,
}

export interface CommuterTown {
  name: string
  rent: number | null
  transport: string
  /** false quando a linha veio da nossa memória, sem conferência em fonte. */
  lineChecked: boolean
}

const town = (name: string, rent: number | null, transport: string, lineChecked = true): CommuterTown => ({ name, rent, transport, lineChecked })

const COMMUTER_TOWNS: Record<string, CommuterTown[]> = {
  madrid: [
    town('Parla', 8.21, 'Cercanías C-4, direto até Atocha e Sol'),
    town('Fuenlabrada', 9.04, 'Cercanías C-5, direto até Atocha'),
    town('Torrejón de Ardoz', 9.21, 'Cercanías C-2, direto até Atocha'),
    town('Móstoles', 9.22, 'Cercanías C-5, direto até Atocha'),
    town('Alcalá de Henares', 9.42, 'Cercanías C-2, direto até Atocha'),
    town('Leganés', 9.76, 'Cercanías C-5, direto até Atocha'),
    town('Coslada', 9.79, 'Cercanías C-2 e C-7 até Atocha', false),
    town('Getafe', 10.2, 'Cercanías C-4, direto até Atocha e Sol'),
    town('Guadalajara', null, 'Cercanías C-2, direto até Atocha. Fica mais longe'),
  ],
  barcelona: [
    town('Sabadell', 8.57, 'Rodalies R4 até Sants', false),
    town('Granollers', 8.73, 'Rodalies R2 até Sants', false),
    town('Vilanova i la Geltrú', 8.84, 'Rodalies R2 Sud até Sants', false),
    town('Terrassa', 8.9, 'Rodalies R4 até Sants', false),
    town('Mataró', 8.93, 'Rodalies R1 até Barcelona', false),
    town('Badalona', 10.17, 'Rodalies R1 e Metro L2', false),
    town('Sant Boi de Llobregat', 10.87, 'FGC até Plaça Espanya', false),
    town("L'Hospitalet de Llobregat", 13, 'Metro L1 até o centro', false),
  ],
  malaga: [
    town('Fuengirola', 9.29, 'Cercanías C-1, direto até Centro-Alameda, a cada 20 minutos'),
    town('Cártama', null, 'Cercanías C-2, direto até Centro-Alameda, em regra a cada hora'),
    town('Álora', null, 'Cercanías C-2, direto até Centro-Alameda, em regra a cada hora'),
  ],
  sevilla: [
    town('Dos Hermanas', 7.45, 'Cercanías C-1, direto até Santa Justa'),
    town('Mairena del Aljarafe', 8.44, 'Metro L1', false),
    town('Utrera', null, 'Cercanías C-1, direto até Santa Justa'),
  ],
  valencia: [
    town('Gandia', 5.22, 'Cercanías C-1 até Valência. Fica mais longe', false),
    town('Sagunt', 5.97, 'Cercanías C-6, direto até Valência-Nord'),
    town('Torrent', 6.28, 'Metrovalencia L1 e L2'),
    town('Burjassot', 6.33, 'Metrovalencia L1'),
    town('Paterna', 6.62, 'Metrovalencia L2'),
  ],
  zaragoza: [
    town('Utebo', null, 'Cercanías C-1 até Delicias', false),
    town('Casetas', null, 'Cercanías C-1 até Delicias', false),
  ],
  bilbao: [
    town('Barakaldo', 10.47, 'Metro L2, direto até Abando'),
    town('Getxo', 11.34, 'Metro L1, direto até Abando'),
    town('Portugalete', null, 'Metro L2, direto até Abando'),
    town('Santurtzi', null, 'Metro L2, direto até Abando'),
    town('Sestao', null, 'Metro L2, direto até Abando'),
    town('Basauri', null, 'Metro L2, direto até Abando'),
  ],
}

export const COMMUTER_NOTE =
  'Aluguel do índice SERPAVI, útil para comparar, e não preço de anúncio. Não confirmamos minutos de viagem nem a localização do trabalho: polos como Málaga TechPark e o parque de Zamudio, em Bizkaia, ficam fora do centro. Simule o trajeto até a empresa.'

const TECH_NOTES: Record<string, string> = {
  malaga: 'Málaga TechPark: 719 empresas e 29.018 trabalhadores no fim de 2025.',
  sevilla: 'Sevilla TechPark: 602 empresas e 35.806 empregos em 2025.',
  granada: 'Parque Tecnológico de la Salud, voltado a saúde, biotecnologia, TIC e IA.',
}

const CRONOSHARE_CITIES = new Set([
  'madrid', 'barcelona', 'valencia', 'bilbao', 'zaragoza', 'sevilla', 'alicante', 'malaga', 'alcala', 'santander',
  'murcia', 'gijon', 'las-palmas', 'valladolid', 'palma', 'pamplona', 'a-coruna', 'tarragona', 'hospitalet', 'oviedo',
])

const WEBEL_CITIES = new Set([
  'madrid', 'barcelona', 'zaragoza', 'valencia', 'sevilla', 'malaga', 'bilbao', 'palma', 'alicante', 'murcia',
  'a-coruna', 'badajoz', 'caceres', 'logrono', 'huesca',
])

export const FORMAL_WORK_NOTE =
  'Eletricista, carpintaria metálica, de alumínio e PVC e operador de grua estão no catálogo de difícil cobertura em todas as províncias, o que facilita contratar de fora. TI, limpeza e restaurante em terra não estão.'

export const INFORMAL_WORK_NOTES: string[] = [
  'Não marcamos cidades: não há dado confiável por cidade, e nenhuma "aceita" esse trabalho legalmente.',
  'Sem autorização, trabalhar é infração grave: multa de €501 a €10.000 ou expulsão, com proibição de entrada. Para o empregador, é infração muito grave: €10.001 a €100.000.',
  'Mesmo assim, o contrato vale para os direitos do trabalhador, como salário, mas não dá seguro-desemprego.',
]

export interface Neighborhood {
  name: string
  rent?: string
  /** Como chegar às cidades vizinhas. Linhas lembradas de redes públicas: confira no app do transporte. */
  commute: string
}

export interface City {
  id: string
  name: string
  lat: number
  lng: number
  /** Província da taxa de desemprego usada. */
  province: string
  unemployment: number
  sectors: JobSector[]
  employedThousands: number
  itOffers: number | null
  itRanking: number | null
  itRating: ItRating | null
  hubRent: number | null
  commuterTowns: CommuterTown[]
  techNote?: string
  cleaningApps: string[]
  note: string
  neighbors: string[]
  neighborhoods: Neighborhood[]
}

export interface Region {
  /** Código cod_ccaa do arquivo de fronteiras. */
  code: string
  name: string
  unemployment: number
  note: string
  cities: City[]
}

function city(
  id: string,
  name: string,
  [lat, lng]: [number, number],
  [province, unemployment]: [string, number],
  sectors: JobSector[],
  note: string,
  neighbors: string[] = [],
  neighborhoods: Neighborhood[] = [],
): City {
  const cleaningApps = [
    ...(WEBEL_CITIES.has(id) ? ['Webel'] : []),
    ...(CRONOSHARE_CITIES.has(id) ? ['Cronoshare'] : []),
  ]
  return {
    id,
    name,
    lat,
    lng,
    province,
    unemployment,
    sectors: [
      ...(IT_CITIES.has(id) ? (['ti'] as const) : []),
      ...sectors,
      ...(cleaningApps.length > 0 ? (['apps'] as const) : []),
    ],
    employedThousands: EMPLOYED_THOUSANDS[province],
    itOffers: IT_OFFERS[province] ?? null,
    itRanking: IT_RANKING[province] ?? null,
    itRating: IT_CITIES.has(id) ? itRatingFor(province) : null,
    hubRent: HUB_RENT[id] ?? null,
    commuterTowns: COMMUTER_TOWNS[id] ?? [],
    techNote: TECH_NOTES[id],
    cleaningApps,
    note,
    neighbors,
    neighborhoods,
  }
}

const ALL: JobSector[] = ['obra', 'restaurante', 'limpeza']

export const REGIONS: Region[] = [
  {
    code: '01',
    name: 'Andaluzia',
    unemployment: 14.91,
    note: 'Maior desemprego entre as comunidades. Turismo de costa ajuda Málaga, que tem a menor taxa da região.',
    cities: [
      city('malaga', 'Málaga', [36.72, -4.42], ['Málaga', 13.62], ALL, 'Polo de turismo, serviços e tecnologia na Costa del Sol.', ['Torremolinos', 'Benalmádena', 'Fuengirola'], [
        { name: 'Carretera de Cádiz', commute: 'Cercanías C-1 pela costa até Torremolinos, Benalmádena e Fuengirola.' },
        { name: 'Ciudad Jardín', rent: 'Aluguel médio de €826, o distrito mais acessível da cidade (Alquiler Seguro, data não informada).', commute: 'Sem trem próximo: use ônibus até o centro e siga de Cercanías.' },
      ]),
      city('marbella', 'Marbella', [36.51, -4.88], ['Málaga', 13.62], ALL, 'Turismo de alto padrão, com casas, hotéis e restaurantes. Moradia tende a ser cara.', ['Estepona', 'Fuengirola']),
      city('sevilla', 'Sevilha', [37.39, -5.99], ['Sevilla', 14.95], ['restaurante', 'limpeza'], 'Maior cidade da região, com turismo e serviços.', ['Dos Hermanas', 'Alcalá de Guadaíra', 'Utrera'], [
        { name: 'Cerro-Amate', rent: 'Aluguel médio de €712, o distrito mais barato da cidade (Alquiler Seguro, data não informada).', commute: 'Metro L1 até Montequinto, em Dos Hermanas.' },
        { name: 'San Pablo–Santa Justa', commute: 'Perto da estação Santa Justa, com Cercanías até Dos Hermanas e Utrera.' },
      ]),
      city('granada', 'Granada', [37.18, -3.6], ['Granada', 16.14], ['restaurante', 'limpeza'], 'Turismo e universidade, mas província com desemprego alto.', ['Armilla', 'Maracena']),
    ],
  },
  {
    code: '02',
    name: 'Aragão',
    unemployment: 9.23,
    note: 'Abaixo da média nacional. Zaragoza concentra a maior parte do emprego.',
    cities: [
      city('zaragoza', 'Zaragoza', [41.65, -0.89], ['Zaragoza', 10.36], ['obra', 'limpeza'], 'Maior província em emprego: 23.681 afiliados na construção (Atlas de Aragón, data não informada).', ['Utebo', 'Casetas'], [
        { name: 'Delicias', commute: 'Perto da estação Delicias, com Cercanías C-1 até Casetas e Utebo.' },
      ]),
      city('huesca', 'Huesca', [42.14, -0.41], ['Huesca', 6.29], ['obra', 'restaurante'], 'Baixo desemprego, com mercado pequeno. Turismo de montanha na província.'),
    ],
  },
  {
    code: '03',
    name: 'Astúrias',
    unemployment: 10.04,
    note: 'Próxima da média nacional. O INE não publica província separada porque a região tem uma só.',
    cities: [
      city('gijon', 'Gijón', [43.53, -5.66], ['Astúrias', 10.04], ['obra', 'restaurante'], 'Maior cidade da região, com porto e turismo de verão.', ['Oviedo', 'Avilés']),
      city('oviedo', 'Oviedo', [43.36, -5.85], ['Astúrias', 10.04], ['restaurante', 'limpeza'], 'Capital e centro de serviços.', ['Gijón', 'Avilés']),
    ],
  },
  {
    code: '04',
    name: 'Ilhas Baleares',
    unemployment: 4.63,
    note: 'Menor desemprego da Espanha, mas muito ligado à temporada turística. Moradia tende a ser difícil.',
    cities: [
      city('palma', 'Palma', [39.57, 2.65], ['Ilhas Baleares', 4.63], ALL, 'Hotéis, restaurantes e obra ligados ao turismo, com trabalho também fora do verão.', ['Marratxí', 'Inca'], [
        { name: 'Pere Garau', commute: 'Perto da estação Intermodal, com trem até Marratxí e Inca.' },
      ]),
      city('ibiza', 'Ibiza', [38.91, 1.43], ['Ilhas Baleares', 4.63], ['restaurante', 'limpeza'], 'Muito trabalho na temporada, com moradia reconhecidamente cara.', ['Sant Antoni de Portmany', 'Santa Eulària']),
    ],
  },
  {
    code: '05',
    name: 'Ilhas Canárias',
    unemployment: 10.92,
    note: 'Turismo o ano todo. Foi a região com maior alta de empregos no trimestre (38.100).',
    cities: [
      city('santa-cruz', 'Santa Cruz de Tenerife', [28.47, -16.25], ['Santa Cruz de Tenerife', 10.06], ['restaurante', 'limpeza'], 'Capital e centro de serviços da ilha.', ['La Laguna']),
      city('arona', 'Arona (sul de Tenerife)', [28.1, -16.68], ['Santa Cruz de Tenerife', 10.06], ALL, 'Zona turística com hotéis e restaurantes. Depende de carro ou ônibus.', ['Adeje', 'Granadilla de Abona']),
      city('las-palmas', 'Las Palmas de Gran Canaria', [28.12, -15.43], ['Las Palmas', 11.71], ALL, 'Maior cidade das ilhas, com turismo, porto e serviços.', ['Telde']),
    ],
  },
  {
    code: '06',
    name: 'Cantábria',
    unemployment: 7.56,
    note: 'Abaixo da média nacional, com mercado menor.',
    cities: [
      city('santander', 'Santander', [43.46, -3.81], ['Cantábria', 7.56], ['restaurante', 'limpeza'], 'Capital, com serviços e turismo de verão.', ['Torrelavega', 'Camargo']),
    ],
  },
  {
    code: '07',
    name: 'Castela e Leão',
    unemployment: 7.75,
    note: 'Desemprego baixo em Burgos e Valladolid, com população e mercado menores que os grandes centros.',
    cities: [
      city('burgos', 'Burgos', [42.34, -3.7], ['Burgos', 5.49], ['obra', 'limpeza'], 'Província com um dos menores desempregos do país e base industrial.'),
      city('valladolid', 'Valladolid', [41.65, -4.72], ['Valladolid', 6.48], ['obra', 'limpeza'], 'Maior cidade da região, com indústria e serviços.', ['Laguna de Duero']),
    ],
  },
  {
    code: '08',
    name: 'Castela-La Mancha',
    unemployment: 11.36,
    note: 'Acima da média, mas muito desigual. Guadalajara tem taxa baixa e fica perto de Madrid.',
    cities: [
      city('guadalajara', 'Guadalajara', [40.63, -3.17], ['Guadalajara', 6.06], ['obra', 'limpeza'], 'Corredor do Henares, com Cercanías C-2 até Alcalá e Madrid.', ['Azuqueca de Henares', 'Alcalá de Henares']),
      city('albacete', 'Albacete', [38.99, -1.86], ['Albacete', 7.32], ['obra', 'restaurante'], 'Maior cidade da região, com desemprego baixo para a comunidade.'),
    ],
  },
  {
    code: '09',
    name: 'Catalunha',
    unemployment: 8.3,
    note: 'Maior número de ocupados do país. Abaixo da média, com catalão presente no dia a dia e no trabalho.',
    cities: [
      city('barcelona', 'Barcelona', [41.39, 2.17], ['Barcelona', 8.17], ALL, 'Grande mercado de turismo, serviços e construção. Aluguel alto.', ["L'Hospitalet", 'Badalona', 'Santa Coloma', 'Cornellà'], [
        { name: 'Nou Barris', rent: '€16,2/m², a zona mais econômica da cidade (idealista, abril de 2026).', commute: 'Metro L3, L4 e L11. Rodalies próximo para Montcada.' },
        { name: 'Sant Andreu', commute: 'Rodalies R2 em direção a Montcada e Granollers, e Metro L1.' },
      ]),
      city('hospitalet', "L'Hospitalet de Llobregat", [41.36, 2.1], ['Barcelona', 8.17], ALL, 'Vizinha de Barcelona, com muita imigração e metro integrado.', ['Barcelona', 'Cornellà', 'Esplugues'], [
        { name: 'Bellvitge', commute: 'Metro L1 até Barcelona e Rodalies R2 em direção a Castelldefels e Barcelona.' },
        { name: 'La Florida', commute: 'Metro L1 até Barcelona. L9 Sud até o aeroporto, a partir de Torrassa.' },
      ]),
      city('girona', 'Girona', [41.98, 2.82], ['Girona', 7.68], ['restaurante', 'limpeza'], 'Serviços, e a Costa Brava perto para temporada.', ['Salt']),
      city('tarragona', 'Tarragona', [41.12, 1.25], ['Tarragona', 10.69], ['obra', 'restaurante'], 'Porto, indústria química e turismo na Costa Daurada.', ['Reus', 'Salou']),
    ],
  },
  {
    code: '10',
    name: 'Comunidade Valenciana',
    unemployment: 11.82,
    note: 'Acima da média. Teve a maior alta de desempregados no trimestre (31.000), e turismo forte na costa.',
    cities: [
      city('alicante', 'Alicante', [38.35, -0.48], ['Alicante', 11.73], ALL, 'Turismo e serviços, com muitos estrangeiros residentes.', ['San Vicente del Raspeig', 'Elche']),
      city('benidorm', 'Benidorm', [38.54, -0.13], ['Alicante', 11.73], ['restaurante', 'limpeza'], 'Destino turístico com hotéis abertos boa parte do ano.', ['La Vila Joiosa', 'Altea']),
      city('valencia', 'Valência', [39.47, -0.38], ['Valência', 11.79], ALL, 'Terceira maior cidade, com serviços, porto e construção.', ['Torrent', 'Paterna', 'Burjassot', 'Sagunt'], [
        { name: 'Poblats Marítims', rent: 'Aluguel médio de €799, entre os distritos mais baratos (Alquiler Seguro, data não informada).', commute: 'Estação Cabanyal, com Cercanías C-6 até Sagunt.' },
        { name: 'Patraix', commute: 'Metro L1 e L2 em direção a Torrent e Paterna.' },
      ]),
    ],
  },
  {
    code: '11',
    name: 'Extremadura',
    unemployment: 13.01,
    note: 'Desemprego alto e mercado pequeno.',
    cities: [
      city('badajoz', 'Badajoz', [38.88, -6.97], ['Badajoz', 12.84], ['obra', 'limpeza'], 'Maior cidade da região, na fronteira com Portugal.'),
      city('caceres', 'Cáceres', [39.47, -6.37], ['Cáceres', 13.32], ['restaurante', 'limpeza'], 'Cidade histórica, com turismo e serviços.'),
    ],
  },
  {
    code: '12',
    name: 'Galícia',
    unemployment: 9.17,
    note: 'Abaixo da média. A construção teve o melhor junho em 15 anos, com 84.422 afiliados em 2026 (Fundación Laboral).',
    cities: [
      city('a-coruna', 'A Coruña', [43.37, -8.4], ['A Coruña', 7.94], ALL, 'Serviços, porto e comércio. Província com desemprego baixo.', ['Arteixo', 'Oleiros', 'Culleredo']),
      city('vigo', 'Vigo', [42.24, -8.72], ['Pontevedra', 10.93], ['obra', 'restaurante'], 'Maior cidade da Galícia, com porto e indústria.', ['Redondela', 'Mos']),
    ],
  },
  {
    code: '13',
    name: 'Comunidade de Madrid',
    unemployment: 8.18,
    note: 'Terceiro maior mercado em ocupados, com a maior queda de empregos no trimestre (49.200). Aluguel alto.',
    cities: [
      city('madrid', 'Madrid', [40.42, -3.7], ['Madrid', 8.18], ALL, 'Maior volume de vagas em serviços, restaurantes e obras, com aluguel médio de €22,7/m².', ['Getafe', 'Leganés', 'Fuenlabrada', 'Alcalá de Henares', 'Coslada'], [
        { name: 'Villaverde', rent: '€16,1/m², o distrito mais barato (idealista, fim de 2025).', commute: 'Cercanías C-4 até Getafe e C-5 até Leganés e Fuenlabrada.' },
        { name: 'Vicálvaro', rent: '€16,2/m² (idealista, fim de 2025).', commute: 'Cercanías C-2 e C-7 até Coslada, San Fernando e Alcalá de Henares.' },
        { name: 'Puente de Vallecas', commute: 'Metro L1 e Cercanías C-2 e C-7 no corredor do Henares.' },
      ]),
      city('getafe', 'Getafe', [40.31, -3.73], ['Madrid', 8.18], ALL, 'Sul da região, com indústria e logística. Cercanías C-4 até Madrid.', ['Madrid', 'Leganés']),
      city('alcala', 'Alcalá de Henares', [40.48, -3.36], ['Madrid', 8.18], ALL, 'Corredor do Henares, com logística e Cercanías até Madrid e Guadalajara.', ['Torrejón de Ardoz', 'Madrid', 'Guadalajara']),
    ],
  },
  {
    code: '14',
    name: 'Região de Múrcia',
    unemployment: 10.8,
    note: 'Próxima da média, com agricultura e construção relevantes.',
    cities: [
      city('murcia', 'Múrcia', [37.99, -1.13], ['Múrcia', 10.8], ['obra', 'limpeza'], 'Capital e centro de serviços da região.', ['Molina de Segura', 'Alcantarilla']),
      city('cartagena', 'Cartagena', [37.6, -0.98], ['Múrcia', 10.8], ['obra', 'restaurante'], 'Porto, indústria e turismo na costa.'),
    ],
  },
  {
    code: '15',
    name: 'Navarra',
    unemployment: 9.16,
    note: 'Abaixo da média, com indústria forte.',
    cities: [
      city('pamplona', 'Pamplona', [42.82, -1.64], ['Navarra', 9.16], ['obra', 'limpeza'], 'Capital, com indústria e serviços.', ['Burlada', 'Barañáin']),
    ],
  },
  {
    code: '16',
    name: 'País Basco',
    unemployment: 7.17,
    note: 'Desemprego baixo, com salários e aluguel altos. Basco pode pesar em parte das vagas.',
    cities: [
      city('san-sebastian', 'San Sebastián', [43.32, -1.98], ['Gipuzkoa', 5.16], ['restaurante', 'limpeza'], 'Província com o menor desemprego entre as bascas, gastronomia forte e aluguel alto.', ['Errenteria', 'Irun']),
      city('vitoria', 'Vitoria-Gasteiz', [42.85, -2.67], ['Álava', 5.84], ['obra', 'limpeza'], 'Capital do País Basco, com indústria e logística.'),
      city('bilbao', 'Bilbao', [43.26, -2.93], ['Bizkaia', 8.73], ALL, 'Maior cidade da região, com serviços e turismo.', ['Barakaldo', 'Getxo', 'Basauri'], [
        { name: 'Deusto', commute: 'Metro L1 e L2 em direção a Getxo e Barakaldo.' },
        { name: 'Santutxu', commute: 'Metro L3, com baldeação até Barakaldo e Getxo.' },
      ]),
    ],
  },
  {
    code: '17',
    name: 'La Rioja',
    unemployment: 8.63,
    note: 'Abaixo da média. Mercado pequeno, com vinho e turismo.',
    cities: [
      city('logrono', 'Logroño', [42.46, -2.45], ['La Rioja', 8.63], ['restaurante', 'limpeza'], 'Capital, com serviços e gastronomia.'),
    ],
  },
  {
    code: '18',
    name: 'Ceuta',
    unemployment: 18.5,
    note: 'Desemprego muito acima da média e mercado pequeno.',
    cities: [
      city('ceuta', 'Ceuta', [35.89, -5.32], ['Ceuta', 18.5], [], 'Sem setor destacado: não recomendamos para procurar emprego.'),
    ],
  },
  {
    code: '19',
    name: 'Melilla',
    unemployment: 18.87,
    note: 'Maior desemprego do país e mercado pequeno.',
    cities: [
      city('melilla', 'Melilla', [35.29, -2.94], ['Melilla', 18.87], [], 'Sem setor destacado: não recomendamos para procurar emprego.'),
    ],
  },
]

export const CLEANING_APPS: string[] = [
  'Webel tem categoria de limpeza e listas por cidade. Cronoshare é marketplace de serviços com pedidos por hora. Estar na lista não garante demanda.',
  'Domestina, Homerd e Oscar seguem ativas segundo a Applicantes (maio de 2026), sem cidades informadas.',
  'Clintu fechou em abril de 2026, MyPoppins encerrou após concurso de 2024, e Helpling saiu da Espanha há mais de uma década.',
  'Não conseguimos abrir o site da Wayook. Uma nota antiga dela exigia permissão de trabalho.',
  'Webel e Cronoshare não informam nas páginas lidas se você atua como empregado ou autônomo, nem qual permissão exigem. Confirme antes: atuar sem autorização continua sendo infração.',
]

export const PLACES_SOURCES: { label: string; url: string }[] = [
  { label: 'INE — EPA do 3º trimestre de 2026', url: 'https://www.ine.es/dyngs/Prensa/EPA3T26.htm' },
  { label: 'Tecnoempleo — busca de vagas "IT" por província', url: 'https://www.tecnoempleo.com/busqueda-empleo.php?te=IT' },
  { label: 'Tecnoempleo — ranking de vagas de TI por província', url: 'https://www.tecnoempleo.com/trabajo-provincias.php' },
  { label: 'Precio Alquiler — aluguel por município (SERPAVI)', url: 'https://precioalquiler.com/precio-mercado' },
  { label: 'Wikipedia — Cercanías Madrid C-4', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-4_(Cercan%C3%ADas_Madrid)' },
  { label: 'Wikipedia — Cercanías Madrid C-5', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-5_(Cercan%C3%ADas_Madrid)' },
  { label: 'Wikipedia — Cercanías Madrid C-2', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-2_(Cercan%C3%ADas_Madrid)' },
  { label: 'Wikipedia — Cercanías Málaga C-1', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-1_(Cercan%C3%ADas_M%C3%A1laga)' },
  { label: 'Wikipedia — Cercanías Málaga C-2', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-2_(Cercan%C3%ADas_M%C3%A1laga)' },
  { label: 'Wikipedia — Cercanías Sevilha C-1', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-1_(Cercan%C3%ADas_Sevilla)' },
  { label: 'Wikipedia — Cercanías Valência C-6', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_C-6_(Cercan%C3%ADas_Valencia)' },
  { label: 'Wikipedia — Metrovalencia L1', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_1_(Metrovalencia)' },
  { label: 'Wikipedia — Metrovalencia L2', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_2_(Metrovalencia)' },
  { label: 'Wikipedia — Metro Bilbao L1', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_1_(Metro_de_Bilbao)' },
  { label: 'Wikipedia — Metro Bilbao L2', url: 'https://es.wikipedia.org/wiki/L%C3%ADnea_2_(Metro_de_Bilbao)' },
  { label: 'BOE — Catálogo de Ocupaciones de Difícil Cobertura (3º trimestre de 2026)', url: 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-18504' },
  { label: 'BOE — Ley Orgánica 4/2000, arts. 36, 53, 54, 55 e 57', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2000-544' },
  { label: 'Webel — serviços a domicílio por cidade', url: 'https://appwebel.com/' },
  { label: 'Cronoshare — cidades e trabalhos por hora', url: 'https://www.cronoshare.com/ofertas-trabajo/empleo' },
  { label: 'El Español — números do Málaga TechPark', url: 'https://www.elespanol.com/malaga/economia/tecnologia/20260316/pta-roza-empleados-millones-facturacion-agregada/1003744171713_0.html' },
  { label: 'El Español — números do Sevilla TechPark', url: 'https://www.elespanol.com/invertia/20260728/sevilla-techpark-mayor-parque-tecnologico-espana-supera-empresas-meur-empleos/1003744336319_0.html' },
  { label: 'APTE — infográfico do PTS Granada', url: 'https://apte.org/res/uploads/INFOGRAFIA%20PTS%20GRANADA%281%29.pdf' },
  { label: 'idealista — barrios mais baratos de Barcelona', url: 'https://www.idealista.com/news/inmobiliario/vivienda/2026/04/07/888262-estos-son-los-barrios-mas-baratos-para-vivir-en-barcelona' },
  { label: 'Moncloa.com — aluguel em Madrid (dados idealista)', url: 'https://www.moncloa.com/2026/04/22/madrid-alquiler-barrios-3372414/' },
  { label: 'Alquiler Seguro — zonas mais acessíveis', url: 'https://actualidad.alquilerseguro.es/notas/cuales-son-las-zonas-mas-accesibles-para-alquilar-en-las-grandes-ciudades' },
  { label: 'Atlas de Aragón — afiliados na construção', url: 'https://icearagon.aragon.es/atlas/Aragon/info/actividades-economicas/afiliaciones-a-la-seguridad-social/afiliaciones-en-alta-a-la-seguridad-social-en-el-sector-construccion' },
  { label: 'Fundación Laboral — construção na Galícia', url: 'https://catalunya.fundacionlaboral.org/en/current-affairs/news/sector/la-afiliacion-en-la-construccion-de-galicia-encadena-su-mejor-mes-de-junio-en-15-anos' },
  { label: 'Trecebits — fechamento da Clintu', url: 'https://www.trecebits.com/clintu-cierra/' },
  { label: 'Applicantes — apps de limpeza na Espanha', url: 'https://applicantes.com/apps-limpieza-cierre-clintu-mypoppins/' },
  { label: 'Notas de prensa — requisitos da Wayook (nota antiga)', url: 'https://notas-prensa.es/wayook-busca-300-profesionales-de-limpieza/' },
]

export function itCitiesRanked() {
  const score = (item: City) => item.itRanking ?? item.itOffers ?? 0
  return REGIONS.flatMap((region) => region.cities)
    .filter((item) => item.itRating)
    .sort((a, b) => score(b) - score(a))
}

export function findCity(cityId: string | null) {
  for (const region of REGIONS) {
    const found = region.cities.find((item) => item.id === cityId)
    if (found) return { region, city: found }
  }
  return null
}
