import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import Appointments from './pages/Appointments';
import Contacts from './pages/Contacts';
import Groceries from './pages/Groceries';
import Health from './pages/Health';
import Progress from './pages/Progress';
import Clock from './pages/Clock';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isPublicRoute = ['/', '/login'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-surface to-black text-textMain">
      {!isPublicRoute && <Navbar />}
      <main className={`${!isPublicRoute ? 'container mx-auto px-4 py-8' : ''} flex-grow flex flex-col`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/clock" element={
            <ProtectedRoute>
              <Clock />
            </ProtectedRoute>
          } />
          <Route path="/medicines" element={
            <ProtectedRoute>
              <Medicines />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="/contacts" element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          } />
          <Route path="/groceries" element={
            <ProtectedRoute>
              <Groceries />
            </ProtectedRoute>
          } />
          <Route path="/health" element={
            <ProtectedRoute>
              <Health />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
