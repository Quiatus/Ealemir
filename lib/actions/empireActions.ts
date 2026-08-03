'use server'

import { PlayerEmpire } from "@/types/game" 
import { revalidatePath } from "next/cache"
import { updateData } from "../data/dal"

export async function updateTaxPolicy(policy: 'lenient' | 'standard' | 'oppressive') {
  try {
    await updateData<PlayerEmpire>('player_empire', { taxes: policy })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to decree tax policy:", error)
  }
}