import { taxesModifier } from "@/config/empire"
import { randomResourceRange } from "@/lib/utilities"
import { Taxes } from "@/types/game"

export function calculateGoldChange(gold: number, population: number, taxes: Taxes) {
  const incomeFromPopulation = (randomResourceRange(population, 0.075, 0.125) * taxesModifier[taxes].income) 
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