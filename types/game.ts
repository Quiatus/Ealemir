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
  }
}

export interface PlayerResources {
  turn: number;
  gold: number;
  population: number;
  last_turn_resources_report: LastTurnResourceReport
}

// BUILDINGS -------------------------------------------------------------

export interface PlayerBuildings {
  capital_level: number;
  capital_house: number;
}

export interface Capital {
  level: number;
  name: string;
  space: number;
}

// TOOLTIPS --------------------------------------------------------------

export interface TooltipResourceDetail {
  label: string;
  value: number;
}

export interface InfoTooltipData {
  type: 'info';
  title: string;
  message?: string[]; 
}

export interface ResourceTooltipData {
  type: 'resource';
  title: string;
  total: number;
  custom: TooltipResourceDetail[];
  income: TooltipResourceDetail[];
  expenditures: TooltipResourceDetail[];
  change: number;
}

export type TooltipData = InfoTooltipData | ResourceTooltipData;