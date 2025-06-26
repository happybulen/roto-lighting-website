import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import SEOHead from "@/components/seo-head";
import Navigation from "@/components/navigation";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${slug}`],
    enabled: !!slug,
  });

  // Generate structured data for the blog post
  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "url": `https://rotationalmoldingpros.com/blog/${post.slug}`,
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "author": {
      "@type": "Organization",
      "name": "Roto Lighting",
      "url": "https://rotationalmoldingpros.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Roto Lighting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rotationalmoldingpros.com/logo.png"
      }
    },
    "image": post.featuredImage ? {
      "@type": "ImageObject",
      "url": post.featuredImage
    } : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rotationalmoldingpros.com/blog/${post.slug}`
    },
    "keywords": post.keywords?.join(", "),
    "articleSection": "Rotational Molding",
    "inLanguage": "en-US"
  } : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-full mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.metaDescription || post.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${post.title} | Roto Lighting Blog`}
        description={post.metaDescription || post.title}
        keywords={post.keywords || ["rotational molding", "rotomolding", "custom manufacturing"]}
        canonicalUrl={`https://rotationalmoldingpros.com/blog/${post.slug}`}
        ogImage={post.featuredImage ?? post.heroImageUrl ?? undefined}
        ogType="article"
        articleData={{
          publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
          modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
          author: "Roto Lighting",
          section: "Rotational Molding",
          tags: post.keywords ?? undefined
        }}
        structuredData={structuredData}
      />
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {post.heroImageUrl && (
            <div className="mb-8">
              <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={post.heroImageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.createdAt && !isNaN(new Date(post.createdAt).getTime()) 
                    ? format(new Date(post.createdAt), "MMMM dd, yyyy")
                    : "Date not available"
                  }
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.content ? Math.ceil(post.content.replace(/<[^>]*>/g, '').length / 1000) : 0} min read
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Keywords */}
            {post.keywords && post.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-blue prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Content not available</p>' }}
          />
        </article>

        {/* Back to Blog CTA */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Explore More Articles
            </h3>
            <Link href="/blog">
              <Button className="bg-primary-blue hover:bg-primary-blue/90">
                View All Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}