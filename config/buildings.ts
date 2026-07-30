import { text } from "@/lib/utilities";
import { CapitalBuildingsStaticData, CapitalStaticData, TerritoriesStaticData } from "@/types/game";

export const CAPITAL: Record<number, CapitalStaticData> = {
  1: { 
    level: 1, 
    name: text('feature_buildings.capital.level_1_name'), 
    food: 10, 
    space: 200 
  }
};

export const CAPITAL_BUILDINGS: Record<string, CapitalBuildingsStaticData> = {
  house: {
    name: text('feature_buildings.capital_buildings.house.name'), 
  }
}

export const TERRITORIES: Record<string, TerritoriesStaticData> = {
  house: {
    name: text('feature_buildings.territories.farm.name'),
  }
}