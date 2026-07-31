import InfoTooltip from "@/components/ui/Tooltip/InfoTooltip";
import { dynamicInfoTooltip } from "@/lib/adapters/tooltips/infoTooltips";
import styles from './Habitats.module.css'
import Image from "next/image";
import { formatNumber } from "@/lib/utilities";

export default function Habitats() {
  const infoTooltip = dynamicInfoTooltip()

  return (
    <div className={styles.habitatWrapper}>
      <InfoTooltip data={infoTooltip.tooltipVillage}>
        <div className={styles.habitat}>
          <Image src="/icons/buildings/village.png" alt="Village" width={40} height={26}/>
          <span>{formatNumber(Number(0), 'short')}</span>
        </div>
      </InfoTooltip>
      <InfoTooltip data={infoTooltip.tooltipSettlement} align="right">
        <div className={styles.habitat}>
          <Image src="/icons/buildings/settlement.png" alt="Village" width={40} height={40}/>
          <span>{formatNumber(Number(0), 'short')}</span>
        </div>
      </InfoTooltip>  
      <InfoTooltip data={infoTooltip.tooltipCity} align="right">
        <div className={styles.habitat}>
          <Image src="/icons/buildings/city.png" alt="Village" width={40} height={40}/>
          <span>{formatNumber(Number(0), 'short')}</span>
        </div>
      </InfoTooltip>  
    </div>
  )
}