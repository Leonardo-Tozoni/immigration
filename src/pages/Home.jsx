import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/logo.svg'
import styles from './Home.module.css'

const DISPLAY_NAME = { leo: 'Leo', duda: 'Duda' }

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logoUrl} alt="Espanha" className={styles.logo} />
          <span className={styles.appName}>Inmigración</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.greeting}>Olá, {DISPLAY_NAME[user]}!</span>
          <button className={styles.logoutBtn} onClick={logout}>Sair</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Nossa jornada rumo à Espanha 🇪🇸</h1>
          <p className={styles.heroText}>Em breve você terá aqui o passo a passo completo da nossa imigração, prazos e tarefas organizadas para Leo e Duda.</p>
        </div>

        <div className={styles.comingSoon}>
          <div className={styles.comingSoonIcon}>🏗️</div>
          <h2>Em construção</h2>
          <p>O painel com tarefas e prazos está a caminho!</p>
        </div>
      </main>
    </div>
  )
}
