import { Layout } from '@/core/components/Layout'
import { useEffect, useState } from 'react'
import { GeneratedImage } from './types'
import { PromptSection } from '@/features/prompt-section/PromptSection'
import { ImageSection } from '@/features/image-display/ImageSection'
import { generateImage } from './api/imageGenerator'
import { HistorySection, historyService } from './features/history'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null)
  const [showPrompt, setShowPrompt] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<GeneratedImage[]>([])
  const minLength = 10
  const isValidPrompt = prompt.trim().length >= minLength

  useEffect(() => {
    setHistory(historyService.getHistory())
  }, [])
  
  const handleGenerate = async () => {
    if (!isValidPrompt) {
      setError(`Please enter at least ${minLength} characters for your prompt`)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const image = await generateImage(prompt)
      setCurrentImage(image)

      historyService.addImageToHistory(image)
      setHistory(historyService.getHistory())

      setPrompt('') // Clear the prompt after successful generation
      setShowPrompt(false) // Hide prompt section after successful generation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateNew = () => {
    setShowPrompt(true)
    setCurrentImage(null)
    setError(null)
  }
  
  return (
    <Layout>
      {showPrompt ? (
        <PromptSection
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
          minLength={minLength}
        />
      ) : (
        <ImageSection
          currentImage={currentImage}
          isLoading={isLoading}
          onGenerateNew={handleGenerateNew}
        />
      )}

      <HistorySection
        history={history}
        onClearHistory={() => {
          historyService.clearHistory()
          setHistory([])
        }}
        onDeleteImage={(imageId) => {
          historyService.removeImageFromHistory(imageId)
          setHistory(historyService.getHistory())
        }}
      />
    </Layout>
  )
}

export default App
