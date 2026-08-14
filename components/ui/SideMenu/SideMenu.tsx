import styles from './SideMenu.module.css'
import NavLink from './NavLink'
import { MENU_ITEMS } from '@/config/ui';
import EndTurnBox from './EndTurnBox';
import { getData } from '@/lib/data/dal';
import { PlayerBuildings } from '@/types/game';

export default async function SideMenu() {
  const currentBuildings = await getData<PlayerBuildings>('player_buildings');

  const visibleMenuItems = MENU_ITEMS.filter((item) => {
    if (!item.requiredBuilding) return true;
    const buildingState = currentBuildings.capital_buildings?.[item.requiredBuilding];

    return buildingState?.isBuilt === true;
  });

  return (
    <nav className={styles.sideMenu}>
      <EndTurnBox />
      <ul className='space-top-l'>
        {visibleMenuItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </ul>
    </nav>
  )
}