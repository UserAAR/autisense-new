import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const bgShapes = [
  { style: 'absolute top-0 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl', delay: 0 },
  { style: 'absolute top-40 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl', delay: 0.2 },
  { style: 'absolute bottom-0 left-1/3 w-36 h-36 bg-success/20 rounded-full blur-2xl', delay: 0.4 },
  { style: 'absolute bottom-10 right-32 w-24 h-24 bg-attention/20 rounded-full blur-2xl', delay: 0.6 },
];

const Auth = ({ type = 'login' }) => {
  const [activeTab, setActiveTab] = useState(type);

  return (
    <div className="relative min-h-screen py-12 bg-primary/5 flex items-center justify-center overflow-hidden">
      {/* Arxa plan formaları */}
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
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden border-4 border-primary/20 backdrop-blur-md">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Image and Info */}
            <div className="md:w-1/2 bg-gradient-to-br from-primary/80 to-secondary/80 p-8 text-white flex flex-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  {activeTab === 'login' ? <span>👋</span> : <span>🎉</span>}
                  {activeTab === 'login' ? 'Xoş Gəlmisiniz!' : 'Bizimlə Başlayın!'}
                </h2>
                <p className="mb-8 font-comic">
                  {activeTab === 'login' 
                    ? 'AutiSense platformasına giriş edərək hesabınıza daxil olun və övladınızın inkişafına dəstək olun.' 
                    : 'Qeydiyyatdan keçərək AutiSense-in bütün funksionallıqlarına tam giriş əldə edin və övladınızın tərəqqisini izləyin.'}
                </p>
                <div className="hidden md:block">
                  <div className="bg-white/10 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">AutiSense ilə əldə edəcəkləriniz <span>✨</span></h3>
                    <ul className="space-y-3">
                      <li className="flex items-center"><span className="mr-2">🎯</span> Fərdiləşdirilmiş öyrənmə təcrübəsi</li>
                      <li className="flex items-center"><span className="mr-2">🤖</span> AI dəstəkli analizlər</li>
                      <li className="flex items-center"><span className="mr-2">👩‍⚕️</span> Peşəkar mütəxəssislərlə əlaqə</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Right Side - Forms */}
            <div className="md:w-1/2 p-8">
              <div className="mb-8 flex gap-2">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 border-b-4 font-medium text-center rounded-t-xl transition-all ${
                    activeTab === 'login' 
                      ? 'border-primary text-primary bg-primary/10 shadow' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 bg-white/60'
                  }`}
                >
                  <span className="mr-1">🔑</span> Giriş
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 border-b-4 font-medium text-center rounded-t-xl transition-all ${
                    activeTab === 'register' 
                      ? 'border-secondary text-secondary bg-secondary/10 shadow' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 bg-white/60'
                  }`}
                >
                  <span className="mr-1">📝</span> Qeydiyyat
                </button>
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
              </motion.div>
              <div className="mt-8 text-center text-gray-600 text-sm">
                <p>
                  {activeTab === 'login'
                    ? 'Hesabınız yoxdur? '
                    : 'Artıq hesabınız var? '}
                  <button
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                    className="text-primary font-medium hover:underline"
                  >
                    {activeTab === 'login' ? 'Qeydiyyatdan keç' : 'Giriş et'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth; 