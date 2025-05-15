import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Demo məlumatlar - əsl layihədə bunlar API-dan gələcək
import lessonsData from '../data/lessons.json';

const ChildLearning = () => {
  const { lessonId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredLessons, setFilteredLessons] = useState([]);
  
  // Kategoriyaları hazırla
  useEffect(() => {
    const uniqueCategories = [...new Set(lessonsData.map(lesson => lesson.category))];
    setCategories(['all', ...uniqueCategories]);
  }, []);
  
  // Dərsləri filtrələ
  useEffect(() => {
    let filtered = lessonsData;
    
    if (selectedCategory !== 'all') {
      filtered = lessonsData.filter(lesson => lesson.category === selectedCategory);
    }
    
    setFilteredLessons(filtered);
  }, [selectedCategory]);
  
  // Kategoriya dəyişikliyi
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Xüsusi bir dərs seçilmişdirsə, detallı görünüş göstərin
  if (lessonId) {
    const selectedLesson = lessonsData.find(lesson => lesson.id === lessonId);
    
    if (!selectedLesson) {
      return (
        <div className="min-h-screen bg-panel-bg py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-dark-blue mb-6">Dərs tapılmadı</h2>
            <p className="text-gray-600 mb-8">İstədiyiniz dərs mövcud deyil və ya silinib.</p>
            <Link 
              to="/child-learning" 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition"
            >
              Bütün Dərslərə Qayıt
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-panel-bg py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/child-learning" 
              className="flex items-center text-primary hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Bütün Dərslərə Qayıt
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              {/* Video yerləşdirilməsi - əsl layihədə burada video player olmalıdır */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-comic text-xl">Video burada olacaq</p>
                  <p className="text-gray-400">{selectedLesson.videoUrl}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {selectedLesson.category}
                </span>
                <span className="ml-4 text-gray-500 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedLesson.duration} dəqiqə
                </span>
                <span className="ml-4 text-gray-500 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {selectedLesson.difficulty === 'easy' ? 'Asan' : 
                   selectedLesson.difficulty === 'medium' ? 'Orta' : 'Çətin'}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4 font-comic">
                {selectedLesson.title}
              </h1>
              
              <p className="text-gray-600 mb-8 font-comic text-lg">
                {selectedLesson.description}
              </p>
              
              <div className="border-t pt-6">
                <button 
                  className="w-full py-4 px-6 bg-attention text-white text-lg font-medium rounded-lg hover:bg-attention/90 transition shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Test Et
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <button className="py-3 px-4 border border-primary text-primary rounded-lg hover:bg-primary/5 transition flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Paylaş
                  </button>
                  <button className="py-3 px-4 border border-success text-success rounded-lg hover:bg-success/5 transition flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Sevimli et
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Əlaqəli dərslər */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-dark-blue mb-6">Əlaqəli Dərslər</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessonsData
                .filter(lesson => lesson.category === selectedLesson.category && lesson.id !== selectedLesson.id)
                .slice(0, 3)
                .map(lesson => (
                  <Link 
                    key={lesson.id}
                    to={`/child-learning/${lesson.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={lesson.thumbnailUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(lesson.title)}`} 
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white text-xs font-medium py-1 px-2 rounded-full">
                        {lesson.duration} dəqiqə
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1 font-comic">{lesson.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{lesson.description}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Dərslər siyahısı görünüşü
  return (
    <div className="min-h-screen bg-panel-bg py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-blue mb-4 sm:mb-0">Dərslər və Oyunlar</h1>
          
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Hamısı' : 
                 category === 'gigiyena' ? 'Gigiyena' :
                 category === 'təhlükəsizlik' ? 'Təhlükəsizlik' :
                 category === 'sosial' ? 'Sosial' : category}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredLessons.map(lesson => (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <Link to={`/child-learning/${lesson.id}`}>
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src={lesson.thumbnailUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(lesson.title)}`} 
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded-md">
                    {lesson.category === 'gigiyena' ? 'Gigiyena' :
                     lesson.category === 'təhlükəsizlik' ? 'Təhlükəsizlik' :
                     lesson.category === 'sosial' ? 'Sosial' : lesson.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded-md">
                    {lesson.duration} dəqiqə
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 text-lg font-comic">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{lesson.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lesson.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lesson.difficulty === 'easy' ? 'Asan' : 
                       lesson.difficulty === 'medium' ? 'Orta' : 'Çətin'}
                    </span>
                    <span className="text-primary text-sm font-medium">
                      Dərsə bax
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChildLearning; 