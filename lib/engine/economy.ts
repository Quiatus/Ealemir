import { PlayerResources } from "@/types/game";

export function calculateUpdatedResources(data: PlayerResources) {
  return {gold: data.gold + 10}
}