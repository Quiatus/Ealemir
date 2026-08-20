import { CAPITAL, TERRITORIES } from "@/config/buildings"
import { PlayerBuildings, PlayerEmpire } from "@/types/game"
import { PRODUCTION_MODIFIER, RATIONS_MODIFIER } from "@/config/empire";

function calculateFoodModifiers(empire: PlayerEmpire) {
  let farmModifier = 1

  empire.active_events.forEach(e => {
    if (typeof e.event.effects.modifiers?.food === 'number') farmModifier *= e.event.effects.modifiers.food
  });

  const production = PRODUCTION_MODIFIER[empire.production].production
  const consumption = PRODUCTION_MODIFIER[empire.production].consumption
  const rations = RATIONS_MODIFIER[empire.rations].consumption
  return {
    production,
    consumption,
    farmModifier,
    rations
  }
}

export function calculateFoodChange(food: number, population: number, buildings: PlayerBuildings, empire: PlayerEmpire, foodFromEvents: number) {
  const {production, consumption, farmModifier, rations} = calculateFoodModifiers(empire)
  const farmsBuilt = buildings.territories?.farm?.built || 0;

  const incomeFromCapital = CAPITAL[buildings.capital.city_level].food * production * farmModifier
  const incomeFromFarms = Math.ceil(farmsBuilt * TERRITORIES.farm.effect.food! * production * farmModifier);
  
  const consumed = Math.ceil((population / rations) * consumption);

  const totalChange = incomeFromCapital + incomeFromFarms + foodFromEvents - consumed;
  let totalFood = food + totalChange; 

  if (totalFood < 0) totalFood = 0
  
  return {
    food: totalFood,
    foodReport: {
      change: totalChange,
      gainFromCapital: incomeFromCapital,
      gainFromFarms: incomeFromFarms,
      gainFromEvents: foodFromEvents,
      consumed
    }
  }
}