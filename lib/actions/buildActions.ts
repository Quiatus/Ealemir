'use server'

import { BuildingCostType, CapitalBuildingsStaticData, PlayerBuildings, PlayerResources } from "@/types/game"
import { revalidatePath } from "next/cache"
import { getData, updateData } from "../data/dal"
import { deductResources } from "../engine/resources/resourceDeductor";
import { text } from "../utilities";

interface TerritoryBuildingProps { 
  building: {
    name: string;
    built: number;
    discovered: number;
  };
  buildingCost: BuildingCostType;
}
 
export async function updateTerritoryBuildings({ building, buildingCost}: TerritoryBuildingProps) {
  try {
    const [currentBuildings, currentResources] = await Promise.all([
      getData<PlayerBuildings>('player_buildings'),
      getData<PlayerResources>('player_resources')
    ]);
    const updatedResources = deductResources(currentResources, buildingCost)
    
    const updatedBuilding = {
      ...building,
      built: building.built + 1
    }

    const updatedTerritories = {
      ...currentBuildings.territories,
      [building.name]: updatedBuilding 
    }

    await Promise.all([
      updateData<PlayerResources>('player_resources', updatedResources),
      updateData<PlayerBuildings>('player_buildings', {territories: updatedTerritories})
    ])
    
    revalidatePath('/', 'layout')
    return { success: true }
    
  } catch (error) {
    console.error("Failed to build: ", error)

    return { 
      success: false, 
      message: text("errors.construction_failed_message")
    }
  }
}

export async function constructCapitalBuilding(buildingData: CapitalBuildingsStaticData) {
  try {
    const [currentBuildings, currentResources] = await Promise.all([
      getData<PlayerBuildings>('player_buildings'),
      getData<PlayerResources>('player_resources')
    ]);

    const buildingState = currentBuildings.capital_buildings?.[buildingData.id];

    if (buildingState?.isBuilt || (buildingState?.queue ?? 0) > 0) {
      return { 
        success: false, 
        message: text("errors.already_constructing_message") 
      };
    }

    const updatedResources = deductResources(currentResources, buildingData.cost)

    const updatedQueue = {
      ...currentBuildings.capital_buildings,
      [buildingData.id]: {
        isBuilt: false,
        queue: buildingData.cost.turn
      } 
    }

    await Promise.all([
      updateData<PlayerResources>('player_resources', updatedResources),
      updateData<PlayerBuildings>('player_buildings', {capital_buildings: updatedQueue})
    ])
    
    revalidatePath('/', 'layout')
    return { success: true }
    
  } catch (error) {
    console.error("Failed to build: ", error)

    return { 
      success: false, 
      message: text("errors.construction_failed_message")
    }
  }
}