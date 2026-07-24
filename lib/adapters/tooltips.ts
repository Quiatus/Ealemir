import { calculateAvailableSpace } from "../engine/buildings"
import { text } from "../utilities"
import { PlayerBuildings, PlayerResources, TooltipData } from "@/types/game"

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

function buildGoldTooltip(resources: PlayerResources): TooltipData {
  return {
    type: 'resource',
    title: text('tooltips.gold_tooltip.title'),
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

function buildPopulationTooltip(resources: PlayerResources, buildings: PlayerBuildings): TooltipData {
  const availableSpace = calculateAvailableSpace(resources.population, buildings);
  let noSpaceMessage = ''

  if (!availableSpace) {
    noSpaceMessage = text('tooltips.population_tooltip.no_space_message')
  }

  return {
    type: 'resource',
    title: text('tooltips.population_tooltip.title'),
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

export function dynamicResourceTooltip(resources: PlayerResources, buildings: PlayerBuildings) {
  return {
    gold: buildGoldTooltip(resources),
    population: buildPopulationTooltip(resources, buildings),
  };
}
