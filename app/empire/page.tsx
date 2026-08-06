import AbandonEmpireCard from "./_components/AbandonEmpire";
import ProductionPolicy from "./_components/ProductionPolicy";
import RationPolicy from "./_components/RationPolicy";
import TaxPolicy from "./_components/TaxPolicy";
import styles from './EmpirePage.module.css'

export default function EmpirePage() {
  return (
    <div className={styles.empirePage}>
      <TaxPolicy />
      <RationPolicy />
      <ProductionPolicy />
      <AbandonEmpireCard />
    </div>
  )
}