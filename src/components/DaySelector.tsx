import { motion } from 'framer-motion';
import type { WorkoutDay } from '@/lib/workoutPlan';

interface DaySelectorProps {
    days: WorkoutDay[];
    selectedDay: string;
    onSelectDay: (dayId: string) => void;
}

export function DaySelector({ days, selectedDay, onSelectDay }: DaySelectorProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {days.map((day, index) => {
                const isSelected = selectedDay === day.id;
                return (
                    <motion.button
                        key={day.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onClick={() => onSelectDay(day.id)}
                        className={`relative flex-shrink-0 px-4 py-3 border transition-all duration-300 ${isSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-card/50 border-border hover:border-primary/50 hover:bg-card'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-2xl">{day.emoji}</span>
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {day.day.slice(0, 3)}
                            </span>
                        </div>
                        {isSelected && (
                            <motion.div
                                layoutId="day-indicator"
                                className="absolute inset-0 border-2 border-primary"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
