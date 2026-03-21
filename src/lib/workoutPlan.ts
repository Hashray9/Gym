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
            { id: 'mon-1', name: 'Pike push-ups', weight: 0, unit: 'kg', sets: 3, reps: '8-12', notes: 'Elevate feet on box to increase difficulty' },
            { id: 'mon-2', name: 'Wide push-ups', weight: 0, unit: 'kg', sets: 3, reps: '12-15', notes: '3-sec slow descent; last set AMRAP' },
            { id: 'mon-3', name: 'Diamond push-ups', weight: 0, unit: 'kg', sets: 3, reps: '10-12', notes: 'Elbows track back, not flared' },
            { id: 'mon-4', name: 'Dips', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Lean forward for chest; upright for triceps' },
            { id: 'mon-5', name: 'Pseudo planche lean holds', weight: 0, unit: '+kg', sets: 3, reps: '15-20s', notes: 'Lean forward on wrists, protract shoulders hard' },
        ],
        coreExercises: [
            { id: 'mon-c1', name: 'Hollow body hold', weight: 0, unit: 'kg', sets: 3, reps: '30s', notes: 'Lower back pressed to floor throughout' },
            { id: 'mon-c2', name: 'Arch body hold', weight: 0, unit: '+kg', sets: 3, reps: '20s', notes: 'Opposite of hollow — supple spine' },
        ],
        flexibility: [
            'SKILL (10 MIN): Handstand progressions — 3 × 20–30 sec wall-facing holds.',
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
            { id: 'tue-1', name: 'Negative pull-ups', weight: 0, unit: 'kg', sets: 3, reps: '5-6', notes: 'Jump to top, lower in 5–8 sec — best pull-up builder' },
            { id: 'tue-2', name: 'Australian rows', weight: 0, unit: 'kg', sets: 3, reps: '10-12', notes: 'Under table/bar; body straight, chest to bar' },
            { id: 'tue-3', name: 'Scapular pull-ups', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'Dead hang → depress scapula only, no arm bend' },
            { id: 'tue-4', name: 'Chin-ups', weight: 0, unit: 'kg', sets: 3, reps: 'Max', notes: 'Supinated grip; use band if needed' },
            { id: 'tue-5', name: 'Dead hang', weight: 0, unit: '+kg', sets: 3, reps: '30-60s', notes: 'Build grip and shoulder health; decompress spine' },
        ],
        coreExercises: [
            { id: 'tue-c1', name: 'Hanging knee raises', weight: 0, unit: 'kg', sets: 3, reps: '10-12', notes: 'Progress to straight-leg raises when strong' },
            { id: 'tue-c2', name: 'Tuck hanging hold', weight: 0, unit: '+kg', sets: 3, reps: '15s', notes: 'Knees to chest in dead hang — builds toward muscle-up' },
        ],
        flexibility: [
            'SKILL (10 MIN): L-sit progressions — 3 × 10 sec tucked L-sit on floor or chairs.',
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
            { id: 'wed-1', name: 'Jump squats', weight: 0, unit: 'kg', sets: 3, reps: 10, notes: 'Explosive power warm-up; land softly' },
            { id: 'wed-2', name: 'Bulgarian split squats', weight: 0, unit: 'kg', sets: 3, reps: '10-12', notes: 'Per leg. Rear foot elevated; deep and slow' },
            { id: 'wed-3', name: 'Shrimp squats (assisted)', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Per leg. Hold pole; lower back knee to floor' },
            { id: 'wed-4', name: 'Nordic curl negatives', weight: 0, unit: 'kg', sets: 3, reps: '5-6', notes: 'Kneel, anchor feet, lower torso very slowly' },
            { id: 'wed-5', name: 'Single-leg calf raises', weight: 0, unit: 'kg', sets: 3, reps: '15-20', notes: 'Per leg. Use step for full ROM; pause at bottom' },
        ],
        coreExercises: [
            { id: 'wed-c1', name: 'Ab wheel rollouts', weight: 0, unit: 'kg', sets: 3, reps: '8-10', notes: 'From knees; hollow body — don\'t sag' },
            { id: 'wed-c2', name: 'Side plank hip dips', weight: 0, unit: '+kg', sets: 3, reps: '30s', notes: 'Per side + 10 dips. Oblique and hip stability' },
        ],
        flexibility: [
            'SKILL (10 MIN): Pistol squat prep — Single-leg balance 30 sec each side.',
            '→ assisted pistol squat holding a pole or TRX.'
        ],
    },
    {
        id: 'thursday',
        day: 'Thursday',
        name: 'Skills & Recovery',
        focus: 'Skill Focus · Mobility',
        color: 'from-purple-500/20 to-pink-500/20',
        emoji: '⚡',
        exercises: [
            { id: 'thu-1', name: 'Mobility flow', weight: 0, unit: '+kg', sets: 3, reps: '60s', notes: 'Each: Cat-cow → thoracic rotation → hip flexor → hamstring → shoulder circles' },
            { id: 'thu-2', name: 'Wrist conditioning', weight: 0, unit: '+kg', sets: 3, reps: '90s', notes: 'Circles, extensions, prayer stretch — critical' },
            { id: 'thu-3', name: 'Crow pose', weight: 0, unit: '+kg', sets: 3, reps: '10s', notes: 'Lean forward, shift weight → builds planche wrist tolerance' },
        ],
        coreExercises: [
            { id: 'thu-c1', name: 'Hollow body rocks', weight: 0, unit: 'kg', sets: 3, reps: 20, notes: 'Arms overhead; gentle rock — reinforces skill body position' },
            { id: 'thu-c2', name: 'Superman holds', weight: 0, unit: '+kg', sets: 3, reps: '30s', notes: 'Lower back and glute activation' },
        ],
        flexibility: [
            'SKILL (10 MIN): Planche + Handstand refinement.',
            'Planche: tuck lean → 2–3 sec tuck hold, protract fully. Handstand: 10 min repeated attempts.'
        ],
    },
    {
        id: 'friday',
        day: 'Friday',
        name: 'Full Body Strength',
        focus: 'Compound · High Intensity',
        color: 'from-indigo-500/20 to-purple-500/20',
        emoji: '🎯',
        exercises: [
            { id: 'fri-1', name: 'Pull-ups to max', weight: 0, unit: 'kg', sets: 3, reps: 'Max', notes: 'Track total reps weekly — key progress metric' },
            { id: 'fri-2', name: 'Archer push-ups', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Per side. Shift weight to one side — one-arm push-up progression' },
            { id: 'fri-3', name: 'Wide grip pull-ups', weight: 0, unit: 'kg', sets: 3, reps: 'Max', notes: 'Full dead hang at bottom; back width focus' },
            { id: 'fri-4', name: 'Push-up variation circuit', weight: 0, unit: 'kg', sets: 3, reps: 'Rounds', notes: 'Decline → wide → diamond → explosive (clap), 6 reps each, no rest' },
            { id: 'fri-5', name: 'Explosive dips', weight: 0, unit: 'kg', sets: 3, reps: '6-8', notes: 'Push hard on the way up — power for muscle-up transition' },
        ],
        coreExercises: [
            { id: 'fri-c1', name: 'L-sit practice', weight: 0, unit: 'kg', sets: 3, reps: 'Max', notes: 'Accumulate hold time across attempts' },
            { id: 'fri-c2', name: 'Dragon flag negatives', weight: 0, unit: '+kg', sets: 3, reps: '4-5', notes: 'Lie on bench, lower straight body slowly from top' },
        ],
        flexibility: [
            'SKILL (10 MIN): Bar muscle-up drills — Explosive pull-up + hip drive transition drill.',
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
