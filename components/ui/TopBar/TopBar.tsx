import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { dynamicResourceTooltip } from '@/lib/adapters/tooltips'
import ResourceTooltip from '../Tooltip/ResourceTooltip'
import { getData } from '@/lib/data/dal'
import { PlayerBuildings, PlayerResources } from '@/types/game'

export default async function TopBar() {
  const [resources, buildings] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings')
  ])
  const resourceTooltip = dynamicResourceTooltip(resources, buildings)

  return (
    <header className={styles.topBar}>
      <div className={styles.section}>
        <ResourceTooltip data={resourceTooltip.gold}>
          <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color={resourceTooltip.gold.color}/>
        </ResourceTooltip>
        <ResourceTooltip data={resourceTooltip.population}>
          <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color={resourceTooltip.population.color}/>
        </ResourceTooltip>
        <ResourceTooltip data={resourceTooltip.food}>
          <ResourceItem icon='/icons/resources/food.png' label='Food' value={resources.food} color={resourceTooltip.food.color}/>
        </ResourceTooltip>
        <ResourceTooltip data={resourceTooltip.wood}>
          <ResourceItem icon='/icons/resources/wood.png' label='Wood' value={resources.wood} color={resourceTooltip.wood.color}/>
        </ResourceTooltip>
        <ResourceTooltip data={resourceTooltip.stone}>
          <ResourceItem icon='/icons/resources/stone.png' label='Stone' value={resources.stone} color={resourceTooltip.stone.color}/>
        </ResourceTooltip>
      </div>
    </header>
  )
}