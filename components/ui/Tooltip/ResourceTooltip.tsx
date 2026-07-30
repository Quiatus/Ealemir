'use client'

import styles from './Tooltip.module.css'
import { ResourceTooltipData } from '@/types/game'
import { formatNumber, text } from '@/lib/utilities';
import ResourceRow from './ResourceRow';
import { ReactNode } from 'react';
import FlavorText from './FlavorText';
import { useRef, useState } from 'react';

interface TooltipProps {
  data: ResourceTooltipData;
  children: ReactNode
}

export default function ResourceTooltip({ data, children }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flipTop, setFlipTop] = useState(false);

  function handleMouseEnter () {
    if (tooltipRef.current && wrapperRef.current) {
      const tooltipHeight = tooltipRef.current.getBoundingClientRect().height;
      const wrapperBottom = wrapperRef.current.getBoundingClientRect().bottom;
      const theoreticalBottom = wrapperBottom + tooltipHeight;
      
      if (theoreticalBottom > window.innerHeight - 16) {
        setFlipTop(true);
      } else {
        setFlipTop(false);
      }
    }
  };

  return (
    <div ref={wrapperRef} className={styles.tooltipWrapper} onMouseEnter={handleMouseEnter}> 
      {children}

      <div ref={tooltipRef} className={`${styles.tooltip} ${styles.tooltipResource} ${flipTop ? styles.tooltipTop : styles.tooltipBottom}`}>
        <p className={`${styles.title} ${styles.titleResource}`}>{data.title}</p>

        <div className={`${styles.row} space-m`}>
          <span>{text('tooltips.info.total')}</span>
          <span className='text-bold'>{formatNumber(data.total, 'full')}</span>
        </div>

        <FlavorText text={data.messages?.afterTotal} />

        <ResourceRow items={data.custom || []} />

        <FlavorText text={data.messages?.afterCustom} />

        <ResourceRow 
          title={text('tooltips.info.income')} 
          items={data.income} 
          valueClass="text-green" 
          prefix="+" 
        />

        <ResourceRow 
          title={text('tooltips.info.expenditure')} 
          items={data.expenditures} 
          valueClass="text-red" 
          prefix="-" 
        />

        <FlavorText text={data.messages?.beforeChange} />

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