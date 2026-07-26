import { calculateAvailableSpace } from "../engine/buildings"
import { text } from "../utilities"
import { PlayerBuildings, PlayerResources, ResourceTooltipData } from "@/types/game"

export function dynamicInfoTooltip() {
  return { 
    currentMonth: {
      title: text('tooltips.info.current_month')
    },
    buttonNextMonth: {
      title: text('tooltips.info.next_month')
    },
  }
}

function buildGoldTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.gold_tooltip.title'),
    color: 'gold',
    total: resources.gold,
    income: [
      {
        label: text('tooltips.gold_tooltip.income_population'),
        value: resources.last_turn_resources_report.goldReport.gainFromPopulation
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.goldReport.change
  };
}

function buildPopulationTooltip(resources: PlayerResources, buildings: PlayerBuildings): ResourceTooltipData {
  const {maxAvailableSpace, availableSpace} = calculateAvailableSpace(resources.population, buildings);
  let noSpaceMessage = ''
  let color = 'purple'

  if (!availableSpace) {
    noSpaceMessage = text('tooltips.population_tooltip.no_space_message')
    color = 'orange'
  }

  if (resources.population > maxAvailableSpace) {
    noSpaceMessage = text('tooltips.population_tooltip.exceeded_space_message')
    color = 'red'
  }

  return {
    title: text('tooltips.population_tooltip.title'),
    color,
    total: resources.population,
    messages: {
      afterCustom: noSpaceMessage
    },
    custom: [
      {
        label: text('tooltips.population_tooltip.available_space'),
        value: availableSpace
      }
    ],
    income: [
      {
        label: text('tooltips.population_tooltip.growth_population'),
        value: resources.last_turn_resources_report.populationReport.gainFromGrowth
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.populationReport.change
  };
}

function buildFoodTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.food_tooltip.title'),
    color: 'yellow',
    total: resources.food,
    income: [
      {
        label: text('tooltips.food_tooltip.income_capital'),
        value: resources.last_turn_resources_report.foodReport.gainFromCapital
      }
    ],
    expenditures: [
      {
        label: text('tooltips.food_tooltip.consumed'),
        value: resources.last_turn_resources_report.foodReport.consumed
      }
    ],
    change: resources.last_turn_resources_report.foodReport.change
  };
}

function buildWoodTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.wood_tooltip.title'),
    color: 'brown',
    total: resources.wood,
    income: [],
    expenditures: [],
    change: resources.last_turn_resources_report.woodReport.change
  };
}

function buildStoneTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.stone_tooltip.title'),
    color: 'gray',
    total: resources.stone,
    income: [],
    expenditures: [],
    change: resources.last_turn_resources_report.stoneReport.change
  };
}

export function dynamicResourceTooltip(resources: PlayerResources, buildings: PlayerBuildings) {
  return {
    gold: buildGoldTooltip(resources),
    population: buildPopulationTooltip(resources, buildings),
    food: buildFoodTooltip(resources),
    wood: buildWoodTooltip(resources),
    stone: buildStoneTooltip(resources)
  };
}
