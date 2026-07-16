'use client'

import styles from './SideMenu.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from "@/components/ui/Button";
import { progressTurn } from "@/lib/actions/systemActions";

const MENU_ITEMS = [
    { name: 'Overview', path: '/' },
    { name: 'Empire', path: '/empire', space: true },
    { name: 'Buildings', path: '/buildings' },
  ];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.sideMenu}>
      <form action={progressTurn} >
          <Button className={styles.spaceL} variant='turn'><span className='text-forged'>Next Month</span></Button>
      </form>
      <ul>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path
          return (
            <li key={item.path} className={item.space ? styles.spaceM : ''}>
              <Link href={item.path} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>{item.name}</Link>
            </li>
          )})}
      </ul>
    </nav>
  )
}