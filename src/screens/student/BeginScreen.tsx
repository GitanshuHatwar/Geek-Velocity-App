'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/moving-border";
import { useNavigate } from 'react-router-dom';

export default function EnterCodeScreen() {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const [displayedText, setDisplayedText] = useState('')
    const fullText = "Start your own epic Journey"
    const navigate = useNavigate();

    // Typewriter animation
    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i < fullText.length - 1) {
                setDisplayedText((prev) => prev + fullText[i])
                i++;
            } else {
                clearInterval(interval)
            }
        }, 80)
        return () => clearInterval(interval)
    }, [])

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target
        if (value.length === 1) {
            const nextInput = inputRefs.current[index + 1]
            if (nextInput) nextInput.focus()
        }
    }

    const handleGoClick = () => {
        navigate('/level-map')
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <button
                onClick={() => navigate('/login')}
                style={{ position: 'absolute', top: 20, right: 20, background: '#fff', color: '#22223b', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
                Log out
            </button>
            <motion.h1
                className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {displayedText}
                <span className="animate-pulse text-white">|</span>
            </motion.h1>

            <motion.div
                className="flex flex-wrap justify-center gap-5 mb-6 max-w-[90vw]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.input
                        key={i}
                        type="text"
                        maxLength={1}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        onChange={(e) => handleInput(e, i)}
                        className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-md shadow-lg shadow-blue-400/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                        whileFocus={{ scale: 1.1 }}
                    />
                ))}
            </motion.div>
            <div>
            <Button
            borderRadius="10rem"
            className=" bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 py-7"
            onClick={handleGoClick}>
                GO!
            </Button>
            </div>

            <motion.p
                className="text-base text-center text-white/80 px-2 md:px-4 font-medium py-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
            >
                Enter the classroom code given by your teacher
            </motion.p>
        </motion.div>
    )
}
