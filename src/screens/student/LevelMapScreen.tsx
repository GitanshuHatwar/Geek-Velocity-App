import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { X, Lock, Star, Zap, Crown, Flame } from 'lucide-react'


// Type definitions
type Difficulty = 'Novice' | 'Adept' | 'Expert' | 'Master' | 'Legend' | 'Mythic';

interface Quest {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  x: number;
  y: number;
  constellation: string;
  difficulty: Difficulty;
  rewards: string[];
  estimatedTime: string;
}

// Mock backend data - replace with your actual API call
const useQuestsData = () => {
    const [quests, setQuests] = useState([
        {
            id: 1,
            title: 'Stellar Genesis',
            description: 'Witness the birth of stars in the cosmic nursery. Master the fundamental forces that create light in the darkness.',
            unlocked: true,
            x: 15,
            y: 20,
            constellation: 'Orion Nebula',
            difficulty: 'Novice' as const,
            rewards: ['Star Fragment', '100 XP'],
            estimatedTime: '15 min'
        },
        {
            id: 2,
            title: 'Quantum Drift',
            description: 'Navigate through quantum tunnels where reality bends. Learn to phase between dimensions.',
            unlocked: true,
            x: 40,
            y: 30,
            constellation: 'Andromeda',
            difficulty: 'Adept' as const,
            rewards: ['Quantum Core', '250 XP'],
            estimatedTime: '25 min'
        },
        {
            id: 3,
            title: 'Solar Forge',
            description: 'Harness the power of dying stars to forge new worlds. Control the very essence of creation.',
            unlocked: true,
            x: 70,
            y: 25,
            constellation: 'Phoenix',
            difficulty: 'Expert' as const,
            rewards: ['Solar Essence', '500 XP'],
            estimatedTime: '35 min'
        },
        {
            id: 4,
            title: 'Void Sentinel',
            description: 'Guard the boundaries between known space and the infinite void. Face the unknown.',
            unlocked: false,
            x: 25,
            y: 60,
            constellation: 'Draco',
            difficulty: 'Master' as const,
            rewards: ['Void Crystal', '750 XP'],
            estimatedTime: '45 min'
        },
        {
            id: 5,
            title: 'Cosmic Orchestra',
            description: 'Conduct the symphony of pulsars and quasars. Harmonize with the universe itself.',
            unlocked: false,
            x: 60,
            y: 70,
            constellation: 'Lyra',
            difficulty: 'Legend' as const,
            rewards: ['Harmony Stone', '1000 XP'],
            estimatedTime: '60 min'
        },
        {
            id: 6,
            title: 'Chrono Weaver',
            description: 'Master the threads of time itself. Rewrite the past to forge a new future.',
            unlocked: false,
            x: 80,
            y: 50,
            constellation: 'Chronos',
            difficulty: 'Mythic' as const,
            rewards: ['Time Shard', '1500 XP'],
            estimatedTime: '90 min'
        }
    ])

    // Simulate adding new quests from backend
    const addQuest = useCallback((newQuest: Partial<Quest>) => {
        setQuests(prev => [...prev, { ...newQuest, id: prev.length + 1 } as Quest])
    }, [])

    return { quests, addQuest }
}

// Optimized star field with fewer elements
const StarField = React.memo(() => {
    const stars = useMemo(() =>
        Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.4
        })), []
    )

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
    )
})

interface QuestOrbProps {
    quest: Quest;
    onClick: (quest: Quest) => void;
    index: number;
}

const QuestOrb = React.memo(({ quest, onClick, index }: QuestOrbProps) => {
    const orbRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    const difficultyConfig = useMemo(() => ({
        'Novice': {
            gradient: 'from-emerald-400 to-green-600',
            glow: 'emerald-400',
            icon: Star,
            ring: 'border-emerald-400/30'
        },
        'Adept': {
            gradient: 'from-cyan-400 to-blue-600',
            glow: 'cyan-400',
            icon: Zap,
            ring: 'border-cyan-400/30'
        },
        'Expert': {
            gradient: 'from-purple-400 to-indigo-600',
            glow: 'purple-400',
            icon: Crown,
            ring: 'border-purple-400/30'
        },
        'Master': {
            gradient: 'from-red-400 to-pink-600',
            glow: 'red-400',
            icon: Flame,
            ring: 'border-red-400/30'
        },
        'Legend': {
            gradient: 'from-yellow-400 to-orange-600',
            glow: 'yellow-400',
            icon: Crown,
            ring: 'border-yellow-400/30'
        },
        'Mythic': {
            gradient: 'from-pink-400 to-purple-600',
            glow: 'pink-400',
            icon: Crown,
            ring: 'border-pink-400/30'
        }
    }), [])

    const config = difficultyConfig[quest.difficulty as Difficulty]
    const IconComponent = config.icon

    useEffect(() => {
        if (!orbRef.current || !quest.unlocked) return

        const orb = orbRef.current
        const glow = glowRef.current

        // Orbital rotation
        const orbitalRing = orb.querySelector('.orbital-ring') as HTMLElement
        if (orbitalRing) {
            gsap.to(orbitalRing, {
                rotation: 360,
                duration: 8 + index * 2,
                repeat: -1,
                ease: "none"
            })
        }

        // Pulsing glow effect
        if (glow) {
            gsap.to(glow, {
                scale: 1.2,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            })
        }

        // Hover animation setup
        const handleMouseEnter = () => {
            gsap.to(orb, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            })
        }

        const handleMouseLeave = () => {
            gsap.to(orb, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            })
        }

        orb.addEventListener('mouseenter', handleMouseEnter)
        orb.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            orb.removeEventListener('mouseenter', handleMouseEnter)
            orb.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [quest.unlocked, index])

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${quest.x}%`, top: `${quest.y}%` }}
        >
            <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.1
                }}
                className="relative"
            >
                {/* Glow effect */}
                <div
                    ref={glowRef}
                    className={`absolute inset-0 w-16 h-16 rounded-full bg-${config.glow} opacity-30 blur-md`}
                />

                {/* Main orb */}
                <div
                    ref={orbRef}
                    className={`relative w-16 h-16 rounded-full cursor-pointer transition-all duration-200 ${quest.unlocked
                            ? `bg-gradient-to-br ${config.gradient} shadow-lg hover:shadow-xl`
                            : 'bg-gradient-to-br from-gray-700 to-gray-900 opacity-50 cursor-not-allowed'
                        }`}
                    onClick={() => quest.unlocked && onClick(quest)}
                >
                    {/* Orbital ring */}
                    <div className={`orbital-ring absolute inset-0 border-2 rounded-full ${config.ring}`} />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {quest.unlocked ? (
                            <IconComponent className="w-6 h-6 text-white" />
                        ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                        )}
                    </div>

                    {/* Quest number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-black/80 text-white text-xs font-bold rounded-full flex items-center justify-center border border-white/20">
                        {quest.id}
                    </div>
                </div>
                <div></div>

                {/* Quest info */}
                <motion.div
                    className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                >
                    <div className="text-white text-sm font-semibold bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                        {quest.title}
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                        {quest.constellation}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
})

const QuestModal = ({ quest, onClose }: { quest: Quest | null; onClose: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (quest && modalRef.current) {
            // GSAP modal entrance animation
            gsap.fromTo(modalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            )
        }
    }, [quest])

    if (!quest) return null

    const difficultyColors: Record<Difficulty, string> = {
        'Novice': 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
        'Adept': 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10',
        'Expert': 'text-purple-400 border-purple-400/50 bg-purple-400/10',
        'Master': 'text-red-400 border-red-400/50 bg-red-400/10',
        'Legend': 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10',
        'Mythic': 'text-pink-400 border-pink-400/50 bg-pink-400/10'
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div
                    ref={modalRef}
                    className="bg-slate-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">{quest.title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Quest details */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-full border text-sm font-semibold ${difficultyColors[quest.difficulty]}`}>
                                {quest.difficulty}
                            </span>
                            <span className="text-purple-300 text-sm">{quest.constellation}</span>
                            <span className="text-gray-400 text-sm">⏱️ {quest.estimatedTime}</span>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            {quest.description}
                        </p>

                        {/* Rewards */}
                        <div className="bg-black/30 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-white mb-2">Quest Rewards:</h4>
                            <div className="flex flex-wrap gap-2">
                                {quest.rewards.map((reward: string, i: number) => (
                                    <span key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30">
                                        {reward}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <motion.button
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Begin Quest
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

// Main component
export default function OptimizedCosmicMap() {
    const { quests, addQuest } = useQuestsData()
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
    const [scale, setScale] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)

    // Optimized wheel handler
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        setScale(prev => Math.max(0.5, Math.min(2.5, prev * delta)))
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            return () => container.removeEventListener('wheel', handleWheel)
        }
    }, [handleWheel])

    // Demo function to add new quest (simulate backend)
    const handleAddQuest = () => {
        const newQuest = {
            title: `Quest ${quests.length + 1}`,
            description: 'A new adventure awaits in the cosmic expanse.',
            unlocked: true,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            constellation: 'New Sector',
            difficulty: 'Novice' as Difficulty,
            rewards: ['Mystery Reward', '100 XP'],
            estimatedTime: '20 min'
        }
        addQuest(newQuest)
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-purple-900 to-blue-950">
            {/* Background */}
            <StarField />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-950 to-slate-900" />

            {/* Map container */}
            <motion.div
                ref={containerRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag
                dragElastic={0.05}
                dragConstraints={{
                    left: -200,
                    right: 200,
                    top: -200,
                    bottom: 200
                }}
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Quest orbs */}
                {quests.map((quest, index) => (
                    <QuestOrb
                        key={quest.id}
                        quest={quest}
                        onClick={setSelectedQuest}
                        index={index}
                    />
                ))}
            </motion.div>

            {/* UI Controls */}
            <div className="fixed top-4 left-4 z-20 space-y-2">
                <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3">
                    <div className="text-sm text-purple-300 mb-2 font-semibold">Progress</div>
                    <div className="flex gap-1 mb-2">
                        {quests.map(quest => (
                            <div
                                key={quest.id}
                                className={`w-3 h-3 rounded-full ${quest.unlocked ? 'bg-cyan-400' : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-gray-400">
                        {quests.filter(q => q.unlocked).length} / {quests.length} Unlocked
                    </div>
                </div>
            </div>

            {/* Zoom controls */}
            <div className="fixed bottom-6 left-6 z-20 flex flex-col gap-2">
                <motion.button
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center text-white hover:bg-purple-900/40 transition-all duration-200"
                    onClick={() => setScale(prev => Math.min(2.5, prev * 1.2))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    +
                </motion.button>
                <motion.button
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center text-white hover:bg-purple-900/40 transition-all duration-200"
                    onClick={() => setScale(prev => Math.max(0.5, prev * 0.8))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    -
                </motion.button>
            </div>

            {/* Demo add quest button */}
            <motion.button
                className="fixed top-4 right-4 z-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-200"
                onClick={handleAddQuest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                + Add Quest
            </motion.button>

            {/* Instructions */}
            <div className="fixed bottom-6 right-6 z-20 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 max-w-xs">
                <div className="text-xs text-gray-300 space-y-1">
                    <div>🖱️ Drag to explore galaxy</div>
                    <div>🔍 Scroll to zoom in/out</div>
                    <div>🎯 Click orbs to view quests</div>
                </div>
            </div>

            <QuestModal
                quest={selectedQuest}
                onClose={() => setSelectedQuest(null)}
            />
        </div>
    )
}