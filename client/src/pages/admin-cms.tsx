import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shuffle, Loader2, FileText, Settings, TrendingUp, Trash2, Mail, Phone, Building, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost, QuoteRequest } from "@shared/schema";

interface GeneratedArticle {
  title: string;
  content: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
}

export default function AdminCMS() {
  const [targetKeyword, setTargetKeyword] = useState("");
  const [contentType, setContentType] = useState<"guide" | "tips" | "comparison" | "howto">("guide");
  const [articleCount, setArticleCount] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [availableKeywords, setAvailableKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiRequest("GET", "/api/admin/keywords");
        setIsAuthenticated(true);
        setAuthChecking(false);
      } catch (error) {
        console.log("Authentication failed, redirecting to login");
        window.location.href = "/login";
      }
    };
    checkAuth();
  }, []);

  // Fetch available keywords only when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const fetchKeywords = async () => {
      try {
        const res = await apiRequest("GET", "/api/admin/keywords");
        const keywords = await res.json();
        setAvailableKeywords(keywords);
      } catch (error) {
        console.error("Failed to fetch keywords:", error);
      }
    };
    fetchKeywords();
  }, [isAuthenticated]);

  // Fetch blog posts only when authenticated
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
    enabled: isAuthenticated,
  });

  // Generate random keyword
  const generateRandomKeyword = async () => {
    try {
      const res = await apiRequest("GET", "/api/admin/random-keyword");
      const keyword = await res.json();
      setTargetKeyword(keyword);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate random keyword",
        variant: "destructive",
      });
    }
  };

  // Add keyword to selected list
  const addKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  // Remove keyword from selected list
  const removeKeyword = (keyword: string) => {
    setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
  };

  // Generate content mutation
  const generateContentMutation = useMutation({
    mutationFn: async () => {
      setIsGenerating(true);
      const keywords = selectedKeywords.length > 0 ? selectedKeywords : [targetKeyword];
      
      const res = await apiRequest("POST", "/api/admin/generate-content", {
        keywords,
        contentType,
        count: articleCount,
      });
      
      return await res.json();
    },
    onSuccess: (data) => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: `Generated ${data.length} article(s) successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      setSelectedKeywords([]);
      setTargetKeyword("");
    },
    onError: (error) => {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/blog-posts/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error instanceof Error ? error.message : "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  // Show loading while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
          <p className="text-gray-600 mt-2">Generate AI-powered blog content about rotational molding</p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="published">Published Posts</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Generate Content Tab */}
          <TabsContent value="generate">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Generate New Content
                  </CardTitle>
                  <CardDescription>
                    Create SEO-optimized articles about rotational molding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Target Keyword */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="keyword">Target Keyword</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateRandomKeyword}
                        className="text-xs"
                      >
                        <Shuffle className="h-3 w-3 mr-1" />
                        Random
                      </Button>
                    </div>
                    <Input
                      id="keyword"
                      placeholder="e.g., rotational molding process"
                      value={targetKeyword}
                      onChange={(e) => setTargetKeyword(e.target.value)}
                    />
                    {targetKeyword && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addKeyword(targetKeyword)}
                        className="mt-2"
                      >
                        Add to Selected Keywords
                      </Button>
                    )}
                  </div>

                  {/* Selected Keywords */}
                  {selectedKeywords.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Keywords</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedKeywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeKeyword(keyword)}
                          >
                            {keyword} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Type */}
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Complete Guide</SelectItem>
                        <SelectItem value="tips">Tips & Best Practices</SelectItem>
                        <SelectItem value="comparison">Comparison Article</SelectItem>
                        <SelectItem value="howto">How-To Guide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Articles */}
                  <div className="space-y-2">
                    <Label>Number of Articles</Label>
                    <Select value={articleCount.toString()} onValueChange={(value) => setArticleCount(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Article</SelectItem>
                        <SelectItem value="5">5 Articles</SelectItem>
                        <SelectItem value="10">10 Articles</SelectItem>
                        <SelectItem value="15">15 Articles</SelectItem>
                        <SelectItem value="20">20 Articles</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Each article includes 10-15 relevant tags and unique Pexels images
                    </p>
                  </div>

                  <Button
                    onClick={() => generateContentMutation.mutate()}
                    disabled={isGenerating || (!targetKeyword && selectedKeywords.length === 0)}
                    className="w-full bg-primary-blue hover:bg-primary-blue/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Content...
                      </>
                    ) : (
                      "Generate Content"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Suggested Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Keywords</CardTitle>
                  <CardDescription>Click to select rotational molding keywords</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 max-h-96 overflow-y-auto">
                    {availableKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary-blue hover:text-white transition-colors"
                        onClick={() => addKeyword(keyword)}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Published Posts Tab */}
          <TabsContent value="published">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Published Posts
                </CardTitle>
                <CardDescription>Manage your published blog content</CardDescription>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading posts...</p>
                  </div>
                ) : !posts || posts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No blog posts yet. Generate some content to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{post.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{post.metaDescription}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Published: {new Date(post.createdAt!).toLocaleDateString()}</span>
                            <span>Type: {post.contentType}</span>
                            <span>Keywords: {post.keywords?.length || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deletePostMutation.mutate(post.id)}
                            disabled={deletePostMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Available Keywords</CardTitle>
                <CardDescription>All rotational molding keywords available for content generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="justify-center py-2">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  CMS Settings
                </CardTitle>
                <CardDescription>Configure your content management system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">AI Model Information</h3>
                  <p className="text-blue-800 text-sm">
                    Using GPT-4o (OpenAI's latest model released May 13, 2024) for content generation
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Content Quality Features</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Human tone avoiding corporate jargon</li>
                    <li>• SEO-optimized with keyword targeting</li>
                    <li>• Industry-specific rotational molding expertise</li>
                    <li>• Automatic publishing and meta descriptions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}