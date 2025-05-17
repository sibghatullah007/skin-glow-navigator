
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Youtube, FileText } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import SkinTypeSelector from '@/components/SkinTypeSelector';
import Results from '@/components/Results';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SkincareTipsVideos from '@/components/SkincareTipsVideos';
import FeaturedBlogs from '@/components/FeaturedBlogs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useHistory } from '@/contexts/HistoryContext';
import NavBar from '@/components/NavBar';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { addToHistory } = useHistory();
  const { language, translations } = useLanguage();
  const [step, setStep] = useState<'upload' | 'skinType' | 'results'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');

  useEffect(() => {
    if (user?.skinType && step === 'skinType') {
      setSelectedSkinType(user.skinType);
    }
  }, [user, step]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Select the correct translation based on current language
  const t = translations[language as keyof typeof translations];

  const mockResults = {
    concerns: ["Blemishes", "Dark Spots", "Redness"],
    products: [
      "Stay Firm Skin Firming Cream",
      "Say Goodbye to Dark Spots Serum",
      "Hello Glow Anti-Aging Moisturizer"
    ]
  };

  const skincareTipsVideos = [
    {
      id: "9q1HJI1WYGs",
      title: "10 Skincare Tips for Healthy Glowing Skin",
    },
    {
      id: "JyH4DdqwX7Y",
      title: "Morning Skincare Routine for Beginners",
    },
    {
      id: "EZ4UA2pD1rY",
      title: "Understanding Your Skin Type",
    }
  ];

  // Featured blogs for homepage
  const featuredBlogs = [
    {
      id: 1,
      title: "The Ultimate Guide to Building a Skincare Routine",
      description: "Learn how to create an effective skincare routine that works for your specific skin type and concerns.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      id: 2,
      title: "Understanding Different Skin Types",
      description: "Discover what makes your skin unique and learn how to identify your skin type.",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    }
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStep('skinType');
  };

  const handleSkinTypeSelect = (type: string) => {
    setSelectedSkinType(type);
    setStep('results');
    
    addToHistory({
      skinType: type,
      concerns: mockResults.concerns,
      recommendations: mockResults.products,
      imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
    });
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedSkinType('');
    setStep('upload');
  };

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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column (Upload Area + Skincare Tips) */}
          <div className="md:col-span-7 space-y-8">
            {step === 'upload' && (
              <FileUpload
                onFileSelect={handleFileSelect}
                translations={{
                  upload_prompt: t.upload_prompt,
                  choose_file: t.choose_file
                }}
              />
            )}
            
            {step === 'skinType' && selectedFile && (
              <div className="fade-in">
                <SkinTypeSelector
                  onSelect={handleSkinTypeSelect}
                  translations={{
                    select_skin: t.select_skin,
                    oily: t.oily,
                    dry: t.dry,
                    combination: t.combination,
                    normal: t.normal
                  }}
                  initialSelection={user?.skinType}
                />
              </div>
            )}

            {step === 'results' && (
              <div className="space-y-4">
                <Results
                  concerns={mockResults.concerns}
                  products={mockResults.products}
                  translations={{
                    results_title: t.results_title,
                    concerns: t.concerns,
                    recommendations: t.recommendations,
                    no_concerns: t.no_concerns,
                    no_recommendations: t.no_recommendations
                  }}
                />
                <div className="text-center">
                  <Button onClick={handleReset} variant="outline">
                    {t.analyze_another}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Skincare Tips Videos */}
            {step === 'upload' && (
              <SkincareTipsVideos 
                title={t.skincare_tips}
                videos={skincareTipsVideos}
              />
            )}
          </div>
          
          {/* Right Column (Featured Blogs) */}
          {step === 'upload' && (
            <div className="md:col-span-5">
              <FeaturedBlogs 
                title={t.featured_blogs}
                blogs={featuredBlogs}
              />
            </div>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Index;
