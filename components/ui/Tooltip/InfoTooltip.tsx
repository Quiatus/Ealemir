import styles from './Tooltip.module.css'
import { InfoTooltipData } from '@/types/game'

interface InfoTooltipType {
  data: InfoTooltipData
}

export default function InfoTooltip({ data }: InfoTooltipType) {
  return (
    <div className={styles.tooltip}>
      <p className={styles.title}>{data.title}</p>
    </div>
  )
}