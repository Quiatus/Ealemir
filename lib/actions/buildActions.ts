'use server'

import { BuildingCostType, PlayerBuildings, PlayerResources } from "@/types/game"
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
  resources: PlayerResources;
}
 
export async function updateTerritoryBuildings({ building, buildingCost, resources}: TerritoryBuildingProps) {
  try {
    const currentBuildings = await getData<PlayerBuildings>('player_buildings')
    const updatedResources = deductResources(resources, buildingCost)
    
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