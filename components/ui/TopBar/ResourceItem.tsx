'use client'

import Image from 'next/image'
import styles from './ResourceItem.module.css'
import ResourceTooltip from './ResourceTooltip'

interface ResourceType {
  icon: string;
  value: number;
  label: string;
  color: 'primary' | 'gold'
}

export function ResourceItem({ icon, value, label, color }: ResourceType) {

  return (
    <div className={styles.resourceWrapper}> 
      <div className={styles.resourceItem} >
        <Image className={styles.icon} src={icon} alt={label} width={32} height={32}/>
        <span className={`${styles.resourceText} text-${color}`}>{value}</span>
      </div>

      <div className={styles.tooltip}>
        <ResourceTooltip />
      </div>
    </div>
  )
}