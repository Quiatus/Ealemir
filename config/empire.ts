export const TAXES_MODIFIER = {
  lenient: {
    income: 0.5,
    happiness: 25
  },
  standard: {
    income: 1,
    happiness: 0
  },
  oppressive: {
    income: 1.5,
    happiness: -25
  }
}

export const RATIONS_MODIFIER = {
  meager: {
    consumption: 200,
    populationGrowth: 0.5,
    happiness: -25
  },
  standard: {
    consumption: 100,
    populationGrowth: 1,
    happiness: 0
  },
  bountiful: {
    consumption: 50,
    populationGrowth: 1.5,
    happiness: 25
  }
}