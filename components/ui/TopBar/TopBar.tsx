import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { getPlayerResources } from '@/lib/data/resources'
import Tooltip from '../Tooltip/Tooltip'
import { TOOLTIPS } from '@/config/rules'
import { dynamicResourceTooltip } from '@/lib/adapters/tooltips'

export default async function TopBar() {
  const resources = await getPlayerResources()
  const dynamicTooltips = dynamicResourceTooltip(resources)

  return (
    <header className={styles.topBar}>
      <Tooltip data={TOOLTIPS.info.currentMonth}>
        <ResourceItem icon='/icons/resources/turn.png' label='Month' value={resources.turn} color="primary"/>
      </Tooltip>
      <Tooltip data={dynamicTooltips.gold}>
        <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color="gold"/>
      </Tooltip>
      <Tooltip data={dynamicTooltips.population}>
        <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color="purple"/>
      </Tooltip>
    </header>
  )
}