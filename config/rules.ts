import { text } from "@/lib/utilities";
import { CapitalBuilding, MenuItem, TooltipData } from "@/types/game";

export const TOOLTIPS = {
  info: {
    currentMonth: {
      type: 'info',
      title: text('tooltips.info.current_month')
    } as TooltipData
  }
}

export const MENU_ITEMS: MenuItem[] = [
    { name: text('general.menu.overview'), path: '/' },
    { name: text('general.menu.empire'), path: '/empire', space: true },
    { name: text('general.menu.buildings'), path: '/buildings', space: true },
    { name: text('general.menu.military'), path: '/military' },
  ]

export const CAPITAL_BUILDINGS: CapitalBuilding[] = [
  { id: 'b6', name: 'Mage Tower', layer: 1, icon: '🔮', isLocked: true }
];
