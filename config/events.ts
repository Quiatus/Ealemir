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
  test_ongoing: {
    id: "test_ongoing",
    description: 'feature_events.ongoing.discovery_gold_description',
    type: "ongoing",
    rarity: 50,
    duration: {min: 5, max: 10},
    effects: {}

  }
}