import styles from './Progressbar.module.css'

interface ProgressBarProps {
  current: number;
  max: number;
}

export default function ProgressBar({ current, max }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100); 
  return (
    <div className={styles.progressBar} style={{ '--progress': `${percentage}%` } as React.CSSProperties}>
      {current} / {max}
    </div>
  );
}