import { PlayerResources } from "@/types/game"

export const INITIAL_PLAYER_EMPIRE = {
  taxes: 'customary',
  rations: 'sufficient',
  production: 'steady',
  monthly_report: {
    empire: [],
    scouts: [],
    events: []
  },
  active_events: null
}

export const INITIAL_PLAYER_RESOURCES: PlayerResources = {
  turn: 0,
  gold: 1000,
  population: 50,
  food: 5,
  wood: 200,
  stone: 50,
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
  capital_buildings: {
    house01: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house02: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house03: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house04: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house05: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house06: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house07: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    house08: {
      isBuilt: false,
      name: 'house',
      queue: 0
    },
    tavern: {
      isBuilt: false,
      name: 'tavern',
      queue: 0
    }
  },
  territories: {
    farm: {
      name: "farm",
      built: 0,
      discovered: 1
    },
    lumberyard: {
      name: "lumberyard",
      built: 0,
      discovered: 0
    },
    quarry: {
      name: "quarry",
      built: 0,
      discovered: 0
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
  },
  finished: ''
}
