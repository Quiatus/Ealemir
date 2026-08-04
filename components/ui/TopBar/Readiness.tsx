import Image from 'next/image'
import styles from './Happiness.module.css'

export default function Readiness() {
  return (
    <div className={styles.base}>
      <Image src="/icons/resources/army.png" alt="army" width={32} height={32}/>
      <span className='text-green'>Ready</span>
    </div>
  )
}