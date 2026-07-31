import { TERRITORIES } from "@/config/buildings"
import { PlayerBuildings } from "@/types/game"

export function calculateStoneChange(stone: number, buildings: PlayerBuildings) {
  const quarriesBuilt = buildings.territories?.quarry?.built || 0;
  const incomeFromQuarries = quarriesBuilt * (TERRITORIES.quarry.effect.stone || 0);
  
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