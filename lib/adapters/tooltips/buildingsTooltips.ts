import { richText } from "@/app/richText";
import { TERRITORIES } from "@/config/buildings";
import { formatNumber, text } from "@/lib/utilities";
import { BuildingTooltipData, CapitalBuildingsStaticData, CapitalBuildingState, CapitalStaticData } from "@/types/game";

function buildStatusMessage({isBuilt, queue}: CapitalBuildingState) {
  let message = ''

  if (isBuilt) {
    message = text('tooltips.construction_tooltip.constructed')
  }

  if (!isBuilt && queue === 0) {
    message = text('tooltips.construction_tooltip.not_constructed')
  } 

  if (!isBuilt && queue > 1) {
    message = text('tooltips.construction_tooltip.in_construction', {queue: formatNumber(Number(queue), 'full')})
  }

  if (!isBuilt && queue === 1) {
    message = text('tooltips.construction_tooltip.in_construction_one')
  }

  return message
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

export function buildCapitalBuildingTooltip( data: CapitalBuildingsStaticData, dbState: CapitalBuildingState ): BuildingTooltipData {
  return {
    title: data.name,
    status: buildStatusMessage(dbState),
    messages: {
      afterTitle: richText(data.description, {effect: formatNumber(Number(Object.values(data.effect)[0]), 'full')})
    },
    cost: data.cost
  };
}

export function buildCityCenterTooltip( data: CapitalStaticData, queue: number ): BuildingTooltipData {
  let message = ''

  if (queue > 1) {
    message = text('tooltips.construction_tooltip.upgrading', {queue: formatNumber(Number(queue), 'full')})
  }

  if (queue === 1) {
    message = text('tooltips.construction_tooltip.upgrading_one')
  }

  return {
    title: data.name,
    levelName: `Level ${data.level} - ${data.levelName}`,
    status: message,
    messages: {
      afterTitle: text('tooltips.city_center_tooltip.message')
    },
    cost: data.cost,
    custom: [
      {
        label: text('tooltips.city_center_tooltip.space'),
        value: formatNumber(Number(data.space), 'full')
      },
      {
        label: text('tooltips.city_center_tooltip.food'),
        value: formatNumber(Number(data.food), 'full')
      },
    ]
  };
}

export function dynamicBuildingTooltip() {
  return {
    farm: buildFarmTooltip(),
    lumberyard: buildLumberyardTooltip(),
    quarry: buildQuarryTooltip(),
  };
}