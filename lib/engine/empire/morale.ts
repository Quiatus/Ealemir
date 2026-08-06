import { EMPIRE_BASELINES, PRODUCTION_MODIFIER, RATIONS_MODIFIER, TAXES_MODIFIER } from "@/config/empire"
import { PlayerEmpire } from "@/types/game"

export function calculateMorale(data: PlayerEmpire): number {
  let total = EMPIRE_BASELINES.morale + TAXES_MODIFIER[data.taxes].morale + RATIONS_MODIFIER[data.rations].morale + PRODUCTION_MODIFIER[data.production].morale

  if (total > 100) total = 100
  if (total < 0) total = 0

  return total
}