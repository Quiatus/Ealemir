import { PlayerBuildings } from "@/types/game"
import { calculateMaxSpace } from "../buildings/checks";

export function checkOverpopulation(buildings: PlayerBuildings, population: number): boolean {
  const maxAvailableSpace = calculateMaxSpace(buildings);
  return population > maxAvailableSpace
}

export function statusRiot(){
  return null
}

export function checkFamine(food: number): boolean {
  return food <= 0
}