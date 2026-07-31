import { TERRITORIES } from "@/config/buildings"
import { PlayerBuildings } from "@/types/game"

export function calculateWoodChange(wood: number, buildings: PlayerBuildings) {
  const lumberyardsBuilt = buildings.territories?.lumberyard?.built || 0;
  const incomeFromLumberyards = lumberyardsBuilt * (TERRITORIES.lumberyard.effect.wood || 0);
  
  const totalChange = incomeFromLumberyards;
  const totalWood = wood + totalChange; 

  
  return {
    wood: totalWood,
    woodReport: {
      change: totalChange,
      gainFromLumberyards: incomeFromLumberyards
    }
  }
}