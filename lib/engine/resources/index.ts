import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game"
import { calculatePopulationChange } from "./population"
import { calculateGoldChange } from "./gold"
import { calculateFoodChange } from "./food"
import { calculateWoodChange } from "./wood"
import { calculateStoneChange } from "./stone"

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings, empire: PlayerEmpire, eventChanges: Partial<Record<keyof PlayerResources, number>>) {
  const goldFromEvents = eventChanges.gold || 0;
  const populationFromEvents = eventChanges.population || 0;
  const foodFromEvents = eventChanges.food || 0;
  const woodFromEvents = eventChanges.wood || 0;
  const stoneFromEvents = eventChanges.stone || 0;

  const updatedPopulation = calculatePopulationChange(resources.population, buildings, empire, populationFromEvents)
  const updatedGold = calculateGoldChange(resources.gold, updatedPopulation.population, empire, goldFromEvents)
  const updatedFood = calculateFoodChange(resources.food, updatedPopulation.population, buildings, empire, foodFromEvents)
  const updatedWood = calculateWoodChange(resources.wood, buildings, empire, woodFromEvents)
  const updatedStone = calculateStoneChange(resources.stone, buildings, empire, stoneFromEvents)
 
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