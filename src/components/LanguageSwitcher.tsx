
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSwitcherProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  // Map of language codes to display names
  const languageNames = {
    en: "English",
    fr: "Français",
    es: "Español",
  };

  return (
    <div className="absolute top-4 right-4">
      <Select value={currentLang} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>
            {languageNames[currentLang as keyof typeof languageNames]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
