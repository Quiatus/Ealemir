import { FAME_LOSS_RANGE } from "@/config/resources"
import { randomResourceRange } from "@/lib/utilities"

export function calculateFameChange(fame: number, famine: boolean) {
  let totalLostFame = 0
  let lossFamine = 0

  if (fame > 0 && famine) {
    lossFamine = Math.floor(randomResourceRange(fame, FAME_LOSS_RANGE.min, FAME_LOSS_RANGE.max))
  }

  totalLostFame = lossFamine
  const totalChange = 0 - totalLostFame
  let totalFame = fame + totalChange

  if (totalFame < 0) totalFame = 0

  return {
    fame: totalFame,
    fameReport: {
      lossFamine,
      loss: totalLostFame,
      change: totalChange
    }
  }
}