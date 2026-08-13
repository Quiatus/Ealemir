'use client'

import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { CAPITAL } from "@/config/buildings";
import { buildCityCenterTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/checks";
import { CapitalLevel, PlayerResources } from "@/types/game";
import styles from './CapitalBuildingSlot.module.css'
import ErrorModal from "@/components/ui/ErrorModal";
import { upgradeCityCenter } from "@/lib/actions/buildActions";
import { useConstruction } from "@/lib/hooks/useConstruction";
import { calculateElapsedPercentage } from "@/lib/utilities";

interface CityCenterProps {
  resources: PlayerResources;
  dbState: CapitalLevel;
}

export default function CityCenter({ resources, dbState }: CityCenterProps) {
  const { isPending, handleBuild, errorModalProps } = useConstruction(() => upgradeCityCenter());
  const buildingData = CAPITAL[dbState.city_level]
  const isConstructing = dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCityCenterTooltip(buildingData, dbState.queue)
  const progress = calculateElapsedPercentage(buildingData.cost.turn, dbState.queue)

  return (
    <div style={{ position: 'absolute', left: `465px`, top: `485px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div className={styles.slot} style={{ width: `100px`, height: `55px` }}>
          {!isConstructing && 
            <button 
              className={styles.buttonCityCenter} 
              style={{ width: `100px`, height: `55px`}} 
              onClick={() => handleBuild(isDisabled.disable)} 
              disabled={isDisabled.disable}>
            </button>}
          {isConstructing && <span>{progress}%</span>}
        </div>
      </BuildingTooltip>
      <ErrorModal {...errorModalProps} />
    </div>
  );
}