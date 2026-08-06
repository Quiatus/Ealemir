import { CAPITAL, TERRITORIES } from "@/config/buildings"
import { PlayerBuildings, PlayerEmpire } from "@/types/game"
import { PRODUCTION_MODIFIER, RATIONS_MODIFIER } from "@/config/empire";

export function calculateFoodChange(food: number, population: number, buildings: PlayerBuildings, empire: PlayerEmpire) {
  const incomeFromCapital = CAPITAL[buildings.capital.city_level]?.food || 0
  const farmsBuilt = buildings.territories?.farm?.built || 0;
  const incomeFromFarms = Math.ceil(farmsBuilt * (TERRITORIES.farm.effect.food || 0) * PRODUCTION_MODIFIER[empire.production].production);
  
  const consumed = Math.ceil((population / RATIONS_MODIFIER[empire.rations].consumption) * PRODUCTION_MODIFIER[empire.production].consumption);
  const totalChange = incomeFromCapital + incomeFromFarms - consumed;
  let totalFood = food + totalChange; 

  if (totalFood < 0) {
    totalFood = 0
  }
  
  return {
    food: totalFood,
    foodReport: {
      change: totalChange,
      gainFromCapital: incomeFromCapital,
      gainFromFarms: incomeFromFarms,
      consumed
    }
  }
}