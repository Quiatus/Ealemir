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

const BASE_HOUSE = {
  name: text('feature_buildings.capital_buildings.house.name'),
  description: "",
  effect: { space: 100 }
};

export const CAPITAL_BUILDINGS: Record<string, CapitalBuildingsStaticData> = {
  house_1: {
    ...BASE_HOUSE  
  }
}

export const TERRITORIES: Record<string, TerritoriesStaticData> = {
  farm: {
    name: text('feature_buildings.territories.farm.name'),
    description: "",
    effect: { food: 5}
  },
  lumberyard: {
    name: text('feature_buildings.territories.lumberyard.name'),
    description: "",
    effect: { wood: 5}
  },
  quarry: {
    name: text('feature_buildings.territories.quarry.name'),
    description: "",
    effect: { stone: 2}
  }
}