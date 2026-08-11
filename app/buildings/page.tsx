import { getData } from "@/lib/data/dal"
import CapitalCard from "./_components/Capital"
import TerritoriesCard from "./_components/Territories"
import { PlayerBuildings, PlayerResources } from "@/types/game"

export default async function BuildingsPage() {
  const [resources, buildings] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings')
  ])

  return (
    <div className="cards-row">
      <CapitalCard buildings={buildings} />
      <TerritoriesCard resources={resources} buildings={buildings} />
    </div>
  )
}