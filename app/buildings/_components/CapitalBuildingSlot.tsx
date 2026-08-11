import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { buildCapitalBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/check";
import { CapitalBuildingsStaticData, CapitalBuildingState, PlayerResources } from "@/types/game";
import styles from './CapitalBuildingSlot.module.css'

interface CapitalBuildingSlotProps {
  resources: PlayerResources;
  buildingData: CapitalBuildingsStaticData;
  dbState: CapitalBuildingState;
}

export default function CapitalBuildingSlot({ resources, buildingData, dbState }: CapitalBuildingSlotProps) {
  const isBuilt = dbState.isBuilt ?? false;
  const isConstructing = !isBuilt && dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCapitalBuildingTooltip(buildingData, dbState)

  let progress = 0

  if (isConstructing) {
    progress = ((buildingData.cost.turn - (dbState.queue || 0)) / buildingData.cost.turn ) * 100
  }

  return (
    <div style={{ position: 'absolute', left: `${buildingData.pos.left}px`, top: `${buildingData.pos.top}px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div className={styles.slot} style={{ border: '1px solid red', width: `${buildingData.pos.width}px`, height: `${buildingData.pos.height}px` }}>
          {progress}%
        </div>
      </BuildingTooltip>
    </div>
  );
}