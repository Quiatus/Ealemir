import AbandonEmpireCard from "./_components/AbandonEmpire";
import { Rations } from "./_components/Rations";
import { Taxes } from "./_components/Taxes";
import styles from './EmpirePage.module.css'

export default function EmpirePage() {
  return (
    <div className={styles.empirePage}>
      <AbandonEmpireCard />
      <Taxes />
      <Rations />
    </div>
  )
}