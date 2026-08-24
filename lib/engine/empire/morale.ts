import { EMPIRE_BASELINES, PRODUCTION_MODIFIER, RATIONS_MODIFIER, TAXES_MODIFIER } from "@/config/empire"
import { PlayerEmpire } from "@/types/game"

export function calculateMorale(data: PlayerEmpire, famine: boolean, isNewTurn = false) {
  let famineModifier = 0
  let riot = false

  if (famine) famineModifier = EMPIRE_BASELINES.famineMoraleModifier

  let morale = EMPIRE_BASELINES.morale + TAXES_MODIFIER[data.taxes].morale + RATIONS_MODIFIER[data.rations].morale + PRODUCTION_MODIFIER[data.production].morale + famineModifier

  if (morale > 100) morale = 100
  if (morale < 0) morale = 0

  if (morale === 0 && isNewTurn) {
    riot = Math.random() < EMPIRE_BASELINES.riotTriggerChance
    console.log(riot)
  }

  return {
    morale,
    riot
  }
}