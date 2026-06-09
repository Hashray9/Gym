import type { Exercise } from './types';

export interface WorkoutDay {
    id: string;
    day: string;
    name: string;
    focus: string;
    color: string;
    emoji: string;
    duration?: number;
    timeDistribution?: {
        warmup: number;
        skill?: number;
        strength?: number;
        circuit?: number;
        core?: number;
        flexibility: number;
    };
    warmup: Exercise[];
    skills?: Exercise[];
    exercises: Exercise[];
    coreExercises: Exercise[];
    flexibility: Exercise[];
    trainerTip?: string;
}

// Default workout plan - Monday to Sunday (Hybrid Athletic Plan)
export const defaultWorkoutPlan: WorkoutDay[] = [
    {
        id: 'monday',
        day: 'Monday',
        name: 'Push + Handstand',
        focus: 'Chest, Shoulders, Triceps',
        color: 'from-orange-500/20 to-red-500/20',
        emoji: '🤸‍♂️',
        duration: 60,
        timeDistribution: { warmup: 7, skill: 10, strength: 33, core: 5, flexibility: 5 },
        trainerTip: 'Chakrasana directly improves thoracic extension which is critical for handstand alignment. Never skip this even on time-crunched days.',
        warmup: [
            { id: 'd1-w1', name: 'Shoulder circles + arm swings', weight: 0, unit: 's', sets: 1, reps: '60s', notes: 'Keep movements loose and dynamic' },
            { id: 'd1-w2', name: 'Pike push-up holds', weight: 0, unit: 'reps', sets: 2, reps: '8', notes: '3-second hold at the bottom of each rep' },
            { id: 'd1-w3', name: 'Wrist circles + loaded wrist stretch', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Warm up wrists thoroughly' },
            { id: 'd1-w4', name: 'Cat-cow stretch', weight: 0, unit: 's', sets: 1, reps: '60s', notes: 'Inhale to arch, exhale to round' }
        ],
        skills: [
            { id: 'd1-s1', name: 'Wall handstand hold (chest-to-wall)', weight: 0, unit: 's', sets: 4, reps: '25s', restTime: 40, notes: 'Tight hollow body, push floor away' },
            { id: 'd1-s2', name: 'Kick-up attempts (balance focus)', weight: 0, unit: 'att', sets: 2, reps: '5 attempts', restTime: 60, notes: 'Focus on finding the balance point' }
        ],
        exercises: [
            { id: 'd1-e1', name: 'Barbell bench press', weight: 40, unit: 'kg', sets: 4, reps: '6-8', restTime: 80, type: 'Gym', notes: 'Flat bench, power focus. Control the eccentric.' },
            { id: 'd1-e2', name: 'Pike push-ups (weighted/elevated)', weight: 0, unit: 'kg', sets: 3, reps: '10', restTime: 60, type: 'Calisthenics', notes: 'Elevate feet on a box or use a weight vest.' },
            { id: 'd1-e3', name: 'Incline dumbbell press', weight: 15, unit: 'kg', sets: 3, reps: '10', restTime: 60, type: 'Gym', notes: '30-degree incline for upper chest development.' },
            { id: 'd1-e4', name: 'Dips (parallel bars)', weight: 0, unit: 'kg', sets: 3, reps: '12', restTime: 60, type: 'Calisthenics', notes: 'Lean torso forward to target chest.' },
            { id: 'd1-e5', name: 'Cable lateral raises', weight: 5, unit: 'kg', sets: 3, reps: '15', restTime: 45, type: 'Gym', notes: 'Slow 3-second eccentric contraction.' }
        ],
        coreExercises: [
            { id: 'd1-c1', name: 'Hollow body hold', weight: 0, unit: 's', sets: 3, reps: '25s', notes: 'Lower abs + handstand foundation.' },
            { id: 'd1-c2', name: 'Reverse crunches', weight: 0, unit: 'reps', sets: 3, reps: '15', notes: 'Lower abs — slow, controlled reps.' }
        ],
        flexibility: [
            { id: 'd1-f1', name: 'Chest doorframe stretch', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' },
            { id: 'd1-f2', name: 'Shoulder sleeper stretch', weight: 0, unit: 's', sets: 1, reps: '60s', notes: 'Gently stretch posterior joint capsule.' },
            { id: 'd1-f3', name: 'Full bridge / Chakrasana', weight: 0, unit: 's', sets: 2, reps: '20s hold', notes: 'Improves shoulder and thoracic mobility.' }
        ]
    },
    {
        id: 'tuesday',
        day: 'Tuesday',
        name: 'Pull + Core',
        focus: 'Back, Lats, Biceps, Abs',
        color: 'from-blue-500/20 to-cyan-500/20',
        emoji: '🔥',
        duration: 60,
        timeDistribution: { warmup: 7, strength: 38, core: 10, flexibility: 5 },
        trainerTip: 'Lat pulldown and cable rows replace all hanging exercises. Focus on scapular retraction at peak contraction — this builds the back thickness that creates an athletic V-taper.',
        warmup: [
            { id: 'd2-w1', name: 'Band pull-aparts', weight: 0, unit: 'reps', sets: 3, reps: '15', notes: 'Warm up rear delts and scapulae' },
            { id: 'd2-w2', name: 'Scapular push-ups', weight: 0, unit: 'reps', sets: 2, reps: '10', notes: 'Retract/protract shoulder blades, arms straight' },
            { id: 'd2-w3', name: 'Face pulls (light)', weight: 5, unit: 'kg', sets: 2, reps: '15', notes: 'Pull toward forehead, squeeze rear delts' },
            { id: 'd2-w4', name: 'Cat-cow + child\'s pose', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Decompress spine, focus on breath' }
        ],
        exercises: [
            { id: 'd2-e1', name: 'Bent-over barbell row', weight: 35, unit: 'kg', sets: 4, reps: '6-8', restTime: 80, type: 'Gym', notes: 'Retract scapulae fully at top.' },
            { id: 'd2-e2', name: 'Lat pulldown (neutral grip)', weight: 35, unit: 'kg', sets: 3, reps: '10', restTime: 60, type: 'Gym', notes: 'Replaces hanging exercises. Keep shoulders packed.' },
            { id: 'd2-e3', name: 'Seated cable row (wide grip)', weight: 30, unit: 'kg', sets: 3, reps: '10', restTime: 60, type: 'Gym', notes: 'Target upper back and rear delts.' },
            { id: 'd2-e4', name: 'Face pulls', weight: 10, unit: 'kg', sets: 3, reps: '15', restTime: 45, type: 'Gym', notes: 'Rear delt + rotator cuff health.' },
            { id: 'd2-e5', name: 'Hammer curls', weight: 10, unit: 'kg', sets: 3, reps: '12', restTime: 45, type: 'Gym', notes: 'Builds forearms and brachialis.' },
            { id: 'd2-e6', name: 'Incline dumbbell curl', weight: 7.5, unit: 'kg', sets: 3, reps: '10', restTime: 45, type: 'Gym', notes: 'Deep stretch at the bottom of the movement.' }
        ],
        coreExercises: [
            { id: 'd2-c1', name: 'Dead bug', weight: 0, unit: 'reps', sets: 3, reps: '10 each', notes: 'Core stability, lower ab activation.' },
            { id: 'd2-c2', name: 'Leg raises (flat bench)', weight: 0, unit: 'reps', sets: 4, reps: '12-15', notes: 'Primary lower abs builder. Controlled tempo.' },
            { id: 'd2-c3', name: 'L-sit hold (parallettes/floor)', weight: 0, unit: 's', sets: 3, reps: '15s', notes: 'Builds crow + handstand base.' }
        ],
        flexibility: [
            { id: 'd2-f1', name: 'Lat stretch on squat rack', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' },
            { id: 'd2-f2', name: 'Thoracic foam rolling', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Gently release upper back stiffness.' },
            { id: 'd2-f3', name: 'Supine twist', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' }
        ]
    },
    {
        id: 'wednesday',
        day: 'Wednesday',
        name: 'Active Recovery',
        focus: 'Yoga & Mobility Flow',
        color: 'from-sky-500/10 to-indigo-500/10',
        emoji: '🧘',
        duration: 20,
        timeDistribution: { warmup: 0, flexibility: 20 },
        trainerTip: 'Flexibility gains happen primarily during recovery — skipping these sessions will slow your handstand and six pack progress.',
        warmup: [],
        exercises: [],
        coreExercises: [],
        flexibility: [
            { id: 'd6-f1', name: 'Guided yoga/mobility flow', weight: 0, unit: 'm', sets: 1, reps: '20 mins', notes: 'Focus on deep nasal breathing and relaxation.' },
            { id: 'd6-f2', name: 'Pigeon pose (hip flexor + glute release)', weight: 0, unit: 's', sets: 1, reps: '180s', notes: '90 seconds each side.' },
            { id: 'd6-f3', name: 'Lizard lunge with thoracic rotation', weight: 0, unit: 's', sets: 1, reps: '150s', notes: '75 seconds each side.' },
            { id: 'd6-f4', name: 'Thoracic foam rolling', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Roll out thoracic spine to open chest.' }
        ]
    },
    {
        id: 'thursday',
        day: 'Thursday',
        name: 'Legs + Mobility',
        focus: 'Quads, Glutes, Hamstrings, Mobility',
        color: 'from-green-500/20 to-emerald-500/20',
        emoji: '🦵',
        duration: 60,
        timeDistribution: { warmup: 7, skill: 7, strength: 28, flexibility: 18 },
        trainerTip: 'Tight hip flexors visually worsen lower belly fat appearance. Consistent work in this mobility block will flatten your lower abs faster than extra crunches.',
        warmup: [
            { id: 'd3-w1', name: 'Hip circles + leg swings', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Lubricate hip sockets' },
            { id: 'd3-w2', name: 'World\'s greatest stretch', weight: 0, unit: 'reps', sets: 1, reps: '4 each', notes: 'Lunge with deep torso rotation' },
            { id: 'd3-w3', name: 'Bodyweight squats (pause at bottom)', weight: 0, unit: 'reps', sets: 2, reps: '12', notes: '3-second pause at the deep bottom' },
            { id: 'd3-w4', name: 'Glute bridges', weight: 0, unit: 'reps', sets: 2, reps: '15', notes: 'Activate glutes and hamstrings' }
        ],
        skills: [
            { id: 'd3-s1', name: 'Pistol squat progression', weight: 0, unit: 'reps', sets: 3, reps: '5 each', notes: 'Use support. Builds athletic single-leg strength.' },
            { id: 'd3-s2', name: 'Crow pose hold (Bakasana)', weight: 0, unit: 's', sets: 3, reps: 'Max hold', notes: 'Target 30–45 sec — extend your current hold.' }
        ],
        exercises: [
            { id: 'd3-e1', name: 'Barbell back squat', weight: 50, unit: 'kg', sets: 4, reps: '6-8', restTime: 90, type: 'Gym', notes: 'Deep, athletic base squats.' },
            { id: 'd3-e2', name: 'Romanian deadlift', weight: 45, unit: 'kg', sets: 3, reps: '10', restTime: 75, type: 'Gym', notes: 'Target posterior chain. Focus on hip hinge.' },
            { id: 'd3-e3', name: 'Bulgarian split squat', weight: 12.5, unit: 'kg', sets: 3, reps: '8 each', restTime: 60, type: 'Gym', notes: 'Rear foot elevated. Controlled balance.' },
            { id: 'd3-e4', name: 'Jump squats', weight: 0, unit: 'reps', sets: 3, reps: '10', restTime: 45, type: 'Calisthenics', notes: 'Explosive power. Land softly on toes.' }
        ],
        coreExercises: [],
        flexibility: [
            { id: 'd3-f1', name: 'Pigeon pose (hip flexor + glute release)', weight: 0, unit: 's', sets: 1, reps: '180s', notes: '90 seconds each side.' },
            { id: 'd3-f2', name: 'Lizard lunge with thoracic rotation', weight: 0, unit: 's', sets: 1, reps: '150s', notes: '75 seconds each side.' },
            { id: 'd3-f3', name: 'Pancake stretch', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Seated wide fold. Breathe into lower back.' },
            { id: 'd3-f4', name: '90/90 hip stretch', weight: 0, unit: 's', sets: 1, reps: '180s', notes: '90 seconds each side.' },
            { id: 'd3-f5', name: 'Supta Virasana (Reclined Hero)', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Deep quadriceps and hip flexor stretch.' },
            { id: 'd3-f6', name: 'Full bridge / Chakrasana', weight: 0, unit: 's', sets: 2, reps: '20s holds', notes: 'Thoracic bridge holds.' }
        ]
    },
    {
        id: 'friday',
        day: 'Friday',
        name: 'Shoulders + Arms',
        focus: 'Delts, Biceps, Triceps',
        color: 'from-purple-500/20 to-pink-500/20',
        emoji: '⚡',
        duration: 60,
        timeDistribution: { warmup: 7, skill: 10, strength: 36, flexibility: 7 },
        trainerTip: 'Barbell overhead press is the single most important exercise for shoulder mass. Never replace it with machine press — the stabilisation demand is what builds the athletic look.',
        warmup: [
            { id: 'd4-w1', name: 'Shoulder dislocates', weight: 0, unit: 'reps', sets: 3, reps: '10', notes: 'Use band or stick' },
            { id: 'd4-w2', name: 'Cuban press (light)', weight: 2.5, unit: 'kg', sets: 2, reps: '12', notes: 'Warm up rotator cuff' },
            { id: 'd4-w3', name: 'Band pull-aparts', weight: 0, unit: 'reps', sets: 2, reps: '15', notes: 'Warm up posterior deltoids' }
        ],
        skills: [
            { id: 'd4-s1', name: 'Handstand (back-to-wall)', weight: 0, unit: 's', sets: 4, reps: '30s', notes: 'Alignment focus. Keep ribs tucked.' },
            { id: 'd4-s2', name: 'Planche lean holds on parallettes', weight: 0, unit: 's', sets: 3, reps: '15s', notes: 'Protract shoulders, lean forward.' },
            { id: 'd4-s3', name: 'Mayurasana (Peacock pose)', weight: 0, unit: 's', sets: 3, reps: 'Max hold', notes: 'You already can — extend duration.' }
        ],
        exercises: [
            { id: 'd4-e1', name: 'Overhead press - barbell', weight: 30, unit: 'kg', sets: 4, reps: '6-8', restTime: 80, type: 'Gym', notes: 'Barbell OHP is critical for shoulder stabilization.' },
            { id: 'd4-e2', name: 'Arnold press', weight: 10, unit: 'kg', sets: 3, reps: '10', restTime: 60, type: 'Gym', notes: 'Hits all three deltoid heads.' },
            { id: 'd4-e3', name: 'Cable lateral raises', weight: 5, unit: 'kg', sets: 3, reps: '15', restTime: 45, type: 'Gym', notes: '3-second slow eccentric.' },
            { id: 'd4-e4', name: 'Rear delt fly (cable)', weight: 7.5, unit: 'kg', sets: 3, reps: '15', restTime: 45, type: 'Gym', notes: 'Pull wide and squeeze rear delts.' },
            { id: 'd4-e5', name: 'Barbell curl 21s (7+7+7)', weight: 15, unit: 'kg', sets: 3, reps: '3 rounds', restTime: 60, type: 'Gym', notes: '7 lower + 7 upper + 7 full range reps.' },
            { id: 'd4-e6', name: 'Diamond push-ups', weight: 0, unit: 'reps', sets: 2, reps: 'Max reps', restTime: 60, type: 'Calisthenics', notes: 'Burnout set for triceps. Keep chest tight.' }
        ],
        coreExercises: [],
        flexibility: [
            { id: 'd4-f1', name: 'Ab wheel rollouts', weight: 0, unit: 'reps', sets: 2, reps: '10', notes: 'Core finisher. Don\'t sag lower back.' },
            { id: 'd4-f2', name: 'Wrist mobility + forearm stretch', weight: 0, unit: 's', sets: 1, reps: '120s', notes: 'Stretch wrists and forearms.' },
            { id: 'd4-f3', name: 'Cross-body shoulder stretch', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' },
            { id: 'd4-f4', name: 'Doorframe chest + shoulder opener', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Leaning door stretch.' }
        ]
    },
    {
        id: 'saturday',
        day: 'Saturday',
        name: 'Full Body Athletic',
        focus: 'Power, Conditioning, Core Burnout',
        color: 'from-red-500/20 to-orange-500/20',
        emoji: '🎯',
        duration: 60,
        timeDistribution: { warmup: 7, skill: 8, circuit: 30, core: 8, flexibility: 7 },
        trainerTip: 'This session is high intensity. Complete all 6 exercises as one circuit. Rest 90 sec between full rounds.',
        warmup: [
            { id: 'd5-w1', name: 'Jumping jacks', weight: 0, unit: 's', sets: 1, reps: '60s', notes: 'Build core body temperature' },
            { id: 'd5-w2', name: 'Dynamic lunge with rotation', weight: 0, unit: 'reps', sets: 1, reps: '8 each', notes: 'Step forward, twist torso over front knee' },
            { id: 'd5-w3', name: 'Inchworm walk-outs', weight: 0, unit: 'reps', sets: 1, reps: '8', notes: 'Walk out to plank and back' },
            { id: 'd5-w4', name: 'Bear crawls', weight: 0, unit: 's', sets: 3, reps: '20s', notes: 'Crawling holds. Core active' }
        ],
        skills: [
            { id: 'd5-s1', name: 'Freestanding handstand practice', weight: 0, unit: 'att', sets: 1, reps: '6-8 attempts', notes: 'No wall. Prioritize straight body line and finger control.' }
        ],
        exercises: [
            { id: 'd5-e1', name: 'Burpees', weight: 0, unit: 'reps', sets: 3, reps: '10', restTime: 0, type: 'Calisthenics', coachingCue: 'Explosive — full extension at top', notes: 'Jump high, fully extend hips.' },
            { id: 'd5-e2', name: 'Kettlebell swing', weight: 16, unit: 'kg', sets: 3, reps: '15', restTime: 0, type: 'Gym', coachingCue: 'Drive through hips, not arms', notes: 'Hinge forcefully. Pack shoulders.' },
            { id: 'd5-e3', name: 'Clapping / archer push-ups', weight: 0, unit: 'reps', sets: 3, reps: '10', restTime: 0, type: 'Calisthenics', coachingCue: 'Athletic upper body power', notes: 'Archer or clap. Choose intensity.' },
            { id: 'd5-e4', name: 'Box jumps', weight: 0, unit: 'reps', sets: 3, reps: '10', restTime: 0, type: 'Calisthenics', coachingCue: 'Land soft, full extension at top', notes: 'Step down, land quietly.' },
            { id: 'd5-e5', name: 'Dumbbell thruster (squat + press)', weight: 10, unit: 'kg', sets: 3, reps: '12', restTime: 0, type: 'Gym', coachingCue: 'One fluid movement', notes: 'Squat deep and press up.' },
            { id: 'd5-e6', name: 'Mountain climbers', weight: 0, unit: 's', sets: 3, reps: '30s', restTime: 90, type: 'Calisthenics', coachingCue: 'Hips level, fast feet', notes: 'Circuit completed when climbers are done. Rest 90s.' }
        ],
        coreExercises: [
            { id: 'd5-c1', name: 'Knee tucks on dip bar', weight: 0, unit: 'reps', sets: 3, reps: '15', notes: 'No hanging. Lift knees to chest.' },
            { id: 'd5-c2', name: 'Bicycle crunches', weight: 0, unit: 'reps', sets: 3, reps: '20', notes: 'Obliques and upper abs.' },
            { id: 'd5-c3', name: 'V-ups', weight: 0, unit: 'reps', sets: 3, reps: '12', notes: 'Full abs. Touch toes.' }
        ],
        flexibility: [
            { id: 'd5-f1', name: 'Hip flexor lunge stretch', weight: 0, unit: 's', sets: 1, reps: '120s', notes: '60 seconds each side.' },
            { id: 'd5-f2', name: 'Seated hamstring forward fold', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Relax into the stretch.' },
            { id: 'd5-f3', name: 'Spinal twist', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' },
            { id: 'd5-f4', name: 'Happy baby pose', weight: 0, unit: 's', sets: 1, reps: '60s', notes: 'Relax lower back and groin.' },
            { id: 'd5-f5', name: 'Savasana + deep breathing', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '90 seconds deep breathing.' }
        ]
    },
    {
        id: 'sunday',
        day: 'Sunday',
        name: 'Active Recovery',
        focus: 'Yoga & Mobility Flow',
        color: 'from-sky-500/10 to-indigo-500/10',
        emoji: '🧘',
        duration: 20,
        timeDistribution: { warmup: 0, flexibility: 20 },
        trainerTip: 'Use today to restore deep diaphragmatic breathing and loosen tight shoulders. Sleep quality will improve tonight!',
        warmup: [],
        exercises: [],
        coreExercises: [],
        flexibility: [
            { id: 'd7-f1', name: 'Yoga / Mobility flow', weight: 0, unit: 'm', sets: 1, reps: '20 mins', notes: 'Gentle vinyasa or slow movements. Stay relaxed.' },
            { id: 'd7-f2', name: 'Chest + Shoulder doorframe opener', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Open up pectorals and deltoids.' },
            { id: 'd7-f3', name: 'Pancake stretch (seated wide fold)', weight: 0, unit: 's', sets: 1, reps: '90s', notes: 'Sit tall, hinge from hips.' },
            { id: 'd7-f4', name: 'Supine twist', weight: 0, unit: 's', sets: 1, reps: '90s', notes: '45 seconds each side.' }
        ]
    }
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
        6: 'saturday',
        0: 'sunday',
    };
    const dayId = dayMap[dayOfWeek];
    return defaultWorkoutPlan.find((w) => w.id === dayId) || null;
}

// Get day name
export function getDayName(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
}
