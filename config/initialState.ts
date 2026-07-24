import { PlayerBuildings, PlayerResources } from "@/types/game";

export const INITIAL_PLAYER_RESOURCES: PlayerResources = {
  turn: 0,
  gold: 100,
  population: 10,
  last_turn_resources_report: {
    goldReport: {
      change: 0,
      gainFromPopulation: 0,
    },
    populationReport: {
      change: 0,
      gainFromGrowth: 0,
    }
  }
}

export const INITIAL_PLAYER_BUILDINGS: PlayerBuildings = {
  capital_level: 1,
  capital_house: 0
}