import { CAPITAL, POPULATION } from "@/config/rules"

export function calculateFoodChange(food: number, population: number, capitalLevel: number) {
  const incomeFromCapital = CAPITAL[capitalLevel]?.food
  const consumed = Math.ceil(population / POPULATION.basePopulationFed)
  const totalChange = incomeFromCapital - consumed
  let totalFood = food + incomeFromCapital - consumed

  if (totalFood < 0) {
    totalFood = 0
  }
  
  return {
    food: totalFood,
    foodReport: {
      change: totalChange,
      gainFromCapital: incomeFromCapital,
      consumed
    }
  }
}