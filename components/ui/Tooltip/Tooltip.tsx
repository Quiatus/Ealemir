import { ReactNode } from 'react';
import styles from './Tooltip.module.css'
import { TooltipData } from '@/types/game'
import InfoTooltip from './InfoTooltip';
import ResourceTooltip from './ResourceTooltip';

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

      {data.type === 'info' && <InfoTooltip data={data}/>}
      {data.type === 'resource' && <ResourceTooltip data={data}/>}
    </div>
  )
}