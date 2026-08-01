import InfoTooltip from "@/components/ui/Tooltip/InfoTooltip";
import { dynamicInfoTooltip } from "@/lib/adapters/tooltips/infoTooltips";
import styles from './Habitats.module.css'
import Image from "next/image";
import { formatNumber } from "@/lib/utilities";
import { Habitats as HabitatType } from "@/types/game";

interface HabitatData {
  data: HabitatType
}

export default function Habitats({data}: HabitatData) {
  const villageTooltip = dynamicInfoTooltip(data.village.amount)
  const settlementinfoTooltip = dynamicInfoTooltip(data.settlement.amount)
  const cityinfoTooltip = dynamicInfoTooltip(data.city.amount)

  return (
    <div className={styles.habitatWrapper}>
      <InfoTooltip data={villageTooltip.village}>
        <div className={styles.habitat}>
          <Image src="/icons/buildings/village.png" alt="Village" width={40} height={26}/>
          <span>{formatNumber(Number(data.village.amount), 'short')}</span>
        </div>
      </InfoTooltip>
      <InfoTooltip data={settlementinfoTooltip.settlement} align="right">
        <div className={styles.habitat}>
          <Image src="/icons/buildings/settlement.png" alt="Village" width={40} height={40}/>
          <span>{formatNumber(Number(data.settlement.amount), 'short')}</span>
        </div>
      </InfoTooltip>  
      <InfoTooltip data={cityinfoTooltip.city} align="right">
        <div className={styles.habitat}>
          <Image src="/icons/buildings/city.png" alt="Village" width={40} height={40}/>
          <span>{formatNumber(Number(data.city.amount), 'short')}</span>
        </div>
      </InfoTooltip>  
    </div>
  )
}