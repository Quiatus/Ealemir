import { TERRITORIES } from "@/config/buildings"
import { PRODUCTION_MODIFIER } from "@/config/empire";
import { PlayerBuildings, PlayerEmpire } from "@/types/game"

function calculateStoneModifiers(empire: PlayerEmpire) {
  const production = PRODUCTION_MODIFIER[empire.production].production

  return {
    production
  }
}

export function calculateStoneChange(stone: number, buildings: PlayerBuildings, empire: PlayerEmpire, stoneFromEvents: number) {
  const {production} = calculateStoneModifiers(empire)
  const quarriesBuilt = buildings.territories?.quarry?.built || 0;

  const incomeFromQuarries = Math.ceil(quarriesBuilt * TERRITORIES.quarry.effect.stone! * production);
  
  const totalChange = incomeFromQuarries + stoneFromEvents;
  const totalStone = stone + totalChange; 

  return {
    stone: totalStone,
    stoneReport: {
      change: totalChange,
      gainFromQuarries: incomeFromQuarries,
      gainFromEvents: stoneFromEvents
    }
  }
}