import { GenerateButtonProps } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './GenerateButton.module.scss';

export const GenerateButton = ({
  isLoading,
  isValid = false
}: Omit<GenerateButtonProps, 'onClick' | 'disabled' | 'variant'> & { isValid?: boolean }) => {
  return (
    <button
      type="submit"
      className={`${styles.button} ${isLoading ? styles.loading : ''} ${isValid ? styles.valid : ''}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="small" />
          <span>Generating...</span>
        </>
      ) : (
        'Generate Image'
      )}
    </button>
  );
};