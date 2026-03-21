// Types for the gym workout tracker
export interface Exercise {
    id: string;
    name: string;
    weight: number;
    unit: string;
    sets: number;
    reps: number | string;
    notes?: string;
    completed?: boolean;
}

// Data for individual sets within an exercise
export interface SetData {
    weight: number;
    completed: boolean;
}

export interface Workout {
    id: string;
    date: string;
    exercises: Exercise[];
}

// Storage key for localStorage
export const STORAGE_KEY = 'gym-workouts';

// Helper to generate unique IDs
export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

// Format date for display
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
};

// Get today's date as ISO string (date part only)
export const getTodayDate = (): string => {
    return new Date().toISOString().split('T')[0];
};
