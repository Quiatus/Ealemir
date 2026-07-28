import { calculateFreeSpace, calculateMaxSpace } from "@/lib/engine/buildings/space";
import { text } from "@/lib/utilities";
import { PlayerBuildings, PlayerResources, ResourceTooltipData } from "@/types/game";

function buildGoldTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.gold_tooltip.title'),
    color: 'gold',
    total: resources.gold,
    messages: {},
    income: [
      {
        label: text('tooltips.gold_tooltip.income_population'),
        value: resources.last_turn_resources_report.goldReport.gainFromPopulation
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.goldReport.change
  };
}

export function buildPopulationTooltip(resources: PlayerResources, buildings?: PlayerBuildings): ResourceTooltipData {
  const tooltip: ResourceTooltipData = {
    title: text('tooltips.population_tooltip.title'),
    color: 'purple', 
    total: resources.population,
    messages: {},
    custom: [],
    income: [
      {
        label: text('tooltips.population_tooltip.growth_population'),
        value: resources.last_turn_resources_report.populationReport.gainFromGrowth
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.populationReport.change
  };

  if (!buildings) {
    return tooltip;
  }

  const availableSpace = calculateFreeSpace(resources.population, buildings);
  const maxAvailableSpace = calculateMaxSpace(buildings);

  if (!availableSpace) {
    tooltip.messages.afterCustom = text('tooltips.population_tooltip.no_space_message');
    tooltip.color = 'orange';
  } else if (resources.population > maxAvailableSpace) {
    tooltip.messages.afterCustom = text('tooltips.population_tooltip.exceeded_space_message');
    tooltip.color = 'red';
  }

  tooltip.custom = [
    {
      label: text('tooltips.population_tooltip.available_space'),
      value: availableSpace
    }
  ];

  return tooltip;
}

function buildFoodTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.food_tooltip.title'),
    color: 'yellow',
    total: resources.food,
    messages: {},
    income: [
      {
        label: text('tooltips.food_tooltip.income_capital'),
        value: resources.last_turn_resources_report.foodReport.gainFromCapital
      }
    ],
    expenditures: [
      {
        label: text('tooltips.food_tooltip.consumed'),
        value: resources.last_turn_resources_report.foodReport.consumed
      }
    ],
    change: resources.last_turn_resources_report.foodReport.change
  };
}

function buildWoodTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.wood_tooltip.title'),
    color: 'brown',
    total: resources.wood,
    messages: {},
    income: [],
    expenditures: [],
    change: resources.last_turn_resources_report.woodReport.change
  };
}

function buildStoneTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.stone_tooltip.title'),
    color: 'gray',
    total: resources.stone,
    messages: {},
    income: [],
    expenditures: [],
    change: resources.last_turn_resources_report.stoneReport.change
  };
}

export function dynamicResourceTooltip(resources: PlayerResources, buildings?: PlayerBuildings) {
  return {
    gold: buildGoldTooltip(resources),
    population: buildPopulationTooltip(resources, buildings),
    food: buildFoodTooltip(resources),
    wood: buildWoodTooltip(resources),
    stone: buildStoneTooltip(resources)
  };
}
