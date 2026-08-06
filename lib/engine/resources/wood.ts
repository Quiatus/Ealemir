import { TERRITORIES } from "@/config/buildings"
import { PRODUCTION_MODIFIER } from "@/config/empire";
import { PlayerBuildings, Production } from "@/types/game"

export function calculateWoodChange(wood: number, buildings: PlayerBuildings, production: Production) {
  const lumberyardsBuilt = buildings.territories?.lumberyard?.built || 0;
  const incomeFromLumberyards = Math.ceil(lumberyardsBuilt * (TERRITORIES.lumberyard.effect.wood || 0) * PRODUCTION_MODIFIER[production].production);
  
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