import { useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  CalendarClock,
  Check,
  ExternalLink,
  FileText,
  GraduationCap,
  Info,
  ListOrdered,
  ThumbsDown,
  ThumbsUp,
  UserCheck,
  UsersRound,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { VISAS_CHECKED_AT } from '../data/visas'
import type { Visa } from '../data/visas'
import type { StudyOption, StudyPath, VisaFit } from '../data/techStudies'
import styles from './VisaDetail.module.css'

const FIT_LABEL: Record<VisaFit, string> = {
  ok: 'Serve para o visto',
  confirm: 'Confirmar antes',
  no: 'Não serve para o visto',
}

const FIT_STYLE: Record<VisaFit, string> = {
  ok: styles.fitOk,
  confirm: styles.fitConfirm,
  no: styles.fitNo,
}

function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}><Icon size="1em" /></span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

function IconList({ items, icon: Icon, tone }: { items: string[]; icon: LucideIcon; tone: 'pro' | 'con' }) {
  return (
    <ul className={styles.iconList}>
      {items.map((item) => (
        <li key={item} className={styles.iconItem}>
          <span className={tone === 'pro' ? styles.proIcon : styles.conIcon}><Icon size="1em" /></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function StudyOptionCard({ option }: { option: StudyOption }) {
  return (
    <li className={styles.option}>
      <div className={styles.optionHeader}>
        <h4 className={styles.optionName}>{option.name}</h4>
        <span className={`${styles.fit} ${FIT_STYLE[option.fit]}`}>{FIT_LABEL[option.fit]}</span>
      </div>
      <p className={styles.optionProgram}>{option.program}</p>
      <dl className={styles.optionFacts}>
        <div><dt>Local</dt><dd>{option.location}</dd></div>
        <div><dt>Formato</dt><dd>{option.modality}</dd></div>
        <div><dt>Preço</dt><dd>{option.price}</dd></div>
      </dl>
      <p className={styles.optionNote}>{option.fitNote}</p>
      <a className={styles.optionLink} href={option.url} target="_blank" rel="noreferrer">
        Ver site <ExternalLink size="1em" />
      </a>
    </li>
  )
}

function StudyPathSection({ path }: { path: StudyPath }) {
  return (
    <Section icon={GraduationCap} title="Imigrar estudando tecnologia">
      <BulletList items={path.intro} />

      <h3 className={styles.subTitle}>Por onde começar</h3>
      <ol className={styles.steps}>
        {path.steps.map((step, index) => (
          <li key={step} className={styles.step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <h3 className={styles.subTitle}>{path.spotlight.title}</h3>
      <BulletList items={path.spotlight.items} />

      {path.groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <h3 className={styles.subTitle}>{group.title}</h3>
          <p className={styles.groupDescription}>{group.description}</p>
          <ul className={styles.options}>
            {group.options.map((option) => <StudyOptionCard key={option.name} option={option} />)}
          </ul>
        </div>
      ))}

      <p className={styles.checkedAt}>{path.priceNote}</p>
    </Section>
  )
}

export default function VisaDetail({ visa }: { visa: Visa }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [visa.id])

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.name}>{visa.name}</h1>
        <p className={styles.summary}>{visa.summary}</p>
      </header>

      {visa.notice && (
        <div className={styles.notice}>
          <span className={styles.noticeIcon}><Info size="1em" /></span>
          <p>{visa.notice}</p>
        </div>
      )}

      <Section icon={UserCheck} title="Quem pode solicitar">
        <BulletList items={visa.eligibility} />
      </Section>

      {visa.studyPath && <StudyPathSection path={visa.studyPath} />}

      <Section icon={ThumbsUp} title="Prós">
        <IconList items={visa.pros} icon={Check} tone="pro" />
      </Section>

      <Section icon={ThumbsDown} title="Contras">
        <IconList items={visa.cons} icon={X} tone="con" />
      </Section>

      <Section icon={FileText} title="Requisitos e documentos">
        <BulletList items={visa.requirements} />
      </Section>

      <Section icon={ListOrdered} title="Como solicitar">
        <ol className={styles.steps}>
          {visa.steps.map((step, index) => (
            <li key={step} className={styles.step}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section icon={CalendarClock} title="Validade e renovação">
        <BulletList items={visa.validity} />
      </Section>

      <Section icon={UsersRound} title="Família">
        <BulletList items={visa.family} />
      </Section>

      <Section icon={ExternalLink} title="Fontes oficiais">
        <ul className={styles.sources}>
          {visa.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
            </li>
          ))}
        </ul>
        <p className={styles.checkedAt}>
          Consultado em {VISAS_CHECKED_AT}. Regras e valores mudam: confirme com o consulado antes de pedir.
        </p>
      </Section>
    </article>
  )
}
