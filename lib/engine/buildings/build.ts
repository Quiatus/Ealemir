import { getData, updateData } from "@/lib/data/dal";
import { BuildingCostType, PlayerBuildings, PlayerResources } from "@/types/game";
import { revalidatePath } from "next/cache";
import { deductResources } from "../resources/resourceDeductor";
import { text } from "@/lib/utilities";

type ConstructionMutation =
  | { success: false; message: string }
  | { success: true; updatedBuildings: Partial<PlayerBuildings>; cost: BuildingCostType };

export async function processConstruction(mutateLogic: (buildings: PlayerBuildings) => ConstructionMutation) {
  try {
    const [currentBuildings, currentResources] = await Promise.all([
      getData<PlayerBuildings>('player_buildings'),
      getData<PlayerResources>('player_resources')
    ]);

    const mutationResult = mutateLogic(currentBuildings);
    
    if (!mutationResult.success) {
      return { success: false, message: mutationResult.message };
    }

    const updatedResources = deductResources(currentResources, mutationResult.cost);

    await Promise.all([
      updateData<PlayerResources>('player_resources', updatedResources),
      updateData<PlayerBuildings>('player_buildings', mutationResult.updatedBuildings)
    ]);
    
    revalidatePath('/', 'layout');
    return { success: true };
    
  } catch (error) {
    console.error("Construction failed: ", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : text("errors.construction_failed_message")
    };
  }
}

export function calculateUnlockedSpace(updatedBuildings: PlayerBuildings, unlockedLocationIds: string[]) {
  const updatedTerritories = updatedBuildings.territories

  if (unlockedLocationIds.length > 0) {
    unlockedLocationIds.forEach(element => {
      updatedTerritories[element].discovered += 1
    })
  }

  return {
    ...updatedBuildings,
    territories: updatedTerritories
  }
}