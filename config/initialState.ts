import { PlayerEmpire, PlayerResources } from "@/types/game"

export const INITIAL_PLAYER_EMPIRE: PlayerEmpire = {
  taxes: 'standard',
  rations: 'standard'
}

export const INITIAL_PLAYER_RESOURCES: PlayerResources = {
  turn: 0,
  gold: 100,
  population: 50,
  food: 5,
  wood: 20,
  stone: 5,
  fame: 0,
  last_turn_resources_report: {
    goldReport: {
      change: 0,
      gainFromPopulation: 0,
    },
    populationReport: {
      change: 0,
      gainFromGrowth: 0,
    },
    foodReport: {
      change: 0,
      gainFromCapital: 0,
      gainFromFarms: 0,
      consumed: 0
    },
    woodReport: {
      change: 0,
      gainFromLumberyards: 0
    },
    stoneReport: {
      change: 0,
      gainFromQuarries: 0
    },
    fameReport: {
      loss: 0,
      change: 0
    }
  }
}

export const INITIAL_PLAYER_BUILDINGS = {
  capital: {
    city_level: 1,
    queue: 0
  },
  capital_buildings: null,
  //territories: null,
  territories: {
    farm: {
      built: 1,
      discovered: 5
    },
    lumberyard: {
      built: 1,
      discovered: 1
    }
  },
  habitats: {
    village: {
      amount: 0
    },
    settlement: {
      amount: 0
    },
    city: {
      amount: 0,
      repair: 0
    }
  }
}
