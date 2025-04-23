
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, BookOpen } from 'lucide-react';
import NavBar from '@/components/NavBar';

interface TipCardProps {
  title: string;
  description: string;
  videoId?: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, description, videoId }) => (
  <Card className="overflow-hidden">
    {videoId && (
      <div className="aspect-video w-full">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )}
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const TextTipCard: React.FC<{ title: string; tips: string[] }> = ({ title, tips }) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="list-disc pl-5 space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const TipsPage: React.FC = () => {
  const videoTips = [
    {
      title: "Morning Skincare Routine",
      description: "Learn how to establish an effective morning skincare routine for all skin types.",
      videoId: "dQw4w9WgXcQ" // This is a placeholder - replace with actual video IDs
    },
    {
      title: "Understanding Skin Types",
      description: "How to identify your skin type and choose the right products for your needs.",
      videoId: "dQw4w9WgXcQ" // This is a placeholder - replace with actual video IDs
    },
    {
      title: "Treating Acne Naturally",
      description: "Natural remedies and products to help combat acne and blemishes.",
      videoId: "dQw4w9WgXcQ" // This is a placeholder - replace with actual video IDs
    }
  ];

  const textTips = [
    {
      title: "Daily Skincare Essentials",
      tips: [
        "Always remove makeup before bed",
        "Use sunscreen daily, even on cloudy days",
        "Stay hydrated by drinking plenty of water",
        "Change your pillowcase at least once a week",
        "Pat your skin dry instead of rubbing"
      ]
    },
    {
      title: "Skincare Ingredients to Know",
      tips: [
        "Hyaluronic Acid: Helps skin retain moisture",
        "Retinol: Promotes cell turnover and reduces fine lines",
        "Vitamin C: Brightens skin and provides antioxidant protection",
        "Niacinamide: Reduces inflammation and minimizes pores",
        "Ceramides: Strengthen skin barrier function"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
        <div className="flex items-center gap-2 mb-6">
          <Youtube className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">Skincare Tips & Videos</h1>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-medium">Video Tutorials</h2>
          <div className="space-y-4">
            {videoTips.map((tip, index) => (
              <TipCard 
                key={index}
                title={tip.title}
                description={tip.description}
                videoId={tip.videoId}
              />
            ))}
          </div>
          
          <h2 className="text-xl font-medium mt-8">Quick Tips</h2>
          <div className="space-y-4">
            {textTips.map((section, index) => (
              <TextTipCard 
                key={index}
                title={section.title}
                tips={section.tips}
              />
            ))}
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default TipsPage;
