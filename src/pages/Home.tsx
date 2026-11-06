import { Heart, UserRound } from 'lucide-react'
import Countdown from '../components/Countdown'
import { MENU_ITEMS, useNav } from '../context/NavContext'
import type { PageId } from '../context/NavContext'
import { usePlan } from '../context/PlanContext'
import styles from './Home.module.css'

export default function Home() {
  const { navigate } = useNav()
  const { chosenVisa, chosenCityId } = usePlan()
  const decided: Partial<Record<PageId, boolean>> = { vistos: Boolean(chosenVisa), cidade: Boolean(chosenCityId) }

  return (
    <div className={styles.wrapper}>
      <section className={styles.countdown}>
        <h2 className={styles.countdownTitle}>Contagem regressiva</h2>
        <Countdown />
      </section>

      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>Sobre nós</h2>
        <div className={styles.aboutCard}>
          <p className={styles.aboutText}>
            Somos <strong>Leo e Duda</strong>, um casal brasileiro com um sonho em comum:
            construir uma nova vida na Espanha para dar melhores oportunnidades para nossa familia. Esta página é o nosso diário de planejamento —
            cada decisão tomada, cada passo dado rumo à nossa aventura ibérica.
          </p>
          <div className={styles.people}>
            <div className={styles.person}>
              <span className={styles.personAvatar}><UserRound size="1em" /></span>
              <span className={styles.personName}>Leo</span>
            </div>
            <span className={styles.heart}><Heart size="1em" fill="currentColor" /></span>
            <div className={styles.person}>
              <span className={styles.personAvatar}><UserRound size="1em" /></span>
              <span className={styles.personName}>Duda</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.decisions}>
        <h2 className={styles.sectionTitle}>Nossas decisões</h2>
        <div className={styles.decisionGrid}>
          {MENU_ITEMS.map((item) => (
            <button key={item.id} className={styles.decisionCard} onClick={() => navigate(item.id)}>
              <span className={styles.decisionIcon}><item.icon size="1em" /></span>
              <span className={styles.decisionLabel}>{item.label}</span>
              <span className={styles.decisionStatus}>{decided[item.id] ? 'Definido' : 'A definir'}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
