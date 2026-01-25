import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWorkoutPlan, getDayName } from '@/lib/workoutPlan';
import { useWorkoutProgress } from '@/lib/useWorkoutProgress';
import { DaySelector } from '@/components/DaySelector';
import { WorkoutView } from '@/components/WorkoutView';
import { RestDayView } from '@/components/RestDayView';
import { Button } from '@/components/ui/button';

function App() {
  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Get today's workout day ID, or first workout if weekend
  const getTodayId = () => {
    const dayMap: Record<number, string> = {
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
    };
    return dayMap[dayOfWeek] || 'monday';
  };

  const [selectedDay, setSelectedDay] = useState(getTodayId());
  const [showRestDay, setShowRestDay] = useState(isWeekend);

  const {
    completedExercises,
    isLoading,
    updateSetData,
    getSetData,
    toggleComplete,
    resetToday,
  } = useWorkoutProgress();

  const selectedWorkout = defaultWorkoutPlan.find((w) => w.id === selectedDay);

  // Update selectedDay when viewing on weekends
  useEffect(() => {
    if (isWeekend) {
      setShowRestDay(true);
    }
  }, [isWeekend]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(132, 204, 22, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(132, 204, 22, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(132, 204, 22, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(132, 204, 22, 0.03) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="text-3xl"
              >
                🏋️
              </motion.span>
              <div>
                <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-primary to-lime-400 bg-clip-text text-transparent">
                  GymTrack
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {getDayName()} {isWeekend && !showRestDay ? '(Preview)' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isWeekend && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRestDay(!showRestDay)}
                  className="text-xs"
                >
                  {showRestDay ? 'View Workouts' : 'Rest Day'}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={resetToday}
                className="text-xs"
              >
                Reset Today
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Day Selector */}
          {!showRestDay && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DaySelector
                days={defaultWorkoutPlan}
                selectedDay={selectedDay}
                onSelectDay={(dayId) => {
                  setSelectedDay(dayId);
                  setShowRestDay(false);
                }}
              />
            </motion.div>
          )}

          {/* Workout Content */}
          <AnimatePresence mode="wait">
            {showRestDay ? (
              <RestDayView key="rest" />
            ) : selectedWorkout ? (
              <WorkoutView
                key={selectedWorkout.id}
                workout={selectedWorkout}
                completedExercises={completedExercises}
                getSetData={getSetData}
                onUpdateSetData={updateSetData}
                onToggleComplete={toggleComplete}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="py-8 text-center text-xs text-muted-foreground/50"
      >
        <p>Track your lifts • Build your strength • Crush your goals</p>
      </motion.footer>
    </div>
  );
}

export default App;
