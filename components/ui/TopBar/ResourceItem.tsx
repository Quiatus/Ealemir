import Image from 'next/image'
import styles from './ResourceItem.module.css'
import ResourceTooltip from './ResourceTooltip'
import { formatResourceNumber, getServerLocale } from '@/lib/utilities';

interface ResourceType {
  icon: string;
  value: number;
  label: string;
  color: 'primary' | 'gold' | 'purple'
}

export async function ResourceItem({ icon, value, label, color }: ResourceType) {
  const locale = await getServerLocale();
  return (
    <div className={styles.resourceWrapper}> 
      <div className={styles.resourceItem} >
        <Image className={styles.icon} src={icon} alt={label} width={32} height={32}/>
        <span className={`${styles.resourceText} text-${color}`}>{formatResourceNumber(value, locale)}</span>
      </div>

      <div className={styles.tooltip}>
        <ResourceTooltip />
      </div>
    </div>
  )
}