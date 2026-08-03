import Button from "@/components/ui/Buttons/Button";
import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerEmpire } from "@/types/game";

export async function Rations() {
  const { rations } = await getData<PlayerEmpire>('player_empire')

  return (
    <Card title={text('feature_empire.card_rations.title')} width="w-42" style="elevated">
      <p className="text-flavor space-l">We can adjust the monthly food rations of our people, which will directly influence their happiness and the growth rate of the realm.</p>

      <div className="buttons-row">
        <Button variant={rations === 'meager' ? 'active' : 'primary'}>{text('feature_empire.card_rations.text_meager')}</Button>
        <Button variant={rations === 'standard' ? 'active' : 'primary'}>{text('feature_empire.card_rations.text_standard')}</Button>
        <Button variant={rations === 'bountiful' ? 'active' : 'primary'}>{text('feature_empire.card_rations.text_bountiful')}</Button>
      </div>
      
    </ Card>
  )
}