import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, RotateCw, Rocket } from 'lucide-react';
import Alert from "@/components/alert";

// Questions array
const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris'],
        answer: 'Paris',
    },
    {
        question: 'Who wrote Hamlet?',
        options: ['Charles Dickens', 'William Shakespeare', 'J.K. Rowling'],
        answer: 'William Shakespeare',
    },
    {
        question: 'What is the boiling point of water?',
        options: ['100°C', '90°C', '110°C'],
        answer: '100°C',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter'],
        answer: 'Mars',
    },
]

export default function GamifiedQuizScreen() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleRetry = () => {
        setCurrent(0);
        setScore(0);
        setSelected(null);
        setShowResult(false);
    };

    const handleNext = () => {
        if (selected === questions[current].answer) {
            setScore(score + 1);
        }
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setSelected(null);
        } else {
            setShowResult(true);
        }
    };

    // Enhanced feedback with animated elements
    const feedback =
        score === 4 ? (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col gap-4"
            >
                <Alert type="success" message="I see champ, You aced it! Cool" />
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-4xl text-center"
                >
                    🚀🎉
                </motion.div>
            </motion.div>
        ) : score >= 2 ? (
            <div className="flex flex-col gap-4">
                <Alert type="warning" message="⚡ Good job! Keep going" />
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-3xl text-center"
                >
                    ⚡✨
                </motion.div>
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                <Alert type="error" message="🌀 Needs improvement. Try again!" />
                <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-3xl text-center"
                >
                    🌪️💫
                </motion.div>
            </div>
        );

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black flex justify-center items-center p-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative bg-slate-800/80 text-white rounded-2xl p-8 w-full max-w-md shadow-2xl backdrop-blur-xl border border-slate-700/50"
            >
                {/* Animated border effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                        border: [
                            '2px solid rgba(139,92,246,0.3)',
                            '2px solid rgba(99,102,241,0.6)',
                            '2px solid rgba(236,72,153,0.3)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Question {current + 1} of {questions.length}</span>
                        <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {showResult ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-6"
                        >
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Quiz Completed!
                            </h2>
                            <div className="text-5xl animate-bounce">
                                {score === questions.length ? '🎉' : score >= 2 ? '✨' : '🌌'}
                            </div>
                            <p className="text-xl font-semibold">Score: {score}/{questions.length}</p>
                            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-4" />
                            {feedback}

                            <div className="flex justify-center gap-4">
                                <motion.button
                                    onClick={handleRetry}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white font-bold shadow-xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-2">
                                        <RotateCw className="w-5 h-5" />
                                        Retry Quest
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Question */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-center">
                                    {questions[current].question}
                                </h2>
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                {questions[current].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelected(option)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                                            selected === option
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                selected === option
                                                    ? 'border-white bg-white'
                                                    : 'border-gray-400'
                                            }`}>
                                                {selected === option && (
                                                    <CheckCircle className="w-4 h-4 text-purple-600" />
                                                )}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <motion.button
                                    onClick={handleNext}
                                    disabled={!selected}
                                    whileHover={selected ? {
                                        scale: 1.05,
                                        background: [
                                            'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                            'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                            'linear-gradient(225deg, #ec4899, #6366f1)'
                                        ]
                                    } : {}}
                                    whileTap={{ scale: 0.95 }}
                                    animate={selected ? {
                                        background: [
                                            'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                            'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                            'linear-gradient(225deg, #ec4899, #6366f1)'
                                        ],
                                        transition: {
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: 'reverse'
                                        }
                                    } : {}}
                                    className="px-8 py-3 rounded-xl text-white font-bold shadow-lg relative overflow-hidden w-full max-w-xs"
                                    style={{
                                        background: !selected
                                            ? '#4a5568'
                                            : 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-2 justify-center">
                                        NEXT <Rocket className="w-5 h-5" />
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
