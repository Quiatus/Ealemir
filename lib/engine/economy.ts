import { CAPITAL, POPULATION } from "@/config/rules";
import { randomResourceRange } from "../utilities";
import { calculateAvailableSpace } from "./buildings";
import { PlayerBuildings, PlayerResources } from "@/types/game";

function calculateGoldChange(gold: number, population: number) {
  const incomeFromPopulation = randomResourceRange(population, 0.075, 0.125)
  const totalChange = incomeFromPopulation
  let totalGold = gold + incomeFromPopulation

  if (totalGold < 0) {
    totalGold = 0
  }
  
  return {
    gold: totalGold,
    goldReport: {
      change: totalChange,
      gainFromPopulation: incomeFromPopulation
    }
  }
}

function calculatePopulationChange(population: number, buildings: PlayerBuildings) {
  const avaiableSpace = calculateAvailableSpace(population, buildings)
  
  const lowPopCompensator = Math.floor(Math.random() * 19 + 2)
  let populationGrowth = Math.floor(randomResourceRange(population, 0.001, 0.005) + lowPopCompensator)
  
  if (!avaiableSpace) {
    populationGrowth = 0
  }

  if (populationGrowth > avaiableSpace) {
    populationGrowth = avaiableSpace
  }

  const totalChange = populationGrowth
  let totalPopulation = population + totalChange

  if (totalPopulation < 0) {
    totalPopulation = 0
  }

  return {
    population: totalPopulation,
    populationReport: {
      change: totalChange,
      gainFromGrowth: populationGrowth
    }
  }
}

function calculateFoodChange(food: number, population: number, capitalLevel: number) {
  const incomeFromCapital = CAPITAL[capitalLevel - 1].food
  const consumed = Math.ceil(population / POPULATION.basePopulationFed)
  const totalChange = incomeFromCapital - consumed
  let totalFood = food + incomeFromCapital - consumed

  if (totalFood < 0) {
    totalFood = 0
  }
  
  return {
    food: totalFood,
    foodReport: {
      change: totalChange,
      gainFromCapital: incomeFromCapital,
      consumed
    }
  }
}

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings) {
  const updatedPopulation = calculatePopulationChange(resources.population, buildings)
  const updatedGold = calculateGoldChange(resources.gold, updatedPopulation.population)
  const updatedFood = calculateFoodChange(resources.food, updatedPopulation.population, buildings.capital_level)
 
  return {
    ...resources,
    turn: resources.turn + 1,
    gold: updatedGold.gold,
    food: updatedFood.food,
    population: updatedPopulation.population,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport,
      populationReport: updatedPopulation.populationReport,
      foodReport: updatedFood.foodReport
    }
  }
}