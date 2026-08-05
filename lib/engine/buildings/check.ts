import { BuildingCostType, PlayerResources } from "@/types/game";

type buildingProp = {
  built: number;
  discovered: number;
}

export function disableBuildButton( building: buildingProp, buildingCost: BuildingCostType, resources: PlayerResources) {
  let disable = false
  const missingCosts = []

  if (building.built === building.discovered) {
    disable = true
    missingCosts.push('space')
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
    missingCosts
  }
}