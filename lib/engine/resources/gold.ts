import { TAXES_MODIFIER } from "@/config/empire"
import { GOLD_GAIN_RANGE } from "@/config/resources"
import { randomResourceRange } from "@/lib/utilities"
import { Taxes } from "@/types/game"

export function calculateGoldChange(gold: number, population: number, taxes: Taxes) {
  const incomeFromPopulation = Math.floor(randomResourceRange(population, GOLD_GAIN_RANGE.min, GOLD_GAIN_RANGE.max) * TAXES_MODIFIER[taxes].income) 
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