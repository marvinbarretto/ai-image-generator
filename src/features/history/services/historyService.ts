import { GeneratedImage } from '@/types'

const STORAGE_KEY = 'GENERATED_IMAGES_HISTORY'

export const addImageToHistory = (image: GeneratedImage): void => {
  try {
    const existingHistory = getHistory()
    const updatedHistory = [image, ...existingHistory]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Failed to save image to history:', error)
  }
}

export const getHistory = (): GeneratedImage[] => {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEY)
    if (!historyJson) {
      return []
    }
    return JSON.parse(historyJson) as GeneratedImage[]
  } catch (error) {
    console.error('Failed to load image history:', error)
    return []
  }
}

export const removeImageFromHistory = (imageId: string): void => {
  try {
    const existingHistory = getHistory()
    const updatedHistory = existingHistory.filter(image => image.id !== imageId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Failed to remove image from history:', error)
  }
}

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear image history:', error)
  }
}

export const downloadImage = async (image: GeneratedImage): Promise<void> => {
  try {
    const response = await fetch(image.url)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ai-generated-${image.id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download image:', error)
    throw new Error('Failed to download image')
  }
}

