
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  readMoreUrl: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/blogs/${post.id}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
