
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import SkinTypeSelector from '@/components/SkinTypeSelector';
import Results from '@/components/Results';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [step, setStep] = useState<'upload' | 'skinType' | 'results'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // This would normally come from your backend
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

  // This would normally come from your API
  const mockResults = {
    concerns: ["Blemishes", "Dark Spots", "Redness"],
    products: [
      "Stay Firm Skin Firming Cream",
      "Say Goodbye to Dark Spots Serum",
      "Hello Glow Anti-Aging Moisturizer"
    ]
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStep('skinType');
  };

  const handleSkinTypeSelect = (type: string) => {
    // Here you would normally send the file and skin type to your backend
    setStep('results');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-xl mx-auto py-12 px-4 space-y-8">
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
            <FileUpload
              onFileSelect={handleFileSelect}
              translations={translations}
            />
          )}

          {step === 'skinType' && selectedFile && (
            <div className="fade-in">
              <SkinTypeSelector
                onSelect={handleSkinTypeSelect}
                translations={translations}
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
    </div>
  );
};

export default Index;
