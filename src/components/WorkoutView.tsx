import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseCard } from './ExerciseCard';
import { Button } from '@/components/ui/button';
import type { WorkoutDay } from '@/lib/workoutPlan';
import type { SetData } from '@/lib/types';

interface WorkoutViewProps {
    workout: WorkoutDay;
    completedExercises: Set<string>;
    getSetData: (exerciseId: string) => SetData[];
    onUpdateSetData: (exerciseId: string, setIndex: number, data: Partial<SetData>) => void;
    onToggleComplete: (id: string) => void;
}

export function WorkoutView({
    workout,
    completedExercises,
    getSetData,
    onUpdateSetData,
    onToggleComplete,
}: WorkoutViewProps) {
    const [allExpanded, setAllExpanded] = useState(false);
    const [expandKey, setExpandKey] = useState(0);

    const totalExercises = workout.exercises.length + workout.coreExercises.length;
    const completedCount = [...completedExercises].filter(
        (id) =>
            workout.exercises.some((e) => e.id === id) ||
            workout.coreExercises.some((e) => e.id === id)
    ).length;
    const progressPercent = (completedCount / totalExercises) * 100;

    const handleToggleAll = () => {
        setAllExpanded(!allExpanded);
        setExpandKey((prev) => prev + 1);
    };

    return (
        <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
        >
            {/* Workout Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`relative overflow-hidden p-6 bg-linear-to-br ${workout.color} border border-border`}
            >
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{workout.emoji}</span>
                            <div>
                                <h2 className="text-2xl font-bold">{workout.name}</h2>
                                <p className="text-muted-foreground">{workout.focus}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-primary">{completedCount}/{totalExercises}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Complete</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-muted/50 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="h-full bg-primary"
                        />
                    </div>

                    {/* Expand/Collapse All Button */}
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleToggleAll}
                            className="text-xs"
                        >
                            {allExpanded ? '↑ Collapse All' : '↓ Expand All'}
                        </Button>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>

            {/* Main Exercises */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🏋️</span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">
                        Main Exercises
                    </h3>
                    <span className="text-sm text-muted-foreground">
                        ({workout.exercises.length})
                    </span>
                    <div className="flex-1 h-px bg-border" />
                </div>
                <AnimatePresence mode="popLayout">
                    <div className="space-y-3">
                        {workout.exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={`${exercise.id}-${expandKey}`}
                                exercise={exercise}
                                index={index}
                                savedSetData={getSetData(exercise.id)}
                                isCompleted={completedExercises.has(exercise.id)}
                                onUpdateSetData={onUpdateSetData}
                                onToggleComplete={onToggleComplete}
                                defaultExpanded={allExpanded}
                            />
                        ))}
                    </div>
                </AnimatePresence>
            </motion.section>

            {/* Core Exercises */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🔥</span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">
                        Core Work
                    </h3>
                    <span className="text-sm text-muted-foreground">
                        ({workout.coreExercises.length})
                    </span>
                    <div className="flex-1 h-px bg-border" />
                </div>
                <AnimatePresence mode="popLayout">
                    <div className="space-y-3">
                        {workout.coreExercises.map((exercise, index) => (
                            <ExerciseCard
                                key={`${exercise.id}-${expandKey}`}
                                exercise={exercise}
                                index={index}
                                savedSetData={getSetData(exercise.id)}
                                isCompleted={completedExercises.has(exercise.id)}
                                onUpdateSetData={onUpdateSetData}
                                onToggleComplete={onToggleComplete}
                                defaultExpanded={allExpanded}
                            />
                        ))}
                    </div>
                </AnimatePresence>
            </motion.section>

            {/* Flexibility */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-card/30 border border-border"
            >
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🧘</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Flexibility
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {workout.flexibility.map((stretch, index) => (
                        <motion.span
                            key={stretch}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="px-3 py-1 text-sm bg-muted/50 border border-border text-muted-foreground"
                        >
                            {stretch}
                        </motion.span>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
}
