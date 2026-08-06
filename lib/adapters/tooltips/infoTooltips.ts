import { richText } from "@/app/richText";
import { HABITATS } from "@/config/buildings";
import { formatNumber, text } from "@/lib/utilities";
import { InfoTooltipData } from "@/types/game";

type CustomDataType = number | string | undefined

function buildCurrentMonthTooltip(): InfoTooltipData {
  return {
    title: text('tooltips.info.current_month')
  }
}

function buildButtonNextMonthTooltip(customData: CustomDataType): InfoTooltipData {
  return {
    title: text('tooltips.info.current_month'),
    message: richText('tooltips.info.next_month_message', {age: formatNumber(Number(customData), 'year')})
  }
}

function buildVillageTooltip(customData: CustomDataType): InfoTooltipData {
  return {
    title: text('tooltips.info.village'),
    message: richText('tooltips.info.village_message', {village_space: HABITATS.village.space}),
    custom: [
      {
        label: text('tooltips.info.total'),
        value: formatNumber(Number(customData), 'full')
      }
    ]
  }
}

function buildSettlementTooltip(customData: CustomDataType): InfoTooltipData {
  return {
    title: text('tooltips.info.settlement'),
    message: richText('tooltips.info.settlement_message', {settlement_space: formatNumber(Number(HABITATS.settlement.space), 'full')}),
    custom: [
      {
        label: text('tooltips.info.total'),
        value: formatNumber(Number(customData), 'full')
      }
    ]
  }
}

function buildCityTooltip(customData: CustomDataType): InfoTooltipData {
  return {
    title: text('tooltips.info.city'),
    message: richText('tooltips.info.city_message', {city_space: formatNumber(Number(HABITATS.city.space), 'full'), city_repair: HABITATS.city.repair}),
    custom: [
      {
        label: text('tooltips.info.total'),
        value: formatNumber(Number(customData), 'full')
      }
    ]
  }
}

function buildMightTooltip(customData: CustomDataType): InfoTooltipData {
  return {
    title: text('tooltips.info.might'),
    message: richText('tooltips.info.might_message'),
    custom: [
      {
        label: text('tooltips.info.total'),
        value: formatNumber(Number(customData), 'full')
      }
    ]
  }
}

function buildMoraleTooltip(): InfoTooltipData {
  return {
    title: text('tooltips.info.morale'),
    message: richText('tooltips.info.morale_message')
  }
}

function buildArmyStatusTooltip(): InfoTooltipData {
  return {
    title: text('tooltips.info.readiness'),
    message: richText('tooltips.info.readiness_message')
  }
}

export function dynamicInfoTooltip(customData?: string | number ) {
  return { 
    currentMonth: buildCurrentMonthTooltip(),
    buttonNextMonth: buildButtonNextMonthTooltip(customData),
    village: buildVillageTooltip(customData),
    settlement: buildSettlementTooltip(customData),
    city: buildCityTooltip(customData),
    might: buildMightTooltip(customData),
    morale: buildMoraleTooltip(),
    status: buildArmyStatusTooltip()
  }
}