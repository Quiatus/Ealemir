import { UnitData } from "@/types/game";

export const UNITS: Record<string, UnitData> = {
  militia: {
    name: 'militia',
    unitType: ['common'],
    attackType: 'meelee',
    deity: ['none'],
    cost: {
      gold: 10,
      population: 1
    },
    monthlyRecruit: 10,
    upkeep: 0.1,
    might: 5,
    attack: 2,
    defense: 1,
    hp: 5,
    speed: 50
  }
}