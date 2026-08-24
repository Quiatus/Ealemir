import { PlayerBuildings, PlayerEmpire } from "@/types/game"
import { calculateFreeSpace, calculateMaxSpace } from "../buildings/checks"
import { randomResourceRange } from "@/lib/utilities"
import { EMPIRE_BASELINES, RATIONS_MODIFIER } from "@/config/empire";
import { calculateMorale } from "../empire/morale";
import { FAMINE_DEATHS_RANGE, FAMINE_LEFT_RANGE, OVERPOPULATION_LEFT_RANGE, POPULATION_GAIN_RANGE, RIOT_DEATHS_RANGE } from "@/config/resources";

function checkOverpopulation(buildings: PlayerBuildings, population: number): boolean {
  const maxAvailableSpace = calculateMaxSpace(buildings);
  return population > maxAvailableSpace
}

function calculatePopulationModifiers(empire: PlayerEmpire, famine: boolean) {
  let moraleModifier = 1
  const {morale, riot} = calculateMorale(empire, famine, true)
  const lowPopCompensator = Math.floor(Math.random() * 19 + 2)
  const rations = RATIONS_MODIFIER[empire.rations].populationGrowth

  if (morale === 100) moraleModifier = EMPIRE_BASELINES.moralePopulationGrowth

  return {
    lowPopCompensator,
    moraleModifier,
    rations,
    riot
  }
}

function calculateDesertionLoses(overpopulation: boolean, famine: boolean, population: number) {
  let lostOverpopulation = 0
  let lostFamine = 0
  let totalLostDesertion = 0

  if (overpopulation) {
    lostOverpopulation = Math.ceil(randomResourceRange(population, OVERPOPULATION_LEFT_RANGE.min, OVERPOPULATION_LEFT_RANGE.max))
  }

  if (famine) {
    lostFamine = Math.ceil(randomResourceRange(population, FAMINE_LEFT_RANGE.min, FAMINE_LEFT_RANGE.max))
  }

  totalLostDesertion = lostOverpopulation + lostFamine

  return {
    lostOverpopulation,
    lostFamine,
    totalLostDesertion
  }
}

function calculateDeathLoses(population: number, famine: boolean, riot: boolean) {
  let deathsFamine = 0
  let deathsRiot = 0
  let totalDeaths = 0

  if (famine) {
    deathsFamine = Math.ceil(randomResourceRange(population, FAMINE_DEATHS_RANGE.min, FAMINE_DEATHS_RANGE.max))
  }

  if (riot) {
    deathsRiot = Math.ceil(randomResourceRange(population, RIOT_DEATHS_RANGE.min, RIOT_DEATHS_RANGE.max))
  }

  totalDeaths = deathsFamine + deathsRiot

  return {
    totalDeaths,
    deathsRiot,
    deathsFamine
  }
}

export function calculatePopulationChange(population: number, buildings: PlayerBuildings, empire: PlayerEmpire, populationFromEvents: number, famine: boolean) {
  const {lowPopCompensator, moraleModifier, rations, riot} = calculatePopulationModifiers(empire, famine)
  const avaiableSpace = calculateFreeSpace(population, buildings)
  const overpopulation = checkOverpopulation(buildings, population)
  const {lostOverpopulation, lostFamine, totalLostDesertion} = calculateDesertionLoses(overpopulation, famine, population)
  const {deathsFamine, deathsRiot, totalDeaths} = calculateDeathLoses(population, famine, riot)
  
  let populationGrowth = Math.ceil((randomResourceRange(population, POPULATION_GAIN_RANGE.min, POPULATION_GAIN_RANGE.max) + lowPopCompensator) * rations * moraleModifier) 
  
  if (avaiableSpace <= 0 || overpopulation) populationGrowth = 0
  if (!overpopulation && populationGrowth > avaiableSpace) populationGrowth = avaiableSpace

  const totalChange = populationGrowth + populationFromEvents - totalLostDesertion - totalDeaths
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
      lostFamine,
      lostDeath: totalDeaths,
      deathsFamine,
      deathsRiot
    }
  }
}