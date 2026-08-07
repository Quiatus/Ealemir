import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Overview.module.css'

export default async function Overview() {
  return (
    <div className={styles.overview}>
      <Card title={text('feature_overview.card_report.title')} width="full" >
        <p>...</p>
      </Card>
      <Card title={text('feature_overview.card_scouts.title')} width="full" >
        <p>...</p>
      </Card>
    </div>
  );
}
