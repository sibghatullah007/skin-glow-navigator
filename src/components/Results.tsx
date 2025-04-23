
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ResultsProps {
  concerns: string[];
  products: string[];
  translations: {
    results_title: string;
    concerns: string;
    recommendations: string;
    no_concerns: string;
    no_recommendations: string;
  };
}

const Results: React.FC<ResultsProps> = ({ concerns, products, translations }) => {
  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>{translations.results_title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">{translations.concerns}</h3>
          {concerns.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {concerns.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{translations.no_concerns}</p>
          )}
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-3">{translations.recommendations}</h3>
          {products.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{translations.no_recommendations}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
