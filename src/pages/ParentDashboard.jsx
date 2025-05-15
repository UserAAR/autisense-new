import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Demo məlumatları - əsl layihədə bunlar API-dan gələcək
import childrenData from '../data/children.json';
import lessonsData from '../data/lessons.json';
import testResultsData from '../data/testResults.json';

// AI chatbot və analiz nümunələri
import { getAIAnalysis, getAIRecommendations } from '../services/aiService';

const ParentDashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Demo məqsədləri üçün səhifə yükləndikdə ilk uşağı seçirik
  useEffect(() => {
    if (childrenData.length > 0 && !selectedChildId) {
      setSelectedChildId(childrenData[0].id);
    }
  }, []);
  
  // Uşaq seçildikdə AI analiz və tövsiyələri yükləyirik
  useEffect(() => {
    const fetchAIData = async () => {
      if (!selectedChildId) return;
      
      setIsLoading(true);
      
      try {
        // Seçilmiş uşaq haqqında məlumatlar
        const selectedChild = childrenData.find(child => child.id === selectedChildId);
        
        // Uşağın test nəticələri
        const childTestResults = testResultsData.filter(result => result.childId === selectedChildId);
        
        // AI analiz və tövsiyələri əldə edirik
        const analysisResult = await getAIAnalysis({ ...selectedChild, testResults: childTestResults });
        setAiAnalysis(analysisResult);
        
        const recommendationsResult = await getAIRecommendations(
          analysisResult.strengths,
          analysisResult.weaknesses
        );
        setAiRecommendations(recommendationsResult);
      } catch (error) {
        console.error('AI məlumatları yüklənərkən xəta:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAIData();
  }, [selectedChildId]);
  
  // Seçilmiş uşağın məlumatlarını əldə edirik
  const selectedChild = childrenData.find(child => child.id === selectedChildId);
  
  // Seçilmiş uşağın tamamlanmış dərsləri
  const completedLessons = selectedChild 
    ? testResultsData
        .filter(result => result.childId === selectedChildId && result.completed)
        .map(result => lessonsData.find(lesson => lesson.id === result.lessonId))
        .filter(Boolean)
    : [];
  
  // Tövsiyə olunan dərslər - əsl layihədə bu AI tərəfindən təyin ediləcək
  const recommendedLessons = selectedChild
    ? lessonsData.filter(lesson => 
        !completedLessons.some(completed => completed.id === lesson.id)
      ).slice(0, 3)
    : [];
  
  return (
    <div className="bg-panel-bg min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark-blue mb-6">Valideyn Paneli</h1>
        
        {/* Uşaq Seçimi */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Uşaq Profili</h2>
          
          <div className="flex flex-wrap gap-4">
            {childrenData.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                  selectedChildId === child.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="w-12 h-12 mr-3 flex items-center justify-center">
                  {child.avatar ? (
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {child.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <div className="font-medium">{child.name}</div>
                  <div className="text-sm text-gray-500">{child.age} yaş</div>
                </div>
              </button>
            ))}
            
            <button className="flex items-center p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary/50 text-gray-500 hover:text-primary">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-medium">Yeni uşaq</div>
                <div className="text-sm">Profil əlavə et</div>
              </div>
            </button>
          </div>
        </div>
        
        {selectedChild && (
          <>
            {/* Uşaq İnkişaf Analizi */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <h2 className="text-xl font-semibold mb-6">
                    <span className="text-primary">{selectedChild.name}</span> üçün AI Analizi
                  </h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : aiAnalysis ? (
                    <div>
                      <div className="mb-6">
                        <h3 className="font-medium text-dark-blue mb-2">Ümumi Qiymətləndirmə</h3>
                        <p className="text-gray-600">{aiAnalysis.summary}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-green-100 bg-green-50 p-4 rounded-lg">
                          <h3 className="font-medium text-green-700 mb-2">Güclü Tərəflər</h3>
                          <ul className="space-y-2">
                            {aiAnalysis.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border border-amber-100 bg-amber-50 p-4 rounded-lg">
                          <h3 className="font-medium text-amber-700 mb-2">İnkişaf Sahələri</h3>
                          <ul className="space-y-2">
                            {aiAnalysis.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Analiz məlumatları mövcud deyil
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <h2 className="text-xl font-semibold mb-6">Tərəqqi Statistikası</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Tamamlanmış dərslər</span>
                        <span className="text-sm font-medium">{completedLessons.length} / {lessonsData.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(completedLessons.length / lessonsData.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Ümumi bal</span>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-success h-2.5 rounded-full" 
                          style={{ width: '72%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Ardıcıllıq</span>
                        <span className="text-sm font-medium">5 gün</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-secondary h-2.5 rounded-full" 
                          style={{ width: '50%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium text-dark-blue mb-3">Ən Son Fəaliyyət</h3>
                      <ul className="space-y-3">
                        {testResultsData
                          .filter(result => result.childId === selectedChildId)
                          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                          .slice(0, 3)
                          .map(result => {
                            const lesson = lessonsData.find(lesson => lesson.id === result.lessonId);
                            return lesson ? (
                              <li key={result.id} className="flex items-start">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                  result.score > 70 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {result.score}%
                                </div>
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(result.completedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </li>
                            ) : null;
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tövsiyə Edilən Dərslər və AI Tövsiyələri */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Tövsiyə Edilən Dərslər</h2>
                    <Link to="/child-learning" className="text-primary font-medium hover:underline text-sm">
                      Bütün dərslər
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedLessons.map(lesson => (
                      <motion.div
                        key={lesson.id}
                        whileHover={{ y: -5 }}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-all"
                      >
                        <div className="aspect-video bg-gray-100 relative">
                          <img 
                            src={lesson.thumbnailUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(lesson.title)}`} 
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white text-xs font-medium py-1 px-2 rounded">
                            {lesson.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">{lesson.title}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              {lesson.duration} dəqiqə
                            </span>
                            <Link 
                              to={`/child-learning/${lesson.id}`} 
                              className="text-primary text-sm hover:underline"
                            >
                              Dərsə bax
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-6">AI Tövsiyələri</h2>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : aiRecommendations ? (
                    <div className="space-y-4">
                      {aiRecommendations.recommendations.map((recommendation, index) => (
                        <div 
                          key={index} 
                          className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary"
                        >
                          <p className="text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                      
                      <div className="pt-4 mt-6 border-t border-gray-100">
                        <Link 
                          to="/specialists" 
                          className="block w-full py-2 px-4 bg-primary text-white text-center font-medium rounded-md hover:bg-primary/90 transition"
                        >
                          Mütəxəssis tapın
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Tövsiyələr mövcud deyil
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard; 