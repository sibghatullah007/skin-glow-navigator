
import React from 'react';
import { useHistory, AnalysisResult } from '@/contexts/HistoryContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import NavBar from '@/components/NavBar';

const HistoryCard: React.FC<{ item: AnalysisResult }> = ({ item }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between">
          <span>{formatDistance(new Date(item.date), new Date(), { addSuffix: true })}</span>
          <span className="text-muted-foreground">{item.skinType} skin</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div>
            <h3 className="font-medium text-sm">Concerns:</h3>
            <ul className="list-disc pl-5 text-sm">
              {item.concerns.map((concern, i) => (
                <li key={i}>{concern}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm">Recommended Products:</h3>
            <ul className="list-disc pl-5 text-sm">
              {item.recommendations.map((product, i) => (
                <li key={i}>{product}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyHistory: React.FC = () => (
  <div className="text-center py-12">
    <p className="text-muted-foreground mb-4">You haven't analyzed any images yet.</p>
    <Button asChild>
      <a href="/">Analyze your first image</a>
    </Button>
  </div>
);

const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useHistory();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Analysis History</h1>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              Clear All
            </Button>
          )}
        </div>
        
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map(item => <HistoryCard key={item.id} item={item} />)
          ) : (
            <EmptyHistory />
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default HistoryPage;
