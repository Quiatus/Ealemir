import styles from './Territories.module.css'
import Image from "next/image";
import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import Button from "@/components/ui/Buttons/Button";
import { BuildingTooltipData } from '@/types/game';

interface ProgressBarProps {
  current: number;
  max: number;
}

interface TerritoryBuildingProps {
  building: {
    built: number;
    discovered: number;
  };
  tooltip: BuildingTooltipData; 
  icon: string;
}

function ProgressBar({ current, max }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100); 

  return (
    <div className={styles.progressBar} style={{ '--progress': `${percentage}%` } as React.CSSProperties}>
      {current} / {max}
    </div>
  );
}

export default function TerritoryBuilding({building, tooltip, icon}: TerritoryBuildingProps) {
  return (
    <BuildingTooltip data={tooltip}>
      <div className={styles.buildingCard}>
        <Image src={icon} alt="Farm" width={40} height={40}></Image>
        <Button variant="plus">+</Button>
        <ProgressBar current={building.built} max={building.discovered} />
      </div>
    </BuildingTooltip>
  )
}