import { CapitalBuildingsStaticData, CapitalBuildingState } from "@/types/game";

interface CapitalBuildingSlotProps {
  buildingData: CapitalBuildingsStaticData;
  dbState?: CapitalBuildingState;
}

export default function CapitalBuildingSlot({ buildingData, dbState }: CapitalBuildingSlotProps) {
  const isBuilt = dbState?.isBuilt ?? false;
  const isConstructing = !isBuilt && (dbState?.queue ?? 0) > 0;

  let progress = 0

  if (isConstructing) {
    progress = ((buildingData.cost.turn - (dbState?.queue || 0)) / buildingData.cost.turn ) * 100
  }

  return (
      <span>
        {isBuilt ? "X" : ""}
        {isConstructing ? `${progress}%` : ""}
      </span>
  );
}