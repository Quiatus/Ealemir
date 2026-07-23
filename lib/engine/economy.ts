import { randomResourceRange } from "../utilities";
import { getPlayerResources } from "../data/resources";

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

export async function calculateUpdatedResources() {
  const data = await getPlayerResources()

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