import { calculateMaxAvailableSpace } from "../engine/buildings"
import { text } from "../utilities"
import { PlayerBuildings, PlayerResources, TooltipData } from "@/types/game"

export function dynamicInfoTooltip() {
  return { 
    currentMonth: {
      type: 'info',
      title: text('tooltips.info.current_month')
    } as TooltipData
  }
}

export function dynamicResourceTooltip(resources: PlayerResources, buildings: PlayerBuildings) {
  const maxAvailableSpace = calculateMaxAvailableSpace(resources.population, buildings)

  return {
    gold: {
      type: 'resource',
      title: text('tooltips.gold_tooltip.title'),
      total: resources.gold,
      custom: [],
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
    } as TooltipData,
    population: {
      type: 'resource',
      title: text('tooltips.population_tooltip.title'),
      total: resources.population,
      custom: [
        {
          label: text('tooltips.population_tooltip.available_space'),
          value: maxAvailableSpace
        }
      ],
      income: [
        {
          label: text('tooltips.population_tooltip.growth_population'),
          value: 0
        }
      ],
      expenditures: [],
      change: 0
    } as TooltipData
  }
}