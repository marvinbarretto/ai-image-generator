import { useState } from 'react'
import { HistorySectionProps, ViewMode } from '@/types'
import { HistoryItem } from './HistoryItem'
import { HistoryMenu } from './HistoryMenu'
import styles from './HistorySection.module.scss'

export const HistorySection = ({ history, onClearHistory, onDeleteImage }: HistorySectionProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  if (history.length === 0) {
    return null
  }

  return (
    <section className={styles.historySection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Generation history ({history.length} image{history.length === 1 ? '' : 's'})</h2>
        <HistoryMenu
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearHistory={onClearHistory}
          historyCount={history.length}
        />
      </div>

      <ol className={viewMode === 'grid' ? styles.historyGrid : styles.historyList}>
        {history.map((image) => (
          <HistoryItem
            key={image.id}
            image={image}
            onDelete={onDeleteImage}
            viewMode={viewMode}
          />
        ))}
      </ol>
    </section>
  )
}