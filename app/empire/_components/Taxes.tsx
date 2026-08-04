import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerEmpire } from "@/types/game";
import { TaxSelector } from "./TaxSelector";

export async function Taxes() {
  const { taxes } = await getData<PlayerEmpire>('player_empire')

  return (
    <Card title={text('feature_empire.card_taxes.title')} width="w-42" style="elevated">
      <p className="text-flavor">We can raise or lower the taxes upon our people, though it will heavily influence their happiness.</p>
      <TaxSelector currentTaxes={taxes}/>
    </ Card>
  )
}