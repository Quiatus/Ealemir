export interface GameData {
  resources: PlayerResources
}

export interface LastTurnResourceReport {
  goldReport?: {
    gainFromPopulation: number
  }
}

export interface PlayerResources {
  turn: number;
  gold: number;
  population: number;
  last_turn_resources_report: LastTurnResourceReport
}