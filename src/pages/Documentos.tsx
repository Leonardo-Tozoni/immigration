import { useNav } from '../context/NavContext'
import { usePlan } from '../context/PlanContext'
import { VISA_CATEGORIES } from '../data/visas'
import styles from './Documentos.module.css'

export default function Documentos() {
  const { navigate, openVisa } = useNav()
  const { chosenForm, chosenVisa } = usePlan()
  const form = VISA_CATEGORIES.find((category) => category.id === chosenForm)

  if (!chosenVisa) {
    return (
      <div className={styles.wrapper}>
        {form && (
          <section className={styles.card}>
            <h2 className={styles.label}>Nossa forma</h2>
            <p className={styles.name}>{form.label}</p>
          </section>
        )}
        <p className={styles.text}>
          {form
            ? 'Falta escolher a opção dentro desta forma. A lista de documentos depende dela.'
            : 'Escolha primeiro como vamos. A lista de documentos depende desse caminho.'}
        </p>
        <button className={styles.primaryBtn} onClick={() => navigate('vistos')}>
          Escolher como vamos
        </button>
      </div>
    )
  }

  const visaId = chosenVisa.id

  function openChosenVisa() {
    navigate('vistos')
    openVisa(visaId)
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <h2 className={styles.label}>Nosso caminho</h2>
        {form && <p className={styles.text}>{form.label}</p>}
        <p className={styles.name}>{chosenVisa.name}</p>
        <button className={styles.linkBtn} onClick={openChosenVisa}>Ver detalhes ou trocar</button>
      </section>

      <section className={styles.card}>
        <h2 className={styles.label}>Requisitos e documentos</h2>
        <ul className={styles.list}>
          {chosenVisa.requirements.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  )
}
