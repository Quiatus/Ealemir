import { GameEventConfig } from "@/types/game";

export const ALL_EVENTS: Record<string, GameEventConfig> = {
  test_gold: {
    id: "test_gold",
    description: 'feature_events.instant.discovery_gold_description',
    type: "instant",
    rarity: 80,
    effects: {
      resources: { gold: {min: 50, max: 150} }
    }
  },
  bountiful_harvest: {
    id: "bountiful_harvest",
    exclusiveEventIds: ["drought"],
    description: 'feature_events.ongoing.bountiful_harvest',
    type: "ongoing",
    rarity: 50,
    duration: {min: 5, max: 10},
    effects: {
      modifiers: {food: 2}
    }
  },
  drought: {
    id: "drought",
    exclusiveEventIds: ["bountiful_harvest"],
    description: 'feature_events.ongoing.drought',
    type: "ongoing",
    rarity: 20,
    duration: {min: 5, max: 10},
    effects: {
      modifiers: {food: 0}
    }
  },
}



