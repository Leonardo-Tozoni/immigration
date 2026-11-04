import { createContext, useContext, useState } from 'react'

export const MENU_ITEMS = [
  { id: 'vistos',      label: 'Como Vamos',     icon: '🛂',  desc: 'Vistos e formas de entrada na Espanha' },
  { id: 'documentos',  label: 'Documentação',    icon: '📋',  desc: 'Documentos necessários para a imigração' },
  { id: 'cidade',      label: 'Nossa Cidade',    icon: '🏙️',  desc: 'Escolha da cidade onde vamos viver' },
  { id: 'financas',    label: 'Finanças',        icon: '💶',  desc: 'Planejamento financeiro da mudança' },
  { id: 'moradia',     label: 'Moradia',         icon: '🏘️',  desc: 'Busca de moradia na Espanha' },
  { id: 'passagens',   label: 'Passagens',       icon: '✈️',  desc: 'Compra das passagens de ida' },
  { id: 'data',        label: 'Data de Partida', icon: '📅',  desc: 'Definir quando iremos embora' },
]

const NavContext = createContext(null)

export function NavProvider({ children }) {
  const [page, setPage] = useState('home')
  return (
    <NavContext.Provider value={{ page, navigate: setPage }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
