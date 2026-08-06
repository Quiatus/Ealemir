import { updateTaxPolicy } from '@/lib/actions/empireActions'
import { text } from '@/lib/utilities'
import { PlayerEmpire, PolicyOption, Taxes } from '@/types/game'
import { richText } from '@/app/richText'
import { TAXES_MODIFIER } from '@/config/empire'
import PolicySelector from './PolicySelector'
import { getData } from '@/lib/data/dal'
import Card from '@/components/ui/Card'

export default async function TaxPolicy() {
  const { taxes } = await getData<PlayerEmpire>('player_empire')
  
  const taxOptions: PolicyOption<Taxes>[] = [
    {
      id: 'oppressive',
      label: text('feature_empire.card_taxes.text_oppressive'),
      description: richText('feature_empire.card_taxes.effect_oppressive', {
        tax: (TAXES_MODIFIER.oppressive.income) * 100 - 100, 
        happiness: Math.abs(TAXES_MODIFIER.oppressive.happiness)
      })
    },
    {
      id: 'standard',
      label: text('feature_empire.card_taxes.text_standard'),
      description: richText('feature_empire.card_taxes.effect_standard')
    },
    {
      id: 'lenient',
      label: text('feature_empire.card_taxes.text_lenient'),
      description: richText('feature_empire.card_taxes.effect_lenient', {
        tax: (TAXES_MODIFIER.lenient.income) * 100, 
        happiness: TAXES_MODIFIER.lenient.happiness
      })
    }
  ]

  return (
    <Card title={text('feature_empire.card_taxes.title')} width="w-42" style="elevated">
      <p className="text-flavor">{text('feature_empire.card_taxes.flavor_text')}</p>

      <PolicySelector<Taxes> 
        currentValue={taxes}
        options={taxOptions}
        onSelect={updateTaxPolicy}
      />
    </ Card>
  )
}