import { Layout } from '@/core/components/Layout'
import { useState } from 'react'
import { GeneratedImage } from './types'
import { PromptSection } from '@/components/PromptSection'
import { ImageSection } from '@/components/ImageSection'
import { generateImage } from './api/imageGenerator'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null)
  const [showPrompt, setShowPrompt] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const minLength = 10
  const isValidPrompt = prompt.trim().length >= minLength

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
    </Layout>
  )
}

export default App
