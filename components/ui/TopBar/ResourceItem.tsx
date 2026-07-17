import Image from 'next/image'
import styles from './ResourceItem.module.css'
import { formatNumber } from '@/lib/utilities';

interface ResourceType {
  icon: string;
  value: number;
  label: string;
  color: 'primary' | 'gold' | 'purple'
}

export function ResourceItem({ icon, value, label, color }: ResourceType) {
  return (
    <div className={styles.resourceItem} >
      <Image className={styles.icon} src={icon} alt={label} width={32} height={32}/>
      <span className={`${styles.resourceText} text-${color}`}>{formatNumber(value, false)}</span>
    </div>
  )
}