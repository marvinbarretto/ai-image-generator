import { ReactNode } from 'react'
import styles from './Layout.module.scss'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}