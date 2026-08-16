// GENERAL ---------------------------------------------------------------

import { ReactNode } from "react";

export interface MenuItem {
  name: string;
  path: string;
  space?: boolean; 
  requiredBuilding?: string;
}

export interface GameData {
  resources: PlayerResources;
  buildings: PlayerBuildings;
}

// EMPIRE ----------------------------------------------------------------

export type Rations = 'meager' | 'sufficient' | 'bountiful';
export type Taxes = 'lenient' | 'customary' | 'oppressive';
export type Production = 'restrained' | 'steady' | 'grueling'

export interface MonthlyReport {
  empire: string[];
  scouts: string[];
  events: string[];
}

export interface PlayerEmpire {
  taxes: Taxes;
  rations: Rations;
  production: Production;
  monthly_report: MonthlyReport;
}

export interface PolicyOption<T> {
  id: T;
  label: string;
  description: ReactNode; 
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

export type BuildingCostType = {
  turn: number,
  gold: number,
  wood: number,
  stone: number
}

export interface PlayerBuildings {
  capital: CapitalLevel;
  capital_buildings: CapitalBuildingsQueueMap;
  territories: Territories;
  habitats: Habitats;
  finished: string
}

export interface CapitalLevel {
  city_level: number,
  queue: number
}

export interface CapitalBuildingState {
  isBuilt: boolean,
  name: string;
  queue: number
}

export type CapitalBuildingsQueueMap = Record<string, CapitalBuildingState>;

export type Territories = Record<string, {
  name: string;
  built: number;
  discovered: number;
}>;

export interface CapitalBuildingSlotProps {
  resources: PlayerResources;
  buildingData: CapitalBuildingsStaticData;
  dbState: CapitalBuildingState;
}

export interface CapitalStaticData {
  level: number;
  levelName: string;
  food: number;
  name: string;
  space: number;
  cost: BuildingCostType;
}

export interface CapitalBuildingsStaticData {
  id: string;
  name: string;
  description: string;
  effect: BuildingEffectModifiers;
  cost: BuildingCostType;
  unlockLevel: number;
  pos: {
    width: number;
    height: number;
    left: number;
    top: number
  }
}

export interface TerritoriesStaticData {
  name: string;
  effect: BuildingEffectModifiers
  cost: BuildingCostType;
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
  message?: string | ReactNode; 
  custom?: TooltipResourceDetail[];
}

export interface BuildingTooltipData {
  title: string;
  levelName?: string;
  status?: string;
  messages: string | ReactNode;
  custom?: TooltipResourceDetail[]; 
  cost: BuildingCostType
}

export interface ResourceMessages {
  afterTotal?: string;
  afterCustom?: string;
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

// EVENTS ----------------------------------------------------------------

export type EventType = 'instant' | 'encounter' | 'ongoing' ;

export interface EventUnlockConditions {
  minTurn?: number;
  minFame?: number;
  minCapitalLevel?: number;
  requiredBuildings?: string[];
}

export interface GameEventConfig {
  id: string;
  title: string;
  description: string;
  type: EventType;
  weight: number;
  duration?: number;
  conditions?: EventUnlockConditions;
  effects: {
    resources?: Partial<Record<string, number>>;
    modifiers?: Record<string, number>;
    unlockLocationId?: string; 
  };
}

export interface ActiveOngoingEvent {
  eventId: string;
  turnsRemaining: number;
}