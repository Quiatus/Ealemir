import { PlayerBuildings, PlayerResources } from "@/types/game";

export const INITIAL_PLAYER_RESOURCES: PlayerResources = {
  turn: 0,
  gold: 100,
  population: 200,
  last_turn_resources_report: {
    goldReport: {
      gainFromPopulation: 0,
      change: 0
    }
  }
}

export const INITIAL_PLAYER_BUILDINGS: PlayerBuildings = {
  capital_level: 1,
  capital_house: 0
}