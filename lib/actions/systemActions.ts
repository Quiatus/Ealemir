'use server'

import { supabase } from "../supabase"
import { revalidatePath } from "next/cache"
import { INITIAL_GAME_STATE } from "../data/initialState"

export async function progressTurn() {
  const { data } = await supabase
    .from('player_resources')
    .select('turn')
    .eq('id', 1)
    .single()
  
  if (data) {
    await supabase
      .from('player_resources')
      .update({ turn: data.turn + 1 })
      .eq('id', 1)
  }

  revalidatePath('/');
}

export async function resetGame() {
  await supabase
    .from('player_resources')
    .upsert(INITIAL_GAME_STATE)

  revalidatePath('/')
}