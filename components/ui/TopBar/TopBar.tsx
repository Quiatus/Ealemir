import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { getPlayerResources } from '@/lib/data/resources'
import Tooltip from '../Tooltip'
import { TOOLTIPS } from '@/config/rules'
import { TooltipData } from '@/types/game'
import { text } from '@/lib/utilities'

export default async function TopBar() {
  const resources = await getPlayerResources()

  const goldTooltip: TooltipData = {
    type: 'resource',
    title: text('tooltips.gold_tooltip.title'),
    total: resources.gold,
    income: [
      {
        label: text('tooltips.gold_tooltip.income_population'),
        value: resources.last_turn_resources_report.goldReport.gainFromPopulation
      }
    ],
    expenditures: [],
    change: resources.last_turn_resources_report.goldReport.change
  }

  return (
    <header className={styles.topBar}>
      <Tooltip data={TOOLTIPS.info.currentMonth}>
        <ResourceItem icon='/icons/resources/turn.png' label='Month' value={resources.turn} color="primary"/>
      </Tooltip>
      <Tooltip data={goldTooltip}>
        <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color="gold"/>
      </Tooltip>
      <Tooltip data={TOOLTIPS.info.currentMonth}>
        <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color="purple"/>
      </Tooltip>
    </header>
  )
}