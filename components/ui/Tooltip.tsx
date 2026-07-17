import { ReactNode } from 'react';
import styles from './Tooltip.module.css'
import { TooltipData } from '@/types/game'
import { formatNumber, text } from '@/lib/utilities';

interface TooltipProps {
  data?: TooltipData;
  children: ReactNode
}

export default function Tooltip({ data, children }: TooltipProps) {
  if (!data) {
    return <>{children}</>;
  }

  return (
    <div className={styles.tooltipWrapper}> 
      {children}

      {data.type === 'info' && (
        <div className={styles.tooltip}>
          <p className={styles.title}>{data.title}</p>
        </div>
      )}

      {data.type === 'resource' && (
        <div className={`${styles.tooltip} ${styles.tooltipResource}`}>
          <p className={`${styles.title} ${styles.titleResource}`}>{data.title}</p>

          <div className={`${styles.row} space-m`}>
              <span>{text('tooltips.info.total')}</span>
              <span className='text-bold'>{formatNumber(data.total, true)}</span>
          </div>

          {data.income.length > 0 && (
            <div>
              <span className='text-bold'>{text('tooltips.info.income')}</span>
              <div className='space-left-m'>
                {data.income.map(item => (
                  <div className={styles.row} key={item.label}>
                    <span>{item.label}</span>
                    <span className='text-green text-bold'>+{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.expenditures.length > 0 && (
            <div>
              <span className='text-bold'>{text('tooltips.info.expenditure')}</span>
              <div className='space-left-m'>
                {data.expenditures.map(item => (
                  <div className={styles.row} key={item.label}>
                    <span>{item.label}</span>
                    <span className='text-red text-bold'>-{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className={`${styles.row} space-top-m`}>
            <span>{text('tooltips.info.change')}</span>
            <span className={`text-bold ${data.change >= 0 ? 'text-green' : 'text-red'}`}>
              {data.change >= 0 ? '+' : '-'}
              {formatNumber(Math.abs(data.change), true)}
            </span>
          </div>
        </div>
      )}
      
    </div>
  )
}