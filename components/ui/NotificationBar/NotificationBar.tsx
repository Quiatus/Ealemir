import { NotificationItem, PlayerResources } from '@/types/game'
import styles from './NotificationBar.module.css'
import { getData } from '@/lib/data/dal'
import { ALL_NOTIFICATIONS } from '@/config/ui'

export default async function NotificationBar() {
  const resources = await getData<PlayerResources>('player_resources')
  const activeNotifications: NotificationItem[] = []

  const conditions: Record<string, boolean> = {
    riot: resources.last_turn_resources_report.populationReport.deathsRiot > 0,
    famine: Boolean(resources.last_turn_resources_report.foodReport.famine),
    overpopulation: resources.last_turn_resources_report.populationReport.lostOverpopulation > 0,
  }

  for (const [key, isActive] of Object.entries(conditions)) {
    if (isActive && ALL_NOTIFICATIONS[key]) {
      activeNotifications.push({
        id: key,
        ...ALL_NOTIFICATIONS[key],
      })
    }
  }

  return (
    <div className={styles.notificationRibbon}>
      {activeNotifications.map(note => (
        <div key={note.id} className={`${styles.alertCard} ${styles[note.severity]}`}>
          {note.title}
        </div>
      ))}
    </div>
  )
}