
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import NavBar from '@/components/NavBar';

// We'll move this to a separate file later if the data grows
const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Building a Skincare Routine",
    description: "Learn how to create an effective skincare routine that works for your specific skin type and concerns. From cleansing to moisturizing, we cover all the essential steps.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    readMoreUrl: "https://example.com/skincare-routine-guide",
    content: `
      Creating an effective skincare routine is essential for maintaining healthy, glowing skin. Here's a comprehensive guide to help you build a routine that works for you:

      1. Cleansing
      Start with a gentle cleanser that matches your skin type. Cleanse twice daily to remove dirt, oil, and makeup.

      2. Toning
      Use a toner to balance your skin's pH and prepare it for the next steps. Look for alcohol-free formulations.

      3. Treatment Products
      Apply serums or treatments targeting specific concerns like acne, dark spots, or aging.

      4. Moisturizing
      Lock in hydration with a moisturizer suitable for your skin type. Don't skip this step, even if you have oily skin.

      5. Sun Protection
      Always finish your morning routine with sunscreen to protect against UV damage.
    `
  },
  {
    id: 2,
    title: "Understanding Different Skin Types and Their Needs",
    description: "Discover what makes your skin unique and learn how to identify your skin type. Get expert tips on caring for oily, dry, combination, or sensitive skin.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    readMoreUrl: "https://example.com/skin-types-guide",
    content: `
      Understanding your skin type is crucial for choosing the right skincare products and routine. Here's a detailed guide to different skin types:

      Oily Skin
      - Characterized by excess sebum production
      - Prone to acne and enlarged pores
      - Best treated with lightweight, non-comedogenic products

      Dry Skin
      - Lacks natural oils
      - May feel tight and show flaking
      - Requires rich, moisturizing products

      Combination Skin
      - Mixed areas of oily and dry skin
      - Usually oily in T-zone, dry on cheeks
      - Needs balanced care approach

      Sensitive Skin
      - Easily irritated
      - May react to common ingredients
      - Requires gentle, fragrance-free products
    `
  },
  {
    id: 3,
    title: "Natural Remedies for Common Skin Concerns",
    description: "Explore effective natural solutions for various skin issues. From acne to aging, find out how nature's ingredients can help improve your skin's health.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    readMoreUrl: "https://example.com/natural-skincare",
    content: `
      Natural remedies can be effective for treating various skin concerns. Here are some proven solutions:

      For Acne
      - Tea tree oil as a spot treatment
      - Honey masks for antibacterial benefits
      - Aloe vera for inflammation

      For Aging Skin
      - Green tea extracts for antioxidants
      - Coconut oil for hydration
      - Vitamin C-rich foods for collagen production

      For Dry Skin
      - Avocado masks
      - Oatmeal baths
      - Natural oils like jojoba and argan

      For Sensitive Skin
      - Chamomile tea compresses
      - Cucumber slices
      - Plain yogurt masks
    `
  },
  {
    id: 4,
    title: "The Science Behind Anti-Aging Skincare",
    description: "Dive deep into the scientific principles behind aging skin and discover evidence-based approaches to maintaining youthful, healthy skin.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    readMoreUrl: "https://example.com/anti-aging-science",
    content: `
      Understanding the science of skin aging helps us make better choices in skincare. Here's what you need to know:

      The Aging Process
      - Role of collagen and elastin
      - Impact of free radicals
      - Effects of UV exposure

      Key Anti-Aging Ingredients
      - Retinoids for cell turnover
      - Peptides for collagen production
      - Antioxidants for protection

      Preventive Measures
      - Daily sun protection
      - Proper hydration
      - Healthy lifestyle choices

      Advanced Treatments
      - Professional treatments
      - At-home devices
      - Combination approaches
    `
  }
];

const ReadMorePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container max-w-3xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
          <Button variant="ghost" onClick={() => navigate('/blogs')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>
          <p>Blog post not found.</p>
        </div>
        <NavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-3xl mx-auto py-12 px-4 md:py-16 md:px-0 pb-20 md:pb-12 md:ml-24">
        <Button variant="ghost" onClick={() => navigate('/blogs')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Button>
        
        <div className="space-y-6">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
          
          <h1 className="text-3xl font-bold">{post.title}</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default ReadMorePage;
