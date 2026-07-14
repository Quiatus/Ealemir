'use server'

import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { INITIAL_GAME_STATE } from "../data/initialState"
import { calculateUpdatedResources } from "../engine/economy"

export async function progressTurn() {
  const { data: resourceData } = await supabase
    .from('player_resources')
    .select('turn, gold')
    .eq('id', 1)
    .single()

    
  if (resourceData) {
    const updatedResources = calculateUpdatedResources(resourceData)
    
    await supabase
      .from('player_resources')
      .update({ 
        turn: resourceData.turn + 1,
        gold: updatedResources.gold
       })
      .eq('id', 1)
  }

  revalidatePath('/');
}

export async function resetGame() {
  await supabase
    .from('player_resources')
    .update(INITIAL_GAME_STATE.resources)
    .eq('id', 1)

  revalidatePath('/')
}