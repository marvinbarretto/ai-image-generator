import { FormEvent, useState } from 'react';
import { PromptInputProps } from '@/types';
import { GenerateButton } from '@/components/GenerateButton';
import styles from './PromptInput.module.scss';

const placeholders = [
  "A penguin in a business suit giving a PowerPoint presentation to confused seals",
  "A cat wearing tiny glasses reading a newspaper while sipping coffee",
  "A robot trying to figure out how to use a can opener"
];

export const PromptInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder,
  error,
  minLength = 10,
  isLoading = false
}: PromptInputProps) => {
  const [randomPlaceholder] = useState(() =>
    placeholder || placeholders[Math.floor(Math.random() * placeholders.length)]
  );
  const isValid = value.trim().length >= minLength;
  const currentLength = value.trim().length;
  const textareaId = 'prompt-input';
  const hintId = 'prompt-hint';
  const errorId = 'prompt-error';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      onSubmit();
    }
  };


  const inputClassName = error ? `${styles.input} ${styles.error}` : styles.input;
  const describedBy = error ? `${hintId} ${errorId}` : hintId;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.labelGroup}>
          <label htmlFor={textareaId} className={styles.label}>
            Describe the image you want to generate
          </label>
          {!error && (
            <div id={hintId} className={`${styles.labelHint} ${isValid ? styles.valid : styles.invalid}`} aria-live="polite">
              {isValid ? '✓ All good' : `ℹ️ Enter at least ${minLength} characters (${currentLength}/${minLength})`}
            </div>
          )}
        </div>
        <textarea
          id={textareaId}
          className={inputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={randomPlaceholder}
          disabled={disabled}
          rows={3}
          required
          minLength={minLength}
          aria-describedby={describedBy}
          aria-invalid={!!error}
        />
        <GenerateButton
          isLoading={isLoading}
          isValid={isValid}
        />
      </form>
      {error && (
        <div className={styles.feedback}>
          <div id={errorId} className={styles.errorMessage} aria-live="polite">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};