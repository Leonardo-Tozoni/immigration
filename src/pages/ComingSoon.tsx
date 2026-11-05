import type { LucideIcon } from 'lucide-react'
import styles from './ComingSoon.module.css'

interface ComingSoonProps {
  icon: LucideIcon
  title: string
  desc: string
}

export default function ComingSoon({ icon: Icon, title, desc }: ComingSoonProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}><Icon size="1em" strokeWidth={1.5} /></div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.badge}>Em construção</div>
    </div>
  )
}
