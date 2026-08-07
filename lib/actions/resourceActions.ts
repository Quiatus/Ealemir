import { PlayerResources } from "@/types/game"
import { revalidatePath } from "next/cache"
import { updateData } from "../data/dal"

export async function updateResources(resources) {
  try {
    await updateData<PlayerResources>('player_resources', { resources })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to build: ", error)
  }
}