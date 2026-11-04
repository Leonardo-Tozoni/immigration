import { createContext, useContext, useState } from 'react'

const USERS = {
  leo: 'imigrar2027@',
  duda: 'imigrar2027@',
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return sessionStorage.getItem('inmigracion_user') || null
  })

  function login(username, password) {
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
  return useContext(AuthContext)
}
