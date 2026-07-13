import styles from './TopBar.module.css'
import { ResourceItem } from './ResourceItem'
import { supabase } from '@/lib/supabase'

export default async function TopBar() {
  const { data, error } = await supabase
    .from('player_resources')
    .select('turn')
    .eq('id', 1)
    .single();

  if (error) {
    console.error("TopBar Supabase Error:", error);
  }

  return (
    <header className={styles.topBar}>
      <ResourceItem icon='/icons/month.png' label='Month' value={data?.turn} color="primary"/>
    </header>
  )
}