import { GameEventConfig } from "@/types/game";

export const ONE_EVENT_CHANCE = 0.75
export const TWO_EVENT_CHANCE = 0.90
export const THREE_EVENT_CHANCE = 0.98

export const ALL_EVENTS: Record<string, GameEventConfig> = {
  // RESOURCES ----------------------------------------------------------------

  gold_early_a: {
    id: "gold_early_a",
    description: 'feature_events.instant.gold_early_a',
    type: "instant",
    conditions: {
      maxTurn: 200
    },
    rarity: 80,
    effects: {
      resources: { gold: {min: 10, max: 50} }
    }
  },
  gold_early_b: {
    id: "gold_early_b",
    description: 'feature_events.instant.gold_early_b',
    type: "instant",
    conditions: {
      maxTurn: 300
    },
    rarity: 30,
    effects: {
      resources: { gold: {min: 10, max: 100} }
    }
  },
  gold_early_c: {
    id: "gold_early_c",
    description: 'feature_events.instant.gold_early_c',
    type: "instant",
    conditions: {
      maxTurn: 400
    },
    rarity: 10,
    effects: {
      resources: { gold: {min: 10, max: 250} }
    }
  },
  food_early_a: {
    id: "food_early_a",
    description: 'feature_events.instant.food_early_a',
    type: "instant",
    conditions: {
      maxTurn: 200
    },
    rarity: 80,
    effects: {
      resources: { food: {min: 5, max: 10} }
    }
  },
  food_early_b: {
    id: "food_early_b",
    description: 'feature_events.instant.food_early_b',
    type: "instant",
    conditions: {
      maxTurn: 250
    },
    rarity: 30,
    effects: {
      resources: { food: {min: 5, max: 25} }
    }
  },
  food_early_c: {
    id: "food_early_c",
    description: 'feature_events.instant.food_early_c',
    type: "instant",
    conditions: {
      maxTurn: 300
    },
    rarity: 10,
    effects: {
      resources: { food: {min: 5, max: 50} }
    }
  },
  wood_early_a: {
    id: "wood_early_a",
    description: 'feature_events.instant.wood_early_a',
    type: "instant",
    conditions: {
      maxTurn: 200
    },
    rarity: 60,
    effects: {
      resources: { wood: {min: 5, max: 10} }
    }
  },
  wood_early_b: {
    id: "wood_early_b",
    description: 'feature_events.instant.wood_early_b',
    type: "instant",
    conditions: {
      maxTurn: 300
    },
    rarity: 25,
    effects: {
      resources: { wood: {min: 5, max: 20} }
    }
  },
  wood_early_c: {
    id: "wood_early_c",
    description: 'feature_events.instant.wood_early_c',
    type: "instant",
    conditions: {
      maxTurn: 400
    },
    rarity: 5,
    effects: {
      resources: { wood: {min: 5, max: 50} }
    }
  },
  stone_early_a: {
    id: "stone_early_a",
    description: 'feature_events.instant.stone_early_a',
    type: "instant",
    conditions: {
      maxTurn: 200
    },
    rarity: 30,
    effects: {
      resources: { stone: {min: 2, max: 10} }
    }
  },
  stone_early_b: {
    id: "stone_early_b",
    description: 'feature_events.instant.stone_early_b',
    type: "instant",
    conditions: {
      maxTurn: 300
    },
    rarity: 10,
    effects: {
      resources: { stone: {min: 5, max: 20} }
    }
  },

  // TERRITORIES --------------------------------------------------------------

  fertile_land: {
    id: "fertile_land",
    description: 'feature_events.instant.fertile_land',
    type: "instant",
    rarity: 15,
    effects: {
      unlockLocationId: 'farm'
    }
  },
  lush_forest: {
    id: "lush_forest",
    description: 'feature_events.instant.lush_forest',
    type: "instant",
    rarity: 10,
    effects: {
      unlockLocationId: 'lumberyard'
    }
  },
  stone_deposit: {
    id: "stone_deposit",
    description: 'feature_events.instant.stone_deposit',
    type: "instant",
    rarity: 5,
    effects: {
      unlockLocationId: 'quarry'
    }
  },

  // ONGOING ------------------------------------------------------------------

  bountiful_harvest: {
    id: "bountiful_harvest",
    exclusiveEventIds: ["drought"],
    description: 'feature_events.ongoing.bountiful_harvest',
    type: "ongoing",
    rarity: 10,
    duration: {min: 2, max: 10},
    effects: {
      modifiers: {food: 2}
    }
  },
  drought: {
    id: "drought",
    exclusiveEventIds: ["bountiful_harvest"],
    description: 'feature_events.ongoing.drought',
    type: "ongoing",
    rarity: 5,
    duration: {min: 5, max: 10},
    effects: {
      modifiers: {food: 0}
    }
  }
}