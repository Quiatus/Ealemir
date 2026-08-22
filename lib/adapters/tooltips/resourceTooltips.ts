import { calculateFreeSpace, calculateMaxSpace } from "@/lib/engine/buildings/checks";
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
      },
      {
        label: text('tooltips.gold_tooltip.income_events'),
        value: resources.last_turn_resources_report.goldReport.gainFromEvents
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
      },
      {
        label: text('tooltips.population_tooltip.income_events'),
        value: resources.last_turn_resources_report.populationReport.gainFromEvents
      }
    ],
    expenditures: [
      {
        label: text('tooltips.population_tooltip.deserted_population'),
        value: resources.last_turn_resources_report.populationReport.lostDesertion
      },
      {
        label: text('tooltips.population_tooltip.death_population'),
        value: resources.last_turn_resources_report.populationReport.lostDeath
      },
    ],
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

  if (resources.population > maxAvailableSpace) {
    tooltip.custom = [
      {
        label: text('tooltips.population_tooltip.homeless'),
        value: Math.abs(availableSpace)
      }
  ];
  } else {
    tooltip.custom = [
      {
        label: text('tooltips.population_tooltip.available_space'),
        value: availableSpace
      }
    ];
  }


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
      },
      {
        label: text('tooltips.food_tooltip.income_farms'),
        value: resources.last_turn_resources_report.foodReport.gainFromFarms
      },
      {
        label: text('tooltips.food_tooltip.income_events'),
        value: resources.last_turn_resources_report.foodReport.gainFromEvents
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
    income: [
      {
        label: text('tooltips.wood_tooltip.income_lumberyards'),
        value: resources.last_turn_resources_report.woodReport.gainFromLumberyards
      },
      {
        label: text('tooltips.wood_tooltip.income_events'),
        value: resources.last_turn_resources_report.woodReport.gainFromEvents
      }
    ],
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
    income: [
      {
        label: text('tooltips.stone_tooltip.income_quarries'),
        value: resources.last_turn_resources_report.stoneReport.gainFromQuarries
      },
      {
        label: text('tooltips.stone_tooltip.income_events'),
        value: resources.last_turn_resources_report.stoneReport.gainFromEvents
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.stoneReport.change
  };
}

function buildFameTooltip(resources: PlayerResources): ResourceTooltipData {
  return {
    title: text('tooltips.fame_tooltip.title'),
    color: 'primary',
    total: resources.fame,
    messages: {},
    income: [],
    expenditures: [
      {
        label: text('tooltips.fame_tooltip.loss'),
        value: resources.last_turn_resources_report.fameReport.loss
      }
    ],
    change: resources.last_turn_resources_report.fameReport.change
  };
}

export function dynamicResourceTooltip(resources: PlayerResources, buildings?: PlayerBuildings) {
  return {
    gold: buildGoldTooltip(resources),
    population: buildPopulationTooltip(resources, buildings),
    food: buildFoodTooltip(resources),
    wood: buildWoodTooltip(resources),
    stone: buildStoneTooltip(resources),
    fame: buildFameTooltip(resources)
  };
}
