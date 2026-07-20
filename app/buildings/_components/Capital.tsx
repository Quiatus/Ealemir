import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Capital.module.css';

type Quadrant = 'N' | 'E' | 'S' | 'W';

interface CapitalBuilding {
  id: string;
  name: string;
  layer: number;
  quadrant: Quadrant;
  icon: string;
  isLocked: boolean;
}

const allPlayerBuildings: CapitalBuilding[] = [
  { id: 'b1', name: 'Academy', layer: 3, quadrant: 'E', icon: '📚', isLocked: false },
  { id: 'b2', name: 'Market', layer: 3, quadrant: 'E', icon: '⚖️', isLocked: false },
  { id: 'b3', name: 'Blacksmith', layer: 3, quadrant: 'E', icon: '🔨', isLocked: true },
  { id: 'b4', name: 'Barracks', layer: 2, quadrant: 'N', icon: '⚔️', isLocked: false },
  { id: 'b5', name: 'Stables', layer: 2, quadrant: 'N', icon: '🐎', isLocked: false },
  { id: 'b6', name: 'Mage Tower', layer: 1, quadrant: 'W', icon: '🔮', isLocked: true }
];

export default function CapitalCard() {
  const TOTAL_RINGS = 6;
  const RING_SPACING = 8; 
  const CENTER_RADIUS = 6; 

  function getDistrictPositions(layer: number, quadrant: Quadrant, nodeCount: number) {
    const radius = CENTER_RADIUS + (layer * RING_SPACING) - (RING_SPACING / 2);
    let startAngle = 0;

    if (quadrant === 'E') startAngle = -45;
    if (quadrant === 'S') startAngle = 45;
    if (quadrant === 'W') startAngle = 135;
    if (quadrant === 'N') startAngle = 225;

    const span = 90; 
    const angleStep = span / (nodeCount + 1);
    const positions = [];

    for (let i = 1; i <= nodeCount; i++) {
      const angleDegrees = startAngle + (angleStep * i);
      const angleRadians = angleDegrees * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angleRadians);
      const y = 50 + radius * Math.sin(angleRadians);
      positions.push({ left: `${x}%`, top: `${y}%` });
    }

    return positions;
  }
  
  function renderAllBuildings(buildings: CapitalBuilding[]) {
    const sectors: Record<string, CapitalBuilding[]> = {};
    
    buildings.forEach(building => {
      const sectorKey = `${building.layer}-${building.quadrant}`;
      if (!sectors[sectorKey]) {
        sectors[sectorKey] = []; 
      }
      sectors[sectorKey].push(building);
    });

    return Object.values(sectors).flatMap(sectorBuildings => {
      const { layer, quadrant } = sectorBuildings[0];
      const count = sectorBuildings.length;

      const positions = getDistrictPositions(layer, quadrant, count);

      return sectorBuildings.map((building, index) => (
        <button 
          key={building.id} 
          className={styles.nodeSlot}
          style={positions[index]}
          title={building.name}
        >
          {building.icon}
        </button>
      ));
    });
  };

  return (
    <Card title={text('feature_buildings.card_capital.title')}>
      <div className={styles.mapContainer}>
        
        <svg className={styles.svgBlueprint} viewBox="0 0 100 100">
          {[...Array(TOTAL_RINGS)].map((_, i) => (
            <circle 
              key={`ring-${i}`}
              cx="50" cy="50" 
              r={CENTER_RADIUS + (i * RING_SPACING)} 
              stroke="rgba(92, 104, 95, 0.15)" strokeWidth="0.3" fill="none" 
            />
          ))}
          <line x1="15" y1="15" x2="85" y2="85" stroke="rgba(92, 104, 95, 0.25)" strokeWidth="0.1" />
          <line x1="15" y1="85" x2="85" y2="15" stroke="rgba(92, 104, 95, 0.25)" strokeWidth="0.1" />
        </svg>

        <button className={`${styles.nodeSlot} ${styles.centerKeep}`}>Keep</button>

        {renderAllBuildings(allPlayerBuildings)}
      </div>
    </Card>
  );
}