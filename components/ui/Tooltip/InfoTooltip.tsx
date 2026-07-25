import { ReactNode } from 'react'
import styles from './Tooltip.module.css'
import { InfoTooltipData } from '@/types/game'

interface TooltipProps {
  data: InfoTooltipData
  children: ReactNode
}

export default function InfoTooltip({ data, children }: TooltipProps) {
  return (
    <div className={styles.tooltipWrapper}> 
      {children}

      <div className={styles.tooltip}>
        <p className={styles.title}>{data.title}</p>
      </div>
    </div>
  )
}