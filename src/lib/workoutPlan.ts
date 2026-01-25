import type { Exercise } from './types';

export interface WorkoutDay {
    id: string;
    day: string;
    name: string;
    focus: string;
    color: string;
    emoji: string;
    exercises: Exercise[];
    coreExercises: Exercise[];
    flexibility: string[];
}

// Default workout plan - Monday to Friday
export const defaultWorkoutPlan: WorkoutDay[] = [
    {
        id: 'monday',
        day: 'Monday',
        name: 'Push Day',
        focus: 'Chest, Shoulders, Triceps',
        color: 'from-red-500/20 to-orange-500/20',
        emoji: '💪',
        exercises: [
            { id: 'mon-1', name: 'Deficit Push-Ups', weight: 0, unit: 'kg', sets: 4, reps: 12, notes: 'Elevated feet, add plate on back (5-10kg). Last set: AMRAP' },
            { id: 'mon-2', name: 'Seated Dumbbell Shoulder Press', weight: 17.5, unit: 'kg', sets: 4, reps: 12, notes: 'Per dumbbell. Last set: Dropset' },
            { id: 'mon-3', name: 'Close-Grip Bench Press', weight: 60, unit: 'kg', sets: 4, reps: 12, notes: 'Controlled pause at bottom' },
            { id: 'mon-4', name: 'Cable Chest Flyes', weight: 12.5, unit: 'kg', sets: 4, reps: 12, notes: 'High to low, per side, focus on squeeze' },
            { id: 'mon-5', name: 'Rear Delt Flyes', weight: 7.5, unit: 'kg', sets: 4, reps: 12, notes: 'Slow eccentrics' },
        ],
        coreExercises: [
            { id: 'mon-c1', name: 'Weighted Kneeling Cable Crunches', weight: 25, unit: 'kg', sets: 4, reps: 15, notes: '' },
            { id: 'mon-c2', name: 'Forearm Plank with Shoulder Taps', weight: 0, unit: 'kg', sets: 4, reps: 60, notes: '45-60 secs, alternate taps' },
            { id: 'mon-c3', name: 'Cable Pallof Press', weight: 10, unit: 'kg', sets: 4, reps: 12, notes: 'Per side, anti-rotation' },
        ],
        flexibility: ['Chest openers', 'Shoulder dislocations', 'Downward dog'],
    },
    {
        id: 'tuesday',
        day: 'Tuesday',
        name: 'Pull Day',
        focus: 'Back, Biceps',
        color: 'from-blue-500/20 to-cyan-500/20',
        emoji: '🔥',
        exercises: [
            { id: 'tue-1', name: 'Weighted Pull-Ups', weight: 7.5, unit: 'kg', sets: 4, reps: 12, notes: 'Add vest/plate, or assist -20kg' },
            { id: 'tue-2', name: 'T-Bar Rows', weight: 50, unit: 'kg', sets: 4, reps: 12, notes: 'Pull to chest, squeeze' },
            { id: 'tue-3', name: 'Preacher Curls (EZ-bar)', weight: 25, unit: 'kg', sets: 4, reps: 12, notes: 'Full stretch at bottom. Last set: Dropset' },
            { id: 'tue-4', name: 'Cable Straight-Arm Pulldowns', weight: 17.5, unit: 'kg', sets: 4, reps: 12, notes: 'Lat focus' },
            { id: 'tue-5', name: 'Shrugs (Dumbbell)', weight: 25, unit: 'kg', sets: 4, reps: 12, notes: 'Each hand, hold at top 2 secs' },
        ],
        coreExercises: [
            { id: 'tue-c1', name: "Captain's Chair Leg Raises", weight: 3, unit: 'kg', sets: 4, reps: 12, notes: 'Straight legs, ankle weights if possible' },
            { id: 'tue-c2', name: 'Russian Twists', weight: 7.5, unit: 'kg', sets: 4, reps: 20, notes: 'Per side, hold plate' },
            { id: 'tue-c3', name: 'Hanging Windshield Wipers', weight: 0, unit: 'kg', sets: 4, reps: 10, notes: 'Per side, or floor version' },
        ],
        flexibility: ['Cobra', 'Bicep stretches', 'Forward bend'],
    },
    {
        id: 'wednesday',
        day: 'Wednesday',
        name: 'Legs Day',
        focus: 'Quads, Hamstrings, Calves',
        color: 'from-green-500/20 to-emerald-500/20',
        emoji: '🦵',
        exercises: [
            { id: 'wed-1', name: 'Front Squats', weight: 70, unit: 'kg', sets: 4, reps: 12, notes: 'Deeper ROM for quads' },
            { id: 'wed-2', name: 'Romanian Deadlifts', weight: 80, unit: 'kg', sets: 4, reps: 12, notes: 'Hamstring stretch' },
            { id: 'wed-3', name: 'Seated Calf Raises', weight: 50, unit: 'kg', sets: 4, reps: 15, notes: 'Pause at bottom. Last set: AMRAP' },
            { id: 'wed-4', name: 'Bulgarian Split Squats', weight: 15, unit: 'kg', sets: 4, reps: 10, notes: 'Per leg, dumbbells each hand' },
            { id: 'wed-5', name: 'Leg Extensions', weight: 40, unit: 'kg', sets: 4, reps: 12, notes: 'Quad squeeze' },
        ],
        coreExercises: [
            { id: 'wed-c1', name: 'Bicycle Crunches (Weighted)', weight: 5, unit: 'kg', sets: 4, reps: 20, notes: 'Per side, hold plate' },
            { id: 'wed-c2', name: 'Side Planks with Hip Dips', weight: 0, unit: 'kg', sets: 4, reps: 10, notes: '30-45 secs/side + 10 dips' },
            { id: 'wed-c3', name: 'Ab Wheel Rollouts', weight: 0, unit: 'kg', sets: 4, reps: 12, notes: 'Full if possible' },
            { id: 'wed-c4', name: 'Reverse Hyperextensions', weight: 0, unit: 'kg', sets: 4, reps: 15, notes: 'Lower back/core stability' },
        ],
        flexibility: ['Quad stretch', 'Hamstring stretch', 'Butterfly'],
    },
    {
        id: 'thursday',
        day: 'Thursday',
        name: 'Full Body Recovery',
        focus: 'Activation & Recovery',
        color: 'from-purple-500/20 to-pink-500/20',
        emoji: '⚡',
        exercises: [
            { id: 'thu-1', name: 'Goblet Squats', weight: 25, unit: 'kg', sets: 4, reps: 15, notes: 'Deep hold at bottom' },
            { id: 'thu-2', name: 'Incline Push-Ups', weight: 10, unit: 'kg', sets: 4, reps: 12, notes: 'Or weighted bodyweight' },
            { id: 'thu-3', name: 'Bent-Over Dumbbell Rows', weight: 20, unit: 'kg', sets: 4, reps: 10, notes: 'Per side' },
            { id: 'thu-4', name: 'Military Press', weight: 35, unit: 'kg', sets: 4, reps: 12, notes: 'Standing barbell' },
            { id: 'thu-5', name: 'Concentration Curls', weight: 12.5, unit: 'kg', sets: 4, reps: 12, notes: 'Per arm. Last set: Dropset' },
        ],
        coreExercises: [
            { id: 'thu-c1', name: 'Bird-Dog with Extension Holds', weight: 0, unit: 'kg', sets: 4, reps: 10, notes: 'Per side + 10 sec hold' },
            { id: 'thu-c2', name: 'Mountain Climbers', weight: 0, unit: 'kg', sets: 4, reps: 20, notes: 'Per side, fast' },
            { id: 'thu-c3', name: 'Superman with Pulses', weight: 0, unit: 'kg', sets: 4, reps: 20, notes: '20 secs + 10 pulses' },
            { id: 'thu-c4', name: 'Weighted Decline Crunches', weight: 7.5, unit: 'kg', sets: 4, reps: 15, notes: 'Hold plate' },
        ],
        flexibility: ['Cat-cow', "Child's pose", 'Quad stretch', 'Arm circles'],
    },
    {
        id: 'friday',
        day: 'Friday',
        name: 'Push/Pull Combo',
        focus: 'Upper Focus + Shoulders',
        color: 'from-yellow-500/20 to-amber-500/20',
        emoji: '🎯',
        exercises: [
            { id: 'fri-1', name: 'Incline Barbell Bench Press', weight: 60, unit: 'kg', sets: 4, reps: 12, notes: 'Pause at bottom' },
            { id: 'fri-2', name: 'Pendlay Rows', weight: 70, unit: 'kg', sets: 4, reps: 12, notes: 'From floor' },
            { id: 'fri-3', name: 'Skull Crushers (EZ-bar)', weight: 25, unit: 'kg', sets: 4, reps: 12, notes: 'Last set: AMRAP' },
            { id: 'fri-4', name: 'Cable Upright Rows', weight: 25, unit: 'kg', sets: 4, reps: 10, notes: '' },
            { id: 'fri-5', name: 'Hammer Curls', weight: 17.5, unit: 'kg', sets: 4, reps: 12, notes: 'Per dumbbell' },
            { id: 'fri-6', name: 'Front Raises', weight: 15, unit: 'kg', sets: 4, reps: 12, notes: 'Plate' },
        ],
        coreExercises: [
            { id: 'fri-c1', name: 'Lying Leg Raises (Weighted)', weight: 3, unit: 'kg', sets: 4, reps: 15, notes: 'Ankle weights' },
            { id: 'fri-c2', name: 'Cable Woodchoppers', weight: 12.5, unit: 'kg', sets: 4, reps: 12, notes: 'Per side' },
            { id: 'fri-c3', name: 'Flutter Kicks', weight: 0, unit: 'kg', sets: 4, reps: 30, notes: '30 secs, scissor legs' },
        ],
        flexibility: ['Spinal twists', 'Shoulder rolls', 'Wrist stretches'],
    },
];

// Get today's workout based on day of week
export function getTodaysWorkout(): WorkoutDay | null {
    const dayOfWeek = new Date().getDay();
    const dayMap: Record<number, string> = {
        1: 'monday',
        2: 'tuesday',
        3: 'wednesday',
        4: 'thursday',
        5: 'friday',
    };
    const dayId = dayMap[dayOfWeek];
    return defaultWorkoutPlan.find((w) => w.id === dayId) || null;
}

// Get day name
export function getDayName(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}
