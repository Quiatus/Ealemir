import Card from "@/components/ui/Card";
import { getData } from "@/lib/data/dal";
import { text } from "@/lib/utilities";
import { PlayerBuildings, PlayerResources } from "@/types/game";
import { dynamicBuildingTooltip } from "@/lib/adapters/tooltips/buildingsTooltips";
import TerritoryBuilding from "./TerritoryBuilding";
import Habitats from "./Habitats";
import { TERRITORIES } from "@/config/buildings";

export default async function TerritoriesCard() {
  const [resources, buildings] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings')
  ])
  const buildingTooltip = dynamicBuildingTooltip()

  return (
    <Card title={text('feature_buildings.card_territories.title')} style="elevated" width="w-38" height="height-fit">
      
      <Habitats data={buildings.habitats} />

      {buildings.territories?.farm && 
        <TerritoryBuilding 
          building={buildings.territories.farm}
          buildingCost={TERRITORIES.farm.cost}
          resources={resources}
          tooltip={buildingTooltip.farm} 
          icon="/icons/buildings/farm.png"
        />
      }
      {buildings.territories?.lumberyard && 
        <TerritoryBuilding 
          building={buildings.territories.lumberyard}
          buildingCost={TERRITORIES.lumberyard.cost} 
          resources={resources}
          tooltip={buildingTooltip.lumberyard} 
          icon="/icons/buildings/lumberyard.png"
        />
      }
      {buildings.territories?.quarry && 
        <TerritoryBuilding 
          building={buildings.territories.quarry}
          buildingCost={TERRITORIES.quarry.cost} 
          resources={resources}
          tooltip={buildingTooltip.quarry} 
          icon="/icons/buildings/stone.png"
        />
      }
    </Card>
  )
}