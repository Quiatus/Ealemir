import { text } from "../utilities"
import { PlayerResources, TooltipData } from "@/types/game"

export function dynamicResourceTooltip(resources: PlayerResources) {
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
          value: 0
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