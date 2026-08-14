'use client'

import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { buildCapitalBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/checks";
import { CapitalBuildingSlotProps } from "@/types/game";
import ErrorModal from '@/components/ui/ErrorModal';
import styles from './CapitalBuildingSlot.module.css'
import Image from "next/image";
import { constructCapitalBuilding } from "@/lib/actions/buildActions";
import { useConstruction } from "@/lib/hooks/useConstruction";
import { calculateElapsedPercentage } from "@/lib/utilities";

export default function CapitalBuildingSlot({ resources, buildingData, dbState }: CapitalBuildingSlotProps) {
  const { isPending, handleBuild, errorModalProps } = useConstruction(() => constructCapitalBuilding(buildingData));
  const isBuilt = dbState.isBuilt ?? false;
  const isConstructing = !isBuilt && dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCapitalBuildingTooltip(buildingData, dbState)
  const progress = calculateElapsedPercentage(buildingData.cost.turn, dbState.queue)

  return (
    <div style={{ position: 'absolute', left: `${buildingData.pos.left}px`, top: `${buildingData.pos.top}px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div className={styles.slot} style={{ /*border: '1px solid red',*/ width: `${buildingData.pos.width}px`, height: `${buildingData.pos.height}px` }}>
          {!isBuilt && !isConstructing && 
            <button 
              className={styles.capitalButton} 
              style={{ width: `${buildingData.pos.width}px`, height: `${buildingData.pos.height}px`}} 
              onClick={() => handleBuild(isDisabled.disable)} 
              disabled={isDisabled.disable}>
                <Image src="/icons/buildings/construct2.png" alt="" width={24} height={24}/>
            </button>}
          {isConstructing && <span>{progress}%</span>}
        </div>
      </BuildingTooltip>
      <ErrorModal {...errorModalProps} />
    </div>
  );
}