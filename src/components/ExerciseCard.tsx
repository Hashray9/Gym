import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import type { Exercise, SetData } from '@/lib/types';

interface ExerciseCardProps {
    exercise: Exercise;
    index: number;
    savedSetData: SetData[];
    isCompleted: boolean;
    onUpdateSetData: (exerciseId: string, setIndex: number, data: Partial<SetData>) => void;
    onToggleComplete: (id: string) => void;
    showNotes?: boolean;
    defaultExpanded?: boolean;
}

export function ExerciseCard({
    exercise,
    index,
    savedSetData,
    isCompleted,
    onUpdateSetData,
    onToggleComplete,
    showNotes = true,
    defaultExpanded = false,
}: ExerciseCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Initialize sets with saved data or defaults
    const [sets, setSets] = useState<SetData[]>(() => {
        return Array.from({ length: exercise.sets }, (_, i) => ({
            weight: savedSetData[i]?.weight ?? exercise.weight,
            completed: false,
        }));
    });

    // Sync with saved data when it changes
    useEffect(() => {
        setSets(
            Array.from({ length: exercise.sets }, (_, i) => ({
                weight: savedSetData[i]?.weight ?? exercise.weight,
                completed: false,
            }))
        );
    }, [savedSetData, exercise.sets, exercise.weight]);

    // Get the max weight used across all sets
    const maxWeight = Math.max(...sets.map((s) => s.weight), 0);

    const handleWeightChange = (setIndex: number, weight: number) => {
        const newSets = [...sets];
        newSets[setIndex].weight = weight;
        setSets(newSets);
        onUpdateSetData(exercise.id, setIndex, { weight });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.03, duration: 0.25 }}
            className={`group relative overflow-hidden border transition-all duration-300 ${isCompleted
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-card/50 border-border hover:border-primary/30'
                }`}
        >
            {/* Completion indicator bar */}
            <AnimatePresence>
                {isCompleted && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary origin-left"
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center p-4 pl-5 gap-3">
                {/* Main Checkbox */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(exercise.id);
                    }}
                    className={`shrink-0 w-8 h-8 border-2 flex items-center justify-center transition-all ${isCompleted
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-muted-foreground/30 hover:border-primary'
                        }`}
                >
                    {isCompleted && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-base font-bold"
                        >
                            ✓
                        </motion.span>
                    )}
                </motion.button>

                {/* Expandable Header */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex-1 flex items-center justify-between gap-4 text-left hover:opacity-80 transition-opacity"
                >
                    {/* Exercise Info */}
                    <div className="min-w-0 flex-1">
                        <h4
                            className={`font-semibold truncate transition-all ${isCompleted ? 'line-through text-muted-foreground' : ''
                                }`}
                        >
                            {exercise.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                        </p>
                    </div>

                    {/* Weight Summary & Expand Icon */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                            <span className="text-xl font-bold text-primary">{maxWeight}</span>
                            <span className="text-sm text-muted-foreground ml-1">{exercise.unit}</span>
                        </div>
                        <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-muted-foreground text-sm"
                        >
                            ▼
                        </motion.span>
                    </div>
                </button>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pl-16 space-y-2">
                            {/* Individual Sets - Weight Only */}
                            {sets.map((set, setIndex) => (
                                <motion.div
                                    key={setIndex}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: setIndex * 0.03 }}
                                    className="flex items-center gap-4 p-3 bg-muted/30 border border-border"
                                >
                                    {/* Set Label */}
                                    <span className="text-sm font-bold text-muted-foreground w-14">
                                        Set {setIndex + 1}
                                    </span>

                                    {/* Reps */}
                                    <span className="text-sm text-muted-foreground flex-1">
                                        {exercise.reps} reps
                                    </span>

                                    {/* Weight Input */}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            value={set.weight}
                                            onChange={(e) =>
                                                handleWeightChange(setIndex, parseFloat(e.target.value) || 0)
                                            }
                                            className="w-20 h-9 text-center text-base font-bold bg-background border-2 border-border focus:border-primary transition-all"
                                        />
                                        <span className="text-sm text-muted-foreground font-medium w-6">
                                            {exercise.unit}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Notes */}
                            {showNotes && exercise.notes && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-muted-foreground/70 italic pt-2"
                                >
                                    💡 {exercise.notes}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
