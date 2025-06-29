import { motion } from "framer-motion";
import { User, BrainCircuit, Apple } from "lucide-react";

const GameHeader = ({ brainpoints = 1200, brainberry = 5 }) => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[98vw] max-w-4xl px-2 sm:px-0"
    >
      <div className="relative flex items-center justify-between bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-black/30 px-4 py-3 sm:px-6 sm:py-4">
        {/* Profile Button */}
        <motion.button 
          className="flex items-center space-x-2 hover:scale-105 transition-all duration-200 bg-white/10 dark:bg-black/30 rounded-xl px-3 py-2 border border-white/10 dark:border-black/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User size={20} className="text-cyan-400" />
          <span className="hidden sm:inline text-sm font-medium text-white">Profile</span>
        </motion.button>

        {/* Center Logo */}
        <motion.div 
          className="text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 select-none"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          🎓 Edumon
        </motion.div>

        {/* Resources */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* BrainPoints */}
          <motion.div 
            className="flex items-center space-x-2 bg-white/10 dark:bg-black/30 rounded-xl px-3 py-2 border border-white/10 dark:border-black/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BrainCircuit size={18} className="text-cyan-400" />
            <span className="text-sm font-semibold text-white">{brainpoints}</span>
          </motion.div>

          {/* BrainBerries */}
          <motion.div 
            className="flex items-center space-x-2 bg-white/10 dark:bg-black/30 rounded-xl px-3 py-2 border border-white/10 dark:border-black/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Apple size={18} className="text-pink-400" />
            <span className="text-sm font-semibold text-white">{brainberry}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default GameHeader;
