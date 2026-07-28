import { randomResourceRange } from "@/lib/utilities"

export function calculateGoldChange(gold: number, population: number) {
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