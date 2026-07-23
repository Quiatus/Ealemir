import { text } from "@/lib/utilities";
import { Capital, MenuItem } from "@/types/game";

export const MENU_ITEMS: MenuItem[] = [
    { name: text('general.menu.overview'), path: '/' },
    { name: text('general.menu.empire'), path: '/empire', space: true },
    { name: text('general.menu.buildings'), path: '/buildings', space: true },
    { name: text('general.menu.military'), path: '/military' },
  ]

export const CAPITAL: Capital[] = [
  {
    level: 1,
    name: 'Hamlet',
    space: 200
  }
]

export const BUILDINGS_CAPITAL = []

export const BUILDINGS_TERRITORY = []
