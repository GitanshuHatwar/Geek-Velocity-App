import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClassroomDetails from './pages/ClassroomDetails';
import CreateClass from './pages/CreateClass';
import Students from './pages/Students';
import Profile from './pages/Profile';
import UploadDocument from './pages/UploadDocument';
import EnterCodeScreen from './screens/student/BeginScreen';
import OptimizedCosmicMap from './screens/student/LevelMapScreen';
import QuestDetailScreen from './screens/student/QuestDetailScreen';
import GamifiedQuizScreen from './screens/student/QuizScreen';
import PetSelector from './screens/student/PetSelector';
import Onboarding from './screens/student/Onboarding';
import EdumonApp from './screens/student/Edumon';
// Type assertions for JSX files
const OnboardingComponent = Onboarding as React.ComponentType;
const QuestDetailComponent = QuestDetailScreen as React.ComponentType;
const QuizComponent = GamifiedQuizScreen as React.ComponentType;

// App content component that uses hooks
const AppContent = () => {
    return (
        <main className="min-h-screen text-foreground">
            {/* <RouteIndicator /> */}
            <Routes>
                {/* Default route redirects to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Login route */}
                <Route path="/login" element={<Login />} />
                
                {/* Teacher routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/classroom/:id" element={<ClassroomDetails />} />
                <Route path="/create-class" element={<CreateClass />} />
                <Route path="/students" element={<Students />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload-document/:id" element={<UploadDocument />} />
                
                {/* Student routes */}
                <Route path="/onboarding" element={<OnboardingComponent />} />
                <Route path="/pet-selector" element={<PetSelector />} />
                <Route path="/enter-code" element={<EnterCodeScreen />} />
                <Route path="/level-map" element={<OptimizedCosmicMap />} />
                <Route path="/levelmap" element={<OptimizedCosmicMap />} />
                <Route path="/quest-detail" element={<QuestDetailComponent />} />
                <Route path="/quiz" element={<QuizComponent />} />
                <Route path="/Edu" element={<EdumonApp />} />
            </Routes>
        </main>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App;