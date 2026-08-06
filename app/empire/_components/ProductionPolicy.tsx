import { updateProductionPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { PlayerEmpire, PolicyOption, Production } from '@/types/game'
import { richText } from '@/app/richText'
import { PRODUCTION_MODIFIER } from '@/config/empire'
import PolicySelector from './PolicySelector'
import { getData } from '@/lib/data/dal'
import Card from '@/components/ui/Card'

export default async function ProductionPolicy() {
  const { production } = await getData<PlayerEmpire>('player_empire')
  
  const productionOptions: PolicyOption<Production>[] = [
    {
      id: 'restrained',
      label: text('feature_empire.card_production.text_restrained'),
      description: richText('feature_empire.card_production.effect_restrained', {
        food: PRODUCTION_MODIFIER.restrained.consumption * 100, 
        production: (PRODUCTION_MODIFIER.restrained.production) * 100 - 50, 
        morale: PRODUCTION_MODIFIER.restrained.morale
      })
    },
    {
      id: 'steady',
      label: text('feature_empire.card_production.text_steady'),
      description: richText('feature_empire.card_production.effect_steady')
    },
    {
      id: 'grueling',
      label: text('feature_empire.card_production.text_grueling'),
      description: richText('feature_empire.card_production.effect_grueling', {
        food: PRODUCTION_MODIFIER.grueling.consumption * 100 - 100, 
        production: (PRODUCTION_MODIFIER.grueling.production) * 100 - 100, 
        morale: Math.abs(PRODUCTION_MODIFIER.grueling.morale)
      })
    }
  ]

  return (
    <Card title={text('feature_empire.card_production.title')} width="w-42" style="elevated">
      <p className="text-flavor">{text('feature_empire.card_production.flavor_text')}</p>

      <PolicySelector<Production> 
        currentValue={production}
        options={productionOptions}
        onSelect={updateProductionPolicy}
      />
    </ Card>
  )
}