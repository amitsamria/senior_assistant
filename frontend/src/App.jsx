import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import Appointments from './pages/Appointments';
import Contacts from './pages/Contacts';
import Groceries from './pages/Groceries';
import Health from './pages/Health';
import Clock from './pages/Clock';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clock" element={<Clock />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/health" element={<Health />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
