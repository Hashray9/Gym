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

// Default workout plan - Monday to Friday (Calisthenics Version)
export const defaultWorkoutPlan: WorkoutDay[] = [
    {
        id: 'monday',
        day: 'Monday',
        name: 'Push Day',
        focus: 'Chest, Shoulders, Triceps',
        color: 'from-orange-500/20 to-red-500/20',
        emoji: '🤸‍♂️',
        exercises: [
            { id: 'mon-1', name: 'Wall Handstand Push-up Negatives', weight: 0, unit: 'kg', sets: 3, reps: '5-8', notes: 'Very slow descent (3-5s), kick back up' },
            { id: 'mon-2', name: 'Decline Push-ups', weight: 0, unit: 'kg', sets: 3, reps: '12-15', notes: 'Feet elevated, hits upper chest' },
            { id: 'mon-3', name: 'Sphinx / Triceps Ext Push-ups', weight: 0, unit: 'kg', sets: 3, reps: '8-12', notes: 'Forearms on floor, push to hands' },
            { id: 'mon-4', name: 'Straight Bar Dips', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Aim for 3x12 → add weight' },
            { id: 'mon-5', name: 'Frog Stand / Tuck Planche', weight: 0, unit: '+kg', sets: 3, reps: '15-20s', notes: 'Balance on hands with knees on elbows' },
        ],
        coreExercises: [
            { id: 'mon-c1', name: 'V-Ups', weight: 0, unit: 'kg', sets: 3, reps: 15, notes: 'Explosive core compression' },
            { id: 'mon-c2', name: 'Plank with Shoulder Taps', weight: 0, unit: '+kg', sets: 3, reps: '40s', notes: 'Anti-rotation stability' },
        ],
        flexibility: [
            'Skill Work (10 Min): Handstand progressions — 3 × 20–30 sec wall-facing holds.',
            'Push floor away, protract shoulders, keep body straight.',
        ],
    },
    {
        id: 'tuesday',
        day: 'Tuesday',
        name: 'Pull Day',
        focus: 'Back, Biceps',
        color: 'from-blue-500/20 to-cyan-500/20',
        emoji: '🔥',
        exercises: [
            { id: 'tue-1', name: 'Commando Pull-ups', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Alt side-to-side on the bar' },
            { id: 'tue-2', name: 'Tuck Front Lever Rows', weight: 0, unit: 'kg', sets: 3, reps: '5-8', notes: 'Hang from bar in a tuck, row to chest' },
            { id: 'tue-3', name: 'Active to Passive Hangs', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Dead hang into engaged shoulders' },
            { id: 'tue-4', name: 'Underhand Bodyweight Rows', weight: 0, unit: 'kg', sets: 3, reps: '10-12', notes: 'Bar at waist height, supinated grip' },
            { id: 'tue-5', name: 'Towel / Thick Bar Hang', weight: 0, unit: '+kg', sets: 3, reps: '30-60s', notes: 'Intense grip builder' },
        ],
        coreExercises: [
            { id: 'tue-c1', name: 'Toes-to-Bar / Knee-to-Elbow', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Strict, no swing' },
            { id: 'tue-c2', name: 'L-Sit Flutter Kicks', weight: 0, unit: '+kg', sets: 3, reps: '20s', notes: 'Keep legs straight' },
        ],
        flexibility: [
            'Skill Work (10 Min): L-sit progressions — 3 × 10 sec tucked L-sit on floor or chairs.',
            'Week 3–4: extend one leg at a time.',
        ],
    },
    {
        id: 'wednesday',
        day: 'Wednesday',
        name: 'Legs Day',
        focus: 'Quads, Hamstrings, Calves',
        color: 'from-green-500/20 to-emerald-500/20',
        emoji: '🦵',
        exercises: [
            { id: 'wed-1', name: 'Explosive Step-ups', weight: 0, unit: 'kg', sets: 3, reps: 10, notes: 'Per leg. Drive knee up high off a bench' },
            { id: 'wed-2', name: 'Cossack Squats', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Per leg. Deep side lunge, working mobility' },
            { id: 'wed-3', name: 'Sissy Squats', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Lean back, knees forward (hold a pole if needed)' },
            { id: 'wed-4', name: 'Glute Bridge Walkouts', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Bridge up, walk heels away and back' },
            { id: 'wed-5', name: 'Donkey Calf Raises', weight: 0, unit: 'kg', sets: 3, reps: '15-20', notes: 'Bend at hips, hands on wall/bench' },
        ],
        coreExercises: [
            { id: 'wed-c1', name: 'Reverse Crunches', weight: 0, unit: 'kg', sets: 3, reps: '12-15', notes: 'Roll pelvis off the floor' },
            { id: 'wed-c2', name: 'Side Plank Star Hold', weight: 0, unit: '+kg', sets: 3, reps: '30s', notes: 'Per side (Lift top arm and leg)' },
        ],
        flexibility: [
            'Skill Work (10 Min): Pistol squat prep — Single-leg balance 30 sec each side.',
            'Move to assisted pistol squat holding a pole or TRX.',
        ],
    },
    {
        id: 'thursday',
        day: 'Thursday',
        name: 'Skills & Mobility',
        focus: 'Skill Focus & Active Recovery',
        color: 'from-purple-500/20 to-pink-500/20',
        emoji: '⚡',
        exercises: [
            { id: 'thu-1', name: 'Animal Flow / Bear Crawls', weight: 0, unit: '+kg', sets: 3, reps: '60s', notes: 'Active shoulder and hip mobility' },
            { id: 'thu-2', name: 'Fingertip Push-up Holds', weight: 0, unit: '+kg', sets: 3, reps: '30s', notes: 'Build tendon strength in hands' },
            { id: 'thu-3', name: 'Elbow Lever Practice', weight: 0, unit: '+kg', sets: 3, reps: '10-15s', notes: 'Stab elbows into stomach, balance body' },
        ],
        coreExercises: [
            { id: 'thu-c1', name: 'Dead Bugs', weight: 0, unit: 'kg', sets: 3, reps: 20, notes: 'Slow and controlled, back flat' },
            { id: 'thu-c2', name: 'Bird-Dog Holds', weight: 0, unit: '+kg', sets: 3, reps: '30s', notes: 'Per side (Core stabilization)' },
        ],
        flexibility: [
            'Skill Work (10 Min): Planche + Handstand refinement.',
            '10 minutes repeated attempts focusing on brief holds and form.',
        ],
    },
    {
        id: 'friday',
        day: 'Friday',
        name: 'Full Body Strength',
        focus: 'Compound • High Intensity',
        color: 'from-indigo-500/20 to-purple-500/20',
        emoji: '🎯',
        exercises: [
            { id: 'fri-1', name: 'Weighted Pull-ups (or Banded)', weight: 0, unit: 'kg', sets: 3, reps: '5-8', notes: 'Focus on strict, heavy sets' },
            { id: 'fri-2', name: 'Typewriter / Slider Push-ups', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Per side, stay low and glide' },
            { id: 'fri-3', name: 'Muscle-up Negatives', weight: 0, unit: 'kg', sets: 3, reps: '3-5', notes: 'Lower through transition slowly' },
            { id: 'fri-4', name: 'Burpee Pull-ups', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Explosive full body conditioning' },
            { id: 'fri-5', name: 'Russian Dips', weight: 0, unit: 'kg', sets: 3, reps: '5-8', notes: 'Dip down, drop to forearms, push back up' },
        ],
        coreExercises: [
            { id: 'fri-c1', name: 'Windshield Wipers', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Hanging or lying on back' },
            { id: 'fri-c2', name: 'Dragon Flag Holds', weight: 0, unit: '+kg', sets: 3, reps: 'Max', notes: 'Hold the top straight-body position' },
        ],
        flexibility: [
            'Skill Work (10 Min): Bar muscle-up drills — Explosive pull-up + hip drive transition drill.',
        ],
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
