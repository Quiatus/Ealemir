import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerBuildings } from "@/types/game";
import styles from './Territories.module.css'
import Image from "next/image";
import { dynamicBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import Button from "@/components/ui/Buttons/Button";

interface ProgressBarProps {
  current: number;
  max: number;
}

function ProgressBar({ current, max }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100); 

  return (
    <div className={styles.progressBar} style={{ '--progress': `${percentage}%` } as React.CSSProperties}>
      {current} / {max}
    </div>
  );
}

export default async function TerritoriesCard() {
  const buildings = await getData<PlayerBuildings>('player_buildings')
  const buildingTooltip = dynamicBuildingTooltip()

  return (
    <Card title={text('feature_buildings.card_territories.title')} style="elevated" width="w-33">
      {buildings.territories.farm && 
        <BuildingTooltip data={buildingTooltip.farm}>
          <div className={styles.buildingCard}>
            <Image src='/icons/buildings/farm.png' alt="Farm" width={40} height={40}></Image>
            <Button variant="plus">+</Button>
            <ProgressBar current={buildings.territories.farm.built} max={buildings.territories.farm.discovered} />
          </div>
        </BuildingTooltip>
      }
      {buildings.territories.lumberyard && 
        <BuildingTooltip data={buildingTooltip.lumberyard}>
          <div className={styles.buildingCard}>
            <Image src='/icons/buildings/lumberyard.png' alt="Lumberyard" width={40} height={40}></Image>
            <Button variant="plus">+</Button>
            <ProgressBar current={buildings.territories.lumberyard.built} max={buildings.territories.lumberyard.discovered} />
          </div>
        </BuildingTooltip>
      }
    </Card>
  )
}