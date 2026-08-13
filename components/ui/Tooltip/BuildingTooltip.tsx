'use client'

import styles from './Tooltip.module.css'
import { BuildingTooltipData } from '@/types/game'
import { ReactNode } from 'react';
import { text } from '@/lib/utilities';
import BuildingCosts from './BuildCosts';
import { richText } from '@/app/richText';
import ResourceRow from './ResourceRow';
import { useTooltipPosition } from '@/lib/hooks/useTooltipPosition';

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
  const { tooltipRef, wrapperRef, flipTop, calculatePosition } = useTooltipPosition();

  return (
    <div ref={wrapperRef} className={styles.tooltipWrapper} onMouseEnter={calculatePosition}> 
      {children}

      <div ref={tooltipRef} className={`${styles.tooltip} ${styles.tooltipResource} ${flipTop ? styles.tooltipTop : styles.tooltipBottom}`}>
        <p className={styles.titleResource}>{data.title}</p>
        
        {data.levelName && <p className={styles.level}>{richText(data.levelName)}</p>}
        
        {data.messages && <p className='text-flavor space-m'>{data.messages}</p>} 

        {missing.missingSpace && <p className='text-red'>{text('tooltips.info.missing_space')}</p>}

        <ResourceRow title={text('tooltips.city_center_tooltip.bonuses')} items={data.custom || []} />
        
        {data.status && <p className={styles.status}>{richText(data.status)}</p>}

        {(data.status?.includes('Constructed') || data.status?.includes('In construction')) ? null : <BuildingCosts data={data} missing={missing}/> }    
      </div>
    </div>
  )
}