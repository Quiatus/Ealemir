'use client'

import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { buildCapitalBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/check";
import { CapitalBuildingSlotProps } from "@/types/game";
import { useState, useTransition } from 'react';
import ErrorModal from '@/components/ui/ErrorModal';
import styles from './CapitalBuildingSlot.module.css'
import Image from "next/image";
import { text } from "@/lib/utilities";
import { constructCapitalBuilding } from "@/lib/actions/buildActions";

export default function CapitalBuildingSlot({ resources, buildingData, dbState }: CapitalBuildingSlotProps) {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const isBuilt = dbState.isBuilt ?? false;
  const isConstructing = !isBuilt && dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCapitalBuildingTooltip(buildingData, dbState)

  function handleBuild(){
    if (isPending || isDisabled.disable || isBuilt || isConstructing) return
      
    startTransition(async () => {
      const result = await constructCapitalBuilding(buildingData)
      if (result && !result.success) {
        setIsErrorModalOpen(true)
        setErrorMessage(result.message || text("errors.construction_failed_message"))
      }
    })
  }

  let progress = 0

  if (isConstructing) {
    progress = ((buildingData.cost.turn - (dbState.queue || 0)) / buildingData.cost.turn ) * 100
  }

  return (
    <div style={{ position: 'absolute', left: `${buildingData.pos.left}px`, top: `${buildingData.pos.top}px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div className={styles.slot} style={{ /*border: '1px solid red',*/ width: `${buildingData.pos.width}px`, height: `${buildingData.pos.height}px` }}>
          {!isBuilt && !isConstructing && 
            <button className={styles.capitalButton} style={{ width: `${buildingData.pos.width}px`, height: `${buildingData.pos.height}px`}} onClick={() => handleBuild()} disabled={isDisabled.disable}>
              <Image src="/icons/buildings/construct2.png" alt="" layout="fill" />
            </button>}
          {isConstructing && <span>{progress}%</span>}
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
    </div>
  );
}