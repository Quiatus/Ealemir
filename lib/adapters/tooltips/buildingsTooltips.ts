import { richText } from "@/app/richText";
import { TERRITORIES } from "@/config/buildings";
import { formatNumber, text } from "@/lib/utilities";
import { BuildingTooltipData, CapitalBuildingsStaticData } from "@/types/game";

function buildStatusMessage() {
  return ''
}

function buildFarmTooltip(): BuildingTooltipData {
  return {
    title: text('tooltips.farm_tooltip.title'),
    messages: {
      afterTitle: richText('tooltips.farm_tooltip.effect_message', {food: formatNumber(Number(TERRITORIES.farm.effect.food), 'full')})
    },
    cost: TERRITORIES.farm.cost
  };
}

function buildLumberyardTooltip(): BuildingTooltipData {
  return {
    title: text('tooltips.lumberyard_tooltip.title'),
    messages: {
      afterTitle: richText('tooltips.lumberyard_tooltip.effect_message', {wood: formatNumber(Number(TERRITORIES.lumberyard.effect.wood), 'full')})
    },
    cost: TERRITORIES.lumberyard.cost
  };
}

function buildQuarryTooltip(): BuildingTooltipData {
  return {
    title: text('tooltips.quarry_tooltip.title'),
    messages: {
      afterTitle: richText('tooltips.quarry_tooltip.effect_message', {stone: formatNumber(Number(TERRITORIES.quarry.effect.stone), 'full')})
    },
    cost: TERRITORIES.quarry.cost
  };
}

function buildCapitalBuildingTooltip(data: CapitalBuildingsStaticData): BuildingTooltipData {
  return {
    title: data.name,
    status: buildStatusMessage(),
    messages: {
      afterTitle: richText('tooltips.quarry_tooltip.effect_message', {stone: formatNumber(Number(TERRITORIES.quarry.effect.stone), 'full')})
    },
    cost: data.cost
  };
}


export function dynamicBuildingTooltip(data: CapitalBuildingsStaticData) {
  return {
    farm: buildFarmTooltip(),
    lumberyard: buildLumberyardTooltip(),
    quarry: buildQuarryTooltip(),
    capitalBuilding: buildCapitalBuildingTooltip(data)
  };
}