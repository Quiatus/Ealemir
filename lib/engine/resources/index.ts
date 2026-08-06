import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game"
import { calculatePopulationChange } from "./population"
import { calculateGoldChange } from "./gold"
import { calculateFoodChange } from "./food"
import { calculateWoodChange } from "./wood"
import { calculateStoneChange } from "./stone"

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings, empire: PlayerEmpire) {
  const updatedPopulation = calculatePopulationChange(resources.population, buildings, empire)
  const updatedGold = calculateGoldChange(resources.gold, updatedPopulation.population, empire.taxes)
  const updatedFood = calculateFoodChange(resources.food, updatedPopulation.population, buildings, empire)
  const updatedWood = calculateWoodChange(resources.wood, buildings, empire.production)
  const updatedStone = calculateStoneChange(resources.stone, buildings, empire.production)
 
  return {
    ...resources,
    turn: resources.turn + 1,
    gold: updatedGold.gold,
    food: updatedFood.food,
    population: updatedPopulation.population,
    wood: updatedWood.wood,
    stone: updatedStone.stone,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport,
      populationReport: updatedPopulation.populationReport,
      foodReport: updatedFood.foodReport,
      woodReport: updatedWood.woodReport,
      stoneReport: updatedStone.stoneReport,
      fameReport: {
        loss: 0,
        change: 0      
      }
    }
  }
}