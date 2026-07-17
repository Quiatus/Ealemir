import { PlayerResources } from "@/types/game";
import { randomResourceRange } from "../utilities";

function calculateGoldGain(gold: number, population: number) {
  const incomeFromPopulation = randomResourceRange(population, 0.075, 0.125)
  const totalGold = gold + incomeFromPopulation
  const totalGain = incomeFromPopulation
  return {
    gold: totalGold,
    goldReport: {
      change: totalGain,
      gainFromPopulation: incomeFromPopulation
    }
  }
}

export function calculateUpdatedResources(data: PlayerResources): PlayerResources {
  const updatedGold = calculateGoldGain(data.gold, data.population)
 
  return {
    ...data,
    turn: data.turn + 1,
    gold: updatedGold.gold,
    last_turn_resources_report: {
      goldReport: updatedGold.goldReport
    }
  }
}