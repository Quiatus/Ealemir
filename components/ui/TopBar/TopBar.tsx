import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { getPlayerResources } from '@/lib/data/resources'
import Tooltip from '../Tooltip/Tooltip'
import { dynamicInfoTooltip, dynamicResourceTooltip } from '@/lib/adapters/tooltips'
import { getPlayerBuildings } from '@/lib/data/buildings'

export default async function TopBar() {
  const [resources, buildings] = await Promise.all([
    getPlayerResources(),
    getPlayerBuildings()
  ])
  const resourceTooltip = dynamicResourceTooltip(resources, buildings)
  const infoTooltip = dynamicInfoTooltip()
  
  return (
    <header className={styles.topBar}>
      <Tooltip data={infoTooltip.currentMonth}>
        <ResourceItem icon='/icons/resources/turn.png' label='Month' value={resources.turn} color="primary"/>
      </Tooltip>
      <Tooltip data={resourceTooltip.gold}>
        <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color="gold"/>
      </Tooltip>
      <Tooltip data={resourceTooltip.population}>
        <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color="purple"/>
      </Tooltip>
    </header>
  )
}