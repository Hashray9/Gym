import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Workout, Exercise } from '@/lib/types';

interface ExerciseHistoryProps {
    workouts: Workout[];
}

interface ExerciseProgress {
    name: string;
    lastWeight: number;
    maxWeight: number;
    unit: string;
    occurrences: number;
    lastDate: string;
}

export function ExerciseHistory({ workouts }: ExerciseHistoryProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const exerciseProgress = useMemo(() => {
        const progressMap = new Map<string, ExerciseProgress>();

        // Process workouts in chronological order (oldest first)
        const sortedWorkouts = [...workouts].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        sortedWorkouts.forEach((workout) => {
            workout.exercises.forEach((exercise: Exercise) => {
                const key = exercise.name.toLowerCase();
                const existing = progressMap.get(key);

                if (existing) {
                    existing.lastWeight = exercise.weight;
                    existing.maxWeight = Math.max(existing.maxWeight, exercise.weight);
                    existing.occurrences += 1;
                    existing.lastDate = workout.date;
                } else {
                    progressMap.set(key, {
                        name: exercise.name,
                        lastWeight: exercise.weight,
                        maxWeight: exercise.weight,
                        unit: exercise.unit,
                        occurrences: 1,
                        lastDate: workout.date,
                    });
                }
            });
        });

        return Array.from(progressMap.values()).sort((a, b) =>
            new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()
        );
    }, [workouts]);

    const filteredProgress = useMemo(() => {
        if (!searchQuery.trim()) return exerciseProgress;
        const query = searchQuery.toLowerCase();
        return exerciseProgress.filter((e) => e.name.toLowerCase().includes(query));
    }, [exerciseProgress, searchQuery]);

    if (workouts.length === 0) return null;

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Exercise History</CardTitle>
                <Input
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-2"
                />
            </CardHeader>
            <CardContent className="pt-0">
                <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                        {filteredProgress.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No exercises found
                            </p>
                        ) : (
                            filteredProgress.map((exercise) => (
                                <div
                                    key={exercise.name}
                                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{exercise.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {exercise.occurrences} time{exercise.occurrences !== 1 ? 's' : ''} logged
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold">
                                            {exercise.lastWeight}
                                            <span className="text-sm font-normal text-muted-foreground ml-1">
                                                {exercise.unit}
                                            </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Max: {exercise.maxWeight} {exercise.unit}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
