import { PlayerBuildings } from "@/types/game"
import { revalidatePath } from "next/cache"
import { updateData } from "../data/dal"

export async function updateBuildings(building) {
  try {
    await updateData<PlayerBuildings>('player_buildings', { building })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to build: ", error)
  }
}