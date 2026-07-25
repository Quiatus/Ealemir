import { CAPITAL } from "@/config/rules";
import { PlayerBuildings } from "@/types/game";

export function calculateAvailableSpace(population: number, data: PlayerBuildings) {
  const maxAvailableSpace = (CAPITAL[data.capital_level - 1].space)
  const availableSpace = maxAvailableSpace - population
  return {
    maxAvailableSpace,
    availableSpace
  }
}

export function calculateUpdatedBuildings(data: PlayerBuildings) {
  return {
    ...data
  }
}