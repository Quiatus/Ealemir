import styles from './NotificationBar.module.css'

const notifications = [
  {
    id: 1,
    severity: 'info',
    message: 'Mission'
  },
  {
    id: 2,
    severity: 'danger',
    message: 'Mission'
  },
]

export default function NotificationBar() {
  return (
    <div className={styles.notificationFeed}>
      {notifications.map(note => (
        <div key={note.id} className={`${styles.alertCard} ${styles[note.severity]}`}>
          {note.message}
        </div>
      ))}
    </div>
  )
}