import { CAPITAL } from "@/config/rules";
import { PlayerBuildings } from "@/types/game";

export function calculateFreeSpace(population: number, data: PlayerBuildings) {
  const availableSpace = calculateMaxSpace(data) - population
  return availableSpace
}

export function calculateMaxSpace(data: PlayerBuildings) {
  const currentLevel = data.capital_buildings.city_level;
  const maxAvailableSpace = CAPITAL[currentLevel]?.space || 0
  return maxAvailableSpace
}