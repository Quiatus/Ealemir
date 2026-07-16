'use server'

import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { INITIAL_PLAYER_RESOURCES } from "../../config/initialState"
import { calculateUpdatedResources } from "../engine/economy"
import { redirect } from "next/navigation"

export async function progressTurn() {
  const { data: resourceData } = await supabase
    .from('player_resources')
    .select('*')
    .eq('id', 1)
    .single()

  if (resourceData) {
    const updatedResources = calculateUpdatedResources(resourceData)
    
    await supabase
      .from('player_resources')
      .update(updatedResources)
      .eq('id', 1)
  }

  revalidatePath('/');
  redirect('/')
}

export async function resetGame() {
  await supabase
    .from('player_resources')
    .update(INITIAL_PLAYER_RESOURCES)
    .eq('id', 1)

  revalidatePath('/')
}