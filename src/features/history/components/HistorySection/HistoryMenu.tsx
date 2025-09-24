import { ViewMode } from '@/types'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import styles from './HistoryMenu.module.scss'

interface HistoryMenuProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onClearHistory: () => void
  historyCount: number
}

export const HistoryMenu = ({
  viewMode,
  onViewModeChange,
  onClearHistory,
  historyCount
}: HistoryMenuProps) => {
  const confirmDialog = useConfirmDialog()

  const handleClearAll = () => {
    onClearHistory()
    confirmDialog.close()
  }
  return (
    <div className={styles.menuContainer}>
      <div className={styles.viewToggle} role="group" aria-label="View mode toggle">
        <button
          className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
          onClick={() => onViewModeChange('grid')}
          type="button"
          aria-pressed={viewMode === 'grid'}
        >
          Grid
        </button>
        <button
          className={`${styles.toggleButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => onViewModeChange('list')}
          type="button"
          aria-pressed={viewMode === 'list'}
        >
          List
        </button>
      </div>

      <button
        ref={confirmDialog.triggerRef}
        className={styles.clearButton}
        onClick={confirmDialog.open}
        type="button"
        disabled={historyCount === 0}
      >
        Clear All
      </button>

      {confirmDialog.isOpen && (
        <div
          ref={confirmDialog.dialogRef}
          className={styles.confirmDialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-dialog"
          onKeyDown={confirmDialog.handleKeyDown}
          tabIndex={-1}
        >
          <div className={styles.confirmContent}>
            <h3 id="clear-dialog" className={styles.confirmTitle}>
              Clear all history?
            </h3>
            <p className={styles.confirmDescription}>
              This will permanently delete all {historyCount} images. This action cannot be undone.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.confirmButton}
                onClick={handleClearAll}
                type="button"
                autoFocus
              >
                Clear All Images
              </button>
              <button
                className={styles.cancelButton}
                onClick={confirmDialog.close}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}