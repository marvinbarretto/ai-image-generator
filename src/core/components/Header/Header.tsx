import { DarkModeToggle } from '../DarkModeToggle';
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>AI Image Generator</h1>
        <DarkModeToggle />
      </div>
    </header>
  )
}