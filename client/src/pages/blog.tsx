import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import SEOHead from "@/components/seo-head";
import Navigation from "@/components/navigation";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // SEO structured data for blog listing page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Rotational Molding Blog - Roto Lighting",
    "description": "Expert insights, industry trends, and practical guidance for rotational molding professionals",
    "url": "https://rotationalmoldingpros.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Roto Lighting",
      "url": "https://rotationalmoldingpros.com"
    },
    "blogPost": posts?.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "url": `https://rotationalmoldingpros.com/blog/${post.slug}`,
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt || post.createdAt,
      "author": {
        "@type": "Organization",
        "name": "Roto Lighting"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Roto Lighting"
      },
      "keywords": post.keywords?.join(", "),
      "image": post.featuredImage
    })) || []
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80">
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Blog</h2>
          <p className="text-gray-600">There was an error loading the blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Rotational Molding Blog - Expert Insights & Industry Trends | Roto Lighting"
        description="Expert insights, industry trends, and practical guidance for rotational molding professionals. Learn about custom molding techniques, applications, and best practices."
        keywords={[
          "rotational molding blog",
          "rotomolding insights",
          "plastic manufacturing trends",
          "custom molding techniques",
          "industrial molding blog",
          "rotational molding industry",
          "molding best practices",
          "plastic fabrication insights"
        ]}
        canonicalUrl="https://rotationalmoldingpros.com/blog"
        structuredData={structuredData}
      />
      <Navigation />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rotational Molding Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights, industry trends, and practical guidance for rotational molding professionals
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-16">
        {!posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h2>
            <p className="text-gray-600">Check back soon for expert insights on rotational molding.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  {/* Date */}
                  <div className="text-sm text-gray-500 mb-3">
                    {post.createdAt && !isNaN(new Date(post.createdAt).getTime()) 
                      ? format(new Date(post.createdAt), "MMM dd, yyyy")
                      : "Date not available"
                    }
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-blue transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.metaDescription || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + "..."}
                  </p>
                  
                  {/* Read More Link */}
                  <Link href={`/blog/${post.slug}`}>
                    <div className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 transition-colors cursor-pointer text-sm font-medium">
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}