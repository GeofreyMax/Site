import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSubmissions from './pages/AdminSubmissions';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import CoreValues from './components/CoreValues';
import Services from './components/Services';
import CarHire from './components/CarHire';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Website() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <CoreValues />
      <Services />
      <CarHire />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Website />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <ProtectedRoute>
                <AdminSubmissions />
              </ProtectedRoute>
            }
          />

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
    </ErrorBoundary>
  );
}
