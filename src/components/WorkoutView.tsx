import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseCard } from './ExerciseCard';
import { Button } from '@/components/ui/button';
import type { WorkoutDay } from '@/lib/workoutPlan';
import type { SetData, Exercise } from '@/lib/types';

interface WorkoutViewProps {
    workout: WorkoutDay;
    completedExercises: Set<string>;
    getSetData: (exerciseId: string) => SetData[];
    onUpdateSetData: (exerciseId: string, setIndex: number, data: Partial<SetData>) => void;
    onToggleComplete: (id: string) => void;
    onStartTimer?: (duration: number, label: string) => void;
}

export function WorkoutView({
    workout,
    completedExercises,
    getSetData,
    onUpdateSetData,
    onToggleComplete,
    onStartTimer,
}: WorkoutViewProps) {
    const [allExpanded, setAllExpanded] = useState(false);
    const [expandKey, setExpandKey] = useState(0);

    // Collect all exercises to calculate total count
    const allWorkoutExercises: Exercise[] = [
        ...(workout.warmup || []),
        ...(workout.skills || []),
        ...(workout.exercises || []),
        ...(workout.coreExercises || []),
        ...(workout.flexibility || []),
    ];

    const totalExercises = allWorkoutExercises.length;
    const completedCount = [...completedExercises].filter(
        (id) => allWorkoutExercises.some((e) => e.id === id)
    ).length;
    
    const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

    const handleToggleAll = () => {
        setAllExpanded(!allExpanded);
        setExpandKey((prev) => prev + 1);
    };

    // Helper to render an exercise block
    const renderBlock = (
        title: string,
        duration: number | undefined,
        exercises: Exercise[] | undefined,
        emoji: string,
        accentClass: string,
        bgBorderClass: string
    ) => {
        if (!exercises || exercises.length === 0) return null;

        return (
            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
            >
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-xl">{emoji}</span>
                    <h3 className={`text-md font-bold uppercase tracking-wider ${accentClass}`}>
                        {title}
                    </h3>
                    {duration !== undefined && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-semibold">
                            {duration} min
                        </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                        ({exercises.length})
                    </span>
                    <div className="flex-1 h-px bg-border" />
                </div>
                
                <div className={`p-4 border ${bgBorderClass} space-y-3`}>
                    <AnimatePresence mode="popLayout">
                        {exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={`${exercise.id}-${expandKey}`}
                                exercise={exercise}
                                index={index}
                                savedSetData={getSetData(exercise.id)}
                                isCompleted={completedExercises.has(exercise.id)}
                                onUpdateSetData={onUpdateSetData}
                                onToggleComplete={onToggleComplete}
                                onStartTimer={onStartTimer}
                                defaultExpanded={allExpanded}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </motion.section>
        );
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
                className={`relative overflow-hidden p-6 border border-border bg-linear-to-br ${workout.color}`}
            >
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{workout.emoji}</span>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">{workout.name}</h2>
                                <p className="text-sm font-semibold text-muted-foreground">{workout.focus}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-black text-primary">{completedCount}/{totalExercises}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Exercises done</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2.5 bg-muted/40 overflow-hidden border border-border/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="h-full bg-primary"
                        />
                    </div>

                    {/* Expand/Collapse All Button */}
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-semibold">
                            ⏱️ Total Session: 60 min
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleToggleAll}
                            className="text-xs h-8 px-3 hover:bg-muted/50 font-bold"
                        >
                            {allExpanded ? '↑ Collapse All' : '↓ Expand All'}
                        </Button>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>

            {/* Trainer Tip */}
            {workout.trainerTip && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-4 bg-lime-500/5 border border-lime-500/10 rounded-xs flex gap-3 items-start"
                >
                    <span className="text-xl shrink-0">💡</span>
                    <div>
                        <span className="text-[10px] font-black uppercase text-lime-400 block mb-0.5">Trainer Tip</span>
                        <p className="text-xs text-muted-foreground/90 font-medium italic leading-relaxed">
                            {workout.trainerTip}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Workout Blocks */}
            <div className="space-y-4">
                {renderBlock(
                    'Warm-up',
                    workout.timeDistribution?.warmup,
                    workout.warmup,
                    '🏃‍♂️',
                    'text-orange-400',
                    'bg-orange-500/5 border-orange-500/10'
                )}

                {renderBlock(
                    'Skill Block',
                    workout.timeDistribution?.skill,
                    workout.skills,
                    '🤸',
                    'text-purple-400',
                    'bg-purple-500/5 border-purple-500/10'
                )}

                {renderBlock(
                    'Strength Block',
                    workout.timeDistribution?.strength || workout.timeDistribution?.circuit,
                    workout.exercises,
                    '🏋️',
                    'text-lime-400',
                    'bg-lime-500/5 border-lime-500/10'
                )}

                {renderBlock(
                    'Core Finisher',
                    workout.timeDistribution?.core,
                    workout.coreExercises,
                    '🔥',
                    'text-red-400',
                    'bg-red-500/5 border-red-500/10'
                )}

                {renderBlock(
                    'Flexibility & Mobility',
                    workout.timeDistribution?.flexibility,
                    workout.flexibility,
                    '🧘',
                    'text-cyan-400',
                    'bg-cyan-500/5 border-cyan-500/10'
                )}
            </div>
        </motion.div>
    );
}
