import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Capital.module.css';
import Image from "next/image";
import { PlayerBuildings, PlayerResources } from "@/types/game";
import { CAPITAL_BUILDINGS } from "@/config/buildings";
import CapitalBuildingSlot from "./CapitalBuildingSlot";
import CityCenter from "./CityCenter";

interface CapitalProps {
  resources: PlayerResources;
  buildings: PlayerBuildings;
}

export default function CapitalCard({resources, buildings}: CapitalProps) {
  
  return (
    <Card title={text('feature_buildings.card_capital.title')} style="elevated" height="height-fit" width="fit">
      <div className={styles.mapContainer}>
        <Image src={`buildings/city_${buildings.capital.city_level}.png`} alt="city" width={970} height={970}></Image>

        <CityCenter resources={resources} dbState={buildings.capital}/>

        {Object.entries(CAPITAL_BUILDINGS).map(([buildingId, staticData]) => {
          if (staticData.unlockLevel > buildings.capital.city_level) return null; 

          return <CapitalBuildingSlot 
            key={buildingId} 
            resources={resources} 
            buildingData={staticData} 
            dbState={buildings.capital_buildings[buildingId]}
          />
        })}
      </div>
    </Card>
  );
}