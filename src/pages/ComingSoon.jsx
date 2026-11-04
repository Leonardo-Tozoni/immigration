import styles from './ComingSoon.module.css'

export default function ComingSoon({ icon, title, desc }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{icon}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.badge}>Em construção</div>
    </div>
  )
}
