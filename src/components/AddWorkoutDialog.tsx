import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Exercise, Workout } from '@/lib/types';
import { generateId, getTodayDate } from '@/lib/types';

interface AddWorkoutDialogProps {
    onAddWorkout: (workout: Workout) => void;
    existingWorkout?: Workout | null;
}

export function AddWorkoutDialog({ onAddWorkout, existingWorkout }: AddWorkoutDialogProps) {
    const [open, setOpen] = useState(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentExercise, setCurrentExercise] = useState({
        name: '',
        weight: '',
        sets: '',
        reps: '',
    });

    const handleAddExercise = () => {
        if (!currentExercise.name || !currentExercise.weight) return;

        const newExercise: Exercise = {
            id: generateId(),
            name: currentExercise.name.trim(),
            weight: parseFloat(currentExercise.weight),
            unit: 'kg',
            sets: parseInt(currentExercise.sets) || 3,
            reps: parseInt(currentExercise.reps) || 10,
        };

        setExercises((prev) => [...prev, newExercise]);
        setCurrentExercise({ name: '', weight: '', sets: '', reps: '' });
    };

    const handleRemoveExercise = (id: string) => {
        setExercises((prev) => prev.filter((e) => e.id !== id));
    };

    const handleSaveWorkout = () => {
        if (exercises.length === 0) return;

        const workout: Workout = {
            id: existingWorkout?.id || generateId(),
            date: getTodayDate(),
            exercises,
        };

        onAddWorkout(workout);
        setExercises([]);
        setOpen(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && existingWorkout) {
            setExercises(existingWorkout.exercises);
        } else if (!isOpen) {
            setExercises([]);
            setCurrentExercise({ name: '', weight: '', sets: '', reps: '' });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button size="lg" className="w-full font-semibold text-base">
                        {existingWorkout ? "Edit Today's Workout" : "+ Add Today's Workout"}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {existingWorkout ? 'Edit Workout' : 'Add Workout'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {/* Exercise Form */}
                    <div className="space-y-4 p-4 bg-muted/50 border border-border">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                    Exercise Name
                                </label>
                                <Input
                                    placeholder="e.g., Bench Press"
                                    value={currentExercise.name}
                                    onChange={(e) =>
                                        setCurrentExercise({ ...currentExercise, name: e.target.value })
                                    }
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddExercise()}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                    Weight (kg)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="60"
                                    value={currentExercise.weight}
                                    onChange={(e) =>
                                        setCurrentExercise({ ...currentExercise, weight: e.target.value })
                                    }
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddExercise()}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                        Sets
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="3"
                                        value={currentExercise.sets}
                                        onChange={(e) =>
                                            setCurrentExercise({ ...currentExercise, sets: e.target.value })
                                        }
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddExercise()}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground mb-1 block">
                                        Reps
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="10"
                                        value={currentExercise.reps}
                                        onChange={(e) =>
                                            setCurrentExercise({ ...currentExercise, reps: e.target.value })
                                        }
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddExercise()}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={handleAddExercise}
                            disabled={!currentExercise.name || !currentExercise.weight}
                        >
                            Add Exercise
                        </Button>
                    </div>

                    {/* Exercise List */}
                    {exercises.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                Added Exercises ({exercises.length})
                            </p>
                            <div className="space-y-2">
                                {exercises.map((exercise) => (
                                    <div
                                        key={exercise.id}
                                        className="flex items-center justify-between p-3 bg-card border border-border"
                                    >
                                        <div>
                                            <p className="font-medium">{exercise.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {exercise.weight}kg • {exercise.sets} sets × {exercise.reps} reps
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleRemoveExercise(exercise.id)}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <Button
                        className="w-full font-semibold"
                        onClick={handleSaveWorkout}
                        disabled={exercises.length === 0}
                    >
                        Save Workout
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
