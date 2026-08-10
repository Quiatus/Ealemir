import { formatNumber, text } from "@/lib/utilities";
import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game";
import { calculateFreeSpace } from "../buildings/space";

function resourceReportConstructor(food: number, wood: number, stone: number) {
  return ''
}

function generateEmpireReport(resources: PlayerResources, buildings: PlayerBuildings) {
  const report: string[] = []

  const space = calculateFreeSpace(resources.population, buildings)
  const goldGain = resources.last_turn_resources_report.goldReport.gainFromPopulation
  const populationGain = resources.last_turn_resources_report.populationReport.gainFromGrowth
  const foodGain = resources.last_turn_resources_report.foodReport.gainFromCapital + resources.last_turn_resources_report.foodReport.gainFromFarms
  const woodGain = resources.last_turn_resources_report.woodReport.gainFromLumberyards
  const stoneGain = resources.last_turn_resources_report.stoneReport.gainFromQuarries

  if (goldGain > 0) {
    report.push(text('feature_overview.card_report.report_gold', {gold: formatNumber((goldGain), 'full') }))
  }

  if (populationGain > 0) {
    report.push(text('feature_overview.card_report.report_population', {population: formatNumber((populationGain), 'full') }))
  }

  if (!space) {
    report.push(text('feature_overview.card_report.report_population_full'))
  }

  report.push(resourceReportConstructor(foodGain, woodGain, stoneGain))

  if (resources.last_turn_resources_report.foodReport.change < 0 && resources.food > Math.abs(resources.last_turn_resources_report.foodReport.change * 10)) {
    report.push(text('feature_overview.card_report.report_food_decline'))
  }

  if (resources.last_turn_resources_report.foodReport.change < 0 && resources.food <= Math.abs(resources.last_turn_resources_report.foodReport.change * 10)) {
    report.push(text('feature_overview.card_report.report_food_low'))
  }

  return report
}

function generateScoutReport() {
  const report: string[] = []

  return report
}

function generateEventReport() {
  const report: string[] = []

  return report
}

export function generateReport(resources: PlayerResources, buildings: PlayerBuildings, empireData: PlayerEmpire) {
  const monthly_report = {
    empire: generateEmpireReport(resources, buildings),
    scouts: generateScoutReport(),
    events: generateEventReport()
  }

  return {
    ...empireData,
    monthly_report
  }
}