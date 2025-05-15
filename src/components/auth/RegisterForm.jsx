import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'parent', // Varsayılan olaraq valideyn seçilir
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Error temizləmə
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Ad və Soyadınız tələb olunur';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-poçt ünvanı tələb olunur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Düzgün e-poçt ünvanı daxil edin';
    }
    
    if (!formData.password) {
      newErrors.password = 'Şifrə tələb olunur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifrələr uyğun gəlmir';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'Şərtlərlə razılaşmanız tələb olunur';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Əsl layihədə API sorğusu əvəzinə, burada simulyasiya edirik
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo məqsədləri üçün qeydiyyat müvəffəqiyyətli sayılır
      console.log('Qeydiyyat uğurludur:', formData);
      
      if (onSuccess) {
        onSuccess();
      }
      
      // İstifadəçi roluna görə lazımi dashboard-a yönləndirə bilərik
      if (formData.role === 'parent') {
        navigate('/parent-dashboard');
      } else {
        navigate('/specialist-dashboard');
      }
    } catch (error) {
      console.error('Qeydiyyat xətası:', error);
      setErrors({ general: 'Qeydiyyat zamanı xəta baş verdi. Xahiş edirik yenidən cəhd edin.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {errors.general}
        </div>
      )}
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
          Ad və Soyad
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="Ad Soyad"
        />
        {errors.name && (
          <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
          E-poçt ünvanı
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="adınız@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
          Şifrə
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
          Şifrəni təsdiqlə
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-1">
          Hesab növü
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="roleParent"
              name="role"
              value="parent"
              checked={formData.role === 'parent'}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="roleParent" className="ml-2 block text-sm text-gray-700">
              Valideyn
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="roleSpecialist"
              name="role"
              value="specialist"
              checked={formData.role === 'specialist'}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="roleSpecialist" className="ml-2 block text-sm text-gray-700">
              Mütəxəssis
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
            errors.terms ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          <span>
            <a href="#" className="text-primary hover:underline">İstifadə şərtləri</a> və{' '}
            <a href="#" className="text-primary hover:underline">Gizlilik siyasəti</a> ilə razıyam
          </span>
        </label>
      </div>
      {errors.terms && (
        <p className="mt-1 mb-4 text-red-500 text-xs">{errors.terms}</p>
      )}
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition disabled:opacity-70"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Qeydiyyatdan keçilir...
          </span>
        ) : 'Qeydiyyatdan keç'}
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func
};

export default RegisterForm; 