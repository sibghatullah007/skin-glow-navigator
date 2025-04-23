
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SkinTypeSelectorProps {
  onSelect: (type: string) => void;
  translations: {
    select_skin: string;
    oily: string;
    dry: string;
    combination: string;
    normal: string;
  };
}

const SkinTypeSelector: React.FC<SkinTypeSelectorProps> = ({ onSelect, translations }) => {
  const skinTypes = [
    { id: 'oily', label: translations.oily },
    { id: 'dry', label: translations.dry },
    { id: 'combination', label: translations.combination },
    { id: 'normal', label: translations.normal },
  ];

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">{translations.select_skin}</h2>
      <div className="grid grid-cols-2 gap-4">
        {skinTypes.map((type) => (
          <Button
            key={type.id}
            variant="outline"
            className="h-auto py-4"
            onClick={() => onSelect(type.id)}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default SkinTypeSelector;
