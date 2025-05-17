
import React from 'react';
import { Navigate } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import HomeContent from '@/components/HomeContent';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { language, translations } = useLanguage();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Select the correct translation based on current language
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex justify-end mb-6">
          <LanguageSwitcher />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold">
            {t.title}
          </h1>
        </div>

        <HomeContent />
      </div>
      <NavBar />
    </div>
  );
};

export default Index;
