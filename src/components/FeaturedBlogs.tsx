
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface FeaturedBlogsProps {
  title: string;
  blogs: BlogPost[];
}

const FeaturedBlogs: React.FC<FeaturedBlogsProps> = ({ title, blogs }) => {
  const { language, translations } = useLanguage();
  const t = translations[language as keyof typeof translations];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">
        {blogs.map((blog) => (
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
                  {t.read_more || "Read More"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
