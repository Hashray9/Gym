import { useState, useEffect } from 'react';
import type { SetData, AthleteProfile } from './types';

const PROGRESS_KEY = 'gym-set-progress';
const COMPLETED_KEY = 'gym-completed-exercises';
const PROFILE_KEY = 'gym-athlete-profile';
const ROADMAP_KEY = 'gym-roadmap-progress';

type SetProgressMap = Record<string, SetData[]>;

const DEFAULT_PROFILE: AthleteProfile = {
    weight: 71,
    height: "5'8\"",
    duration: 60,
    level: "Intermediate",
    diet: "Vegetarian",
    goals: ["Athletic physique", "Handstand mastery", "Six pack abs"],
    laggingFocus: ["Shoulders", "Back & Lats", "Arms", "Core & Abs"]
};

// By default, Crow Pose and Mayurasana are achieved
const DEFAULT_ROADMAP = ['crow_pose', 'mayurasana'];

export function useWorkoutProgress() {
    const [setProgress, setSetProgress] = useState<SetProgressMap>({});
    const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
    const [athleteProfile, setAthleteProfile] = useState<AthleteProfile>(DEFAULT_PROFILE);
    const [roadmapCompleted, setRoadmapCompleted] = useState<Set<string>>(new Set(DEFAULT_ROADMAP));
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const storedProgress = localStorage.getItem(PROGRESS_KEY);
            if (storedProgress) {
                setSetProgress(JSON.parse(storedProgress));
            }

            const storedCompleted = localStorage.getItem(COMPLETED_KEY);
            if (storedCompleted) {
                const { date, exercises } = JSON.parse(storedCompleted);
                const today = new Date().toISOString().split('T')[0];
                if (date === today) {
                    setCompletedExercises(new Set(exercises));
                }
            }

            const storedProfile = localStorage.getItem(PROFILE_KEY);
            if (storedProfile) {
                setAthleteProfile(JSON.parse(storedProfile));
            }

            const storedRoadmap = localStorage.getItem(ROADMAP_KEY);
            if (storedRoadmap) {
                setRoadmapCompleted(new Set(JSON.parse(storedRoadmap)));
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

    // Save profile to localStorage
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(athleteProfile));
        }
    }, [athleteProfile, isLoading]);

    // Save roadmap to localStorage
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem(ROADMAP_KEY, JSON.stringify([...roadmapCompleted]));
        }
    }, [roadmapCompleted, isLoading]);

    const updateSetData = (exerciseId: string, setIndex: number, data: Partial<SetData>) => {
        setSetProgress((prev) => {
            const exerciseSets = [...(prev[exerciseId] || [])];

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
        setSetProgress((prev) => {
            const updated: SetProgressMap = {};
            for (const [exerciseId, sets] of Object.entries(prev)) {
                updated[exerciseId] = sets.map((s) => ({ ...s, completed: false }));
            }
            return updated;
        });
    };

    const updateAthleteProfile = (profile: Partial<AthleteProfile>) => {
        setAthleteProfile((prev) => ({
            ...prev,
            ...profile
        }));
    };

    const toggleRoadmapCompleted = (skillId: string) => {
        setRoadmapCompleted((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(skillId)) {
                newSet.delete(skillId);
            } else {
                newSet.add(skillId);
            }
            return newSet;
        });
    };

    return {
        setProgress,
        completedExercises,
        athleteProfile,
        roadmapCompleted,
        isLoading,
        updateSetData,
        getSetData,
        toggleComplete,
        resetToday,
        updateAthleteProfile,
        toggleRoadmapCompleted
    };
}
