import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Demo məlumatları
import specialistsData from '../data/specialists.json';

const SpecialistSearch = () => {
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState([]);
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [filters, setFilters] = useState({
    specialization: '',
    experience: '',
    rating: '',
    searchQuery: ''
  });
  
  // İlkin məlumatların yüklənməsi
  useEffect(() => {
    setSpecialists(specialistsData);
    setFilteredSpecialists(specialistsData);
  }, []);
  
  // Filtrləmə
  useEffect(() => {
    let filtered = [...specialists];
    
    // İxtisas üzrə filtrləmə
    if (filters.specialization) {
      filtered = filtered.filter(specialist => 
        specialist.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }
    
    // Təcrübə üzrə filtrləmə
    if (filters.experience) {
      const minExperience = parseInt(filters.experience);
      filtered = filtered.filter(specialist => specialist.experience >= minExperience);
    }
    
    // Reytinq üzrə filtrləmə
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(specialist => specialist.rating >= minRating);
    }
    
    // Axtarış sorğusu üzrə filtrləmə
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(specialist => 
        specialist.name.toLowerCase().includes(query) ||
        specialist.title.toLowerCase().includes(query) ||
        specialist.specialization.toLowerCase().includes(query)
      );
    }
    
    setFilteredSpecialists(filtered);
  }, [filters, specialists]);
  
  // Filtr dəyişikliyi
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Axtarış
  const handleSearch = (e) => {
    e.preventDefault();
    // Axtarış artıq filtr dəyişikliyində işlənir
  };
  
  // Mütəxəssis seçimi
  const handleSpecialistSelect = (specialist) => {
    setSelectedSpecialist(specialist);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Mütəxəssis profil görünüşünü bağla
  const handleCloseProfile = () => {
    setSelectedSpecialist(null);
  };
  
  // Əlaqə qurma
  const handleContact = (specialist) => {
    // Əsl layihədə burada əlaqə forması açıla bilər
    alert(`${specialist.name} ilə əlaqə qurmaq üçün: ${specialist.contactInfo.email} və ya ${specialist.contactInfo.phone}`);
  };
  
  // Mütəxəssis kartı
  const SpecialistCard = ({ specialist }) => (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
      whileHover={{ y: -5 }}
      onClick={() => handleSpecialistSelect(specialist)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img 
            src={specialist.profileImageUrl} 
            alt={specialist.name} 
            className="w-full h-48 md:h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(specialist.name)}`;
            }}
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-bold text-dark-blue mr-2">{specialist.name}</h3>
            {specialist.verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Təsdiqlənib
              </span>
            )}
          </div>
          <div className="text-gray-600 mb-2">{specialist.title}</div>
          <div className="text-primary font-medium mb-3">{specialist.specialization}</div>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">{specialist.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({specialist.reviewCount})</span>
            </div>
            <div className="text-gray-600 text-sm">
              <span className="font-medium">{specialist.experience}</span> il təcrübə
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {specialist.about}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {specialist.services.slice(0, 3).map((service, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
            {specialist.services.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{specialist.services.length - 3} daha
              </span>
            )}
          </div>
          
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleContact(specialist);
            }}
          >
            Əlaqə saxla
          </button>
        </div>
      </div>
    </motion.div>
  );
  
  // Mütəxəssis profil detallı görünüşü
  const SpecialistProfile = ({ specialist }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="relative">
        <button 
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
          onClick={handleCloseProfile}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-primary/10 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 md:mb-0 md:mr-8">
              <img 
                src={specialist.profileImageUrl} 
                alt={specialist.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(specialist.name)}`;
                }}
              />
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold text-dark-blue mr-3">{specialist.name}</h2>
                {specialist.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Təsdiqlənib
                  </span>
                )}
              </div>
              <div className="text-lg text-gray-700 mb-2">{specialist.title}</div>
              <div className="text-primary font-medium mb-4">{specialist.specialization}</div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{specialist.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({specialist.reviewCount} rəy)</span>
                </div>
                <div className="text-gray-700">
                  <span className="font-medium">{specialist.experience}</span> il təcrübə
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {specialist.languages.map((language, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h3 className="text-xl font-bold text-dark-blue mb-4">Haqqında</h3>
                <p className="text-gray-700">{specialist.about}</p>
              </section>
              
              <section className="mb-8">
                <h3 className="text-xl font-bold text-dark-blue mb-4">Təhsil</h3>
                <ul className="space-y-3">
                  {specialist.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              <section className="mb-8">
                <h3 className="text-xl font-bold text-dark-blue mb-4">Sertifikatlar</h3>
                <ul className="space-y-3">
                  {specialist.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Xidmətlər</h3>
                <ul className="space-y-3">
                  {specialist.services.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                <h3 className="text-lg font-bold text-dark-blue mb-4">Əlaqə Məlumatları</h3>
                
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{specialist.contactInfo.email}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{specialist.contactInfo.phone}</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{specialist.contactInfo.address}</span>
                  </li>
                </ul>
                
                <h4 className="font-medium text-gray-700 mb-3">İş saatları</h4>
                <ul className="space-y-2 mb-6">
                  {Object.entries(specialist.availability).map(([day, hours]) => (
                    <li key={day} className="flex justify-between text-sm">
                      <span className="capitalize">{
                        day === 'monday' ? 'Bazar ertəsi' :
                        day === 'tuesday' ? 'Çərşənbə axşamı' :
                        day === 'wednesday' ? 'Çərşənbə' :
                        day === 'thursday' ? 'Cümə axşamı' :
                        day === 'friday' ? 'Cümə' :
                        day === 'saturday' ? 'Şənbə' : 'Bazar'
                      }</span>
                      <span className="text-gray-600">{hours || 'Qəbul yoxdur'}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition font-medium"
                  onClick={() => handleContact(specialist)}
                >
                  Əlaqə saxla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-panel-bg py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark-blue mb-8">Mütəxəssislər</h1>
        
        {selectedSpecialist ? (
          <SpecialistProfile specialist={selectedSpecialist} />
        ) : null}
        
        {/* Filtr paneli */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                  Axtarış
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleFilterChange}
                  placeholder="Ad, ixtisas və s."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                  İxtisas
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Hamısı</option>
                  <option value="Autizm Spektr">Autizm Spektr</option>
                  <option value="Nitq və Dil">Nitq və Dil</option>
                  <option value="Sensori">Sensori</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Davranış">Davranış</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Təcrübə
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Hamısı</option>
                  <option value="3">3+ il</option>
                  <option value="5">5+ il</option>
                  <option value="10">10+ il</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Reytinq
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Hamısı</option>
                  <option value="4">4+</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.8">4.8+</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
              >
                Axtar
              </button>
            </div>
          </form>
        </div>
        
        {/* Nəticələr */}
        <div className="space-y-6">
          {filteredSpecialists.length > 0 ? (
            filteredSpecialists.map(specialist => (
              <SpecialistCard key={specialist.id} specialist={specialist} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Mütəxəssis tapılmadı</h3>
              <p className="text-gray-500">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistSearch; 