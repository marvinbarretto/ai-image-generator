export interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    timestamp: number;
}

export interface GenerationState {
    isLoading: boolean;
    error: string | null;
    currentImage: GeneratedImage | null;
}