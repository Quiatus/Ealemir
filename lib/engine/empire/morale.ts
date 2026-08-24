import { EMPIRE_BASELINES, PRODUCTION_MODIFIER, RATIONS_MODIFIER, TAXES_MODIFIER } from "@/config/empire"
import { text } from "@/lib/utilities"
import { PlayerEmpire } from "@/types/game"

export function calculateMorale(data: PlayerEmpire, famine: boolean, isNewTurn = false) {
  let famineModifier = 0
  let riot = false
  const positive: string[] = []
  const negative: string[] = []

  if (famine) {
    famineModifier = EMPIRE_BASELINES.famineMoraleModifier
    negative.push(text('tooltips.info.morale_famine_neg'))
  }

  let morale = EMPIRE_BASELINES.morale + TAXES_MODIFIER[data.taxes].morale + RATIONS_MODIFIER[data.rations].morale + PRODUCTION_MODIFIER[data.production].morale + famineModifier

  if (TAXES_MODIFIER[data.taxes].morale > 0) positive.push(text('tooltips.info.morale_taxes_pos'))
  if (TAXES_MODIFIER[data.taxes].morale < 0) negative.push(text('tooltips.info.morale_taxes_neg'))

  if (RATIONS_MODIFIER[data.rations].morale > 0) positive.push(text('tooltips.info.morale_rations_pos'))
  if (RATIONS_MODIFIER[data.rations].morale < 0) negative.push(text('tooltips.info.morale_rations_neg'))

  if (PRODUCTION_MODIFIER[data.production].morale > 0) positive.push(text('tooltips.info.morale_production_pos'))
  if (PRODUCTION_MODIFIER[data.production].morale < 0) negative.push(text('tooltips.info.morale_production_neg'))

  if (morale > 100) morale = 100
  if (morale < 0) morale = 0

  if (morale === 0 && isNewTurn) riot = Math.random() < EMPIRE_BASELINES.riotTriggerChance

  return {
    morale,
    riot,
    positive,
    negative
  }
}