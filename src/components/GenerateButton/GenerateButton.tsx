import { GenerateButtonProps } from '@/types';
import { LoadingSpinner } from '@/shared/LoadingSpinner';
import styles from './GenerateButton.module.scss';

export const GenerateButton = ({
  isLoading,
  onClick,
  disabled,
  className,
  isValid
}: GenerateButtonProps) => {
  return (
    <button
      type="submit"
      className={`${styles.button} ${isLoading ? styles.loading : ''} ${isValid ? styles.valid : ''} ${className || ''}`}
      disabled={disabled || isLoading}
      onClick={onClick}
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