import Image from 'next/image'
import styles from './Happiness.module.css'
import { calculateHappiness } from '@/lib/engine/empire/happiness'
import { PlayerEmpire } from '@/types/game'

type HappinessProps = {
  data: PlayerEmpire
}

export default function Happiness({ data }: HappinessProps) {
  const happiness = calculateHappiness(data)
  let color = 'gold'

  if (happiness < 20) color = 'red'
  if (happiness >= 20 && happiness < 40 ) color = 'orange'
  if (happiness >= 60 && happiness < 80 ) color = 'green'
  if (happiness >= 80) color = 'darkgreen'

  return (
    <div className={`${styles.base} ${styles.happiness}`}>
      <Image src="/icons/resources/sun.png" alt="army" width={28} height={28}/>
      <span className={`text-${color}`}>{happiness}</span>
    </div>

  )
}