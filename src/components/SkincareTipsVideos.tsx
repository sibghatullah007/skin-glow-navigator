
import React from 'react';
import { Youtube } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoItem {
  id: string;
  title: string;
}

interface SkincareTipsVideosProps {
  title: string;
  videos: VideoItem[];
}

const SkincareTipsVideos: React.FC<SkincareTipsVideosProps> = ({ title, videos }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Youtube className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
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
  );
};

export default SkincareTipsVideos;
