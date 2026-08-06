import { updateRationPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { PlayerEmpire, PolicyOption, Rations } from '@/types/game'
import { richText } from '@/app/richText'
import { RATIONS_MODIFIER } from '@/config/empire'
import PolicySelector from './PolicySelector'
import { getData } from '@/lib/data/dal'
import Card from '@/components/ui/Card'

export default async function RationPolicy() {
  const { rations } = await getData<PlayerEmpire>('player_empire')
  
  const rationOptions: PolicyOption<Rations>[] = [
    {
      id: 'meager',
      label: text('feature_empire.card_rations.text_meager'),
      description: richText('feature_empire.card_rations.effect_meager', {
        food: RATIONS_MODIFIER.meager.consumption, 
        people: (RATIONS_MODIFIER.meager.populationGrowth) * 100 - 50, 
        morale: Math.abs(RATIONS_MODIFIER.meager.morale)
      })
    },
    {
      id: 'sufficient',
      label: text('feature_empire.card_rations.text_sufficient'),
      description: richText('feature_empire.card_rations.effect_sufficient')
    },
    {
      id: 'bountiful',
      label: text('feature_empire.card_rations.text_bountiful'),
      description: richText('feature_empire.card_rations.effect_bountiful', {
        food: RATIONS_MODIFIER.bountiful.consumption, 
        people: (RATIONS_MODIFIER.bountiful.populationGrowth) * 100 - 100, 
        morale: RATIONS_MODIFIER.bountiful.morale
      })
    }
  ]

  return (
    <Card title={text('feature_empire.card_rations.title')} width="w-42" style="elevated">
      <p className="text-flavor">{text('feature_empire.card_rations.flavor_text')}</p>

      <PolicySelector<Rations> 
        currentValue={rations}
        options={rationOptions}
        onSelect={updateRationPolicy}
      />
    </ Card>
  )
}