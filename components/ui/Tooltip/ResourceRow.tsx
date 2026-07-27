import { formatNumber } from '@/lib/utilities';
import styles from './Tooltip.module.css'

interface TooltipItem {
  label: string;
  value: number | string;
}

interface TooltipSectionProps {
  title?: string;
  items: TooltipItem[];
  valueClass?: string; 
  prefix?: string; 
}

export default function ResourceRow({ title, items, valueClass = '', prefix = '' }: TooltipSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={title ? '' : 'space-m'}>
      {title && <span>{title}</span>}
      
      <div className={title ? 'space-left-m' : ''}>
        {items.map(item => (
          <div className={styles.row} key={item.label}>
            <span className={title ? 'text-secondary' : ''}>{item.label}</span>
            <span className={`text-bold ${valueClass}`}>{prefix}{typeof(item.value) === 'number' ? formatNumber(item.value, 'full') : item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}