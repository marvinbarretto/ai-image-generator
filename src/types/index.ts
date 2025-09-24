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

export interface GenerateButtonProps {
    isLoading: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    isValid?: boolean;
}

export interface indexGeneratedImage {
    id: string;
    url: string;
    prompt: string;
    timestamp: number;
}
  
export interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    placeholder?: string;
    error?: string | null | undefined;
    minLength?: number;
    isLoading?: boolean;
}

export interface LoadingSpinnerProps {
    size?: 'small' | 'large';
    className?: string;
}

export type ViewMode = 'grid' | 'list';

export interface HistorySectionProps {
history: GeneratedImage[];
onClearHistory: () => void;
onDeleteImage: (imageId: string) => void;
}

export interface HistoryItemProps {
image: GeneratedImage;
onDelete: (imageId: string) => void;
}

export interface PromptSectionProps {
prompt: string;
onPromptChange: (value: string) => void;
onGenerate: () => void;
isLoading: boolean;
error?: string | null;
minLength: number;
}

export interface ImageSectionProps {
currentImage: GeneratedImage | null;
isLoading: boolean;
onGenerateNew: () => void;
}

// Core component interfaces
export interface LayoutProps {
children: React.ReactNode;
}