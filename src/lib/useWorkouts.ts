import { useState, useEffect } from 'react';
import type { Workout } from './types';
import { STORAGE_KEY } from './types';

export function useWorkouts() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load workouts from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setWorkouts(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load workouts:', error);
        }
        setIsLoading(false);
    }, []);

    // Save workouts to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
        }
    }, [workouts, isLoading]);

    const addWorkout = (workout: Workout) => {
        setWorkouts((prev) => [workout, ...prev]);
    };

    const updateWorkout = (id: string, updated: Partial<Workout>) => {
        setWorkouts((prev) =>
            prev.map((w) => (w.id === id ? { ...w, ...updated } : w))
        );
    };

    const deleteWorkout = (id: string) => {
        setWorkouts((prev) => prev.filter((w) => w.id !== id));
    };

    const getWorkoutByDate = (date: string) => {
        return workouts.find((w) => w.date === date);
    };

    return {
        workouts,
        isLoading,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        getWorkoutByDate,
    };
}
