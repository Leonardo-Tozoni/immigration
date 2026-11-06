import { useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, ExternalLink, Info } from 'lucide-react'
import SpainMap, { unemploymentColor } from '../components/SpainMap'
import type { MapMode } from '../components/SpainMap'
import { usePlan } from '../context/PlanContext'
import {
  CLEANING_APPS,
  COMMUTER_NOTE,
  EPA_PERIOD,
  FORMAL_WORK_NOTE,
  INFORMAL_WORK_NOTES,
  IT_RATINGS,
  JOB_SECTORS,
  NATIONAL_UNEMPLOYMENT,
  PLACES_CHECKED_AT,
  PLACES_SOURCES,
  REGIONS,
  findCity,
  itCitiesRanked,
} from '../data/spainPlaces'
import type { City, ItRating, JobSector, Region } from '../data/spainPlaces'
import styles from './Cidade.module.css'

const formatRate = (rate: number) => `${rate.toLocaleString('pt-BR')}%`
const sectorLabel = (id: JobSector) => JOB_SECTORS.find((sector) => sector.id === id)?.label

function RateBadge({ rate }: { rate: number }) {
  return (
    <span className={styles.rate}>
      <span className={styles.rateDot} style={{ background: unemploymentColor(rate) }} />
      {formatRate(rate)}
    </span>
  )
}

function ItBadge({ rating }: { rating: ItRating }) {
  return (
    <span className={styles.rate}>
      <span className={styles.rateDot} style={{ background: IT_RATINGS[rating].color }} />
      {IT_RATINGS[rating].label}
    </span>
  )
}

function ModeSwitch({ mode, onChange }: { mode: MapMode; onChange: (mode: MapMode) => void }) {
  return (
    <div className={styles.chips}>
      <button className={`${styles.chip} ${mode === 'desemprego' ? styles.chipOn : ''}`} onClick={() => onChange('desemprego')} aria-pressed={mode === 'desemprego'}>
        Desemprego geral
      </button>
      <button className={`${styles.chip} ${mode === 'ti' ? styles.chipOn : ''}`} onClick={() => onChange('ti')} aria-pressed={mode === 'ti'}>
        Melhores para TI
      </button>
    </div>
  )
}

function ItView({ onSelect }: { onSelect: (city: City) => void }) {
  const ratings = Object.keys(IT_RATINGS) as ItRating[]
  return (
    <>
      <section className={styles.card}>
        <h2 className={styles.title}>Melhores cidades para TI</h2>
        <p className={styles.text}>Pontos no mapa mostram cidades com sinal de vagas de TI. Vagas contadas são da província, em fotos de um dia na Tecnoempleo.</p>
        <ul className={styles.legend}>
          {ratings.map((rating) => (
            <li key={rating}>
              <span className={styles.rateDot} style={{ background: IT_RATINGS[rating].color }} />
              {IT_RATINGS[rating].label}: {IT_RATINGS[rating].rule}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h3 className={styles.label}>Mais vagas primeiro</h3>
        <div className={styles.list}>
          {itCitiesRanked().map((city) => (
            <button key={city.id} className={styles.row} onClick={() => onSelect(city)}>
              <span className={styles.rowName}>{city.name}</span>
              {city.itRating && <ItBadge rating={city.itRating} />}
              <span className={styles.chevron}><ChevronRight size="1em" /></span>
            </button>
          ))}
        </div>
        <p className={styles.caption}>Classificação é nossa, não oficial. Getafe, Alcalá e L'Hospitalet herdam vagas das províncias de Madrid e Barcelona.</p>
      </section>
    </>
  )
}

function SpainView({ onSelect }: { onSelect: (region: Region) => void }) {
  const ordered = [...REGIONS].sort((a, b) => a.unemployment - b.unemployment)
  return (
    <>
      <section className={styles.card}>
        <h2 className={styles.title}>Espanha</h2>
        <p className={styles.text}>
          Toque em uma comunidade autônoma no mapa ou na lista. Cores mostram o desemprego ({EPA_PERIOD}). Média nacional: {formatRate(NATIONAL_UNEMPLOYMENT)}.
        </p>
        <ul className={styles.legend}>
          <li><span className={styles.rateDot} style={{ background: unemploymentColor(0) }} /> Até 8,5%</li>
          <li><span className={styles.rateDot} style={{ background: unemploymentColor(10) }} /> 8,5% a 12%</li>
          <li><span className={styles.rateDot} style={{ background: unemploymentColor(20) }} /> Acima de 12%</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3 className={styles.label}>Menor desemprego primeiro</h3>
        <div className={styles.list}>
          {ordered.map((region) => (
            <button key={region.code} className={styles.row} onClick={() => onSelect(region)}>
              <span className={styles.rowName}>{region.name}</span>
              <RateBadge rate={region.unemployment} />
              <span className={styles.chevron}><ChevronRight size="1em" /></span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}

function RegionView({ region, mode, onSelect, onBack }: { region: Region; mode: MapMode; onSelect: (city: City) => void; onBack: () => void }) {
  const [sector, setSector] = useState<JobSector | null>(mode === 'ti' ? 'ti' : null)
  const cities = region.cities
    .filter((city) => !sector || city.sectors.includes(sector))
    .sort((a, b) => (sector === 'ti' ? (b.itOffers ?? 0) - (a.itOffers ?? 0) : a.unemployment - b.unemployment))

  return (
    <>
      <button className={styles.back} onClick={onBack}><ChevronLeft size="1em" /> Espanha</button>
      <section className={styles.card}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{region.name}</h2>
          <RateBadge rate={region.unemployment} />
        </div>
        <p className={styles.text}>{region.note}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Melhores cidades para trabalho</h3>
        <div className={styles.chips}>
          <button className={`${styles.chip} ${!sector ? styles.chipOn : ''}`} onClick={() => setSector(null)} aria-pressed={!sector}>Todas</button>
          {JOB_SECTORS.map((item) => (
            <button
              key={item.id}
              className={`${styles.chip} ${sector === item.id ? styles.chipOn : ''}`}
              onClick={() => setSector(item.id)}
              aria-pressed={sector === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.list}>
          {cities.map((city) => (
            <button key={city.id} className={styles.cityRow} onClick={() => onSelect(city)}>
              <span className={styles.cityText}>
                <span className={styles.rowName}>{city.name}</span>
                <span className={styles.cityNote}>{city.note}</span>
                {city.itRating && <ItBadge rating={city.itRating} />}
                {city.sectors.length > 0 && (
                  <span className={styles.tags}>
                    {city.sectors.map((id) => <span key={id} className={styles.tag}>{sectorLabel(id)}</span>)}
                  </span>
                )}
              </span>
              <RateBadge rate={city.unemployment} />
              <span className={styles.chevron}><ChevronRight size="1em" /></span>
            </button>
          ))}
          {cities.length === 0 && <p className={styles.text}>Nenhuma cidade destacada para este setor nesta região.</p>}
        </div>
        <p className={styles.caption}>
          Taxa é da província da cidade, não da própria cidade. Setores e ordem são nossa leitura, não ranking oficial. Em TI, ordem segue vagas da província.
        </p>
      </section>

      <section className={styles.card}>
        <h3 className={styles.label}>Limpeza por aplicativo</h3>
        <ul className={styles.bullets}>
          {CLEANING_APPS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </>
  )
}

function WorkTypes({ city }: { city: City }) {
  const employed = city.employedThousands.toLocaleString('pt-BR')
  return (
    <section className={styles.card}>
      <h3 className={styles.label}>Tipos de trabalho</h3>
      <dl className={styles.work}>
        <div>
          <dt>TI</dt>
          <dd>
            {city.itRating && <><ItBadge rating={city.itRating} /><br /></>}
            {city.itRanking !== null && `${city.itRanking} vagas no ranking de províncias da Tecnoempleo. `}
            {city.itOffers !== null
              ? `${city.itOffers} vagas na província de ${city.province}, na busca "IT" da Tecnoempleo.`
              : `Sem número confirmado para a província de ${city.province} na busca "IT" da Tecnoempleo.`}
            {city.techNote && ` ${city.techNote}`}
          </dd>
        </div>
        <div>
          <dt>Formal</dt>
          <dd>{employed} mil pessoas ocupadas na província. {FORMAL_WORK_NOTE}</dd>
        </div>
        <div>
          <dt>App de faxina</dt>
          <dd>
            {city.cleaningApps.length > 0
              ? `Cidade listada em: ${city.cleaningApps.join(' e ')}. Isso não garante demanda nem dispensa autorização.`
              : 'Cidade não confirmada nas listas lidas do Webel e da Cronoshare.'}
          </dd>
        </div>
        <div>
          <dt>Não formal</dt>
          <dd>
            <ul className={styles.bullets}>
              {INFORMAL_WORK_NOTES.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  )
}

function CommuterTowns({ city }: { city: City }) {
  if (city.commuterTowns.length === 0) return null
  const rentLabel = (rent: number) => `€${rent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/m²`

  return (
    <section className={styles.section}>
      <h3 className={styles.label}>Morar mais barato perto</h3>
      {city.hubRent !== null && <p className={styles.text}>{city.name} no mesmo índice: {rentLabel(city.hubRent)}.</p>}
      <div className={styles.list}>
        {city.commuterTowns.map((town) => (
          <div key={town.name} className={styles.card}>
            <div className={styles.titleRow}>
              <p className={styles.rowName}>{town.name}</p>
              {town.rent !== null && city.hubRent !== null && (
                <span className={styles.saving}>{Math.round((1 - town.rent / city.hubRent) * 100)}% mais barato</span>
              )}
            </div>
            <p className={styles.text}>{town.rent !== null ? rentLabel(town.rent) : 'Aluguel não confirmado'}. {town.transport}.</p>
            {!town.lineChecked && <p className={styles.caption}>Linha não conferida em fonte.</p>}
          </div>
        ))}
      </div>
      <p className={styles.caption}>{COMMUTER_NOTE}</p>
    </section>
  )
}

function CityView({ region, city, onBack }: { region: Region; city: City; onBack: () => void }) {
  const { chosenCityId, chooseCity } = usePlan()
  const isChosen = chosenCityId === city.id

  return (
    <>
      <button className={styles.back} onClick={onBack}><ChevronLeft size="1em" /> {region.name}</button>
      <section className={styles.card}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{city.name}</h2>
          <RateBadge rate={city.unemployment} />
        </div>
        <p className={styles.text}>{city.note}</p>
        <p className={styles.caption}>Desemprego da província de {city.province}, {EPA_PERIOD}.</p>
        {city.sectors.length > 0 && (
          <div className={styles.tags}>
            {city.sectors.map((id) => <span key={id} className={styles.tag}>{sectorLabel(id)}</span>)}
          </div>
        )}
        {isChosen ? (
          <>
            <p className={styles.chosen}><Check size="1em" /> Esta é a nossa cidade</p>
            <button className={styles.clear} onClick={() => chooseCity(null)}>Desfazer escolha</button>
          </>
        ) : (
          <button className={styles.choose} onClick={() => chooseCity(city.id)}>Escolher esta cidade</button>
        )}
      </section>

      <WorkTypes city={city} />
      <CommuterTowns city={city} />

      {city.neighbors.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.label}>Cidades vizinhas para trabalhar</h3>
          <p className={styles.text}>{city.neighbors.join(', ')}</p>
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.label}>Bairros para morar</h3>
        {city.neighborhoods.length > 0 ? (
          <>
            <div className={styles.list}>
              {city.neighborhoods.map((item) => (
                <div key={item.name} className={styles.card}>
                  <p className={styles.rowName}>{item.name}</p>
                  {item.rent && <p className={styles.text}>{item.rent}</p>}
                  <p className={styles.text}>{item.commute}</p>
                </div>
              ))}
            </div>
            <p className={styles.caption}>
              Escolha é nossa leitura de custo e transporte, e não avalia segurança. Linhas não foram conferidas uma a uma: confirme no app do transporte. Aluguéis têm fontes e datas diferentes.
            </p>
          </>
        ) : (
          <p className={styles.text}>Ainda não pesquisamos bairros desta cidade.</p>
        )}
      </section>
    </>
  )
}

export default function Cidade() {
  const { chosenCityId } = usePlan()
  const [region, setRegion] = useState<Region | null>(null)
  const [city, setCity] = useState<City | null>(null)
  const [mode, setMode] = useState<MapMode>('desemprego')
  const chosen = findCity(chosenCityId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [region, city])

  function selectRegion(next: Region) {
    setRegion(next)
    setCity(null)
  }

  function selectCity(next: City) {
    setRegion(findCity(next.id)?.region ?? null)
    setCity(next)
  }

  function openChosen() {
    if (!chosen) return
    setRegion(chosen.region)
    setCity(chosen.city)
  }

  return (
    <div className={styles.wrapper}>
      <SpainMap mode={mode} region={region} city={city} onSelectRegion={selectRegion} onSelectCity={selectCity} />

      <div className={styles.content}>
        <ModeSwitch mode={mode} onChange={setMode} />

        {chosen && chosen.city.id !== city?.id && (
          <button className={styles.chosenCard} onClick={openChosen}>
            <span className={styles.label}>Nossa cidade</span>
            <span className={styles.rowName}>{chosen.city.name}</span>
          </button>
        )}

        {city && region ? (
          <CityView region={region} city={city} onBack={() => setCity(null)} />
        ) : region ? (
          <RegionView key={`${region.code}-${mode}`} region={region} mode={mode} onSelect={selectCity} onBack={() => setRegion(null)} />
        ) : mode === 'ti' ? (
          <ItView onSelect={selectCity} />
        ) : (
          <SpainView onSelect={selectRegion} />
        )}

        <div className={styles.note}>
          <span className={styles.noteIcon}><Info size="1em" /></span>
          <p>Vaga depende de autorização de trabalho: morar em uma cidade não dá direito a trabalhar nela. Em regra, autorização inicial por estudos ou por conta alheia pode ser limitada à comunidade autônoma.</p>
        </div>

        <details className={styles.sources}>
          <summary>Fontes (consultadas em {PLACES_CHECKED_AT})</summary>
          <ul>
            {PLACES_SOURCES.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.label} <ExternalLink size="0.9em" /></a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  )
}
