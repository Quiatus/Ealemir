import { formatNumber, text } from "@/lib/utilities";
import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game";
import { calculateFreeSpace } from "../buildings/space";

function resourceReportConstructor(resources: PlayerResources) {
  const foodGain = resources.last_turn_resources_report.foodReport.gainFromCapital + resources.last_turn_resources_report.foodReport.gainFromFarms
  const woodGain = resources.last_turn_resources_report.woodReport.gainFromLumberyards
  const stoneGain = resources.last_turn_resources_report.stoneReport.gainFromQuarries

  const report: string[] = []

  if (foodGain > 0) {
    report.push(text('feature_overview.card_report.report_food', {food: formatNumber((foodGain), 'full') }))
  }

  if (woodGain > 0) {
    report.push(text('feature_overview.card_report.report_wood', {wood: formatNumber((woodGain), 'full') }))
  }

  if (stoneGain > 0) {
    report.push(text('feature_overview.card_report.report_stone', {stone: formatNumber((stoneGain), 'full') }))
  }

  const result = `${text('feature_overview.card_report.report_resources_start')} ${report.join(', ')} ${text('feature_overview.card_report.report_resources_end')}`

  const index = result.lastIndexOf(',');

  if (index === -1) return result;

  return result.slice(0, index) + ' and' + result.slice(index + 1);
}

function generateEmpireReport(resources: PlayerResources, buildings: PlayerBuildings) {
  const report: string[] = []

  const space = calculateFreeSpace(resources.population, buildings)
  const goldGain = resources.last_turn_resources_report.goldReport.gainFromPopulation
  const populationGain = resources.last_turn_resources_report.populationReport.gainFromGrowth

  if (buildings.finished) {
    buildings.finished.split(',').map(building => {
      if (building === 'Capital City') report.push(text('feature_overview.card_report.report_capital_upgraded', {level: buildings.capital.city_level}))
      else report.push(text('feature_overview.card_report.report_building_constructed', {building}))
    })
  }

  if (goldGain > 0) {
    report.push(text('feature_overview.card_report.report_gold', {gold: formatNumber((goldGain), 'full') }))
  }

  if (populationGain > 0) {
    report.push(text('feature_overview.card_report.report_population', {population: formatNumber((populationGain), 'full') }))
  }

  report.push(resourceReportConstructor(resources))
  
  if (!populationGain && !space) {
    report.push(text('feature_overview.card_report.report_population_full'))
  }

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