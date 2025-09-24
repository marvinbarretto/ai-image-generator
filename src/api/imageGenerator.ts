import { GeneratedImage } from '@/types';

const GENERATION_DELAY = 2000; // 2 seconds
const ERROR_RATE = 0.2; // 20% chance of error

export const generateImage = async (prompt: string): Promise<GeneratedImage> => {
  if (!prompt.trim()) {
    throw new Error('Prompt cannot be empty');
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random errors
      if (Math.random() < ERROR_RATE) {
        reject(new Error('Failed to generate image. Please try again.'));
        return;
      }

      // Generate random ID for unique images
      const randomId = Math.floor(Math.random() * 1000) + 1;

      const generatedImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: `https://picsum.photos/512/512?random=${randomId}`,
        prompt: prompt.trim(),
        timestamp: Date.now(),
      };

      resolve(generatedImage);
    }, GENERATION_DELAY);
  });
};