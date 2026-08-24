import Image from 'next/image'
import styles from './Morale.module.css'

type MoraleProps = {
  morale: number
}

export default function Morale({morale}: MoraleProps) {
  let color = 'gold'

  if (morale < 20) color = 'red'
  if (morale >= 20 && morale < 40 ) color = 'orange'
  if (morale >= 60 && morale < 80 ) color = 'green'
  if (morale >= 80) color = 'darkgreen'

  return (
    <div className={`${styles.base} ${styles.morale}`}>
      <Image src="/icons/resources/sun.png" alt="army" width={28} height={28}/>
      <span className={`text-${color}`}>{morale}</span>
    </div>

  )
}