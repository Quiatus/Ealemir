'use server'

import { PlayerEmpire, Production, Rations, Taxes } from "@/types/game" 
import { revalidatePath } from "next/cache"
import { updateData } from "../data/dal"

export async function updateTaxPolicy(policy: Taxes) {
  try {
    await updateData<PlayerEmpire>('player_empire', { taxes: policy })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to change policy:", error)
  }
}

export async function updateRationPolicy(policy: Rations) {
  try {
    await updateData<PlayerEmpire>('player_empire', { rations: policy })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to change policy:", error)
  }
}

export async function updateProductionPolicy(policy: Production) {
  try {
    await updateData<PlayerEmpire>('player_empire', { production: policy })
    revalidatePath('/')
  } catch (error) {
    console.error("Failed to change policy:", error)
  }
}