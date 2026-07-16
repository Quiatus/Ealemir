import styles from './NotificationBar.module.css'


const notifications = [
  {
    id: 1,
    severity: 'danger',
    message: 'Mission',
    isActive: true
  },
  {
    id: 2,
    severity: 'warning',
    message: 'Overpopulation',
    isActive: true
  },
  {
    id: 3,
    severity: 'info',
    message: 'Mission',
    isActive: true
  },
]

export default function NotificationBar() {
  return (
    <div className={styles.notificationRibbon}>
      {notifications.map(note => (
        note.isActive && <div key={note.id} className={`${styles.alertCard} ${styles[note.severity]}`}>
          {note.message}
        </div>
      ))}
    </div>
  )
}