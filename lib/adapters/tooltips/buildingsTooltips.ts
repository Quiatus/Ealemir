import { text } from "@/lib/utilities";
import { BuildingTooltipData } from "@/types/game";

function buildFarmTooltip(): BuildingTooltipData {
  return {
    title: text('tooltips.farm_tooltip.title'),
  };
}

function buildLumberyardTooltip(): BuildingTooltipData {
  return {
    title: text('tooltips.lumberyard_tooltip.title'),
  };
}

export function dynamicBuildingTooltip() {
  return {
    farm: buildFarmTooltip(),
    lumberyard: buildLumberyardTooltip()
  };
}