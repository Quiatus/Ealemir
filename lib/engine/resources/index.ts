import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game"
import { calculatePopulationChange } from "./population"
import { calculateGoldChange } from "./gold"
import { calculateFoodChange } from "./food"
import { calculateWoodChange } from "./wood"
import { calculateStoneChange } from "./stone"
import { calculateFameChange } from "./fame"

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings, empire: PlayerEmpire, eventChanges: Partial<Record<keyof PlayerResources, number>>) {
  const goldFromEvents = eventChanges.gold || 0;
  const populationFromEvents = eventChanges.population || 0;
  const foodFromEvents = eventChanges.food || 0;
  const woodFromEvents = eventChanges.wood || 0;
  const stoneFromEvents = eventChanges.stone || 0;

  const updatedFood = calculateFoodChange(resources.food, resources.population, buildings, empire, foodFromEvents)
  const updatedPopulation = calculatePopulationChange(resources.population, buildings, empire, populationFromEvents, updatedFood.foodReport.famine)
  const updatedGold = calculateGoldChange(resources.gold, updatedPopulation.population, empire, goldFromEvents)
  const updatedWood = calculateWoodChange(resources.wood, buildings, empire, woodFromEvents)
  const updatedStone = calculateStoneChange(resources.stone, buildings, empire, stoneFromEvents)
  const updatedFame = calculateFameChange(resources.fame, updatedFood.foodReport.famine)
 
  return {
    ...resources,
    turn: resources.turn + 1,
    gold: updatedGold.gold,
    food: updatedFood.food,
    population: updatedPopulation.population,
    wood: updatedWood.wood,
    stone: updatedStone.stone,
    fame: updatedFame.fame,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport,
      populationReport: updatedPopulation.populationReport,
      foodReport: updatedFood.foodReport,
      woodReport: updatedWood.woodReport,
      stoneReport: updatedStone.stoneReport,
      fameReport: updatedFame.fameReport
    }
  }
}