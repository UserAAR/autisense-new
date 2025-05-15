import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const bgShapes = [
  { style: 'absolute top-0 left-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl', delay: 0 },
  { style: 'absolute top-60 right-0 w-56 h-56 bg-secondary/20 rounded-full blur-2xl', delay: 0.2 },
  { style: 'absolute bottom-0 left-1/4 w-44 h-44 bg-success/20 rounded-full blur-2xl', delay: 0.4 },
  { style: 'absolute bottom-10 right-32 w-32 h-32 bg-attention/20 rounded-full blur-2xl', delay: 0.6 },
];

const Home = () => {
  // Animasiya variantları
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Sol: Başlıq və mətn */}
              <div className="md:w-1/2 flex flex-col justify-center items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl md:text-5xl" role="img" aria-label="uşaq">🧒</span>
                    <span className="text-4xl md:text-5xl" role="img" aria-label="kitab">📚</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-dark-blue mb-4 leading-tight">
                    <span className="block">Autizmli Uşaqlar Üçün</span>
                    <span className="block text-primary">AI Dəstəkli</span>
                    <span className="block">Öyrənmə Platforması</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 font-comic max-w-xl">
                    Uşaqların gündəlik həyat bacarıqlarını əyləncəli və interaktiv formada
                    öyrənməsini təmin edən, valideyn və mütəxəssisləri bir araya gətirən innovativ həll.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link 
                      to="/register" 
                      className="bg-primary text-white px-6 py-3 rounded-md text-center hover:bg-primary/90 transition shadow-lg text-lg font-medium"
                    >
                      İndi Başla
                    </Link>
                    <Link 
                      to="/about" 
                      className="bg-white border border-primary text-primary px-6 py-3 rounded-md text-center hover:bg-primary/5 transition shadow text-lg font-medium"
                    >
                      Ətraflı Öyrən
                    </Link>
                  </div>
                </motion.div>
              </div>
              {/* Sağ: Hero şəkli və dekorativ formalar */}
              <div className="md:w-1/2 flex justify-center items-center relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-white shadow-xl rounded-lg p-8 relative z-10 border-4 border-secondary/30 min-w-[320px] min-h-[220px] flex flex-col items-center justify-center gap-4">
                    {/* Uşaq üslubunda illüstrasiya */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                      className="mb-2"
                    >
                      <span className="text-6xl md:text-7xl block">🧑‍🎓</span>
                    </motion.div>
                    {/* Info kartlar */}
                    <div className="flex flex-col gap-3 w-full">
                      <motion.div
                        className="flex items-center gap-3 bg-primary/10 border-l-4 border-primary rounded-lg px-4 py-2 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <span className="text-2xl">📚</span>
                        <span className="font-semibold text-primary">100+ dərs və oyun</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 bg-secondary/10 border-l-4 border-secondary rounded-lg px-4 py-2 shadow-sm"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <span className="text-2xl">🤖</span>
                        <span className="font-semibold text-secondary">AI dəstəyi</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3 bg-success/10 border-l-4 border-success rounded-lg px-4 py-2 shadow-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <span className="text-2xl">👨‍👩‍👧‍👦</span>
                        <span className="font-semibold text-success">Valideyn və mütəxəssis bir arada</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-full z-0 animate-bounce"></div>
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-attention rounded-full z-0 animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/80">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-4 flex items-center gap-2 justify-center">
                <span role="img" aria-label="ulduz">🌟</span> Platformamızın Əsas Özəllikləri <span role="img" aria-label="bulud">☁️</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-comic">
                AutiSense üç əsas istifadəçi qrupu üçün xüsusi funksionallıq təqdim edir: 
                uşaqlar, valideynlər və mütəxəssislər.
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Feature 1 */}
              <motion.div 
                className="bg-primary/10 rounded-lg shadow-lg p-8 border-t-4 border-primary hover:scale-105 transition-transform"
                variants={itemVariants}
                whileHover={{ scale: 1.07 }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <span className="text-3xl">🧼</span>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Uşaq Öyrənmə Modulu</h3>
                <p className="text-gray-600 mb-4 font-comic">
                  Animasiyalı dərslər, interaktiv oyunlar və mini testlər ilə gündəlik həyat bacarıqlarını 
                  əyləncəli formada öyrənmə imkanı.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start"><span className="mr-2">✔️</span> Gigiyena və təhlükəsizlik dərsləri</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> Sosial bacarıqlar</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> Emosiya tanıma oyunları</li>
                </ul>
              </motion.div>
              {/* Feature 2 */}
              <motion.div 
                className="bg-secondary/10 rounded-lg shadow-lg p-8 border-t-4 border-secondary hover:scale-105 transition-transform"
                variants={itemVariants}
                whileHover={{ scale: 1.07 }}
              >
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Valideyn və AI Analiz</h3>
                <p className="text-gray-600 mb-4 font-comic">
                  Uşağın öyrənmə analitikasını izləmə və süni intellekt dəstəyi ilə fərdiləşdirilmiş
                  tövsiyələr alma imkanı.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start"><span className="mr-2">✔️</span> AI ilə güclü/zəif tərəflərin analizi</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> Tövsiyə olunan fəaliyyətlər</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> AI chatbot ilə dəstək</li>
                </ul>
              </motion.div>
              {/* Feature 3 */}
              <motion.div 
                className="bg-success/10 rounded-lg shadow-lg p-8 border-t-4 border-success hover:scale-105 transition-transform"
                variants={itemVariants}
                whileHover={{ scale: 1.07 }}
              >
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <span className="text-3xl">👩‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-dark-blue mb-4">Mütəxəssis Platforması</h3>
                <p className="text-gray-600 mb-4 font-comic">
                  Autizm sahəsində təcrübəli mütəxəssisləri tapmaq və onlarla əlaqə qurmaq
                  üçün vahid platforma.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start"><span className="mr-2">✔️</span> Təcrübəli müəllimlərin profilləri</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> Filtrləmə və axtarış imkanları</li>
                  <li className="flex items-start"><span className="mr-2">✔️</span> Birbaşa əlaqə imkanı</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Əlavə: Dərslər və Oyunlar / Valideyn Paneli keçidləri */}
        <section className="py-16 bg-white/80">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dərslər və Oyunlar */}
              <div className="bg-primary/10 rounded-2xl shadow-lg p-8 flex flex-col items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">Dərslər və Oyunlar <span>🎲</span></h3>
                  <p className="text-gray-700 mb-6 font-comic">Uşaqlar üçün interaktiv dərslər və əyləncəli oyunlar. Bacarıqları inkişaf etdir, öyrən və əylən!</p>
                </div>
                <Link
                  to="/child-learning"
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition shadow-lg mt-auto"
                >
                  Keçid et
                </Link>
              </div>
              {/* Valideyn Paneli */}
              <div className="bg-secondary/10 rounded-2xl shadow-lg p-8 flex flex-col items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-2 flex items-center gap-2">Valideyn Paneli <span>👨‍👩‍👧‍👦</span></h3>
                  <p className="text-gray-700 mb-6 font-comic">Uşağınızın tərəqqisini izləyin, AI analiz və fərdi tövsiyələr alın. Valideynlər üçün xüsusi panel.</p>
                </div>
                <Link
                  to="/parent-dashboard"
                  className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition shadow-lg mt-auto"
                >
                  Keçid et
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6 flex items-center gap-2 justify-center">
              <span role="img" aria-label="qalib">🏆</span> Övladınızın inkişafına bizimlə dəstək olun! <span role="img" aria-label="balon">🎈</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-comic">
              AutiSense platformasına qoşulun və autizmli uşaqların təhsilində yeni bir səhifə açın.
              Qeydiyyatdan keçərək bütün funksionallıqlardan istifadə edə bilərsiniz.
            </p>
            <Link 
              to="/register" 
              className="bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition inline-block shadow-lg animate-bounce"
            >
              İndi Qeydiyyatdan Keç
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 