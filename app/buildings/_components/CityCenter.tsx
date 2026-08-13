'use client'

import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { CAPITAL, MAX_CAPITAL_LEVEL } from "@/config/buildings";
import { buildCityCenterTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/check";
import { CapitalLevel, PlayerResources } from "@/types/game";
import styles from './CapitalBuildingSlot.module.css'
import { text } from "@/lib/utilities";
import { useState, useTransition } from "react";
import ErrorModal from "@/components/ui/ErrorModal";
import { upgradeCityCenter } from "@/lib/actions/buildActions";

interface CityCenterProps {
  resources: PlayerResources;
  dbState: CapitalLevel;
}

export default function CityCenter({ resources, dbState }: CityCenterProps) {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const buildingData = CAPITAL[dbState.city_level]
  const isConstructing = dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCityCenterTooltip(buildingData, dbState.queue)

  let progress = 0

  if (isConstructing) {
    progress = ((buildingData.cost.turn - (dbState.queue || 0)) / buildingData.cost.turn ) * 100
  }

  function handleBuild(){
      if (isPending || isDisabled.disable || isConstructing || dbState.city_level === MAX_CAPITAL_LEVEL) return
        
      startTransition(async () => {
        const result = await upgradeCityCenter()
        if (result && !result.success) {
          setIsErrorModalOpen(true)
          setErrorMessage(result.message || text("errors.upgrade_failed_message"))
        }
      })
    }

  return (
    <div style={{ position: 'absolute', left: `465px`, top: `485px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div className={styles.slot} style={{ width: `100px`, height: `55px` }}>
          {!isConstructing && 
            <button className={styles.buttonCityCenter} style={{ width: `100px`, height: `55px`}} onClick={() => handleBuild()} disabled={isDisabled.disable}></button>}
          {isConstructing && <span>{progress}%</span>}
        </div>
      </BuildingTooltip>
      <ErrorModal 
        isOpen={isErrorModalOpen}
        title={text("errors.upgrade_failed_title")}
        message={errorMessage} 
        onConfirm={() => {
          setIsErrorModalOpen(false)
          setErrorMessage(null) 
        }}
      />
    </div>
  );
}