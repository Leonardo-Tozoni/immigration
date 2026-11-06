import { useEffect } from 'react'
import { House, LogOut, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNav, MENU_ITEMS } from '../context/NavContext'
import type { PageId } from '../context/NavContext'
import styles from './HamburgerMenu.module.css'

const DISPLAY_NAME: Record<string, string> = { leo: 'Leo', duda: 'Duda' }

interface HamburgerMenuProps {
  open: boolean
  onClose: () => void
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const { user, logout } = useAuth()
  const { page, navigate } = useNav()
  const displayName = user ? DISPLAY_NAME[user] : undefined

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function goTo(id: PageId) {
    navigate(id)
    onClose()
  }

  function handleLogout() {
    onClose()
    logout()
  }

  return (
    <nav className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
      <div className={styles.drawerHeader}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{displayName?.[0] ?? '?'}</div>
          <div>
            <p className={styles.userName}>Olá, {displayName}!</p>
            <p className={styles.userSub}>Espanha nos espera</p>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu"><X size="1.25em" /></button>
      </div>

      <div className={styles.divider} />

      <ul className={styles.menuList}>
        <li>
          <button
            className={`${styles.menuItem} ${page === 'home' ? styles.menuItemActive : ''}`}
            onClick={() => goTo('home')}
          >
            <span className={styles.menuIcon}><House size="1em" /></span>
            <span className={styles.menuLabel}>Início</span>
          </button>
        </li>

        <p className={styles.sectionTitle}>Planejamento</p>

        {MENU_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.menuItem} ${page === item.id ? styles.menuItemActive : ''}`}
              onClick={() => goTo(item.id)}
            >
              <span className={styles.menuIcon}><item.icon size="1em" /></span>
              <div className={styles.menuText}>
                <span className={styles.menuLabel}>{item.label}</span>
                <span className={styles.menuDesc}>{item.desc}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.drawerFooter}>
        <div className={styles.divider} />
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size="1.2em" /> Sair
        </button>
      </div>
    </nav>
  )
}
