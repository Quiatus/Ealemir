'use server'

import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { INITIAL_PLAYER_BUILDINGS, INITIAL_PLAYER_EMPIRE, INITIAL_PLAYER_RESOURCES } from "../../config/initialState"
import { calculateUpdatedResources } from "../engine/resources/index"
import { redirect } from "next/navigation"
import { calculateUpdatedBuildings } from "../engine/buildings/index"
import { getData } from "../data/dal"
import { PlayerBuildings, PlayerEmpire, PlayerResources } from "@/types/game"
import { text } from "../utilities"
import { generateReport } from "../engine/empire/report"

export async function progressTurn() {
  const [currentResources, currentBuildings, currentEmpire] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings'),
    getData<PlayerEmpire>('player_empire'),
  ])

  const updatedBuildings = calculateUpdatedBuildings(currentBuildings)
  const updatedResources = calculateUpdatedResources(currentResources, updatedBuildings, currentEmpire)

  const updatedEmpire = generateReport(updatedResources, updatedBuildings, currentEmpire) 
  
  const [resourcesResult, buildingsResult, empireResults] = await Promise.all([
    supabase.from('player_resources').update(updatedResources).eq('id', 1),
    supabase.from('player_buildings').update(updatedBuildings).eq('id', 1),
    supabase.from('player_empire').update(updatedEmpire).eq('id', 1)
  ])

  if (resourcesResult.error || buildingsResult.error || empireResults.error) {
    console.error("Database update failed:", {
      resources: resourcesResult.error,
      buildings: buildingsResult.error,
      empire: empireResults.error,
    })
      
    return { 
      success: false, 
      message: text("errors.progress_turn_failed_message")
    }
  }

  revalidatePath('/', "layout");
  return { success: true }
}

export async function resetGame() {
  const [resourcesResult, buildingsResult, empireResult] = await Promise.all([
    supabase.from('player_resources').update(INITIAL_PLAYER_RESOURCES).eq('id', 1),
    supabase.from('player_buildings').update(INITIAL_PLAYER_BUILDINGS).eq('id', 1),
    supabase.from('player_empire').update(INITIAL_PLAYER_EMPIRE).eq('id', 1)
  ])

  if (resourcesResult.error || buildingsResult.error) {
    console.error("Database update failed:", {
      resources: resourcesResult.error,
      buildings: buildingsResult.error,
      empire: empireResult.error
    })
        
    return { 
      success: false, 
      message: "A dark magic prevented you from abandoning your empire." 
    }
  }

  revalidatePath('/', "layout");
  redirect('/')
}