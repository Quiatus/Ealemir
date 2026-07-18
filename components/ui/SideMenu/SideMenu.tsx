import styles from './SideMenu.module.css'
import NavLink from './NavLink'
import Button from "@/components/ui/Button";
import { progressTurn } from "@/lib/actions/systemActions";
import { text } from '@/lib/utilities';
import { MENU_ITEMS } from '@/config/rules';

export default function SideMenu() {
  return (
    <nav className={styles.sideMenu}>
      <form action={progressTurn} >
        <Button className='space-l' variant='turn'><span className='text-forged'>{text('general.menu.turn_button')}</span></Button>
      </form>

      <ul>
        {MENU_ITEMS.map((item) => <NavLink key={item.path} item={item} />)}
      </ul>
    </nav>
  )
}