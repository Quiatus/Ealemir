import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { dynamicInfoTooltip, dynamicResourceTooltip } from '@/lib/adapters/tooltips'
import InfoTooltip from '../Tooltip/InfoTooltip'
import ResourceTooltip from '../Tooltip/ResourceTooltip'
import { getData } from '@/lib/data/dal'
import { PlayerBuildings, PlayerResources } from '@/types/game'

export default async function TopBar() {
  const [resources, buildings] = await Promise.all([
    getData<PlayerResources>('player_resources'),
    getData<PlayerBuildings>('player_buildings')
  ])
  const resourceTooltip = dynamicResourceTooltip(resources, buildings)
  const infoTooltip = dynamicInfoTooltip()
  
  return (
    <header className={styles.topBar}>
      <InfoTooltip data={infoTooltip.currentMonth}>
        <ResourceItem icon='/icons/resources/turn.png' label='Month' value={resources.turn} color="primary"/>
      </InfoTooltip>
      <ResourceTooltip data={resourceTooltip.gold}>
        <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color={resourceTooltip.gold.color}/>
      </ResourceTooltip>
      <ResourceTooltip data={resourceTooltip.population}>
        <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color={resourceTooltip.population.color}/>
      </ResourceTooltip>
      <ResourceTooltip data={resourceTooltip.food}>
        <ResourceItem icon='/icons/resources/food.png' label='Food' value={resources.food} color={resourceTooltip.food.color}/>
      </ResourceTooltip>
    </header>
  )
}