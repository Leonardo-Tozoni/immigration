import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { Building2, CalendarDays, ClipboardList, Euro, KeyRound, Plane, Stamp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type PageId =
  | 'home'
  | 'vistos'
  | 'documentos'
  | 'cidade'
  | 'financas'
  | 'moradia'
  | 'passagens'
  | 'data'

interface MenuItem {
  id: PageId
  label: string
  icon: LucideIcon
  desc: string
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'vistos',      label: 'Como Vamos',     icon: Stamp,         desc: 'Vistos e formas de entrada na Espanha' },
  { id: 'documentos',  label: 'Documentação',    icon: ClipboardList, desc: 'Documentos necessários para a imigração' },
  { id: 'cidade',      label: 'Nossa Cidade',    icon: Building2,     desc: 'Escolha da cidade onde vamos viver' },
  { id: 'financas',    label: 'Finanças',        icon: Euro,          desc: 'Planejamento financeiro da mudança' },
  { id: 'moradia',     label: 'Moradia',         icon: KeyRound,      desc: 'Busca de moradia na Espanha' },
  { id: 'passagens',   label: 'Passagens',       icon: Plane,         desc: 'Compra das passagens de ida' },
  { id: 'data',        label: 'Data de Partida', icon: CalendarDays,  desc: 'Definir quando iremos embora' },
]

interface NavContextValue {
  page: PageId
  visaId: string | null
  navigate: (page: PageId) => void
  openVisa: (visaId: string) => void
  goBack: () => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home')
  const [visaId, setVisaId] = useState<string | null>(null)

  function navigate(nextPage: PageId) {
    setPage(nextPage)
    setVisaId(null)
  }

  function goBack() {
    if (visaId) setVisaId(null)
    else setPage('home')
  }

  return (
    <NavContext.Provider value={{ page, visaId, navigate, openVisa: setVisaId, goBack }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  const context = useContext(NavContext)
  if (!context) throw new Error('useNav must be used within NavProvider')
  return context
}
