import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWorkoutPlan } from '@/lib/workoutPlan';
import { useWorkoutProgress } from '@/lib/useWorkoutProgress';
import { DaySelector } from '@/components/DaySelector';
import { WorkoutView } from '@/components/WorkoutView';
import { Button } from '@/components/ui/button';
import { RestTimer } from '@/components/RestTimer';
import { Input } from '@/components/ui/input';

function App() {
    const dayOfWeek = new Date().getDay();
    const getTodayId = () => {
        const dayMap: Record<number, string> = {
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday',
            0: 'sunday',
        };
        return dayMap[dayOfWeek] || 'monday';
    };

    const [selectedDay, setSelectedDay] = useState(getTodayId());
    const [activeTab, setActiveTab] = useState<'workout' | 'roadmap' | 'protocol' | 'profile'>('workout');
    const [activeTimer, setActiveTimer] = useState<{ duration: number; label: string } | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);

    const {
        completedExercises,
        athleteProfile,
        roadmapCompleted,
        isLoading,
        updateSetData,
        getSetData,
        toggleComplete,
        resetToday,
        updateAthleteProfile,
        toggleRoadmapCompleted,
    } = useWorkoutProgress();

    const selectedWorkout = defaultWorkoutPlan.find((w) => w.id === selectedDay);

    // Calculate if today's selected workout is completed
    const allWorkoutExercises = selectedWorkout
        ? [
              ...(selectedWorkout.warmup || []),
              ...(selectedWorkout.skills || []),
              ...(selectedWorkout.exercises || []),
              ...(selectedWorkout.coreExercises || []),
              ...(selectedWorkout.flexibility || []),
          ]
        : [];

    const isWorkoutCompleted =
        allWorkoutExercises.length > 0 &&
        allWorkoutExercises.every((e) => completedExercises.has(e.id));

    // Show celebration when workout becomes completed
    useEffect(() => {
        if (isWorkoutCompleted && !isLoading) {
            setShowCelebration(true);
        } else {
            setShowCelebration(false);
        }
    }, [isWorkoutCompleted, isLoading]);

    const startRestTimer = (duration: number, label: string) => {
        setActiveTimer({ duration, label });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground font-semibold"
                >
                    Loading GymTrack...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground pb-24">
            {/* Animated Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div
                    animate={{
                        background: [
                            'radial-gradient(circle at 10% 10%, rgba(132, 204, 22, 0.05) 0%, transparent 60%)',
                            'radial-gradient(circle at 90% 90%, rgba(132, 204, 22, 0.05) 0%, transparent 60%)',
                            'radial-gradient(circle at 10% 90%, rgba(132, 204, 22, 0.05) 0%, transparent 60%)',
                            'radial-gradient(circle at 10% 10%, rgba(132, 204, 22, 0.05) 0%, transparent 60%)',
                        ],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
                <div className="container mx-auto px-4 py-4 max-w-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🤸‍♂️</span>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-primary to-lime-400 bg-clip-text text-transparent">
                                    GymTrack
                                </h1>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                    Hybrid Athletic & Abs Tracker
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={resetToday}
                                className="text-xs h-8 px-3 hover:bg-muted/50 border-border font-bold"
                            >
                                Reset Workout
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-1 mt-4 border-b border-border/50 pb-1 overflow-x-auto scrollbar-hide">
                        {(['workout', 'roadmap', 'protocol', 'profile'] as const).map((tab) => {
                            const labels = {
                                workout: '🏋️ Workout',
                                roadmap: '🤸 Handstand Track',
                                protocol: '🔥 Six Pack',
                                profile: '👤 Profile',
                            };
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-4 py-2 text-xs font-black uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
                                        isActive
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {labels[tab]}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-tab-line"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 relative z-10 max-w-3xl">
                <AnimatePresence mode="wait">
                    {activeTab === 'workout' && (
                        <motion.div
                            key="workout-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="space-y-6"
                        >
                            {/* Day Selector */}
                            <DaySelector
                                days={defaultWorkoutPlan}
                                selectedDay={selectedDay}
                                onSelectDay={(dayId) => setSelectedDay(dayId)}
                            />

                            {/* Workout Completed Congratulations Box */}
                            {showCelebration && (
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-5 bg-primary/10 border border-primary/30 rounded-xs text-center space-y-2 relative overflow-hidden"
                                >
                                    <h3 className="text-xl font-black text-primary">🎉 Workout Completed!</h3>
                                    <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                                        Amazing work today, Athlete! You crushed all blocks of your Hybrid session. Let the recovery begin. Drink your protein shake and protect your sleep!
                                    </p>
                                    {/* Visual floating particles */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20">
                                        <div className="absolute top-2 left-4 text-lg animate-bounce">🔥</div>
                                        <div className="absolute bottom-2 right-4 text-lg animate-bounce delay-200">💪</div>
                                        <div className="absolute top-4 right-12 text-lg animate-bounce delay-500">🏆</div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Workout Details */}
                            {selectedWorkout && (
                                <WorkoutView
                                    workout={selectedWorkout}
                                    completedExercises={completedExercises}
                                    getSetData={getSetData}
                                    onUpdateSetData={updateSetData}
                                    onToggleComplete={toggleComplete}
                                    onStartTimer={startRestTimer}
                                />
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'roadmap' && (
                        <motion.div
                            key="roadmap-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="space-y-6"
                        >
                            {/* Roadmap Overview */}
                            <div className="p-6 bg-card/40 border border-border space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-primary tracking-widest block">Handstand Progression Track</span>
                                        <h2 className="text-2xl font-black mt-1">8-Week Roadmap</h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-muted-foreground uppercase font-black">Status</span>
                                        <p className="text-sm font-bold text-primary">Wall Holds → Freestanding</p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use this roadmap to track your transition from basic crow poses to a full 10-second freestanding handstand. Check off skills as you master them.
                                </p>
                            </div>

                            {/* Skills Checklist */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'crow_pose', name: 'Crow Pose (Bakasana)', desc: 'Achieved (Builds wrist strength & balance)' },
                                    { id: 'mayurasana', name: 'Mayurasana (Peacock)', desc: 'Achieved (Builds core and arm control)' },
                                    { id: 'wall_handstand', name: 'Wall Handstand Hold', desc: 'In Progress (Aim for hollow body chest-to-wall)' },
                                    { id: 'freestanding', name: 'Freestanding Handstand', desc: 'Goal (Aim for 10 seconds freestanding)' }
                                ].map((skill) => {
                                    const isDone = roadmapCompleted.has(skill.id);
                                    return (
                                        <div
                                            key={skill.id}
                                            onClick={() => toggleRoadmapCompleted(skill.id)}
                                            className={`p-4 border transition-all cursor-pointer flex items-center gap-4 ${
                                                isDone
                                                    ? 'bg-primary/10 border-primary/30'
                                                    : 'bg-card/30 border-border hover:border-primary/20'
                                            }`}
                                        >
                                            <div className={`w-6 h-6 border flex items-center justify-center shrink-0 ${
                                                isDone ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30'
                                            }`}>
                                                {isDone && <span className="text-xs font-black">✓</span>}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                                                    {skill.name}
                                                </h4>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">{skill.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Roadmap Phases */}
                            <div className="space-y-4">
                                <h3 className="text-md font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    🗺️ Roadmap Phases
                                </h3>

                                {[
                                    {
                                        weeks: 'Weeks 1–2: Foundation',
                                        focus: 'Core tension & wrist conditioning',
                                        practice: 'Chest-to-wall 4×25s • Hollow body 4×30s • Pike push-ups 3×10',
                                        accent: 'border-orange-500/10 bg-orange-500/5',
                                        badge: 'bg-orange-500/15 text-orange-400'
                                    },
                                    {
                                        weeks: 'Weeks 3–4: Alignment',
                                        focus: 'Shoulder stacking & straight line',
                                        practice: 'Back-to-wall 4×30s • 10 kick-up attempts • One-leg wall holds 3×20s',
                                        accent: 'border-purple-500/10 bg-purple-500/5',
                                        badge: 'bg-purple-500/15 text-purple-400'
                                    },
                                    {
                                        weeks: 'Weeks 5–6: Balance Finding',
                                        focus: 'Finger pressure balance',
                                        practice: '15 freestanding kick-ups • Tuck hold 3×10s • Peel-away from wall',
                                        accent: 'border-blue-500/10 bg-blue-500/5',
                                        badge: 'bg-blue-500/15 text-blue-400'
                                    },
                                    {
                                        weeks: 'Weeks 7–8: Freestanding',
                                        focus: 'Hold duration & exit technique',
                                        practice: 'Freestanding attempts — 5s → 10s • HS push-ups 3×5',
                                        accent: 'border-lime-500/10 bg-lime-500/5',
                                        badge: 'bg-lime-500/15 text-lime-400'
                                    }
                                ].map((phase, idx) => (
                                    <div key={idx} className={`p-4 border ${phase.accent} space-y-2`}>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${phase.badge}`}>
                                                {phase.weeks}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground font-black uppercase">Focus</span>
                                            <p className="text-sm font-bold text-foreground">{phase.focus}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground font-black uppercase">Daily Routine</span>
                                            <p className="text-xs font-semibold text-muted-foreground mt-0.5">{phase.practice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* The 3 Secrets */}
                            <div className="p-6 bg-card/30 border border-border space-y-4">
                                <h3 className="text-md font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    🔑 The 3 Secrets to Accelerate Handstand Progress
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { title: 'Grease the Groove', desc: '5-min practice sessions 2–3× per day outperform 1 long session — even on rest days.' },
                                        { title: 'Finger Pressure', desc: 'Control balance via fingertips (forward) and heel of palm (backward) — not shoulder muscles.' },
                                        { title: 'Hollow Body Always', desc: 'Glutes squeezed + core braced + toes pointed — one straight line from wrists to feet.' }
                                    ].map((secret, index) => (
                                        <div key={index} className="p-4 bg-muted/40 border border-border/50 space-y-2">
                                            <span className="text-lg font-black text-primary">0{index + 1}</span>
                                            <h4 className="text-xs font-black uppercase text-foreground">{secret.title}</h4>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed">{secret.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'protocol' && (
                        <motion.div
                            key="protocol-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="space-y-6"
                        >
                            {/* Six Pack Header */}
                            <div className="p-6 bg-linear-to-br from-red-500/10 to-orange-500/10 border border-red-500/10 space-y-4">
                                <span className="text-[10px] font-black uppercase text-red-400 tracking-widest block">Core Definition</span>
                                <h2 className="text-2xl font-black text-red-400">Six Pack Protocol</h2>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Six pack abs are built in the gym but revealed in the kitchen. To lose the lower belly fat, follow this precise lifestyle strategy.
                                </p>
                            </div>

                            {/* Rules list */}
                            <div className="space-y-3">
                                {[
                                    { emoji: '🥗', title: 'Daily Caloric Deficit', desc: 'Lower belly fat responds to a 200–300 kcal daily deficit — not more crunches.' },
                                    { emoji: '🥩', title: 'High Protein Lever', desc: `Target protein at ${athleteProfile.weight * 2}g per day (2g per kg) to protect lean mass.` },
                                    { emoji: '🧘', title: 'Stretch Hip Flexors', desc: 'Tight hip flexors tilt pelvis forward and push lower belly out. Day 3 mobility is non-negotiable.' },
                                    { emoji: '🌾', title: 'Reduce Dinner Rotis', desc: 'Reduce dinner rotis from 4–5 to 2 maximum. Directly reduces lower belly fat storage.' },
                                    { emoji: '⏰', title: 'Dinner before 8 PM', desc: 'Eat dinner before 8 PM wherever possible to optimize hormones and digestion.' }
                                ].map((rule, idx) => (
                                    <div key={idx} className="p-4 bg-card/40 border border-border flex gap-4 items-start">
                                        <span className="text-2xl shrink-0">{rule.emoji}</span>
                                        <div>
                                            <h4 className="text-sm font-black text-foreground">{rule.title}</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{rule.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progressive Overload & Rest Days */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 bg-card/30 border border-border space-y-3">
                                    <h4 className="text-xs font-black uppercase text-primary">📈 Progressive Overload</h4>
                                    <ul className="text-[11px] text-muted-foreground space-y-2">
                                        <li>• Add 2.5 kg to major lifts (bench, squat, OHP) every 1–2 weeks.</li>
                                        <li>• If you lift the same weight for 3 consecutive sessions, increase load immediately to avoid stalling.</li>
                                        <li>• Calisthenics: add reps first → then increase difficulty (regular dip → weighted → ring).</li>
                                    </ul>
                                </div>
                                <div className="p-5 bg-card/30 border border-border space-y-3">
                                    <h4 className="text-xs font-black uppercase text-primary">🛌 Rest Days & Recovery</h4>
                                    <ul className="text-[11px] text-muted-foreground space-y-2">
                                        <li>• Wednesday & Sunday: Active Recovery (20-min yoga/mobility flow).</li>
                                        <li>• Flexibility gains happen during recovery. Do not skip active mobility.</li>
                                        <li>• Sleep: Protect quality over quantity (6-8 hours). Avoid heavy carbs after 8:30 PM.</li>
                                        <li>• Recovery drink: 100ml warm milk + haldi (turmeric) before bed.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'profile' && (
                        <motion.div
                            key="profile-tab"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="space-y-6"
                        >
                            {/* Profile Information */}
                            <div className="p-6 bg-card/40 border border-border space-y-4 relative overflow-hidden">
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-primary tracking-widest block">Athlete Stats</span>
                                        <h2 className="text-2xl font-black mt-1">Personal Profile</h2>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="text-center p-3 bg-muted/40 border border-border/50 w-24">
                                            <span className="text-[10px] text-muted-foreground uppercase font-black block">Weight</span>
                                            <span className="text-lg font-black text-primary">{athleteProfile.weight}</span>
                                            <span className="text-xs text-muted-foreground ml-1">kg</span>
                                        </div>
                                        <div className="text-center p-3 bg-muted/40 border border-border/50 w-24">
                                            <span className="text-[10px] text-muted-foreground uppercase font-black block">Height</span>
                                            <span className="text-lg font-black text-primary">{athleteProfile.height}</span>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-border/50" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs relative z-10">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block">Dietary Preference</span>
                                            <span className="text-sm font-bold text-foreground">{athleteProfile.diet}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block">Fitness Level</span>
                                            <span className="text-sm font-bold text-foreground">{athleteProfile.level}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block">Daily Protein target (2g/kg)</span>
                                            <span className="text-sm font-bold text-primary">{athleteProfile.weight * 2}g / day</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block">Lagging Focus Areas</span>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {athleteProfile.laggingFocus.map((focus) => (
                                                    <span key={focus} className="px-2.5 py-0.5 bg-muted border border-border/50 text-[10px] font-bold">
                                                        {focus}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-muted-foreground block">Goals</span>
                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                {athleteProfile.goals.map((goal) => (
                                                    <span key={goal} className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                                                        {goal}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Profile Form */}
                            <div className="p-6 bg-card/30 border border-border space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                                    ⚙️ Edit Athlete Specifications
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Weight (kg)</label>
                                        <Input
                                            type="number"
                                            value={athleteProfile.weight}
                                            onChange={(e) => updateAthleteProfile({ weight: parseFloat(e.target.value) || 0 })}
                                            className="h-10 text-sm font-bold bg-background border-2 border-border focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Height</label>
                                        <Input
                                            type="text"
                                            value={athleteProfile.height}
                                            onChange={(e) => updateAthleteProfile({ height: e.target.value })}
                                            className="h-10 text-sm font-bold bg-background border-2 border-border focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Diet</label>
                                        <Input
                                            type="text"
                                            value={athleteProfile.diet}
                                            onChange={(e) => updateAthleteProfile({ diet: e.target.value })}
                                            className="h-10 text-sm font-bold bg-background border-2 border-border focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground">Level</label>
                                        <Input
                                            type="text"
                                            value={athleteProfile.level}
                                            onChange={(e) => updateAthleteProfile({ level: e.target.value })}
                                            className="h-10 text-sm font-bold bg-background border-2 border-border focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic leading-relaxed pt-2">
                                    💡 Adjusting your weight dynamically recalculates your daily protein intake values across the app (2g per kg of bodyweight).
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Rest Timer Widget */}
            <AnimatePresence>
                {activeTimer && (
                    <RestTimer
                        duration={activeTimer.duration}
                        label={activeTimer.label}
                        onClose={() => setActiveTimer(null)}
                    />
                )}
            </AnimatePresence>

            {/* Bottom Footer */}
            <footer className="py-6 text-center text-[10px] text-muted-foreground/45 border-t border-border/20 mt-12 bg-background/50">
                <p>Track your lifts • Master your handstand • Build your physique</p>
                <p className="mt-1 font-semibold text-primary/60">Consistency Beats Perfection • Every Single Time</p>
            </footer>
        </div>
    );
}

export default App;
