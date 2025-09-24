import { useState, useEffect, useRef } from 'react'

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      close()
      triggerRef.current?.focus()
    }
  }

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus()
    }
  }, [isOpen])

  return {
    isOpen,
    open,
    close,
    dialogRef,
    triggerRef,
    handleKeyDown
  }
}