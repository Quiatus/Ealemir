import { CAPITAL } from "@/config/rules";
import { PlayerBuildings } from "@/types/game";

export function calculateAvailableSpace(population: number, data: PlayerBuildings) {
  const maxAvailableSpace = (CAPITAL[data.capital_level - 1].space) - population
  return maxAvailableSpace
}

export function calculateUpdatedBuildings(data: PlayerBuildings) {
  return {
    ...data
  }
}