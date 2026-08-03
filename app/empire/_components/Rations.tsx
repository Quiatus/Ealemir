import { richText } from '@/app/richText';
import RationsSelector from './RationsSelector'
import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerEmpire } from "@/types/game";
import { RATIONS_MODIFIER } from '@/config/empire';

export async function Rations() {
  const { rations } = await getData<PlayerEmpire>('player_empire')

  return (
    <Card title={text('feature_empire.card_rations.title')} width="w-42" style="elevated">
      <p className="text-flavor">We can adjust the monthly food rations of our people, which will directly influence their happiness and the growth rate of the realm.</p>
      <div className="space-l full-width">
        <p className='space-m'>{richText('feature_empire.card_rations.effect_meager', {food: RATIONS_MODIFIER.meager.consumption, people: (RATIONS_MODIFIER.meager.populationGrowth)*100, happiness: Math.abs(RATIONS_MODIFIER.meager.happiness)})}</p>
        <p className='space-m'>{richText('feature_empire.card_rations.effect_standard')}</p>
        <p>{richText('feature_empire.card_rations.effect_bountiful', {food: RATIONS_MODIFIER.bountiful.consumption, people: (RATIONS_MODIFIER.bountiful.populationGrowth)*100-100, happiness: RATIONS_MODIFIER.bountiful.happiness})}</p>
      </div>
      <RationsSelector currentRations={rations}/>
    </ Card>
  )
}