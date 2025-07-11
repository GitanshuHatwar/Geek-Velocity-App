import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { BottomTabNav } from '../BottomTab'
// Define Button and Card components locally since we can't import them
const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline";
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    outline:
      "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardContent = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

type Pet = {
  id: number;
  name: string;
  type: string;
  color: string;
  element: string;
};

export default function PetSelector() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confirmedPet, setConfirmedPet] = useState<Pet | null>(null);
  const navigate = useNavigate();

  const pets: Pet[] = [
    {
      id: 1,
      name: "Blaze",
      type: "Fire Fox",
      color: "bg-orange-500",
      element: "🔥",
    },
    {
      id: 2,
      name: "Splash",
      type: "Water Otter",
      color: "bg-blue-500",
      element: "💧",
    },
    {
      id: 3,
      name: "Leaf",
      type: "Grass Rabbit",
      color: "bg-green-500",
      element: "🌿",
    },
    {
      id: 4,
      name: "Spark",
      type: "Electric Mouse",
      color: "bg-yellow-500",
      element: "⚡",
    },
    {
      id: 5,
      name: "Rocky",
      type: "Stone Turtle",
      color: "bg-gray-500",
      element: "🪨",
    },
    {
      id: 6,
      name: "Twinkle",
      type: "Fairy Cat",
      color: "bg-purple-500",
      element: "✨",
    },
  ];

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setShowConfirmation(true);
  };

  const confirmSelection = () => {
    setConfirmedPet(selectedPet);
    setShowConfirmation(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
  };

  const cancelSelection = () => {
    setSelectedPet(null);
    setShowConfirmation(false);
  };

  const handleBackToOnboarding = () => {
    console.log("⬅️ Going back to Onboarding");
    console.log("📍 Current route: /pet-selector");
    console.log("🎯 Target route: /onboarding");
    navigate("/onboarding");
  };

  const handleContinueJourney = () => {
    // Navigate to the begin screen after pet selection
    console.log("🎮 Continuing journey with pet:", confirmedPet?.name);
    console.log("📍 Current route: /pet-selector");
    console.log("🎯 Target route: /enter-code");
    navigate('/enter-code');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-[#4306bc] via-[#7f53ac] to-[#1e1a3c]">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleBackToOnboarding}
        className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-200 border border-white/30"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Onboarding
      </motion.button>

      

      {/* Grand Hall Gradient Background (no image) */}

      {/* Pillars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-yellow-900 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-yellow-900 to-transparent"
      />

      {/* Floating Flames */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, scale: 1, opacity: 0.85 }}
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.08, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute z-20 ${
            i % 2 === 0 ? "left-8" : "right-8"
          } top-[${8 + i * 10}%] flex flex-col items-center`}
        >
          {/* Flame body */}
          <div
            className="w-4 h-8 rounded-full bg-gradient-to-t from-yellow-400 via-orange-500 to-yellow-200 shadow-lg animate-flicker"
            style={{ filter: "blur(0.5px)" }}
          />
          {/* Flame glow */}
          <div className="w-6 h-3 rounded-full bg-yellow-300 opacity-60 blur-sm -mt-2" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-400 shadow-xl">
          <CardHeader>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-purple-600">
                GRAND PET SELECTION CEREMONY
              </CardTitle>
              <p className="text-lg text-gray-600 mt-2 font-medium">
                Choose your eternal companion wisely
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {pets.map((pet) => (
                <motion.div
                  key={pet.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`w-36 h-36 rounded-full ${
                      pet.color
                    } flex items-center justify-center mb-3 relative overflow-hidden border-4 border-yellow-300 shadow-lg ${
                      selectedPet?.id === pet.id ? "ring-4 ring-yellow-400" : ""
                    }`}
                    animate={{
                      scale: selectedPet?.id === pet.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: selectedPet?.id === pet.id ? 1 : 0.3,
                      repeat: selectedPet?.id === pet.id ? Infinity : 0,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 flex items-center justify-center text-4xl">
                      {pet.element}
                    </div>
                  </motion.div>

                  <Button
                    variant="outline"
                    className={`w-full border-2 font-bold ${
                      selectedPet?.id === pet.id
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300"
                    } transition-all duration-300`}
                    onClick={() => handleSelectPet(pet)}
                  >
                    {pet.name}
                    <span className="ml-2 text-xs opacity-70">{pet.type}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Confirmation Dialog */}
            <AnimatePresence>
              {showConfirmation && selectedPet && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                  <motion.div
                    className={`bg-white p-6 rounded-xl max-w-md w-full border-4 ${selectedPet.color} border-opacity-50 shadow-2xl`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-center mb-4">
                      Confirm Your Selection
                    </h3>
                    <div className="flex items-center justify-center mb-6">
                      <div
                        className={`w-24 h-24 rounded-full ${selectedPet.color} flex items-center justify-center border-4 border-yellow-300 mr-4`}
                      >
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center text-2xl">
                          {selectedPet.element}
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{selectedPet.name}</p>
                        <p className="text-gray-600">{selectedPet.type}</p>
                      </div>
                    </div>
                    <p className="text-center mb-6">
                      Are you sure you want to select {selectedPet.name} as your
                      eternal companion?
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        variant="destructive"
                        onClick={cancelSelection}
                        className="px-6"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={confirmSelection}
                        className={`${selectedPet.color} hover:${selectedPet.color}/90 px-6 text-white`}
                      >
                        Confirm
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Celebration */}
            <AnimatePresence>
              {showCelebration && confirmedPet && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className={`bg-gradient-to-br from-white to-gray-100 p-8 rounded-xl max-w-md w-full border-4 ${confirmedPet.color} border-opacity-50 shadow-2xl text-center`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                      }}
                    >
                      <Sparkles className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-purple-600">
                      CONGRATULATIONS!
                    </h3>
                    <p className="text-xl mb-2">
                      You've chosen{" "}
                      <span className="font-bold">{confirmedPet.name}</span>!
                    </p>
                    <p className="text-gray-600 mb-6">
                      The {confirmedPet.type} will be your loyal companion.
                    </p>
                    <div
                      className={`w-32 h-32 rounded-full ${confirmedPet.color} flex items-center justify-center mx-auto mb-6 border-4 border-yellow-300 shadow-lg`}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-3xl">
                        {confirmedPet.element}
                      </div>
                    </div>
                    <Button
                      onClick={handleContinueJourney}
                      className="px-8 py-2"
                    >
                      Begin Your Journey
                    </Button>
                  </motion.div>

                  {/* Confetti */}
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        opacity: 0,
                      }}
                      animate={{
                        y: [0, -1000],
                        opacity: [1, 0],
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 3,
                        delay: Math.random() * 0.5,
                      }}
                      className={`absolute text-2xl ${
                        Math.random() > 0.5
                          ? "text-yellow-400"
                          : "text-purple-400"
                      }`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: 0,
                      }}
                    >
                      {Math.random() > 0.5 ? "✦" : "✧"}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
        {/* <BottomTabNav /> */}
      </motion.div>
    </div>
  );
}
