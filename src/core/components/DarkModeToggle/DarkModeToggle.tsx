import { useState, useEffect } from 'react';
import styles from './DarkModeToggle.module.scss';

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = document.documentElement.getAttribute('data-theme');
    return stored === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      className={styles.toggle}
      onClick={() => setIsDark(!isDark)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <span className={styles.icon}>
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className={styles.label}>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};