import { TAXES_MODIFIER } from "@/config/empire"
import { GOLD_GAIN_RANGE } from "@/config/resources"
import { randomResourceRange } from "@/lib/utilities"
import { PlayerEmpire } from "@/types/game"

function calculateGoldModifiers(empire: PlayerEmpire) {
  const production = TAXES_MODIFIER[empire.taxes].income

  return {
    production
  }
}

export function calculateGoldChange(gold: number, population: number, empire: PlayerEmpire, goldFromEvents: number) {
  const {production} = calculateGoldModifiers(empire)

  const incomeFromPopulation = Math.floor(randomResourceRange(population, GOLD_GAIN_RANGE.min, GOLD_GAIN_RANGE.max) * production) 

  const totalChange = incomeFromPopulation + goldFromEvents
  let totalGold = gold + incomeFromPopulation

  if (totalGold < 0) totalGold = 0
  
  return {
    gold: totalGold,
    goldReport: {
      change: totalChange,
      gainFromPopulation: incomeFromPopulation,
      gainFromEvents: goldFromEvents
    }
  }
}