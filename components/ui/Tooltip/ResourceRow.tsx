import styles from './Tooltip.module.css'

interface TooltipItem {
  label: string;
  value: string | number;
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
            <span className={`text-bold ${valueClass}`}>{prefix}{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}