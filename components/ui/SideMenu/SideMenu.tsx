import styles from './SideMenu.module.css'
import NavLink from './NavLink'
import { MENU_ITEMS } from '@/config/rules';
import EndTurnButton from '../EndTurnButton';

export default function SideMenu() {
  return (
    <nav className={styles.sideMenu}>
      <EndTurnButton />
      <ul>
        {MENU_ITEMS.map((item) => <NavLink key={item.path} item={item} />)}
      </ul>
    </nav>
  )
}