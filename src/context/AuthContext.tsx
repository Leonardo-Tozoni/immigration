import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

const USERS: Record<string, string> = {
  leo: 'imigrar2027@',
  duda: 'imigrar2027@',
}

interface AuthContextValue {
  user: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    return sessionStorage.getItem('inmigracion_user') || null
  })

  function login(username: string, password: string) {
    const normalized = username.toLowerCase().trim()
    if (USERS[normalized] && USERS[normalized] === password) {
      setUser(normalized)
      sessionStorage.setItem('inmigracion_user', normalized)
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('inmigracion_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
