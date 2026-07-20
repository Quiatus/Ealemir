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

export const MENU_ITEMS = [
    { name: text('general.menu.overview'), path: '/' },
    { name: text('general.menu.empire'), path: '/empire', space: true },
    { name: text('general.menu.buildings'), path: '/buildings', space: true },
    { name: text('general.menu.military'), path: '/military' },
  ] as MenuItem[];

export const CAPITAL_BUILDINGS: CapitalBuilding[] = [
  { id: 'b1', name: 'Academy', layer: 3, quadrant: 'E', icon: '📚', isLocked: false },
  { id: 'b2', name: 'Market', layer: 3, quadrant: 'E', icon: '⚖️', isLocked: false },
  { id: 'b3', name: 'Blacksmith', layer: 3, quadrant: 'E', icon: '🔨', isLocked: true },
  { id: 'b4', name: 'Barracks', layer: 2, quadrant: 'N', icon: '⚔️', isLocked: false },
  { id: 'b5', name: 'Stables', layer: 2, quadrant: 'N', icon: '🐎', isLocked: false },
  { id: 'b6', name: 'Mage Tower', layer: 1, quadrant: 'W', icon: '🔮', isLocked: true }
];

export const BUILDINGS_CONFIG = {
  // farm: {
  //   name: "Wheat Farm",
  //   baseCost: { gold: 100 },
  //   baseProduction: { food: 10 }
  // }
};