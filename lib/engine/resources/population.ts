import { PlayerBuildings, PlayerEmpire } from "@/types/game"
import { calculateFreeSpace } from "../buildings/checks"
import { randomResourceRange } from "@/lib/utilities"
import { EMPIRE_BASELINES, RATIONS_MODIFIER } from "@/config/empire";
import { calculateMorale } from "../empire/morale";
import { OVERPOPULATION_LEFT_RANGE, POPULATION_GAIN_RANGE } from "@/config/resources";
import { checkOverpopulation } from "../empire/status";

function calculatePopulationModifiers(empire: PlayerEmpire) {
  let moraleModifier = 1
  const morale = calculateMorale(empire)
  const lowPopCompensator = Math.floor(Math.random() * 19 + 2)
  const rations = RATIONS_MODIFIER[empire.rations].populationGrowth

  if (morale === 100) moraleModifier = EMPIRE_BASELINES.moralePopulationGrowth

  return {
    lowPopCompensator,
    moraleModifier,
    rations
  }
}

function calculateDesertionLoses(overpopulation: boolean, population: number) {
  let lostOverpopulation = 0
  let totalLostDesertion = 0

  if (overpopulation) {
    lostOverpopulation = Math.floor(randomResourceRange(population, OVERPOPULATION_LEFT_RANGE.min, OVERPOPULATION_LEFT_RANGE.max))
  }

  totalLostDesertion = lostOverpopulation

  return {
    lostOverpopulation,
    totalLostDesertion
  }
}

export function calculatePopulationChange(population: number, buildings: PlayerBuildings, empire: PlayerEmpire, populationFromEvents: number) {
  const {lowPopCompensator, moraleModifier, rations} = calculatePopulationModifiers(empire)
  const avaiableSpace = calculateFreeSpace(population, buildings)
  const overpopulation = checkOverpopulation(buildings, population)
  const {lostOverpopulation, totalLostDesertion} = calculateDesertionLoses(overpopulation, population)
  
  let populationGrowth = Math.floor((randomResourceRange(population, POPULATION_GAIN_RANGE.min, POPULATION_GAIN_RANGE.max) + lowPopCompensator) * rations * moraleModifier) 
  
  if (avaiableSpace <= 0 || overpopulation) populationGrowth = 0
  if (!overpopulation && populationGrowth > avaiableSpace) populationGrowth = avaiableSpace

  const totalChange = populationGrowth + populationFromEvents - totalLostDesertion
  let totalPopulation = population + totalChange

  if (totalPopulation < 0) totalPopulation = 0

  return {
    population: totalPopulation,
    populationReport: {
      change: totalChange,
      gainFromGrowth: populationGrowth,
      gainFromEvents: populationFromEvents,
      lostDesertion: totalLostDesertion,
      lostOverpopulation,
      lostDeath: 0
    }
  }
}