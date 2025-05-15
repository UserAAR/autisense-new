import React from 'react';
import { motion } from 'framer-motion';

const bgShapes = [
  // Rəngli dairələr və buludlar üçün koordinatlar və rənglər
  { style: 'absolute top-10 left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl', delay: 0 },
  { style: 'absolute top-40 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-2xl', delay: 0.2 },
  { style: 'absolute bottom-10 left-20 w-24 h-24 bg-success/30 rounded-full blur-2xl', delay: 0.4 },
  { style: 'absolute bottom-20 right-32 w-28 h-28 bg-attention/30 rounded-full blur-2xl', delay: 0.6 },
  { style: 'absolute top-1/2 left-1/2 w-44 h-20 bg-white/60 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2', delay: 0.8 },
];

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-panel-bg py-12 px-4 overflow-hidden">
      {/* Arxa plan rəngli formalar */}
      {bgShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={shape.style}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: shape.delay, duration: 1, type: 'spring' }}
        />
      ))}
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-primary/20 backdrop-blur-md"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark-blue mb-6 flex items-center gap-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          >
            <span role="img" aria-label="bulud">☁️</span> Haqqımızda <span role="img" aria-label="ulduz">⭐</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-6 font-comic"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <b>AutiSense</b> — autizmli uşaqlar üçün fərdiləşdirilmiş, AI dəstəkli öyrənmə platformasıdır. Məqsədimiz uşaqların gündəlik həyat bacarıqlarını <span className="text-primary font-bold">rəngli</span> və <span className="text-secondary font-bold">interaktiv</span> şəkildə inkişaf etdirmək, valideyn və mütəxəssisləri bir araya gətirməkdir.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="bg-primary/10 rounded-2xl p-6 flex flex-col items-center shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-4xl mb-2">🎮</span>
              <span className="font-bold text-primary mb-1">Uşaqlar üçün</span>
              <span className="text-sm text-gray-600 text-center">Animasiyalı dərslər və oyunlar</span>
            </motion.div>
            <motion.div
              className="bg-secondary/10 rounded-2xl p-6 flex flex-col items-center shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-4xl mb-2">🤖</span>
              <span className="font-bold text-secondary mb-1">Valideynlər üçün</span>
              <span className="text-sm text-gray-600 text-center">AI analiz və fərdi tövsiyələr</span>
            </motion.div>
            <motion.div
              className="bg-success/10 rounded-2xl p-6 flex flex-col items-center shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-4xl mb-2">👩‍⚕️</span>
              <span className="font-bold text-success mb-1">Mütəxəssislər üçün</span>
              <span className="text-sm text-gray-600 text-center">Əlaqə və dəstək imkanı</span>
            </motion.div>
          </motion.div>
          <motion.p
            className="mt-6 text-gray-500 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            Platformamız hələ <span className="text-attention font-bold">prototip</span> mərhələsindədir və real backend olmadan işləyir. Gələcəkdə daha çox <span className="text-primary font-bold">funksiya</span> və <span className="text-secondary font-bold">rəngli təcrübə</span> əlavə olunacaq!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 