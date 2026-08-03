import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerEmpire } from "@/types/game";
import { TaxSelector } from "./TaxSelector";
import { richText } from "@/app/richText";
import { TAXES_MODIFIER } from "@/config/empire";

export async function Taxes() {
  const { taxes } = await getData<PlayerEmpire>('player_empire')

  return (
    <Card title={text('feature_empire.card_taxes.title')} width="w-42" style="elevated">
      <p className="text-flavor">We can raise or lower the taxes upon our people, though it will heavily influence their happiness.</p>
      <div className="space-l full-width">
        <p className='space-m'>{richText('feature_empire.card_taxes.effect_lenient', {tax: (TAXES_MODIFIER.lenient.income)*100, happiness: TAXES_MODIFIER.lenient.happiness})}</p>
        <p className='space-m'>{richText('feature_empire.card_taxes.effect_standard')}</p>
        <p>{richText('feature_empire.card_taxes.effect_oppressive', {tax: (TAXES_MODIFIER.oppressive.income)*100-100, happiness: Math.abs(TAXES_MODIFIER.oppressive.happiness)})}</p>
      </div>
      <TaxSelector currentTaxes={taxes}/>
    </ Card>
  )
}