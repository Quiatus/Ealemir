import { calculateAvailableSpace } from "../engine/buildings"
import { text } from "../utilities"
import { PlayerBuildings, PlayerResources, ResourceTooltipData, TooltipData } from "@/types/game"

export function dynamicInfoTooltip() {
  return { 
    currentMonth: {
      type: 'info',
      title: text('tooltips.info.current_month')
    } as TooltipData,
    buttonNextMonth: {
      type: 'info',
      title: text('tooltips.info.next_month')
    } as TooltipData,
  }
}

function buildGoldTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    type: 'resource',
    title: text('tooltips.gold_tooltip.title'),
    color: 'gold',
    total: resources.gold,
    income: [
      {
        label: text('tooltips.gold_tooltip.income_population'),
        value: resources.last_turn_resources_report.goldReport.gainFromPopulation
      }
    ],
    expenditures: [
      {
        label: 'Test',
        value: 20
      }
    ],
    change: resources.last_turn_resources_report.goldReport.change
  };
}

function buildPopulationTooltip(resources: PlayerResources, buildings: PlayerBuildings): ResourceTooltipData {
  const {maxAvailableSpace, availableSpace} = calculateAvailableSpace(resources.population, buildings);
  let noSpaceMessage = ''
  let color = 'purple'

  console.log(resources.population, availableSpace)

  if (!availableSpace) {
    noSpaceMessage = text('tooltips.population_tooltip.no_space_message')
    color = 'orange'
  }

  if (resources.population > maxAvailableSpace) {
    noSpaceMessage = text('tooltips.population_tooltip.exceeded_space_message')
    color = 'red'
  }

  return {
    type: 'resource',
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
    type: 'resource',
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

export function dynamicResourceTooltip(resources: PlayerResources, buildings: PlayerBuildings) {
  return {
    gold: buildGoldTooltip(resources),
    population: buildPopulationTooltip(resources, buildings),
    food: buildFoodTooltip(resources)
  };
}
