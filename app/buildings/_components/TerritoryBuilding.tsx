'use client'

import styles from './Territories.module.css'
import Image from "next/image";
import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import Button from "@/components/ui/Buttons/Button";
import { BuildingCostType, BuildingTooltipData, PlayerResources } from '@/types/game';
import { disableBuildButton } from '@/lib/engine/buildings/checks';
import { updateTerritoryBuildings } from '@/lib/actions/buildActions';
import ErrorModal from '@/components/ui/ErrorModal';
import { useConstruction } from '@/lib/hooks/useConstruction';
import ProgressBar from '@/components/ui/Progressbar';

interface TerritoryBuildingProps {
  building: {
    name: string;
    built: number;
    discovered: number;
  };
  buildingCost: BuildingCostType;
  resources: PlayerResources;
  tooltip: BuildingTooltipData; 
  icon: string;
}

export default function TerritoryBuilding({building, buildingCost, resources, tooltip, icon}: TerritoryBuildingProps) {
  const { isPending, handleBuild, errorModalProps } = useConstruction(() => updateTerritoryBuildings({ building, buildingCost }));
  const isDisabled = disableBuildButton(buildingCost, resources, building)

  return (
    <>
      <BuildingTooltip data={tooltip} missing={isDisabled}>
        <div className={styles.buildingCard}>
          <Image src={icon} alt="Farm" width={40} height={40}></Image>
          <Button variant="plus" disabled={isDisabled.disable} onClick={() => handleBuild(isDisabled.disable)}>+</Button>
          <ProgressBar current={building.built} max={building.discovered} />
        </div>
      </BuildingTooltip>
      <ErrorModal {...errorModalProps} />
    </>
  )
}