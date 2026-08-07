import styles from './ConfirmModal.module.css'
import Button from './Buttons/Button';

interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string | null;
  onConfirm: () => void;
}

export default function ErrorModal({isOpen, title, message, onConfirm}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <h2 className="text-forged">{title}</h2>
        <p className='space-l text-red'>{message}</p>  
        <div className={styles.ok}>
          <Button variant="primary" onClick={onConfirm}>OK</Button>
        </div>
      </div>
    </div>
  )
}