export const EMPIRE_BASELINES = {
  morale: 50,
  moralePopulationGrowth: 1.25,
  famineMoraleModifier: -25,
  riotTriggerChance: 0.5
}

export const TAXES_MODIFIER = {
  lenient: {
    income: 0.5,
    morale: 25
  },
  customary: {
    income: 1,
    morale: 0
  },
  oppressive: {
    income: 1.5,
    morale: -25
  }
}

export const RATIONS_MODIFIER = {
  meager: {
    consumption: 200,
    populationGrowth: 0.75,
    morale: -25
  },
  sufficient: {
    consumption: 100,
    populationGrowth: 1,
    morale: 0
  },
  bountiful: {
    consumption: 50,
    populationGrowth: 1.25,
    morale: 25
  }
}

export const PRODUCTION_MODIFIER = {
  restrained: {
    production: 0.75,
    consumption: 0.5,
    morale: 25
  },
  steady: {
    production: 1,
    consumption: 1,
    morale: 0
  },
  grueling: {
    production: 1.25,
    consumption: 1.5,
    morale: -25
  }
}