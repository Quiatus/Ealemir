'use client'

import styles from './Territories.module.css'
import Image from "next/image";
import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import Button from "@/components/ui/Buttons/Button";
import { BuildingCostType, BuildingTooltipData, PlayerResources } from '@/types/game';
import { disableBuildButton } from '@/lib/engine/buildings/check';
import { useState, useTransition } from 'react';
import { updateTerritoryBuildings } from '@/lib/actions/buildActions';
import ErrorModal from '@/components/ui/ErrorModal';
import { text } from '@/lib/utilities';

interface ProgressBarProps {
  current: number;
  max: number;
}

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

function ProgressBar({ current, max }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100); 
  return (
    <div className={styles.progressBar} style={{ '--progress': `${percentage}%` } as React.CSSProperties}>
      {current} / {max}
    </div>
  );
}

export default function TerritoryBuilding({building, buildingCost, resources, tooltip, icon}: TerritoryBuildingProps) {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const isDisabled = disableBuildButton(building, buildingCost, resources)

  function handleBuild(){
    if (isPending) return
    if (isDisabled.disable) return
    
    startTransition(async () => {
      const result = await updateTerritoryBuildings({building, buildingCost, resources})
      if (result && !result.success) {
        setIsErrorModalOpen(true)
        setErrorMessage(result.message || text("errors.construction_failed_message"))
      }
    })
  }

  return (
    <>
    <BuildingTooltip data={tooltip} missing={isDisabled}>
      <div className={styles.buildingCard}>
        <Image src={icon} alt="Farm" width={40} height={40}></Image>
        <Button variant="plus" disabled={isDisabled.disable} onClick={() => handleBuild()}>+</Button>
        <ProgressBar current={building.built} max={building.discovered} />
      </div>
    </BuildingTooltip>
    <ErrorModal 
      isOpen={isErrorModalOpen}
      title={text("errors.construction_failed_title")}
      message={errorMessage} 
      onConfirm={() => {
          setIsErrorModalOpen(false)
          setErrorMessage(null) 
        }}
      />
    </>
  )
}