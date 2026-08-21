'use server'

import { BuildingCostType, CapitalBuildingsStaticData } from "@/types/game"
import { CAPITAL, MAX_CAPITAL_LEVEL } from "@/config/buildings";
import { text } from "../utilities";
import { processConstruction } from "../engine/buildings/build";

interface TerritoryBuildingProps { 
  building: {
    id: string;
    built: number;
    discovered: number;
  };
  buildingCost: BuildingCostType;
}

export async function updateTerritoryBuildings({ building, buildingCost }: TerritoryBuildingProps) {
  return processConstruction((currentBuildings) => {
    const updatedTerritories = {
      ...currentBuildings.territories,
      [building.id]: {
        ...building,
        built: building.built + 1
      }
    };

    return { 
      success: true, 
      updatedBuildings: { territories: updatedTerritories }, 
      cost: buildingCost 
    };
  });
}

export async function constructCapitalBuilding(buildingData: CapitalBuildingsStaticData) {
  return processConstruction((currentBuildings) => {
    const buildingState = currentBuildings.capital_buildings?.[buildingData.id];

    if (buildingState?.isBuilt || (buildingState?.queue ?? 0) > 0) {
      return { success: false, message: text("errors.already_constructing_message") };
    }

    const updatedQueue = {
      ...currentBuildings.capital_buildings,
      [buildingData.id]: {
        ...buildingState,
        isBuilt: false,
        queue: buildingData.cost.turn
      } 
    };

    return { 
      success: true, 
      updatedBuildings: { capital_buildings: updatedQueue }, 
      cost: buildingData.cost 
    };
  });
}

export async function upgradeCityCenter() {
  return processConstruction((currentBuildings) => {
    const cityLevel = currentBuildings.capital.city_level;

    if (cityLevel === MAX_CAPITAL_LEVEL) {
      return { success: false, message: text("errors.max_level_reached") };
    }

    if (currentBuildings.capital.queue > 0) {
      return { success: false, message: text("errors.already_upgrading_message") };
    }

    const buildingData = CAPITAL[cityLevel];

    const updatedQueue = {
      ...currentBuildings.capital,
      queue: buildingData.cost.turn
    };

    return { 
      success: true, 
      updatedBuildings: { capital: updatedQueue }, 
      cost: buildingData.cost 
    };
  });
}