import Image from 'next/image'
import styles from './Happiness.module.css'

export default function Happiness() {
  return (
    <div className={styles.base}>
      <Image src="/icons/resources/sun.png" alt="army" width={28} height={28}/>
      <span className='text-gold'>50</span>
    </div>

  )
}