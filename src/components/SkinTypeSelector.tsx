
import React, { useState, useEffect } from 'react';
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
  initialSelection?: string;
}

const SkinTypeSelector: React.FC<SkinTypeSelectorProps> = ({ onSelect, translations, initialSelection }) => {
  const [selected, setSelected] = useState<string | null>(initialSelection || null);

  const skinTypes = [
    { id: 'oily', label: translations.oily },
    { id: 'dry', label: translations.dry },
    { id: 'combination', label: translations.combination },
    { id: 'normal', label: translations.normal },
  ];

  useEffect(() => {
    if (initialSelection) {
      setSelected(initialSelection);
    }
  }, [initialSelection]);

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
    onSelect(typeId);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-center">{translations.select_skin}</h2>
      <div className="grid grid-cols-2 gap-4">
        {skinTypes.map((type) => (
          <Button
            key={type.id}
            variant={selected === type.id ? "default" : "outline"}
            className={`h-auto py-4 ${selected === type.id ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => handleSelect(type.id)}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default SkinTypeSelector;
