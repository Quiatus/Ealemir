import Card from "@/components/ui/Card";
import { text } from "@/lib/utilities";
import styles from './Overview.module.css'
import { getData } from "@/lib/data/dal";
import { PlayerEmpire } from "@/types/game";
import { richText } from "./richText";

export default async function Overview() {
  const { monthly_report } = await getData<PlayerEmpire>('player_empire')
  const { empire, scouts, events } = monthly_report
 
  return (
    <div className={styles.overview}>
      <Card title={text('feature_overview.card_report.title')} width="full" >
        {
          empire.length === 0 
            ? <p className={styles.reportLine}>{text('feature_overview.card_report.default_message')}</p>
            : empire.map(item => <p className={styles.reportLine} key={item}>{richText(item)}</p>)
        }
      </Card>
      <Card title={text('feature_overview.card_scouts.title')} width="full" >
        {
          scouts.length === 0 
            ? <p className={styles.reportLine}>{text('feature_overview.card_scouts.default_message')}</p>
            : scouts.map(item => <p className={styles.reportLine} key={item}>{richText(item)}</p>)
        }
      </Card>
      <Card title={text('feature_overview.card_events.title')} width="full" >
        {
          events.length === 0 
            ? <p className={styles.reportLine}>{text('feature_overview.card_events.default_message')}</p> 
            : events.map(item => <p className={styles.reportLine} key={item}>{richText(item)}</p>)
        }
      </Card>
    </div>
  );
}
