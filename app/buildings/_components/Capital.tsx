import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Capital.module.css';

export default function CapitalCard() {
  return (
    <Card title={text('feature_buildings.card_capital.title')}>
      <div className={styles.mapContainer}>
        <img src="u1.png" alt="" />
        
      </div>
    </Card>
  );
}