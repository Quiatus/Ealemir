import { PlayerBuildings, PlayerResources } from "@/types/game"
import { calculatePopulationChange } from "./population"
import { calculateGoldChange } from "./gold"
import { calculateFoodChange } from "./food"

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings) {
  const updatedPopulation = calculatePopulationChange(resources.population, buildings)
  const updatedGold = calculateGoldChange(resources.gold, updatedPopulation.population)
  const updatedFood = calculateFoodChange(resources.food, updatedPopulation.population, buildings.capital.city_level)
 
  return {
    ...resources,
    turn: resources.turn + 1,
    gold: updatedGold.gold,
    food: updatedFood.food,
    population: updatedPopulation.population,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport,
      populationReport: updatedPopulation.populationReport,
      foodReport: updatedFood.foodReport,
      woodReport: {
        change: 0
      },
      stoneReport: {
        change: 0
      }
    }
  }
}