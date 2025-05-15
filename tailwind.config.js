/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3AA5D1',        // Açıq Mavi - sakitlik və güvən
        'secondary': '#FF9E44',      // Pastel Narıncı - əyləncəli və enerjili
        'success': '#4CAF50',        // Yaşıl - müsbət əhvali-ruhiyyə
        'attention': '#FFD600',      // Sarı - diqqət cəlb edən
        'dark-blue': '#235789',      // Tünd mavi - başlıqlar
        'panel-bg': '#F2F2F2',       // Boz - panellər
        'accent': '#40916C',         // Yaşıl aksentlər
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'comic': ['"Comic Neue"', 'cursive'],
      },
    },
  },
  plugins: [],
}; 