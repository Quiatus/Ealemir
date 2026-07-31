import { HABITATS } from "@/config/buildings";
import { formatNumber, text } from "@/lib/utilities";

export function dynamicInfoTooltip(customData?: string | number ) {
  return { 
    currentMonth: {
      title: text('tooltips.info.current_month')
    },
    buttonNextMonth: {
      title: text('tooltips.info.current_month'),
      message: text('tooltips.info.next_month_message', {age: formatNumber(Number(customData), 'year')})
    },
    tooltipVillage: {
      title: text('tooltips.info.village'),
      message: text('tooltips.info.village_message', {village_space: HABITATS.village.space}),
      custom: [
        {
          label: text('tooltips.info.total'),
          value: 0
        }
      ]
    },
    tooltipSettlement: {
      title: text('tooltips.info.settlement'),
      message: text('tooltips.info.settlement_message', {settlement_space: formatNumber(Number(HABITATS.settlement.space), 'full')}),
      custom: [
        {
          label: text('tooltips.info.total'),
          value: 0
        }
      ]
    },
    tooltipCity: {
      title: text('tooltips.info.city'),
      message: text('tooltips.info.city_message', {city_space: formatNumber(Number(HABITATS.city.space), 'full'), city_repair: HABITATS.city.repair}),
      custom: [
        {
          label: text('tooltips.info.total'),
          value: 0
        }
      ]
    },
  }
}