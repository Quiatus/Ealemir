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
  }
}