import { useState, useEffect } from 'react'
import styles from './Countdown.module.css'

function calcTimeLeft(isoDate) {
  if (!isoDate) return null
  const diff = new Date(isoDate) - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Countdown() {
  const [config] = useState(() => ({
    date: localStorage.getItem('inmigracion_date') || null,
    from: localStorage.getItem('inmigracion_from') || null,
    to:   localStorage.getItem('inmigracion_to')   || null,
  }))

  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(config.date))

  useEffect(() => {
    if (!config.date) return
    const id = setInterval(() => setTimeLeft(calcTimeLeft(config.date)), 1000)
    return () => clearInterval(id)
  }, [config.date])

  const hasDate = !!config.date
  const t = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return (
    <div className={styles.wrapper}>
      <div className={styles.route}>
        <span className={styles.city}>{config.from ?? 'Brasil'}</span>
        <span className={styles.arrow}>✈️</span>
        <span className={styles.city}>{config.to ?? 'Espanha'}</span>
      </div>

      <div className={styles.timer}>
        <div className={styles.unit}>
          <span className={styles.number}>{String(t.days).padStart(3, '0')}</span>
          <span className={styles.label}>dias</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{pad(t.hours)}</span>
          <span className={styles.label}>horas</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{pad(t.minutes)}</span>
          <span className={styles.label}>min</span>
        </div>
        <span className={styles.sep}>:</span>
        <div className={styles.unit}>
          <span className={styles.number}>{pad(t.seconds)}</span>
          <span className={styles.label}>seg</span>
        </div>
      </div>

      {hasDate ? (
        <p className={styles.dateLabel}>
          📅 {new Date(config.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      ) : (
        <p className={styles.noDate}>📅 Data de partida a definir</p>
      )}
    </div>
  )
}
