import Image from 'next/image'
import styles from './Happiness.module.css'

type ArmyStatus = {
  status: 'Ready' | 'Exhausted' | 'Cursed'
}

export default function ArmyStatus({ status }: ArmyStatus) {

  let color = 'green'

  if (status === 'Exhausted') color = 'orange'
  if (status === 'Cursed') color = 'red'

  return (
    <div className={`${styles.base} ${styles.status}`}>
      <Image src="/icons/resources/army.png" alt="army" width={32} height={32}/>
      <span className={`text-${color}`}>{status}</span>
    </div>
  )
}