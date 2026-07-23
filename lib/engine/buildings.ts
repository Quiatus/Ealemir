import { CAPITAL } from "@/config/rules";
import { getPlayerBuildings } from "../data/buildings";
import { PlayerBuildings } from "@/types/game";

export function calculateMaxAvailableSpace(population: number, data: PlayerBuildings) {
  const maxAvailableSpace = population - (CAPITAL[data.capital_level - 1].space)

  return maxAvailableSpace
}

export async function calculateUpdatedBuildings() {
  const data = await getPlayerBuildings()
  
  return {
    ...data
  }
}