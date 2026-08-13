'use client'

import styles from './Tooltip.module.css'
import { ResourceTooltipData } from '@/types/game'
import { formatNumber, text } from '@/lib/utilities';
import ResourceRow from './ResourceRow';
import { ReactNode } from 'react';
import { useTooltipPosition } from '@/lib/hooks/useTooltipPosition';

interface TooltipProps {
  data: ResourceTooltipData;
  children: ReactNode
}

export default function ResourceTooltip({ data, children }: TooltipProps) {
  const { tooltipRef, wrapperRef, flipTop, calculatePosition } = useTooltipPosition();

  return (
    <div ref={wrapperRef} className={styles.tooltipWrapper} onMouseEnter={calculatePosition}> 
      {children}

      <div ref={tooltipRef} className={`${styles.tooltip} ${styles.tooltipResource} ${flipTop ? styles.tooltipTop : styles.tooltipBottom}`}>
        <p className={styles.titleResource}>{data.title}</p>

        <div className={`${styles.row} space-m`}>
          <span>{text('tooltips.info.total')}</span>
          <span className='text-bold'>{formatNumber(data.total, 'full')}</span>
        </div>

        {data.messages?.afterTotal && <p className='text-flavor space-m'>{data.messages?.afterTotal}</p>} 

        <ResourceRow items={data.custom || []} />

        {data.messages?.afterCustom && <p className='text-flavor space-m'>{data.messages?.afterCustom}</p>} 

        <ResourceRow title={text('tooltips.info.income')} items={data.income} valueClass="text-green" prefix="+" />

        <ResourceRow title={text('tooltips.info.expenditure')} items={data.expenditures} valueClass="text-red" prefix="-" />

        <div className={`${styles.row} space-top-m`}>
          <span>{text('tooltips.info.change')}</span>
          <span className={`text-bold ${data.change >= 0 ? 'text-green' : 'text-red'}`}>
            {data.change >= 0 ? '+' : '-'}
            {formatNumber(Math.abs(data.change), 'full')}
          </span>
        </div>
      </div>
    </div>
  )
}