import { ImageDisplayProps } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './ImageDisplay.module.scss';

export const ImageDisplay = ({ image, isLoading }: ImageDisplayProps) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <LoadingSpinner size="large" />
          <p>Generating your image...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={image.url}
          alt={image.prompt}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.prompt}>
            <strong>Prompt:</strong> {image.prompt}
          </div>
          <div className={styles.timestamp}>
            Generated {new Date(image.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};