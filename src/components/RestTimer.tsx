import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RestTimerProps {
    duration: number; // in seconds
    label: string;
    onClose: () => void;
}

export function RestTimer({ duration, label, onClose }: RestTimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef<any>(null);

    useEffect(() => {
        setTimeLeft(duration);
        setIsRunning(true);
    }, [duration, label]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished!
            if (timerRef.current) clearInterval(timerRef.current);
            // We can play a gentle vibration or sound if supported, or let visual flash handle it
            if ('vibrate' in navigator) {
                try {
                    navigator.vibrate([200, 100, 200]);
                } catch {
                    // Ignore vibration fails on unsupported devices
                }
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning, timeLeft]);

    const handlePlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleAdd10s = () => {
        setTimeLeft((prev) => prev + 10);
    };

    const percentage = (timeLeft / duration) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4 p-4 pr-5 bg-card/90 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-full max-w-sm"
        >
            {/* Circular Progress SVG */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-muted/40 fill-none"
                        strokeWidth="4"
                    />
                    <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-primary fill-none"
                        strokeWidth="4"
                        strokeDasharray="176"
                        animate={{ strokeDashoffset: 176 - (176 * percentage) / 100 }}
                        transition={{ duration: 0.3 }}
                    />
                </svg>
                <div className="absolute text-base font-black tracking-tighter">
                    {timeLeft > 0 ? `${timeLeft}s` : 'Done!'}
                </div>
            </div>

            {/* Label and Controls */}
            <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider truncate max-w-[150px]">
                    Resting • {label}
                </span>
                <div className="flex items-center gap-2 mt-1">
                    {/* Play/Pause */}
                    <button
                        onClick={handlePlayPause}
                        className="p-1 px-2.5 bg-muted/60 hover:bg-muted text-xs font-semibold rounded-full border border-border"
                    >
                        {isRunning ? 'Pause' : 'Resume'}
                    </button>
                    {/* Add 10s */}
                    <button
                        onClick={handleAdd10s}
                        className="p-1 px-2.5 bg-muted/60 hover:bg-muted text-xs font-semibold rounded-full border border-border"
                    >
                        +10s
                    </button>
                    {/* Close/Skip */}
                    <button
                        onClick={onClose}
                        className="p-1 px-2.5 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold rounded-full border border-primary/20"
                    >
                        Skip
                    </button>
                </div>
            </div>

            {/* Finished Visual Alert Overlay */}
            <AnimatePresence>
                {timeLeft === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
