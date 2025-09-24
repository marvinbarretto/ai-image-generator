import { useState } from 'react'
import { GeneratedImage, ViewMode } from '@/types'
import { downloadImage } from '../../services/historyService'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import styles from './HistoryItem.module.scss'

interface HistoryItemProps {
  image: GeneratedImage
  onDelete: (imageId: string) => void
  viewMode: ViewMode
}

export const HistoryItem = ({ image, onDelete, viewMode }: HistoryItemProps) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const confirmDialog = useConfirmDialog()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await downloadImage(image)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }


  const handleDelete = () => {
    onDelete(image.id)
    confirmDialog.close()
  }

  return (
    <li>
      <article className={`${styles.historyItem} ${styles[`historyItem--${viewMode}`]}`} aria-labelledby={`image-${image.id}-prompt`}>
        <div className={styles.imageContainer}>
          <img
            src={image.url}
            alt={`Generated image: ${image.prompt}`}
            className={styles.thumbnail}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <div className={styles.details}>
            <p id={`image-${image.id}-prompt`} className={styles.prompt}>
              {image.prompt}
            </p>
            <time className={styles.timestamp} dateTime={new Date(image.timestamp).toISOString()}>
              {formatDate(image.timestamp)}
            </time>
          </div>

          <div className={styles.actions} role="group" aria-label="Image actions">
            <button
              className={styles.actionButton}
              onClick={handleDownload}
              disabled={isDownloading}
              type="button"
              aria-describedby={`image-${image.id}-prompt`}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>


            <button
              ref={confirmDialog.triggerRef}
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={confirmDialog.open}
              type="button"
              aria-describedby={`image-${image.id}-prompt`}
            >
              Delete
            </button>
          </div>
        </div>

        {confirmDialog.isOpen && (
          <div
            ref={confirmDialog.dialogRef}
            className={styles.confirmDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-dialog-${image.id}`}
            onKeyDown={confirmDialog.handleKeyDown}
            tabIndex={-1}
          >
            <div className={styles.confirmContent}>
              <h3 id={`delete-dialog-${image.id}`} className={styles.confirmTitle}>
                Delete this image?
              </h3>
              <p className={styles.confirmDescription}>
                This action cannot be undone.
              </p>
              <div className={styles.confirmActions}>
                <button
                  className={styles.confirmButton}
                  onClick={handleDelete}
                  type="button"
                  autoFocus
                >
                  Delete Image
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
      </article>
    </li>
  )
}