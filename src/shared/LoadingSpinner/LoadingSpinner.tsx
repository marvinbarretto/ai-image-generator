import { LoadingSpinnerProps } from '../../types';
import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = ({
  size = 'small',
  className = ''
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${className}`}
      aria-label="Loading"
    >
      <div className={styles.circle}></div>
    </div>
  );
};