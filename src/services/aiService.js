/**
 * AI servisi - API ilə əlaqə qurmaq üçün funksiyalar
 * 
 * İlkin mərhələdə simulyasiya edilir, real layihədə OpenAI ChatGPT və ya Gemini API istifadə olunacaq
 */

import mockAiResponses from '../data/mockAiResponses.json';

/**
 * Uşaq məlumatları əsasında AI analiz nəticəsi əldə edir
 * 
 * @param {Object} childData - Uşaq haqqında məlumatlar və test nəticələri
 * @returns {Promise<Object>} - Analiz nəticəsi
 */
export const getAIAnalysis = async (childData) => {
  try {
    // Əsl layihədə bu API sorğusu olacaq:
    /*
    const response = await fetch('API_ENDPOINT/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        childData,
        prompt: `Analyze this child's learning patterns and behaviors based on the provided data. 
                 Identify strengths and areas for improvement. 
                 Provide a summarized assessment.`
      })
    });
    return await response.json();
    */
    
    // Demo məqsədləri üçün mock data istifadə edirik
    await new Promise(resolve => setTimeout(resolve, 1000)); // API sorğusu simulyasiyası
    
    // Uşağın ID-sinə uyğun mock cavab qaytarırıq
    const mockResponse = mockAiResponses.analysis[childData.id] || mockAiResponses.analysis.default;
    return mockResponse;
  } catch (error) {
    console.error('AI analiz xətası:', error);
    throw error;
  }
};

/**
 * Uşağın güclü və zəif tərəflərinə əsasən AI tövsiyələrini əldə edir
 * 
 * @param {Array} strengths - Güclü tərəflər siyahısı
 * @param {Array} weaknesses - Zəif tərəflər siyahısı
 * @returns {Promise<Object>} - Tövsiyələr
 */
export const getAIRecommendations = async (strengths, weaknesses) => {
  try {
    // Əsl layihədə bu API sorğusu olacaq:
    /*
    const response = await fetch('API_ENDPOINT/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        strengths,
        weaknesses,
        prompt: `Based on these strengths: ${strengths.join(', ')} 
                 and weaknesses: ${weaknesses.join(', ')}, 
                 provide personalized recommendations for activities and exercises.`
      })
    });
    return await response.json();
    */
    
    // Demo məqsədləri üçün mock data istifadə edirik
    await new Promise(resolve => setTimeout(resolve, 1200)); // API sorğusu simulyasiyası
    
    // Zəif tərəflərin birinci elementinə əsaslanan tövsiyələr
    const firstWeakness = weaknesses[0]?.toLowerCase() || '';
    
    let recommendations;
    if (firstWeakness.includes('sosia')) {
      recommendations = mockAiResponses.recommendations.social;
    } else if (firstWeakness.includes('diqqət')) {
      recommendations = mockAiResponses.recommendations.attention;
    } else if (firstWeakness.includes('motor')) {
      recommendations = mockAiResponses.recommendations.motor;
    } else {
      recommendations = mockAiResponses.recommendations.default;
    }
    
    return recommendations;
  } catch (error) {
    console.error('AI tövsiyə xətası:', error);
    throw error;
  }
};

/**
 * Valideynin soruşduğu suala AI cavabını əldə edir
 * 
 * @param {string} question - Valideynin sualı
 * @param {Object} childData - Uşaq haqqında məlumatlar (əgər varsa)
 * @returns {Promise<Object>} - AI cavabı
 */
export const getAIChatResponse = async (question, childData = null) => {
  try {
    // Əsl layihədə bu API sorğusu olacaq:
    /*
    const response = await fetch('API_ENDPOINT/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        question,
        childData,
        prompt: `As an AI assistant for parents of children with autism, 
                answer this question: "${question}"
                ${childData ? `Consider this specific child's data: ${JSON.stringify(childData)}` : ''}`
      })
    });
    return await response.json();
    */
    
    // Demo məqsədləri üçün mock data istifadə edirik
    await new Promise(resolve => setTimeout(resolve, 800)); // API sorğusu simulyasiyası
    
    // Sualda olan açar sözlərə əsaslanan cavablar
    const lowerQuestion = question.toLowerCase();
    
    let response;
    if (lowerQuestion.includes('aqressiv') || lowerQuestion.includes('aqresiv') || lowerQuestion.includes('əsəbi')) {
      response = mockAiResponses.chatbot.aggression;
    } else if (lowerQuestion.includes('yemək') || lowerQuestion.includes('qida') || lowerQuestion.includes('yemə')) {
      response = mockAiResponses.chatbot.food;
    } else if (lowerQuestion.includes('yat') || lowerQuestion.includes('yuxu')) {
      response = mockAiResponses.chatbot.sleep;
    } else if (lowerQuestion.includes('məktəb') || lowerQuestion.includes('təhsil')) {
      response = mockAiResponses.chatbot.school;
    } else {
      response = mockAiResponses.chatbot.default;
    }
    
    return response;
  } catch (error) {
    console.error('AI çatbot xətası:', error);
    throw error;
  }
}; 