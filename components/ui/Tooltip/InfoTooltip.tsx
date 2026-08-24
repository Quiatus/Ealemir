'use client'

import { ReactNode } from 'react'
import styles from './Tooltip.module.css'
import { InfoTooltipData } from '@/types/game'
import ResourceRow from './ResourceRow';
import { useTooltipPosition } from '@/lib/hooks/useTooltipPosition';
import { richText } from '@/app/richText';

interface TooltipProps {
  data: InfoTooltipData;
  children: ReactNode;
  align?: 'right' | undefined;
  title?: 'underlined' | 'normal'
}

export default function InfoTooltip({ data, children, align=undefined, title='underlined' }: TooltipProps) {
  const { tooltipRef, wrapperRef, flipTop, calculatePosition } = useTooltipPosition();
  const alignmentClass = align === 'right' ? styles.tooltipAlignRight : '';
  const titleClass = title === 'underlined' ? styles.titleResource : styles.title;

  return (
    <div ref={wrapperRef} className={styles.tooltipWrapper} onMouseEnter={calculatePosition}> 
      {children}

      <div ref={tooltipRef} className={`${styles.tooltip} ${flipTop ? styles.tooltipTop : styles.tooltipBottom} ${alignmentClass}`}>
        <p className={titleClass}>{data.title}</p>

        <ResourceRow items={data.custom || []} />
        
        {data.message && <p className='text-flavor'>{data.message}</p>}

        {data.list && <div className='space-top-m'>
            {data.list.map(item => <p key={item}>{richText(item)}</p>)}
          </div>}
      </div>
    </div>
  )
}