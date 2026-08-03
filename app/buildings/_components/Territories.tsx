import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerBuildings } from "@/types/game";
import { dynamicBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import TerritoryBuilding from "./TerritoryBuilding";
import Habitats from "./Habitats";

export default async function TerritoriesCard() {
  const buildings = await getData<PlayerBuildings>('player_buildings')
  const buildingTooltip = dynamicBuildingTooltip()

  return (
    <Card title={text('feature_buildings.card_territories.title')} style="elevated" width="w-42">
      
      <Habitats data={buildings.habitats} />

      {buildings.territories?.farm && 
        <TerritoryBuilding 
          building={buildings.territories.farm} 
          tooltip={buildingTooltip.farm} 
          icon="/icons/buildings/farm.png"
        />
      }
      {buildings.territories?.lumberyard && 
        <TerritoryBuilding 
          building={buildings.territories.lumberyard} 
          tooltip={buildingTooltip.lumberyard} 
          icon="/icons/buildings/lumberyard.png"
        />
      }
    </Card>
  )
}