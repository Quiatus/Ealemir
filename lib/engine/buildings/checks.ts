import { BuildingCostType, PlayerResources, PlayerBuildings } from "@/types/game";
import { CAPITAL, CAPITAL_BUILDINGS, HABITATS } from "@/config/buildings";

type buildingProp = {
  built: number;
  discovered: number;
}

export function disableBuildButton( buildingCost: BuildingCostType, resources: PlayerResources, building?: buildingProp) {
  let disable = false
  let missingSpace = false
  const missingCosts = []

  if (building && (building.built === building.discovered)) {
    disable = true
    missingSpace = true
  }

  if (buildingCost.gold > resources.gold) {
    disable = true
    missingCosts.push('gold')
  }

  if (buildingCost.wood > resources.wood) {
    disable = true
    missingCosts.push('wood')
  }

  if (buildingCost.stone > resources.stone) {
    disable = true
    missingCosts.push('stone')
  }

  return {
    disable,
    missingSpace,
    missingCosts
  }
}

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

    if (state.isBuilt) {
    const staticData = CAPITAL_BUILDINGS[buildingId];

      if (staticData?.effect?.space) {
        spaceFromHouses += staticData.effect.space;
      }
    }
  }

  return spaceFromCapital + spaceFromHouses + spaceFromHabitats
}