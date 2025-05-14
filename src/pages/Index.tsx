
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Youtube, FileText } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import SkinTypeSelector from '@/components/SkinTypeSelector';
import Results from '@/components/Results';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useHistory } from '@/contexts/HistoryContext';
import NavBar from '@/components/NavBar';
import { Link } from 'react-router-dom';

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
      featured_blogs: "Featured Blogs"
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
      featured_blogs: "Blogs en Vedette"
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
      featured_blogs: "Blogs Destacados"
    }
  };

  // Select the correct translation based on current language
  const t = translations[currentLang as keyof typeof translations];

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
          <LanguageSwitcher 
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
          />
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
            
            {step === 'upload' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{t.skincare_tips}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            )}
          </div>
          
          {/* Right Column (Featured Blogs) */}
          {step === 'upload' && (
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t.featured_blogs}</h2>
              </div>
              <div className="space-y-4">
                {featuredBlogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden h-full flex flex-col">
                    <div className="h-32 relative overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="py-3 flex-grow">
                      <CardTitle className="text-base font-semibold line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{blog.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to={`/blogs/${blog.id}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
