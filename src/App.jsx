import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

// Lazy loading ilə səhifələri import edək
const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const ParentDashboard = lazy(() => import('./pages/ParentDashboard'));
const ChildLearning = lazy(() => import('./pages/ChildLearning'));
const SpecialistSearch = lazy(() => import('./pages/SpecialistSearch'));
const About = lazy(() => import('./pages/About'));

const bgShapes = [
  { style: 'absolute top-0 left-0 w-60 h-60 bg-primary/20 rounded-full blur-2xl', delay: 0 },
  { style: 'absolute top-40 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-2xl', delay: 0.2 },
  { style: 'absolute bottom-0 left-1/3 w-72 h-72 bg-success/20 rounded-full blur-2xl', delay: 0.4 },
  { style: 'absolute bottom-10 right-20 w-40 h-40 bg-attention/20 rounded-full blur-2xl', delay: 0.6 },
];

const App = () => {
  return (
    <AuthProvider>
      <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-panel-bg">
        {/* Rəngli və animasiyalı arxa plan formaları */}
        {bgShapes.map((shape, i) => (
          <motion.div
            key={i}
            className={shape.style}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shape.delay, duration: 1, type: 'spring' }}
            style={{ zIndex: 0 }}
          />
        ))}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Auth type="login" />} />
                <Route path="/register" element={<Auth type="register" />} />
                <Route path="/parent-dashboard" element={<PrivateRoute><ParentDashboard /></PrivateRoute>} />
                <Route path="/child-learning" element={<PrivateRoute><ChildLearning /></PrivateRoute>} />
                <Route path="/specialists" element={<SpecialistSearch />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
};

export default App; 