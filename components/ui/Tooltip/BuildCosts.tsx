import { formatNumber } from "@/lib/utilities";
import Image from "next/image";
import styles from './Tooltip.module.css'
import { MissingProps } from "./BuildingTooltip";
import { BuildingTooltipData } from "@/types/game";

interface BuildCostProps {
  data: BuildingTooltipData;
  missing: MissingProps
}

export default function BuildingCosts({data, missing}: BuildCostProps) {
  return (
    <>
      <p className='space-top-m text-primary'>Build costs</p>
      <div className={`${styles.costRow} space-left-m`}>
        {data.cost.turn > 0 && <div className={styles.cost}>
          <Image src="/icons/resources/turn.png" alt='Turns' width={24} height={24}/>
          <span className='text-primary text-bold'>{formatNumber((data.cost.turn), 'full')}</span>
        </div>} 
        {data.cost.gold > 0 && <div className={styles.cost}>
          <Image src="/icons/resources/gold.png" alt='Gold' width={24} height={24}/>
          <span className={`${missing.missingCosts.includes('gold') ? 'text-red' : 'text-gold'} text-bold`}>{formatNumber((data.cost.gold), 'full')}</span>
        </div>} 
        {data.cost.wood > 0 && <div className={styles.cost}>
          <Image src="/icons/resources/wood.png" alt='Wood' width={24} height={24}/>
          <span className={`${missing.missingCosts.includes('wood') ? 'text-red' : 'text-brown'} text-bold`}>{formatNumber((data.cost.wood), 'full')}</span>
        </div>} 
        {data.cost.stone > 0 && <div className={styles.cost}>
          <Image src="/icons/resources/stone.png" alt='Stone' width={24} height={24}/>
          <span className={`${missing.missingCosts.includes('stone') ? 'text-red' : 'text-gray'} text-bold`}>{formatNumber((data.cost.stone), 'full')}</span>
        </div>} 
      </div> 
    </>
  )
}