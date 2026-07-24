import { randomResourceRange } from "../utilities";
import { calculateAvailableSpace } from "./buildings";
import { PlayerBuildings, PlayerResources } from "@/types/game";

function calculateGoldChange(gold: number, population: number) {
  const incomeFromPopulation = randomResourceRange(population, 0.075, 0.125)
  const totalChange = incomeFromPopulation
  const totalGold = gold + incomeFromPopulation
  
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
  const totalPopulation = population + totalChange

  return {
    population: totalPopulation,
    populationReport: {
      change: totalChange,
      gainFromGrowth: populationGrowth
    }
  }
}

export function calculateUpdatedResources(resources: PlayerResources, buildings: PlayerBuildings) {
  const updatedGold = calculateGoldChange(resources.gold, resources.population)
  const updatedPopulation = calculatePopulationChange(resources.population, buildings)
 
  return {
    ...resources,
    turn: resources.turn + 1,
    gold: updatedGold.gold,
    population: updatedPopulation.population,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport,
      populationReport: updatedPopulation.populationReport
    }
  }
}