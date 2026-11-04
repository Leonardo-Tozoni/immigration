import { useState } from 'react'
import bgUrl from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    const ok = login(username, password)
    if (!ok) setError('Usuário ou senha incorretos.')
    setLoading(false)
  }

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Inmigración</h1>
          <p className={styles.subtitle}>Nossa jornada rumo à Espanha 🇪🇸</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>Usuário</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="leo ou duda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoCapitalize="none"
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={loading || !username || !password}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
