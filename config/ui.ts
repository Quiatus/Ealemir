import { text } from "@/lib/utilities";
import { MenuItem, NotificationMap } from "@/types/game";

export const MENU_ITEMS: MenuItem[] = [
    { name: text('general.menu.overview'), path: '/' },
    { name: text('general.menu.empire'), path: '/empire' },
    { name: text('general.menu.buildings'), path: '/buildings', space: true },
    { name: text('general.menu.military'), path: '/military', space: true },
    { name: text('general.menu.tavern'), path: '/tavern', requiredBuilding: 'tavern' },
  ]

export const ALL_NOTIFICATIONS: NotificationMap = {
  riot: {
    severity: 'danger',
    title: text('general.notifications.riot'),
  },
  famine: {
    severity: 'danger',
    title: text('general.notifications.famine'),
  },
  overpopulation: {
    severity: 'warning',
    title: text('general.notifications.overpopulation'),
  },
};