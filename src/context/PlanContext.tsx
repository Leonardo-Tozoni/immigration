import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { VISAS, VISA_CATEGORIES } from '../data/visas'
import type { Visa, VisaCategory } from '../data/visas'

const VISA_KEY = 'inmigracion_visa'
const FORM_KEY = 'inmigracion_forma'
const CITY_KEY = 'inmigracion_cidade'

function read(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function store(key: string, value: string | null) {
  try {
    if (value) localStorage.setItem(key, value)
    else localStorage.removeItem(key)
  } catch {
    // Sem armazenamento, a escolha vale até fechar a página.
  }
}

function findVisa(visaId: string | null) {
  return VISAS.find((visa) => visa.id === visaId) ?? null
}

function readStoredForm(): VisaCategory | null {
  const storedForm = VISA_CATEGORIES.find((form) => form.id === read(FORM_KEY))
  return storedForm?.id ?? findVisa(read(VISA_KEY))?.category ?? null
}

interface PlanContextValue {
  chosenForm: VisaCategory | null
  chosenVisa: Visa | null
  chooseForm: (form: VisaCategory) => void
  chooseVisa: (visaId: string | null) => void
  chosenCityId: string | null
  chooseCity: (cityId: string | null) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

export function PlanProvider({ children }: { children: ReactNode }) {
  const [chosenForm, setChosenForm] = useState(readStoredForm)
  const [chosenVisaId, setChosenVisaId] = useState(() => read(VISA_KEY))
  const chosenVisa = findVisa(chosenVisaId)
  const [chosenCityId, setChosenCityId] = useState(() => read(CITY_KEY))

  function chooseCity(cityId: string | null) {
    setChosenCityId(cityId)
    store(CITY_KEY, cityId)
  }

  function saveVisa(visaId: string | null) {
    setChosenVisaId(visaId)
    store(VISA_KEY, visaId)
  }

  function saveForm(form: VisaCategory) {
    setChosenForm(form)
    store(FORM_KEY, form)
  }

  function chooseForm(form: VisaCategory) {
    saveForm(form)
    const visasInForm = VISAS.filter((visa) => visa.category === form)
    if (visasInForm.length === 1) saveVisa(visasInForm[0].id)
    else if (chosenVisa?.category !== form) saveVisa(null)
  }

  function chooseVisa(visaId: string | null) {
    saveVisa(visaId)
    const visa = findVisa(visaId)
    if (visa) saveForm(visa.category)
  }

  return (
    <PlanContext.Provider value={{ chosenForm, chosenVisa, chooseForm, chooseVisa, chosenCityId, chooseCity }}>
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (!context) throw new Error('usePlan must be used within PlanProvider')
  return context
}
