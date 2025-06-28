import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ClassroomDetails = lazy(() => import('./pages/ClassroomDetails'));
const CreateClass = lazy(() => import('./pages/CreateClass'));
const Students = lazy(() => import('./pages/Students'));
const Profile = lazy(() => import('./pages/Profile'));
const UploadDocument = lazy(() => import('./pages/UploadDocument'));
const EnterCodeScreen = lazy(() => import('./screens/student/BeginScreen'));
const OptimizedCosmicMap = lazy(() => import('./screens/student/LevelMapScreen'));
const QuestDetailScreen = lazy(() => import('./screens/student/QuestDetailScreen'));
const GamifiedQuizScreen = lazy(() => import('./screens/student/QuizScreen'));
const PetSelector = lazy(() => import('./screens/student/PetSelector'));
const Onboarding = lazy(() => import('./screens/student/Onboarding'));
const EdumonApp = lazy(() => import('./screens/student/Edumon'));

// App content component that uses hooks
const AppContent = () => {
    return (
        <main className="min-h-screen text-foreground">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>}>
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
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/pet-selector" element={<PetSelector />} />
                    <Route path="/enter-code" element={<EnterCodeScreen />} />
                    <Route path="/level-map" element={<OptimizedCosmicMap />} />
                    <Route path="/levelmap" element={<OptimizedCosmicMap />} />
                    <Route path="/quest-detail" element={<QuestDetailScreen />} />
                    <Route path="/quiz" element={<GamifiedQuizScreen />} />
                    <Route path="/Edu" element={<EdumonApp />} />
                </Routes>
            </Suspense>
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