import Image from "next/image";
import styles from './SpecialResourcesBar.module.css'

export default function SpecialResourcesBar() {
  return (
    <div className={styles.main}>
      <Image src="/icons/resources/special_ui_ch.png" alt="special" width={40} height={40}/>
      <Image src="/icons/resources/rune_ui_ch.png" alt="special" width={40} height={40}/>
      <Image src="/icons/resources/metal_ui_ch.png" alt="special" width={40} height={40}/>
    </div>
  )
}