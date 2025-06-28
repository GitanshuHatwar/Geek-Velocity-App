import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Map, PawPrint, Trophy, ShoppingBag } from "lucide-react";

export function BottomTabNav() {
    const location = useLocation();
    // Define the tabs array inside the component
    const tabs = [
        {
            id: "quest",
            label: "Quest",
            icon: <Map className="w-6 h-6 sm:w-7 sm:h-7" />,
            path: "/",
            color: "primary",
        },
        {
            id: "pet",
            label: "Pet",
            icon: <PawPrint className="w-6 h-6 sm:w-7 sm:h-7" />,
            path: "/pet",
            color: "success",
        },
        {
            id: "leaderboard",
            label: "Leaderboard",
            icon: <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />,
            path: "/leaderboard",
            color: "secondary",
        },
        {
            id: "marketplace",
            label: "Marketplace",
            icon: <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />,
            path: "/marketplace",
            color: "warning",
        },
    ];
    const activeIndex = tabs.findIndex((t) => t.path === location.pathname);

    return (
        <motion.nav
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[98vw] max-w-xl px-2 sm:px-0"
            style={{ pointerEvents: "auto" }}
        >
            <div className="relative flex justify-between items-end bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-black/30 px-2 py-2 sm:py-3 gap-1 sm:gap-2">
                {/* Animated indicator */}
                <motion.div
                    className="absolute left-0 top-0 h-full flex"
                    style={{ width: `calc(100% / ${tabs.length})` }}
                    animate={{ x: `calc(${activeIndex} * 100% / ${tabs.length})` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    <div className="w-full h-full flex items-end justify-center pointer-events-none">
                        <motion.div
                            layoutId="tab-indicator"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 blur-lg opacity-60 scale-110"
                        />
                    </div>
                </motion.div>

                {tabs.map((tab, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <Link
                            key={tab.id}
                            to={tab.path}
                            className="flex-1 flex flex-col items-center justify-end relative z-10"
                            style={{ minWidth: 0 }}
                        >
                            <motion.button
                                type="button"
                                className={`relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200
                                    ${isActive
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-500/20 border-2 border-white/40 scale-110"
                                    : "bg-white/10 dark:bg-black/30 border border-white/10 hover:scale-105"}
                                `}
                                whileTap={{ scale: 0.95 }}
                                whileHover={isActive ? {} : { scale: 1.08 }}
                                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
                                aria-label={tab.label}
                            >
                                <span
                                    className={`transition-colors duration-200 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8
                                        ${isActive ? "text-white drop-shadow-lg" : "text-purple-300 group-hover:text-pink-400"}
                                    `}
                                >
                                    {tab.icon}
                                </span>
                            </motion.button>
                            {/* Label: always on desktop, only active on mobile */}
                            <span
                                className={`mt-1 text-xs font-semibold transition-all duration-200
                                    ${isActive ? "text-pink-500" : "text-gray-400"}
                                    hidden sm:block
                                `}
                            >
                                {tab.label}
                            </span>
                            <span
                                className={`mt-1 text-xs font-semibold transition-all duration-200
                                    ${isActive ? "text-pink-500" : "text-gray-400"}
                                    block sm:hidden ${isActive ? "opacity-100" : "opacity-0 h-0"}
                                `}
                                style={{ minHeight: "1.2em" }}
                            >
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}

// Example usage:
// <BottomTabNav
//   tabs={[
//     {
//       id: "home",
//       label: "Home",
//       icon: <Home className="w-4 h-4 sm:w-6 sm:h-6" />,
//       path: "/",
//       color: "primary",
//     },
//     {
//       id: "leaderboard",
//       label: "Leaderboard",
//       icon: <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />,
//       path: "/leaderboard",
//       color: "secondary",
//     },
//     {
//       id: "achievements",
//       label: "Achievements",
//       icon: < Medal className="w-4 h-4 sm:w-6 sm:h-6" />,
//       path: "/achievements",
//       color: "success",
//     },
//     {
//       id: "profile",
//       label: "Profile",
//       icon: <User className="w-4 h-4 sm:w-6 sm:h-6" />,
//       path: "/profile",
//       color: "info",
//     },
//   ]}
// />