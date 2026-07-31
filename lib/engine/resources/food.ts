import { POPULATION } from "@/config/resources"
import { CAPITAL, TERRITORIES } from "@/config/buildings"
import { PlayerBuildings } from "@/types/game"

export function calculateFoodChange(food: number, population: number, buildings: PlayerBuildings) {
  const incomeFromCapital = CAPITAL[buildings.capital.city_level]?.food || 0
  const farmsBuilt = buildings.territories?.farm?.built || 0;
  const incomeFromFarms = farmsBuilt * (TERRITORIES.farm.effect.food || 0);
  
  const consumed = Math.ceil(population / POPULATION.basePopulationFed);
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