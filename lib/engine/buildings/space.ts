import { CAPITAL, CAPITAL_BUILDINGS, HABITATS } from "@/config/buildings";
import { PlayerBuildings } from "@/types/game";

export function calculateFreeSpace(population: number, data: PlayerBuildings) {
  const availableSpace = calculateMaxSpace(data) - population
  return availableSpace
}

export function calculateMaxSpace(data: PlayerBuildings) {
  const spaceFromCapital = CAPITAL[data.capital.city_level]?.space || 0
  let spaceFromHouses = 0

  const spaceFromHabitats = 
    (data.habitats.village.amount * HABITATS.village.space)
    + (data.habitats.settlement.amount * HABITATS.settlement.space)
    + (data.habitats.city.amount * HABITATS.city.space)

  const activeBuildings = Object.entries(data.capital_buildings || {});
  for (const [buildingId, state] of activeBuildings) {

    if (state.isBuild) {
    const staticData = CAPITAL_BUILDINGS[buildingId];

      if (staticData?.effect?.space) {
        spaceFromHouses += staticData.effect.space;
      }
    }
  }

  return spaceFromCapital + spaceFromHouses + spaceFromHabitats
}