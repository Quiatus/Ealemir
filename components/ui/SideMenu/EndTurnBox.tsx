
import { dynamicInfoTooltip } from '@/lib/adapters/tooltips/infoTooltips'
import styles from './EndTurnBox.module.css'
import InfoTooltip from '../Tooltip/InfoTooltip'
import { getData } from '@/lib/data/dal'
import { PlayerResources } from '@/types/game'
import EndTurnButton from '../Buttons/EndTurnButton'
import { formatNumber } from '@/lib/utilities'

export default async function EndTurnBox() {
  const resources = await getData<PlayerResources>('player_resources')
  const infoTooltip = dynamicInfoTooltip(resources.turn)

  return (
    <InfoTooltip data={infoTooltip.buttonNextMonth}>
      <div className={styles.endTurnBox}>
        <span className={`${styles.resourceText} text-primary`}>{formatNumber(resources.turn, 'full')}</span>
        <EndTurnButton />
      </div>
    </InfoTooltip>
  )
}