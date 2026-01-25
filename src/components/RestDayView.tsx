import { motion } from 'framer-motion';

export function RestDayView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
        >
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="text-8xl mb-6"
            >
                😴
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Rest Day</h2>
            <p className="text-muted-foreground max-w-md">
                Today is your rest day. Recovery is just as important as training!
                Take it easy and let your muscles grow.
            </p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 bg-card/50 border border-border max-w-md"
            >
                <h3 className="font-semibold mb-3 text-primary">💡 Rest Day Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                    <li>• Stay hydrated - drink plenty of water</li>
                    <li>• Get quality sleep (7-9 hours)</li>
                    <li>• Light stretching or yoga is okay</li>
                    <li>• Focus on protein intake for recovery</li>
                    <li>• Take a walk for active recovery</li>
                </ul>
            </motion.div>
        </motion.div>
    );
}
