'use client'

import { ReactNode } from 'react'
import styles from './Tooltip.module.css'
import { InfoTooltipData } from '@/types/game'
import { useRef, useState } from 'react';

interface TooltipProps {
  data: InfoTooltipData
  children: ReactNode
}

export default function InfoTooltip({ data, children }: TooltipProps) {
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

      <div ref={tooltipRef} className={`${styles.tooltip} ${flipTop ? styles.tooltipTop : styles.tooltipBottom}`}>
        <p className={styles.title}>{data.title}</p>
        {data.message && <p className='text-flavor'>{data.message}</p>}
      </div>
    </div>
  )
}