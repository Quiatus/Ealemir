import { text } from "@/lib/utilities";
import { CapitalBuildingsStaticData, CapitalStaticData, TerritoriesStaticData } from "@/types/game";

export const MAX_CAPITAL_LEVEL = 2

export const CAPITAL: Record<number, CapitalStaticData> = {
  1: { 
    level: 1, 
    name: text('feature_buildings.capital.name'),
    levelName: text('feature_buildings.capital.level_1_title'), 
    food: 10, 
    space: 200,
    cost: { turn: 5, gold: 500, wood: 10, stone: 2 },
  },
  2: { 
    level: 2, 
    name: text('feature_buildings.capital.name'),
    levelName: text('feature_buildings.capital.level_2_title'), 
    food: 50, 
    space: 500,
    cost: { turn: 100, gold: 50000, wood: 1000, stone: 200 },
  }
};

const BASE_HOUSE = {
  name: text('feature_buildings.capital_buildings.house.name'),
  description: text('feature_buildings.capital_buildings.house.description'),
  effect: { space: 100 },
  cost: { turn: 5, gold: 500, wood: 10, stone: 0 },
};

export const CAPITAL_BUILDINGS: Record<string, CapitalBuildingsStaticData> = {
  house01: {
    ...BASE_HOUSE,
    id: 'house01',
    unlockLevel: 1,
    pos: {
      width: 35, 
      height: 35, 
      left: 445, 
      top: 450
    }  
  },
  house02: {
    ...BASE_HOUSE,
    id: 'house02',
    unlockLevel: 1,
    pos: {
      width: 35, 
      height: 35, 
      left: 430, 
      top: 500
    }     
  },
  house03: {
    ...BASE_HOUSE,
    id: 'house03',
    unlockLevel: 1,
    pos: {
      width: 35, 
      height: 35, 
      left: 467, 
      top: 540
    }    
  },
  house04: {
    ...BASE_HOUSE,
    id: 'house04',
    unlockLevel: 1,
    pos: {
      width: 35, 
      height: 35, 
      left: 525, 
      top: 545
    }    
  }
}

export const TERRITORIES: Record<string, TerritoriesStaticData> = {
  farm: {
    name: text('feature_buildings.territories.farm.name'),
    effect: { food: 5},
    cost: { turn: 0, gold: 200, wood: 50, stone: 10 }
  },
  lumberyard: {
    name: text('feature_buildings.territories.lumberyard.name'),
    effect: { wood: 5},
    cost: { turn: 0, gold: 1000, wood: 10, stone: 5 }
  },
  quarry: {
    name: text('feature_buildings.territories.quarry.name'),
    effect: { stone: 2},
    cost: { turn: 0, gold: 5000, wood: 100, stone: 10 }
  }
}

export const HABITATS = {
  village: {
    space: 100
  },
  settlement: {
    space: 1000
  },
  city: {
    space: 10000,
    repair: 50
  }
}