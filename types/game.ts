// GENERAL ---------------------------------------------------------------

export interface MenuItem {
  name: string;
  path: string;
  space?: boolean; 
}

export interface GameData {
  resources: PlayerResources;
  buildings: PlayerBuildings;
}

// RESOURCES -------------------------------------------------------------

export interface PlayerResources {
  turn: number;
  gold: number;
  population: number;
  food: number;
  wood: number;
  stone: number;
  fame: number;
  last_turn_resources_report: LastTurnResourceReport
}
export interface LastTurnResourceReport {
  goldReport: {
    change: number,
    gainFromPopulation: number
  },
  populationReport: {
    change: number,
    gainFromGrowth: number
  },
  foodReport: {
    change: number,
    gainFromCapital: number,
    gainFromFarms: number,
    consumed: number
  },
  woodReport: {
    change: number,
    gainFromLumberyards: number
  },
  stoneReport: {
    change: number,
    gainFromQuarries: number
  },
  fameReport: {
      loss: number,
      change: number
    }
}

// BUILDINGS -------------------------------------------------------------

export type BuildingEffectType = 'gold' | 'wood' | 'stone' | 'food' | 'population' | 'space' | 'fame';
export type BuildingEffectModifiers = Partial<Record<BuildingEffectType, number>>;

export interface PlayerBuildings {
  capital: CapitalLevel;
  capital_buildings: CapitalBuildingsQueue;
  territories: Territories;
  habitats: Habitats
}

export interface CapitalLevel {
  city_level: number,
  queue: number
}

export interface CapitalBuildingsQueue {
  name: {
    isBuild: boolean,
    queue: number
  }
}

export type Territories = Record<string, {
  built: number;
  discovered: number;
}>;

export interface CapitalStaticData {
  level: number;
  food: number;
  name: string;
  space: number;
}

export interface CapitalBuildingsStaticData {
  name: string;
  description: string;
  effect: BuildingEffectModifiers
}

export interface TerritoriesStaticData {
  name: string;
  description: string;
  effect: BuildingEffectModifiers
}

export interface Habitats {
  village: {
    amount: number
  };
  settlement: {
    amount: number
  };
  city: {
    amount: number;
    repair: number
  }
}

// TOOLTIPS --------------------------------------------------------------

export interface TooltipResourceDetail {
  label: string;
  value: number | string;
}

export interface InfoTooltipData {
  title: string;
  message?: string; 
  custom?: TooltipResourceDetail[];
}

export interface BuildingTooltipData {
  title: string;
  message?: string; 
}

export interface ResourceMessages {
  afterTotal?: string;
  afterCustom?: string;
  beforeChange?: string;
}

export interface ResourceTooltipData {
  title: string;
  color: string;
  total: number;
  messages: ResourceMessages;
  custom?: TooltipResourceDetail[];
  income: TooltipResourceDetail[];
  expenditures: TooltipResourceDetail[];
  change: number;
}