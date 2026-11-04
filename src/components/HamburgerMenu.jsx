import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNav, MENU_ITEMS } from '../context/NavContext'
import styles from './HamburgerMenu.module.css'

const DISPLAY_NAME = { leo: 'Leo', duda: 'Duda' }

export default function HamburgerMenu({ open, onClose }) {
  const { user, logout } = useAuth()
  const { page, navigate } = useNav()

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function goTo(id) {
    navigate(id)
    onClose()
  }

  function handleLogout() {
    onClose()
    logout()
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />
      <nav className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{DISPLAY_NAME[user]?.[0] ?? '?'}</div>
            <div>
              <p className={styles.userName}>Olá, {DISPLAY_NAME[user]}!</p>
              <p className={styles.userSub}>Espanha nos espera 🇪🇸</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu">✕</button>
        </div>

        <div className={styles.divider} />

        <ul className={styles.menuList}>
          <li>
            <button
              className={`${styles.menuItem} ${page === 'home' ? styles.menuItemActive : ''}`}
              onClick={() => goTo('home')}
            >
              <span className={styles.menuIcon}>🏡</span>
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
                <span className={styles.menuIcon}>{item.icon}</span>
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
            <span>🚪</span> Sair
          </button>
        </div>
      </nav>
    </>
  )
}
