import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Workout } from '@/lib/types';
import { formatDate, getTodayDate } from '@/lib/types';

interface WorkoutCardProps {
    workout: Workout;
    onDelete: (id: string) => void;
}

export function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
    const isToday = workout.date === getTodayDate();

    return (
        <Card className={`transition-all ${isToday ? 'border-primary/50 bg-primary/5' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-bold">
                            {formatDate(workout.date)}
                        </CardTitle>
                        {isToday && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground">
                                TODAY
                            </span>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(workout.id)}
                    >
                        Delete
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-3">
                    {workout.exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                            <div className="flex-1">
                                <p className="font-medium">{exercise.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {exercise.sets} sets × {exercise.reps} reps
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-primary">
                                    {exercise.weight}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">
                                        {exercise.unit}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        {workout.exercises.length} exercise{workout.exercises.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
