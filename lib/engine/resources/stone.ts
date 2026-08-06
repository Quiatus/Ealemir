import { TERRITORIES } from "@/config/buildings"
import { PRODUCTION_MODIFIER } from "@/config/empire";
import { PlayerBuildings, Production } from "@/types/game"

export function calculateStoneChange(stone: number, buildings: PlayerBuildings, production: Production) {
  const quarriesBuilt = buildings.territories?.quarry?.built || 0;
  const incomeFromQuarries = Math.ceil(quarriesBuilt * (TERRITORIES.quarry.effect.stone || 0) * PRODUCTION_MODIFIER[production].production);
  
  const totalChange = incomeFromQuarries;
  const totalStone = stone + totalChange; 

  
  return {
    stone: totalStone,
    stoneReport: {
      change: totalChange,
      gainFromQuarries: incomeFromQuarries
    }
  }
}