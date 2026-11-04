import { useState } from 'react'
import { useNav, MENU_ITEMS } from '../context/NavContext'
import HamburgerMenu from './HamburgerMenu'
import Home from '../pages/Home'
import ComingSoon from '../pages/ComingSoon'
import styles from './Layout.module.css'

const PAGE_MAP = {
  home: () => <Home />,
  vistos:     () => <ComingSoon icon="🛂"  title="Como Vamos"      desc="Vistos e formas de entrada na Espanha" />,
  documentos: () => <ComingSoon icon="📋"  title="Documentação"    desc="Documentos necessários para a imigração" />,
  cidade:     () => <ComingSoon icon="🏙️"  title="Nossa Cidade"    desc="Escolha da cidade onde vamos viver" />,
  financas:   () => <ComingSoon icon="💶"  title="Finanças"        desc="Planejamento financeiro da mudança" />,
  moradia:    () => <ComingSoon icon="🏘️"  title="Moradia"         desc="Busca de moradia na Espanha" />,
  passagens:  () => <ComingSoon icon="✈️"  title="Passagens"       desc="Compra das passagens de ida" />,
  data:       () => <ComingSoon icon="📅"  title="Data de Partida" desc="Definir quando iremos embora" />,
}

const PAGE_TITLE = {
  home: 'Inmigración',
  ...Object.fromEntries(MENU_ITEMS.map((m) => [m.id, m.label])),
}

export default function Layout() {
  const { page, navigate } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)

  const PageComponent = PAGE_MAP[page] ?? PAGE_MAP.home

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button
          className={styles.titleBtn}
          onClick={() => navigate('home')}
        >
          {page === 'home' ? (
            <span className={styles.appName}>Inmigración</span>
          ) : (
            <>
              <span className={styles.backArrow}>‹</span>
              <span className={styles.pageTitle}>{PAGE_TITLE[page]}</span>
            </>
          )}
        </button>

        <button
          className={styles.hamburgerBtn}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className={styles.main}>
        <PageComponent />
      </main>

      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
