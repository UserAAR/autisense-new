# AutiSense: Autizmli Uşaqlar üçün AI Dəstəkli Öyrənmə Platforması

## 1. Layihə Xülasəsi

AutiSense, autizmli uşaqların gündəlik həyat bacarıqlarını əyləncəli və interaktiv formada öyrənməsini təmin edən innovativ veb platformadır. Sistem üç əsas istifadəçi qrupu üçün xüsusi funksionallıq təqdim edir: uşaqlar, valideynlər və mütəxəssislər. Platformanın əsas fərqləndirici xüsusiyyəti süni intellekt texnologiyasından istifadə edərək hər bir uşağın ehtiyaclarına uyğun fərdiləşdirilmiş təklif və analizlər təmin etməsidir.

### 1.1 Missiya və Vizyon

**Missiyamız:** Autizmli uşaqların həyat bacarıqlarını inkişaf etdirmək üçün əlçatan və fərdiləşdirilmiş rəqəmsal təhsil təcrübəsi yaratmaq.

**Vizyonumuz:** Autizmli uşaqlar üçün qlobal standartlarda təhsil və dəstək platformasına çevrilərək hər bir uşağın potensialını üzə çıxarmaq.

### 1.2 Hədəf İstifadəçi Qrupları

1. **Autizmli Uşaqlar** (3-12 yaş): Oyun və vizual öyrənmə vasitəsilə həyati bacarıqlar qazanan əsas istifadəçilər.
2. **Valideynlər**: Uşaqlarının inkişafını izləyən, AI analizlərindən faydalanan və peşəkar dəstək tapmaq istəyən şəxslər.
3. **Mütəxəssislər/Müəllimlər**: Autizm sahəsində təcrübələrini paylaşan, xidmətlərini təklif edən peşəkarlar.

## 2. Məhsulun Funksional Spesifikasiyaları

### 2.1 İstifadəçi Tipləri və Səlahiyyətləri

| İstifadəçi Tipi | Səlahiyyətlər |
|-----------------|---------------|
| **Qonaq** | Platformanın tanıtım səhifələrinə baxış; Qeydiyyat və giriş |
| **Valideyn** | Uşaqların əlavə edilməsi və idarəsi; AI analiz nəticələri; Dərs və oyunlara giriş; Mütəxəssislər ilə əlaqə |
| **Müəllim/Mütəxəssis** | Profil yaradılması və idarəsi; Təcrübə məlumatlarının paylaşılması; Valideynlərlə əlaqə |

### 2.2 Əsas Modullar

#### 2.2.1 Uşaq Öyrənmə və Oyun Modulu

- **Animasiyalı Dərslər:**
  - Gigiyena (əl yuma, diş fırçalama)
  - Təhlükəsizlik (yol, ev təhlükəsizliyi)
  - Sosial bacarıqlar (salamlaşma, növbə gözləmə)
  
- **İnteraktiv Oyunlar:**
  - Rəng uyğunlaşdırma
  - Forma seçmə
  - Emosiya tanıma

- **Mini Testlər:**
  - Hər dərsdən sonra 2-3 sual
  - Vizual cavab seçimləri
  - Anında mükafatlandırma

#### 2.2.2 Valideyn və AI Analiz Modulu

- **Uşaq Profili İdarəetməsi:**
  - Birdən çox uşaq əlavə etmə
  - Profil məlumatları

- **Analitika Paneli:**
  - Tamamlanmış dərslər və testlər statistikası
  - Güclü və zəif tərəflərin infoqrafikləri

- **AI Dəstək Sistemi:**
  - ChatGPT/Gemini API ilə analiz və tövsiyələr
  - Sual-cavab formatında AI köməkçi

#### 2.2.3 Müəllim/Mütəxəssis Platforması

- **Profil İdarəetməsi:**
  - Təcrübə məlumatları
  - İxtisas və sertifikatlar
  - Xidmət təsvirləri

- **Valideyn-Mütəxəssis Əlaqəsi:**
  - Əlaqə sorğuları
  - Əlaqə məlumatları

### 2.3 İstifadəçi Axını

#### 2.3.1 Valideyn İstifadəçi Axını

1. **Qeydiyyat və Giriş:** E-mail və şifrə ilə qeydiyyat
2. **Uşaq Profili Yaratma:** Əsas məlumatlar və xüsusiyyətlər
3. **Dərs və Oyunlara Baxış:** Tövsiyə olunan kontentə giriş
4. **AI Analizinə Baxış:** Uşağın performans hesabatı
5. **Mütəxəssis Axtarışı:** Filtrləmə və profil baxışı

#### 2.3.2 Uşaq İstifadəçi Axını

1. **Platformaya Giriş:** Valideyn hesabı üzərindən sadə giriş
2. **Dərs və Oyun Seçimi:** Rəngli və iri ikonlarla seçim
3. **İnteraktiv İştirak:** Dərs izləmə və testlərin tamamlanması

## 3. Texniki Spesifikasiyalar (İlkin Mərhələ)

### 3.1 Frontend Texnologiyaları

- **HTML5, CSS3, JavaScript** - Əsas veb texnologiyaları
- **React.js** - İstifadəçi interfeysi üçün
- **Tailwind CSS** - Adaptiv və responsiv dizayn
- **Framer Motion** - UI animasiyaları

### 3.2 Data Mənbəyi

- **Statik JSON fayllar** - Bütün data üçün lokal JSON strukturu:
  - `users.json` - İstifadəçi məlumatları
  - `children.json` - Uşaq profilləri
  - `lessons.json` - Dərs məzmunu
  - `tests.json` - Test sualları
  - `specialists.json` - Mütəxəssis profilləri

### 3.3 AI İnteqrasiyası

- **OpenAI API (ChatGPT)** və ya **Google Gemini API**
  - Uşaq davranışlarının analizi üçün
  - Tövsiyələr və personalizasiya üçün
  - Valideyn suallarına cavab verən çatbot üçün
  
- **API istifadəsi üçün funksiyalar:**
  ```javascript
  async function getAIAnalysis(childData) {
    // Uşaq məlumatları əsasında AI analiz
    const response = await fetch('AI_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Analyze this child's learning pattern: ${JSON.stringify(childData)}`
      })
    });
    return await response.json();
  }
  
  async function getAIRecommendations(childStrengths, childWeaknesses) {
    // Güclü və zəif tərəflərə əsasən tövsiyələr
    const response = await fetch('AI_API_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: `Recommend activities based on: 
                Strengths: ${childStrengths}
                Weaknesses: ${childWeaknesses}`
      })
    });
    return await response.json();
  }
  ```

### 3.4 Frontend Komponentlər Strukturu
src/
├── assets/
│ ├── images/
│ ├── animations/
│ └── sounds/
├── components/
│ ├── common/
│ │ ├── Button.jsx
│ │ ├── Card.jsx
│ │ └── Avatar.jsx
│ ├── layout/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ └── Navigation.jsx
│ ├── auth/
│ │ ├── LoginForm.jsx
│ │ └── RegisterForm.jsx
│ ├── parent/
│ │ ├── Dashboard.jsx
│ │ ├── ChildProfile.jsx
│ │ └── AIInsights.jsx
│ ├── child/
│ │ ├── LessonCard.jsx
│ │ ├── GameInterface.jsx
│ │ └── TestComponent.jsx
│ └── specialist/
│ ├── SpecialistCard.jsx
│ └── ProfileForm.jsx
├── pages/
│ ├── Home.jsx
│ ├── Auth.jsx
│ ├── ParentDashboard.jsx
│ ├── ChildLearning.jsx
│ ├── SpecialistSearch.jsx
│ └── About.jsx
├── data/
│ ├── users.json
│ ├── children.json
│ ├── lessons.json
│ ├── tests.json
│ └── specialists.json
├── services/
│ ├── aiService.js
│ ├── dataService.js
│ └── authService.js
└── utils/
├── helpers.js
└── constants.js


## 4. Dizayn Spesifikasiyaları

### 4.1 Ümumi Dizayn Konsepti

- **Uşaqlar üçün**: Parlaq, maraqlı və intuitiv interfeys
- **Valideynlər üçün**: Təmiz, müasir və funksional dizayn
- **Mütəxəssislər üçün**: Professional və etibarlı görünüş

### 4.2 Rəng Palitrası

#### 4.2.1 Əsas Rənglər

- **Açıq Mavi (#3AA5D1)**: Sakitlik və güvən
- **Pastel Narıncı (#FF9E44)**: Əyləncə və enerji
- **Yaşıl (#4CAF50)**: Müsbət əhval və uğur
- **Sarı (#FFD600)**: Diqqət və həvəsləndirmə

#### 4.2.2 Valideyn və Müəllim Panelləri üçün

- **Ağ (#FFFFFF)**: Əsas fon
- **Tünd Mavi (#235789)**: Başlıqlar
- **Boz (#F2F2F2)**: Panellər
- **Yaşıl Aksentlər (#40916C)**: Əhəmiyyətli məlumatlar

### 4.3 Tipografiya

- **Başlıqlar**: Poppins, 24-36px
- **Alt başlıqlar**: Poppins, 18-24px
- **Əsas mətn**: Nunito, 16px
- **Uşaq interfeysi**: Comic Neue, 20px

### 4.4 İstifadəçi İnterfeysi Elementləri

- **Uşaq Paneli**: Böyük ikonlar (min 64px), animasiyalı kartlar
- **Valideyn Paneli**: Dashbord kartları, statistik qrafikləri
- **Müəllim Paneli**: Professional profil kartları

### 4.5 UX Prinsipləri

- **Sadə Naviqasiya**: Aydın və intuitiv menyular
- **Ardıcıl İstifadəçi Axını**: Mərhələli proseslər
- **Gamification**: Nailiyyətlər, ulduzlar və mükafatlar
- **Responsiv Dizayn**: Bütün cihazlara uyğunlaşma

## 5. MVP (Minimum Viable Product)

### 5.1 MVP Funksionallıqları

1. **İstifadəçi Simulyasiyası**
   - Hazır hesablarla giriş (real qeydiyyat olmadan)

2. **Uşaq Profil İdarəetməsi**
   - Hazır uşaq profilləri
   - Əsas məlumatların göstərilməsi

3. **Dərs və Oyun Modulu**
   - 5 nümunə dərs (hər kateqoriyadan 1)
   - 3 nümunə oyun
   - Sadə test funksionalı

4. **AI İnteqrasiyası**
   - ChatGPT/Gemini API ilə sadə analiz
   - Tövsiyə sistemi
   - Valideyn chatbot

5. **Mütəxəssis Platforması**
   - Hazır müəllim profilləri
   - Əsas filtrləmə və axtarış

### 5.2 İmplementasiya Planı

1. **Frontend Struktur və Layout**
   - Ana səhifə və əsas komponentlər
   - Responsiv dizayn

2. **JSON Data Strukturu**
   - Bütün nümunə dataların hazırlanması
   - Data xidməti funksiyaları

3. **AI API İnteqrasiyası**
   - API bağlantısı
   - Prompt şablonları
   - Response emalı

4. **İstifadəçi İnterfeysi**
   - Uşaq, valideyn və müəllim panelləri
   - Animasiya və interaktiv elementlər

5. **Testləmə və Cilalanma**
   - İstifadəçi təcrübəsi testləri
   - Performans optimizasiyası

## 6. Gələcək İnkişaf Planı

### 6.1 Növbəti Mərhələ Funksionallıqları

- Əsl backend inteqrasiyası
- Verilənlər bazası sistemi
- İstifadəçi qeydiyyatı və avtorizasiyası
- Daha təkmilləşdirilmiş AI analitika

### 6.2 Uzunmüddətli Planlar

- Mobil tətbiq
- Real-time görüş və konsultasiya
- Premium funksionallıqlar
- Beynəlxalq lokalizasiya

---

Hazırladı: DeepSense Team  
