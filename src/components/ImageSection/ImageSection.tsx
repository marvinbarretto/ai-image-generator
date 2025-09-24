import { GeneratedImage } from '../../types';
import { ImageDisplay } from '../ImageDisplay';
import styles from './ImageSection.module.scss';

export interface ImageSectionProps {
  currentImage: GeneratedImage | null;
  isLoading: boolean;
  onGenerateNew: () => void;
}

export const ImageSection = ({
  currentImage,
  isLoading,
  onGenerateNew
}: ImageSectionProps) => {
  return (
    <section className={styles.imageSection}>
      <ImageDisplay
        image={currentImage}
        isLoading={isLoading}
      />

      {currentImage && !isLoading && (
        <div className={styles.actions}>
          <button
            className={styles.generateNewButton}
            onClick={onGenerateNew}
          >
            Generate New Image
          </button>
        </div>
      )}
    </section>
  );
};