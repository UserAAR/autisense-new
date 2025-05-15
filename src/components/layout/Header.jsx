import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary"
          >
            Auti<span className="text-secondary">Sense</span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`font-medium ${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Ana Səhifə
          </Link>
          <Link 
            to="/parent-dashboard" 
            className={`font-medium ${isActive('/parent-dashboard') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Valideyn Paneli
          </Link>
          <Link 
            to="/specialists" 
            className={`font-medium ${isActive('/specialists') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Mütəxəssislər
          </Link>
          <Link 
            to="/child-learning" 
            className={`font-medium ${isActive('/child-learning') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Dərslər və Oyunlar
          </Link>
          <Link 
            to="/about" 
            className={`font-medium ${isActive('/about') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          >
            Haqqımızda
          </Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-primary font-medium hover:underline">
            Giriş
          </Link>
          <Link 
            to="/register" 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Qeydiyyat
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-lg absolute w-full z-50"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-primary' : 'text-gray-600'} py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Səhifə
            </Link>
            <Link 
              to="/parent-dashboard" 
              className={`font-medium ${isActive('/parent-dashboard') ? 'text-primary' : 'text-gray-600'} py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Valideyn Paneli
            </Link>
            <Link 
              to="/specialists" 
              className={`font-medium ${isActive('/specialists') ? 'text-primary' : 'text-gray-600'} py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mütəxəssislər
            </Link>
            <Link 
              to="/child-learning" 
              className={`font-medium ${isActive('/child-learning') ? 'text-primary' : 'text-gray-600'} py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dərslər və Oyunlar
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${isActive('/about') ? 'text-primary' : 'text-gray-600'} py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              Haqqımızda
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link 
                to="/login" 
                className="text-primary font-medium hover:underline py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Giriş
              </Link>
              <Link 
                to="/register" 
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Qeydiyyat
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 