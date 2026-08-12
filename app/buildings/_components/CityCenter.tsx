import BuildingTooltip from "@/components/ui/Tooltip/BuildingTooltip";
import { CAPITAL } from "@/config/buildings";
import { buildCityCenterTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import { disableBuildButton } from "@/lib/engine/buildings/check";
import { CapitalLevel, PlayerResources } from "@/types/game";

interface CityCenterProps {
  resources: PlayerResources;
  dbState: CapitalLevel;
}

export default function CityCenter({ resources, dbState }: CityCenterProps) {
  const buildingData = CAPITAL[dbState.city_level]
  const isConstructing = dbState.queue > 0;
  const isDisabled = disableBuildButton(buildingData.cost, resources)
  const tooltipData = buildCityCenterTooltip(buildingData, dbState.queue)

  let progress = 0

  if (isConstructing) {
    progress = ((buildingData.cost.turn - (dbState.queue || 0)) / buildingData.cost.turn ) * 100
  }

  return (
    <div style={{ position: 'absolute', left: `465px`, top: `485px` }}>
      <BuildingTooltip data={tooltipData} missing={isDisabled}>
        <div style={{ border: '1px solid red', width: `100px`, height: `55px` }}>

        </div>
      </BuildingTooltip>
    </div>
  );
}