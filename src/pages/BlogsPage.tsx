
import React from 'react';
import NavBar from '@/components/NavBar';
import BlogCard from '@/components/BlogCard';
import { FileText } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Building a Skincare Routine",
    description: "Learn how to create an effective skincare routine that works for your specific skin type and concerns. From cleansing to moisturizing, we cover all the essential steps.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    readMoreUrl: "https://example.com/skincare-routine-guide"
  },
  {
    id: 2,
    title: "Understanding Different Skin Types and Their Needs",
    description: "Discover what makes your skin unique and learn how to identify your skin type. Get expert tips on caring for oily, dry, combination, or sensitive skin.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    readMoreUrl: "https://example.com/skin-types-guide"
  },
  {
    id: 3,
    title: "Natural Remedies for Common Skin Concerns",
    description: "Explore effective natural solutions for various skin issues. From acne to aging, find out how nature's ingredients can help improve your skin's health.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    readMoreUrl: "https://example.com/natural-skincare"
  },
  {
    id: 4,
    title: "The Science Behind Anti-Aging Skincare",
    description: "Dive deep into the scientific principles behind aging skin and discover evidence-based approaches to maintaining youthful, healthy skin.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    readMoreUrl: "https://example.com/anti-aging-science"
  }
];

const BlogsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto py-12 px-4 space-y-8 pb-20 md:pb-12 md:ml-24">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-semibold">Skincare Blog</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default BlogsPage;
