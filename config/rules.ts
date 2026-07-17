import { text } from "@/lib/utilities";
import { TooltipData } from "@/types/game";

export const TOOLTIPS = {
  info: {
    currentMonth: {
      type: 'info',
      title: text('tooltips.info.current_month')
    } as TooltipData
  }
}

export const BUILDINGS_CONFIG = {
  // farm: {
  //   name: "Wheat Farm",
  //   baseCost: { gold: 100 },
  //   baseProduction: { food: 10 }
  // }
};