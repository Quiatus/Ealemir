import { PlayerBuildings } from "@/types/game";

export function calculateUpdatedBuildings(data: PlayerBuildings) {
  const updatedCapitalBuildings = { ...data.capital_buildings };
  const updatedCityCenter = { ...data.capital };
  const finishedConstruction: string[] = []

  if (updatedCityCenter.queue > 1) {
    updatedCityCenter.queue -= 1
  } else if (updatedCityCenter.queue === 1) {
    updatedCityCenter.city_level += 1
    updatedCityCenter.queue = 0
    finishedConstruction.push('Capital City')
  }

  for (const [buildingId, state] of Object.entries(updatedCapitalBuildings)) {
    if (!state.isBuilt && state.queue > 0) {
      if (state.queue > 1) {
        updatedCapitalBuildings[buildingId] = {
          ...state,
          queue: state.queue - 1
        };
      } else if (state.queue === 1) {
        finishedConstruction.push(state.name)
        updatedCapitalBuildings[buildingId] = {
          ...state,
          isBuilt: true,
          queue: 0
        };
      }
    }
  }

  return {
    ...data,
    finished: finishedConstruction.join(','),
    capital: updatedCityCenter,
    capital_buildings: updatedCapitalBuildings
  };
}