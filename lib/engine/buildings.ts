import { getPlayerBuildings } from "../data/buildings";

export async function calculateMaxAvailableSpace() {
  const data = await getPlayerBuildings()

  return
}

export async function calculateUpdatedBuildings() {
  const data = await getPlayerBuildings()
  
  return {
    ...data
  }
}