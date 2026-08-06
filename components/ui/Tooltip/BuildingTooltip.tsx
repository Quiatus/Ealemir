'use client'

import styles from './Tooltip.module.css'
import { BuildingTooltipData } from '@/types/game'
import { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { formatNumber, text } from '@/lib/utilities';

interface TooltipProps {
  data: BuildingTooltipData;
  missing: {
    missingCosts: string[],
    missingSpace: boolean
  }
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
        
        {data.messages?.afterTitle && <p className='text-flavor'>{data.messages?.afterTitle}</p>} 

        {missing.missingSpace && <p className='text-red'>{text('tooltips.info.missing_space')}</p>}

        <p className='space-top-m text-primary'>Build costs</p>
        <div className={`${styles.costRow} space-left-m`}>
          {data.cost.turn && <div className={styles.cost}>
            <Image src="/icons/resources/turn.png" alt='Turns' width={24} height={24}/>
            <span className='text-primary text-bold'>{formatNumber((data.cost.turn), 'full')}</span>
          </div>} 
          {data.cost.gold && <div className={styles.cost}>
            <Image src="/icons/resources/gold.png" alt='Gold' width={24} height={24}/>
            <span className={`${missing.missingCosts.includes('gold') ? 'text-red' : 'text-gold'} text-bold`}>{formatNumber((data.cost.gold), 'full')}</span>
          </div>} 
          {data.cost.wood && <div className={styles.cost}>
            <Image src="/icons/resources/wood.png" alt='Wood' width={24} height={24}/>
            <span className={`${missing.missingCosts.includes('wood') ? 'text-red' : 'text-brown'} text-bold`}>{formatNumber((data.cost.wood), 'full')}</span>
          </div>} 
          {data.cost.stone && <div className={styles.cost}>
            <Image src="/icons/resources/stone.png" alt='Stone' width={24} height={24}/>
            <span className={`${missing.missingCosts.includes('stone') ? 'text-red' : 'text-gray'} text-bold`}>{formatNumber((data.cost.stone), 'full')}</span>
          </div>} 
        </div>        
      </div>
    </div>
  )
}