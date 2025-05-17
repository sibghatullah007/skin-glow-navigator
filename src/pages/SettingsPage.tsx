
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavBar from '@/components/NavBar';

const ThemeButton: React.FC<{ 
  name: string; 
  value: 'light' | 'dark' | 'nature'; 
  current: string; 
  onClick: () => void 
}> = ({ name, value, current, onClick }) => (
  <Button
    variant={current === value ? 'default' : 'outline'}
    className={`w-full h-16 flex flex-col justify-center ${
      current === value ? 'border-2 border-primary' : ''
    }`}
    onClick={onClick}
  >
    <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${
      value === 'light' ? 'bg-[#f8f9fa]' : 
      value === 'dark' ? 'bg-[#212529]' : 
      'bg-gradient-to-br from-[#68d391] to-[#38a169]'
    }`} />
    <span>{name}</span>
  </Button>
);

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose how Skin Glow Navigator looks to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <ThemeButton 
                  name="Light" 
                  value="light" 
                  current={theme} 
                  onClick={() => setTheme('light')} 
                />
                <ThemeButton 
                  name="Dark" 
                  value="dark" 
                  current={theme} 
                  onClick={() => setTheme('dark')} 
                />
                <ThemeButton 
                  name="Nature" 
                  value="nature" 
                  current={theme} 
                  onClick={() => setTheme('nature')} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Choose your preferred language</CardDescription>
            </CardHeader>
            <CardContent>
              <LanguageSwitcher />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Skin Glow Navigator</h3>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
              <Separator />
              <p className="text-sm">
                Skin Glow Navigator is a tool designed to help you understand your skin better and find
                the right skincare products for your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default SettingsPage;
