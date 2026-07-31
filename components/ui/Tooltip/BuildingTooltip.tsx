'use client'

import styles from './Tooltip.module.css'
import { BuildingTooltipData } from '@/types/game'
import { ReactNode } from 'react';
import { useRef, useState } from 'react';

interface TooltipProps {
  data: BuildingTooltipData;
  children: ReactNode
}

export default function BuildingTooltip({ data, children }: TooltipProps) {
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
      </div>
    </div>
  )
}