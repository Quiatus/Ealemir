import { PlayerBuildings, Rations } from "@/types/game"
import { calculateFreeSpace, calculateMaxSpace } from "../buildings/space"
import { randomResourceRange } from "@/lib/utilities"
import { rationsModifier } from "@/config/empire";

export function calculatePopulationChange(population: number, buildings: PlayerBuildings, rations: Rations) {
  const avaiableSpace = calculateFreeSpace(population, buildings)
  const maxAvailableSpace = calculateMaxSpace(buildings);
  const overpopulation = population > maxAvailableSpace
  
  const lowPopCompensator = Math.floor(Math.random() * 19 + 2)
  
  let populationGrowth = Math.floor((randomResourceRange(population, 0.001, 0.005) + lowPopCompensator) * rationsModifier[rations].populationGrowth) 
  
  if (!avaiableSpace || overpopulation) {
    populationGrowth = 0
  }

  if (!overpopulation && populationGrowth > avaiableSpace) {
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