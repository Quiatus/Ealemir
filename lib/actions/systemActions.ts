'use server'

import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { INITIAL_PLAYER_BUILDINGS, INITIAL_PLAYER_RESOURCES } from "../../config/initialState"
import { calculateUpdatedResources } from "../engine/resources/index"
import { redirect } from "next/navigation"
import { calculateUpdatedBuildings } from "../engine/buildings/index"
import { getData } from "../data/dal"
import { PlayerBuildings, PlayerResources } from "@/types/game"

export async function progressTurn() {
  const [currentResources, currentBuildings] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings')
  ])

  const updatedBuildings = calculateUpdatedBuildings(currentBuildings)
  const updatedResources = calculateUpdatedResources(currentResources, updatedBuildings)
  
  const [resourcesResult, buildingsResult] = await Promise.all([
    supabase.from('player_resources').update(updatedResources).eq('id', 1),
    supabase.from('player_buildings').update(updatedBuildings).eq('id', 1)
  ])

  if (resourcesResult.error || buildingsResult.error) {
    console.error("Database update failed:", {
      resources: resourcesResult.error,
      buildings: buildingsResult.error
    })
      
    return { 
      success: false, 
      message: "A dark magic disrupted the realm. Your turn could not be completed." 
    }
  }

  revalidatePath('/', "layout");
  return { success: true }
}

export async function resetGame() {
  const [resourcesResult, buildingsResult] = await Promise.all([
    supabase.from('player_resources').update(INITIAL_PLAYER_RESOURCES).eq('id', 1),
    supabase.from('player_buildings').update(INITIAL_PLAYER_BUILDINGS).eq('id', 1)
  ])

  if (resourcesResult.error || buildingsResult.error) {
    console.error("Database update failed:", {
      resources: resourcesResult.error,
      buildings: buildingsResult.error
    })
        
    return { 
      success: false, 
      message: "A dark magic prevented you from abandoning your empire." 
    }
  }

  revalidatePath('/', "layout");
  redirect('/')
}