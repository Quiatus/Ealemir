'use client'

import styles from './SideMenu.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MENU_ITEMS = [
    { name: 'Overview', path: '/' },
    { name: 'Buildings', path: '/buildings', space: true },
    { name: 'Test', path: '/.' },
  ];

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.sideMenu}>
      <ul>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path
          return (
            <li key={item.path} className={item.space ? styles.space : ''}>
              <Link href={item.path} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>{item.name}</Link>
            </li>
          )
        })}

        
      </ul>
    </nav>
  )
}