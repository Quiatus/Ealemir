import { TERRITORIES } from "@/config/buildings"
import { PRODUCTION_MODIFIER } from "@/config/empire";
import { PlayerBuildings, PlayerEmpire } from "@/types/game"

function calculateWoodModifiers(empire: PlayerEmpire) {
  const production = PRODUCTION_MODIFIER[empire.production].production

  return {
    production
  }
}

export function calculateWoodChange(wood: number, buildings: PlayerBuildings, empire: PlayerEmpire, woodFromEvents: number) {
  const {production} = calculateWoodModifiers(empire)
  const lumberyardsBuilt = buildings.territories?.lumberyard?.built || 0;

  const incomeFromLumberyards = Math.ceil(lumberyardsBuilt * TERRITORIES.lumberyard.effect.wood! * production);
  
  const totalChange = incomeFromLumberyards + woodFromEvents;
  const totalWood = wood + totalChange; 
  
  return {
    wood: totalWood,
    woodReport: {
      change: totalChange,
      gainFromLumberyards: incomeFromLumberyards,
      gainFromEvents: woodFromEvents
    }
  }
}