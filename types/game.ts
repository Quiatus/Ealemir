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
    consumed: number
  },
  woodReport: {
    change: number
  },
  stoneReport: {
    change: number
  }
}

export interface PlayerResources {
  turn: number;
  gold: number;
  population: number;
  food: number;
  wood: number;
  stone: number;
  last_turn_resources_report: LastTurnResourceReport
}

// BUILDINGS -------------------------------------------------------------

export interface PlayerBuildings {
  capital_level: number;
  capital_house: number;
}

export interface Capital {
  level: number;
  food: number;
  name: string;
  space: number;
}

// TOOLTIPS --------------------------------------------------------------

export interface TooltipResourceDetail {
  label: string;
  value: number;
}

export interface InfoTooltipData {
  title: string;
  message?: string[]; 
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
  messages?: ResourceMessages;
  custom?: TooltipResourceDetail[];
  income: TooltipResourceDetail[];
  expenditures: TooltipResourceDetail[];
  change: number;
}