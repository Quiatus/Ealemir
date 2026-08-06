import { PlayerBuildings, PlayerEmpire } from "@/types/game"
import { calculateFreeSpace, calculateMaxSpace } from "../buildings/space"
import { randomResourceRange } from "@/lib/utilities"
import { EMPIRE_BASELINES, RATIONS_MODIFIER } from "@/config/empire";
import { calculateMorale } from "../empire/morale";

export function calculatePopulationChange(population: number, buildings: PlayerBuildings, empire: PlayerEmpire) {
  const avaiableSpace = calculateFreeSpace(population, buildings)
  const maxAvailableSpace = calculateMaxSpace(buildings);
  const overpopulation = population > maxAvailableSpace
  let moraleModifier = 1
  const morale = calculateMorale(empire)

  if (morale === 100) moraleModifier = EMPIRE_BASELINES.moralePopulationGrowth
  
  const lowPopCompensator = Math.floor(Math.random() * 19 + 2)
  
  let populationGrowth = Math.floor((randomResourceRange(population, 0.001, 0.005) + lowPopCompensator) * RATIONS_MODIFIER[empire.rations].populationGrowth * moraleModifier) 
  
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