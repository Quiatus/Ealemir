import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Capital.module.css';
import bgimage from '@/public/buildings/city_1.png'
import Image from "next/image";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import { dynamicInfoTooltip } from "@/lib/adapters/tooltips";

const build = [
  {
    id: '1',
    left: '450px',
    top: '460px',
    width: '40px',
    height: '40px'
  },
  {
    id: '2',
    left: '435px',
    top: '508px',
    width: '40px',
    height: '40px'
  },
  {
    id: '3',
    left: '475px',
    top: '550px',
    width: '40px',
    height: '40px'
  },
  {
    id: '4',
    left: '535px',
    top: '553px',
    width: '40px',
    height: '40px'
  },
  {
    id: '5',
    left: '490px',
    top: '490px',
    width: '85px',
    height: '60px'
  },
]

export default function CapitalCard() {
  const tooltip = dynamicInfoTooltip()

  return (
    <Card title={text('feature_buildings.card_capital.title')}>
      <div className={styles.mapContainer}>
        <Image src={bgimage.src} alt="city" width={990} height={990}></Image>
          {build.map(b => <div key={b.id} style={{position: 'absolute', left: b.left, top: b.top}}>
            <Tooltip data={tooltip.currentMonth}>
              <div key={b.id} style={{border: '1px solid red', width: b.width, height: b.height}}></div>
            </Tooltip>
          </div>)}
      </div>
    </Card>
  );
}