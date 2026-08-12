'use client'

import styles from './Tooltip.module.css'
import { BuildingTooltipData } from '@/types/game'
import { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { text } from '@/lib/utilities';
import BuildingCosts from './BuildCosts';
import { richText } from '@/app/richText';
import ResourceRow from './ResourceRow';

export interface MissingProps {
  missingCosts: string[],
  missingSpace: boolean
}

interface TooltipProps {
  data: BuildingTooltipData;
  missing: MissingProps;
  children: ReactNode
}

export default function BuildingTooltip({ data, missing, children }: TooltipProps) {
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
        <p className={styles.titleResource}>{data.title}</p>
        
        {data.levelName && <p className={styles.level}>{richText(data.levelName)}</p>}
        
        {data.messages?.afterTitle && <p className='text-flavor space-m'>{data.messages?.afterTitle}</p>} 

        {missing.missingSpace && <p className='text-red'>{text('tooltips.info.missing_space')}</p>}

        <ResourceRow title={text('tooltips.city_center_tooltip.bonuses')} items={data.custom || []} />
        
        {data.status && <p className={styles.status}>{richText(data.status)}</p>}

        {(data.status === 'Constructed' || data.status?.startsWith('In construction')) ? null : <BuildingCosts data={data} missing={missing}/>}
              
      </div>
    </div>
  )
}