'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './NavLink.module.css'
import { MenuItem } from '@/types/game'

interface NavLinkProps {
  item: MenuItem;
}

export default function NavLink({item}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <li className={item.space ? 'space-m' : ''}>
      <Link href={item.path} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
        {item.name}
      </Link>
    </li>
  )
}