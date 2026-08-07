import { PlayerResources } from "@/types/game"

export type UniversalCost = Partial<Record<keyof PlayerResources, number>>;

export function deductResources( currentResources: PlayerResources, cost: UniversalCost ): PlayerResources {
  const updatedResources = { ...currentResources };

  for (const [resourceKey, amount] of Object.entries(cost)) {
    const key = resourceKey as keyof PlayerResources;
    const costAmount = amount as number;

    if (!costAmount) continue;

    if ((currentResources[key] as number) < costAmount) {
      throw new Error(`Insufficient ${key} to complete this action.`);
    }

    (updatedResources[key] as number) -= costAmount;
  }

  return updatedResources;
}