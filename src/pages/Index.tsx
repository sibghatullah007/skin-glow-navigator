import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import SkinTypeSelector from '@/components/SkinTypeSelector';
import Results from '@/components/Results';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useHistory } from '@/contexts/HistoryContext';
import NavBar from '@/components/NavBar';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const { addToHistory } = useHistory();
  const [currentLang, setCurrentLang] = useState('en');
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

  const translations = {
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
    normal: "Normal"
  };

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
      <div className="container max-w-xl mx-auto py-12 px-4 space-y-8 pb-20 md:pb-12 md:ml-24">
        <LanguageSwitcher 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
        />
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-semibold">
            {translations.title}
          </h1>
        </div>

        <div className="space-y-6">
          {step === 'upload' && (
            <>
              <FileUpload
                onFileSelect={handleFileSelect}
                translations={translations}
              />
              
              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-2 justify-center">
                  <Youtube className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-center">Skincare Tips</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {skincareTipsVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium line-clamp-2">
                          {video.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 'skinType' && selectedFile && (
            <div className="fade-in">
              <SkinTypeSelector
                onSelect={handleSkinTypeSelect}
                translations={translations}
                initialSelection={user?.skinType}
              />
            </div>
          )}

          {step === 'results' && (
            <div className="space-y-4">
              <Results
                concerns={mockResults.concerns}
                products={mockResults.products}
                translations={translations}
              />
              <div className="text-center">
                <Button onClick={handleReset} variant="outline">
                  {translations.analyze_another}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Index;
