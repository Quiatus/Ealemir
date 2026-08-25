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
  gold: 200,
  population: 100,
  food: 5,
  wood: 20,
  stone: 5,
  fame: 0,
  last_turn_resources_report: {
    goldReport: {
      change: 0,
      gainFromPopulation: 0,
      gainFromEvents: 0
    },
    populationReport: {
      change: 0,
      gainFromGrowth: 0,
      gainFromEvents: 0,
      lostDesertion: 0,
      lostOverpopulation: 0,
      lostFamine: 0,
      lostDeath: 0,
      deathsFamine: 0,
      deathsRiot: 0
    },
    foodReport: {
      change: 0,
      gainFromCapital: 0,
      gainFromFarms: 0,
      gainFromEvents: 0,
      famine: false,
      consumed: 0
    },
    woodReport: {
      change: 0,
      gainFromLumberyards: 0,
      gainFromEvents: 0
    },
    stoneReport: {
      change: 0,
      gainFromQuarries: 0,
      gainFromEvents: 0
    },
    fameReport: {
      loss: 0,
      lossFamine: 0,
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
      id: "farm",
      built: 0,
      discovered: 0
    },
    lumberyard: {
      id: "lumberyard",
      built: 0,
      discovered: 0
    },
    quarry: {
      id: "quarry",
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
