import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { getPlayerResources } from '@/lib/data/resources'

export default async function TopBar() {
  const resources = await getPlayerResources()

  return (
    <header className={styles.topBar}>
      <ResourceItem icon='/icons/resources/turn.png' label='Month' value={resources.turn} color="primary"/>
      <ResourceItem icon='/icons/resources/gold.png' label='Gold' value={resources.gold} color="gold"/>
      <ResourceItem icon='/icons/resources/population.png' label='Population' value={resources.population} color="purple"/>
    </header>
  )
}