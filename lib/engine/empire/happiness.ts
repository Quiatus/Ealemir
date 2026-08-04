import { RATIONS_MODIFIER, TAXES_MODIFIER } from "@/config/empire"
import { PlayerEmpire } from "@/types/game"

export function calculateHappiness(data: PlayerEmpire): number {
  const baseline = 50
  let total = baseline + TAXES_MODIFIER[data.taxes].happiness + RATIONS_MODIFIER[data.rations].happiness

  if (total > 100) total = 100
  if (total < 0) total = 0

  return total
}