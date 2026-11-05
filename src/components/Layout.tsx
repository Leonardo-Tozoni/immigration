import { useState } from 'react'
import type { ReactElement } from 'react'
import { Building2, CalendarDays, ChevronLeft, ClipboardList, Euro, KeyRound, Plane } from 'lucide-react'
import { useNav, MENU_ITEMS } from '../context/NavContext'
import type { PageId } from '../context/NavContext'
import HamburgerMenu from './HamburgerMenu'
import Home from '../pages/Home'
import ComingSoon from '../pages/ComingSoon'
import Vistos from '../pages/Vistos'
import styles from './Layout.module.css'

const PAGE_MAP: Record<PageId, () => ReactElement> = {
  home: () => <Home />,
  vistos:     () => <Vistos />,
  documentos: () => <ComingSoon icon={ClipboardList} title="Documentação"    desc="Documentos necessários para a imigração" />,
  cidade:     () => <ComingSoon icon={Building2}     title="Nossa Cidade"    desc="Escolha da cidade onde vamos viver" />,
  financas:   () => <ComingSoon icon={Euro}          title="Finanças"        desc="Planejamento financeiro da mudança" />,
  moradia:    () => <ComingSoon icon={KeyRound}      title="Moradia"         desc="Busca de moradia na Espanha" />,
  passagens:  () => <ComingSoon icon={Plane}         title="Passagens"       desc="Compra das passagens de ida" />,
  data:       () => <ComingSoon icon={CalendarDays}  title="Data de Partida" desc="Definir quando iremos embora" />,
}

const PAGE_TITLE: Record<string, string> = {
  home: 'Inmigración',
  ...Object.fromEntries(MENU_ITEMS.map((m) => [m.id, m.label])),
}

export default function Layout() {
  const { page, goBack } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)

  const PageComponent = PAGE_MAP[page]

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <button
          className={styles.titleBtn}
          onClick={goBack}
        >
          {page === 'home' ? (
            <span className={styles.appName}>Inmigración</span>
          ) : (
            <>
              <span className={styles.backArrow}><ChevronLeft size="1em" /></span>
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
