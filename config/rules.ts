import { text } from "@/lib/utilities";
import { MenuItem, TooltipData } from "@/types/game";

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
    { name: text('general.menu.buildings'), path: '/buildings' },
  ] as MenuItem[];

export const BUILDINGS_CONFIG = {
  // farm: {
  //   name: "Wheat Farm",
  //   baseCost: { gold: 100 },
  //   baseProduction: { food: 10 }
  // }
};