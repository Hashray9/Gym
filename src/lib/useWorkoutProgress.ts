import { useState, useEffect } from 'react';
import type { SetData } from './types';

const PROGRESS_KEY = 'gym-set-progress';
const COMPLETED_KEY = 'gym-completed-exercises';

// Structure: { [exerciseId]: SetData[] }
type SetProgressMap = Record<string, SetData[]>;

export function useWorkoutProgress() {
    // Store per-set data for each exercise
    const [setProgress, setSetProgress] = useState<SetProgressMap>({});
    // Store completed exercise IDs for today
    const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const storedProgress = localStorage.getItem(PROGRESS_KEY);
            if (storedProgress) {
                setSetProgress(JSON.parse(storedProgress));
            }

            // Check if completed exercises are from today
            const storedCompleted = localStorage.getItem(COMPLETED_KEY);
            if (storedCompleted) {
                const { date, exercises } = JSON.parse(storedCompleted);
                const today = new Date().toISOString().split('T')[0];
                if (date === today) {
                    setCompletedExercises(new Set(exercises));
                }
            }
        } catch (error) {
            console.error('Failed to load workout progress:', error);
        }
        setIsLoading(false);
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(setProgress));
        }
    }, [setProgress, isLoading]);

    // Save completed exercises to localStorage
    useEffect(() => {
        if (!isLoading) {
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem(
                COMPLETED_KEY,
                JSON.stringify({ date: today, exercises: [...completedExercises] })
            );
        }
    }, [completedExercises, isLoading]);

    const updateSetData = (exerciseId: string, setIndex: number, data: Partial<SetData>) => {
        setSetProgress((prev) => {
            const exerciseSets = [...(prev[exerciseId] || [])];

            // Ensure array is long enough
            while (exerciseSets.length <= setIndex) {
                exerciseSets.push({ weight: 0, completed: false });
            }

            exerciseSets[setIndex] = {
                ...exerciseSets[setIndex],
                ...data,
            };

            return {
                ...prev,
                [exerciseId]: exerciseSets,
            };
        });
    };

    const getSetData = (exerciseId: string): SetData[] => {
        return setProgress[exerciseId] || [];
    };

    const toggleComplete = (exerciseId: string) => {
        setCompletedExercises((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(exerciseId)) {
                newSet.delete(exerciseId);
            } else {
                newSet.add(exerciseId);
            }
            return newSet;
        });
    };

    const resetToday = () => {
        setCompletedExercises(new Set());
        // Reset all completed flags but keep weights
        setSetProgress((prev) => {
            const updated: SetProgressMap = {};
            for (const [exerciseId, sets] of Object.entries(prev)) {
                updated[exerciseId] = sets.map((s) => ({ ...s, completed: false }));
            }
            return updated;
        });
    };

    return {
        setProgress,
        completedExercises,
        isLoading,
        updateSetData,
        getSetData,
        toggleComplete,
        resetToday,
    };
}
