import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Capital.module.css';
import bgimage from '@/public/buildings/city_1.png'
import Image from "next/image";
import { PlayerBuildings } from "@/types/game";
import { CAPITAL_BUILDINGS } from "@/config/buildings";
import CapitalBuildingSlot from "./CapitalBuildingSlot";

interface CapitalProps {
  buildings: PlayerBuildings;
}

export default function CapitalCard({buildings}: CapitalProps) {
  return (
    <Card title={text('feature_buildings.card_capital.title')} style="elevated" height="height-fit" width="fit">
      <div className={styles.mapContainer}>
        <Image src={bgimage.src} alt="city" width={970} height={970}></Image>

        {Object.entries(CAPITAL_BUILDINGS).map(([buildingId, staticData]) => {
        
          if (staticData.unlockLevel > buildings.capital.city_level) {
            return null; 
          }
        
          const state = buildings.capital_buildings?.[buildingId]
          
          return (
            <div
              key={buildingId}
              className={styles.slot}
              style={{
                position: 'absolute',
                width: `${staticData.pos.width}px`,
                height: `${staticData.pos.height}px`,
                left: `${staticData.pos.left}px`,
                top: `${staticData.pos.top}px`,
              }}
            >
              <CapitalBuildingSlot
                buildingData={staticData}
                dbState={state}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}