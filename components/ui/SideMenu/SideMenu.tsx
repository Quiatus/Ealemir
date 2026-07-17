'use client'

import styles from './SideMenu.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from "@/components/ui/Button";
import { progressTurn } from "@/lib/actions/systemActions";
import { text } from '@/lib/utilities';

const MENU_ITEMS = [
    { name: text('general.menu.overview'), path: '/' },
    { name: text('general.menu.empire'), path: '/empire', space: true },
    { name: text('general.menu.buildings'), path: '/buildings' },
  ];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.sideMenu}>
      <form action={progressTurn} >
          <Button className='space-l' variant='turn'><span className='text-forged'>{text('general.menu.turn_button')}</span></Button>
      </form>
      <ul>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path
          return (
            <li key={item.path} className={item.space ? 'space-m' : ''}>
              <Link href={item.path} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>{item.name}</Link>
            </li>
          )})}
      </ul>
    </nav>
  )
}