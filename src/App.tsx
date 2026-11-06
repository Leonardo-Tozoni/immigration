import { AuthProvider, useAuth } from './context/AuthContext'
import { NavProvider } from './context/NavContext'
import { PlanProvider } from './context/PlanContext'
import Layout from './components/Layout'
import Login from './pages/Login'

function AppContent() {
  const { user } = useAuth()
  return user ? <Layout /> : <Login />
}

export default function App() {
  return (
    <AuthProvider>
      <NavProvider>
        <PlanProvider>
          <AppContent />
        </PlanProvider>
      </NavProvider>
    </AuthProvider>
  )
}
