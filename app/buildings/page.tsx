import CapitalCard from "./_components/Capital"
import TerritoriesCard from "./_components/Territories"

export default function BuildingsPage() {
  return (
    <div className="cards-row">
      <CapitalCard />
      <TerritoriesCard />
    </div>
  )
}