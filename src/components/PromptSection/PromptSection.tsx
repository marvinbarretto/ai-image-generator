import { PromptInput } from '../PromptInput';
import styles from './PromptSection.module.scss';

export interface PromptSectionProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error?: string | null;
  minLength: number;
}

export const PromptSection = ({
  prompt,
  onPromptChange,
  onGenerate,
  isLoading,
  error,
  minLength
}: PromptSectionProps) => {
  return (
    <section className={styles.promptSection}>
      <PromptInput
        value={prompt}
        onChange={onPromptChange}
        onSubmit={onGenerate}
        disabled={isLoading}
        minLength={minLength}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
};