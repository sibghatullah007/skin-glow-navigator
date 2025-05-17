
import React, { createContext, useState, useContext, useEffect } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, Record<string, string>>;
};

const defaultTranslations = {
  en: {
    title: "Skin Map by Vivere Skin",
    upload_prompt: "Upload your image to get personalized skincare recommendations.",
    choose_file: "📸 Choose an Image",
    select_skin: "Select Your Skin Type",
    results_title: "Analysis Results",
    concerns: "Detected Skin Concerns",
    recommendations: "Recommended Products",
    no_concerns: "No major concerns detected.",
    no_recommendations: "No recommendations available.",
    analyze_another: "🔄 Analyze Another Image",
    oily: "Oily",
    dry: "Dry",
    combination: "Combination",
    normal: "Normal",
    skincare_tips: "Skincare Tips",
    featured_blogs: "Featured Blogs",
    read_more: "Read More"
  },
  fr: {
    title: "Carte Cutanée par Vivere Skin",
    upload_prompt: "Téléchargez votre image pour obtenir des recommandations de soins personnalisées.",
    choose_file: "📸 Choisir une Image",
    select_skin: "Sélectionnez Votre Type de Peau",
    results_title: "Résultats d'Analyse",
    concerns: "Problèmes de Peau Détectés",
    recommendations: "Produits Recommandés",
    no_concerns: "Aucun problème majeur détecté.",
    no_recommendations: "Aucune recommandation disponible.",
    analyze_another: "🔄 Analyser une Autre Image",
    oily: "Grasse",
    dry: "Sèche",
    combination: "Mixte",
    normal: "Normale",
    skincare_tips: "Conseils de Soin",
    featured_blogs: "Blogs en Vedette",
    read_more: "Lire Plus"
  },
  es: {
    title: "Mapa de Piel por Vivere Skin",
    upload_prompt: "Suba su imagen para obtener recomendaciones de cuidado personalizadas.",
    choose_file: "📸 Elegir una Imagen",
    select_skin: "Seleccione Su Tipo de Piel",
    results_title: "Resultados del Análisis",
    concerns: "Problemas de Piel Detectados",
    recommendations: "Productos Recomendados",
    no_concerns: "No se detectaron problemas importantes.",
    no_recommendations: "No hay recomendaciones disponibles.",
    analyze_another: "🔄 Analizar Otra Imagen",
    oily: "Grasa",
    dry: "Seca",
    combination: "Mixta", 
    normal: "Normal",
    skincare_tips: "Consejos para el Cuidado de la Piel",
    featured_blogs: "Blogs Destacados",
    read_more: "Leer Más"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    // Try to get language from localStorage, default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    // When the language changes, update localStorage
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: defaultTranslations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
