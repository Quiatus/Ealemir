import styles from './SideMenu.module.css'

export default function SideMenu() {
  return (
    <nav className={styles.sideMenu}>
      <ul>
        <li>Overview</li>
        <li>Empire</li>
        <li>Military</li>
      </ul>
    </nav>
  )
}