import { Check, ChevronRight, Info } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { usePlan } from '../context/PlanContext'
import { VISAS, VISAS_CHECKED_AT, VISA_CATEGORIES, VISA_GENERAL_SOURCES } from '../data/visas'
import VisaDetail from './VisaDetail'
import styles from './Vistos.module.css'

export default function Vistos() {
  const { visaId, openVisa } = useNav()
  const { chosenForm, chosenVisa, chooseForm } = usePlan()
  const selectedVisa = VISAS.find((visa) => visa.id === visaId)

  if (selectedVisa) return <VisaDetail visa={selectedVisa} />

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Qual forma vamos?</h2>
        <div className={styles.list}>
          {VISA_CATEGORIES.map((form) => {
            const selected = chosenForm === form.id
            return (
              <button
                key={form.id}
                className={`${styles.card} ${selected ? styles.cardChosen : ''}`}
                onClick={() => chooseForm(form.id)}
                aria-pressed={selected}
              >
                <span className={styles.cardText}>
                  <span className={styles.cardName}>{form.label}</span>
                  <span className={styles.cardSummary}>{form.desc}</span>
                </span>
                {selected && <span className={styles.cardChevron}><Check size="1em" /></span>}
              </button>
            )
          })}
        </div>
      </section>

      {chosenVisa && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nosso caminho</h2>
          <button className={`${styles.card} ${styles.cardChosen}`} onClick={() => openVisa(chosenVisa.id)}>
            <span className={styles.cardText}>
              <span className={styles.cardName}>{chosenVisa.name}</span>
              <span className={styles.cardSummary}>{chosenVisa.summary}</span>
            </span>
            <span className={styles.cardChevron}><ChevronRight size="1em" /></span>
          </button>
        </section>
      )}

      {chosenForm && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Opções nesta forma</h2>
          <p className={styles.intro}>Toque em uma opção para ver prós, contras e como solicitar, e para escolher o nosso caminho.</p>
          <div className={styles.list}>
            {VISAS.filter((visa) => visa.category === chosenForm).map((visa) => (
              <button key={visa.id} className={styles.card} onClick={() => openVisa(visa.id)}>
                <span className={styles.cardText}>
                  <span className={styles.cardName}>{visa.name}</span>
                  <span className={styles.cardSummary}>{visa.summary}</span>
                </span>
                <span className={styles.cardChevron}><ChevronRight size="1em" /></span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.note}>
          <span className={styles.noteIcon}><Info size="1em" /></span>
          <div className={styles.noteText}>
            <p>O visado de inversor (Golden Visa) não aparece aqui porque acabou para novos pedidos em 3 de abril de 2025.</p>
            <p>Passos e citas são do consulado em São Paulo, que atende SP, PR e MS. Moradores de outros estados são atendidos em Brasília, Porto Alegre, Rio de Janeiro ou Salvador, e as regras podem variar.</p>
            <p>Informações consultadas em {VISAS_CHECKED_AT} em fontes oficiais. Prós e contras são nossa leitura dessas regras. Confirme tudo com o consulado antes de pedir.</p>
            <ul className={styles.noteLinks}>
              {VISA_GENERAL_SOURCES.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
