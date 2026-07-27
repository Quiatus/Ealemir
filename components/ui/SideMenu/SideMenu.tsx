import styles from './SideMenu.module.css'
import NavLink from './NavLink'
import { MENU_ITEMS } from '@/config/rules';
import EndTurnBox from './EndTurnBox';

export default function SideMenu() {
  return (
    <nav className={styles.sideMenu}>
      <EndTurnBox />
      <ul>
        {MENU_ITEMS.map((item) => <NavLink key={item.path} item={item} />)}
      </ul>
    </nav>
  )
}