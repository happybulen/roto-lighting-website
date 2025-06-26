import OpenAI from "openai";
import { getImagesForBlogPost, type PexelsPhoto } from "./imageService";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface GeneratedArticle {
  title: string;
  content: string;
  metaDescription: string;
  slug: string;
  keywords: string[];
  heroImage?: {
    url: string;
    photographer: string;
    photographer_url: string;
  };
  featuredImage?: string;
}

export interface ContentGenerationOptions {
  keywords: string[];
  contentType: 'guide' | 'tips' | 'comparison' | 'howto';
  count: number;
}

const ROTATIONAL_MOLDING_KEYWORDS = [
  'rotational molding process',
  'rotomolding applications',
  'plastic tank manufacturing',
  'rotational molding advantages',
  'rotomolding vs injection molding',
  'custom rotational molding',
  'rotational molding materials',
  'rotomolding design considerations',
  'rotational molding cost analysis',
  'rotomolding quality control',
  'rotational molding equipment',
  'rotomolding tooling',
  'rotational molding defects',
  'rotomolding surface finish',
  'rotational molding prototyping',
  'rotomolding production volume',
  'rotational molding wall thickness',
  'rotomolding mold design',
  'rotational molding cycle time',
  'rotomolding part consolidation',
  'rotational molding sustainability',
  'rotomolding recycling',
  'rotational molding industries',
  'rotomolding automotive parts',
  'rotational molding playground equipment',
  'rotomolding water tanks',
  'rotational molding furniture',
  'rotomolding marine applications',
  'rotational molding agricultural equipment',
  'rotomolding medical devices'
];

export function getRandomRotationalMoldingKeyword(): string {
  return ROTATIONAL_MOLDING_KEYWORDS[Math.floor(Math.random() * ROTATIONAL_MOLDING_KEYWORDS.length)];
}

export function getAllRotationalMoldingKeywords(): string[] {
  return [...ROTATIONAL_MOLDING_KEYWORDS];
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function generateBlogPost(
  keyword: string,
  contentType: 'guide' | 'tips' | 'comparison' | 'howto'
): Promise<GeneratedArticle> {
  const systemPrompt = `You are an expert SEO content writer specializing in rotational molding and manufacturing. Create comprehensive, search-engine-optimized blog articles that rank well while providing exceptional value to readers seeking rotational molding services.

SEO Content Guidelines:
- Include target keywords naturally in title, first paragraph, headings, and throughout content
- Use semantic keywords and LSI terms for topical relevance
- Structure content for featured snippets with clear, concise answers
- Address search intent and common customer questions
- Create compelling meta descriptions that improve click-through rates
- Optimize content length for competitive keywords (1800-2500 words)
- Include internal linking opportunities to related topics

Content Structure:
- Hook readers with value-driven introductions
- Use descriptive H2/H3 headings with long-tail keywords
- Include FAQ sections optimized for voice search
- Add numbered lists and step-by-step processes
- Incorporate relevant statistics and industry insights
- End with strong calls-to-action
- Include [IMAGE_PLACEHOLDER] markers for visual content

Technical Requirements:
- Never use em dashes (—) in your writing
- Use HTML formatting (h2, h3, p, ul, li, strong tags)
- Include specific technical details that demonstrate expertise
- Address pain points and provide actionable solutions
- Write for both technical professionals and decision-makers
- Maintain E-A-T (Expertise, Authority, Trustworthiness) principles

Output Format: Respond with valid JSON containing:
- title: SEO-optimized with target keyword (under 60 characters)
- content: Complete HTML-formatted article with proper structure
- metaDescription: Compelling 150-160 character description with keyword
- keywords: Array of 8-12 relevant SEO keywords including long-tail variations`;

  const contentPrompts = {
    guide: `Write a comprehensive, SEO-optimized guide about "${keyword}" for rotational molding. Include target keyword in title and first paragraph. Add step-by-step processes, best practices, expert insights, and FAQ section. Use semantic keywords naturally. Structure with H2/H3 headings optimized for featured snippets. Include 2-3 [IMAGE_PLACEHOLDER] markers. Target 1800-2500 words for optimal SEO performance.`,
    tips: `Create a practical, SEO-optimized tips article about "${keyword}" in rotational molding. Include target keyword in title and introduction. Provide 10-12 actionable tips with detailed explanations and real-world examples. Address common pain points and solutions. Structure with numbered headings for featured snippets. Include 2-3 [IMAGE_PLACEHOLDER] markers. Target 1500-2000 words.`,
    comparison: `Write a detailed, SEO-optimized comparison article involving "${keyword}" in rotational molding. Include target keyword in title and first paragraph. Compare different approaches, materials, methods, or solutions with pros/cons analysis. Include decision-making criteria and recommendations. Structure with clear comparison sections and summary table format. Include 2-3 [IMAGE_PLACEHOLDER] markers. Target 1800-2500 words.`,
    howto: `Create a comprehensive, SEO-optimized how-to article about "${keyword}" in rotational molding. Include target keyword in title and introduction. Provide clear step-by-step instructions, required tools/materials, troubleshooting tips, and success metrics. Address common questions and mistakes. Structure with numbered steps for featured snippets. Include 2-3 [IMAGE_PLACEHOLDER] markers. Target 1500-2000 words.`
  };

  try {
    // Get images for the blog post
    const { heroImage, contentImages } = await getImagesForBlogPost(keyword);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contentPrompts[contentType] }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content!);
    
    // Replace image placeholders with actual images
    let content = result.content;
    contentImages.forEach((image, index) => {
      const placeholder = '[IMAGE_PLACEHOLDER]';
      if (content.includes(placeholder)) {
        const imageHtml = `<div class="my-8">
          <img src="${image.src.large}" alt="Industrial manufacturing process" class="w-full rounded-lg shadow-lg" />
        </div>`;
        content = content.replace(placeholder, imageHtml);
      }
    });

    // Remove any remaining IMAGE_PLACEHOLDER text that wasn't replaced
    content = content.replace(/\[IMAGE_PLACEHOLDER\]/g, '');
    
    return {
      title: result.title,
      content,
      metaDescription: result.metaDescription,
      slug: createSlug(result.title),
      keywords: Array.isArray(result.keywords) ? result.keywords : [keyword],
      heroImage: heroImage ? {
        url: heroImage.src.large,
        photographer: heroImage.photographer,
        photographer_url: heroImage.photographer_url
      } : undefined,
      featuredImage: heroImage?.src.medium
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post');
  }
}

export async function generateMultipleBlogPosts(
  options: ContentGenerationOptions
): Promise<GeneratedArticle[]> {
  const articles: GeneratedArticle[] = [];
  
  for (let i = 0; i < options.count; i++) {
    const keyword = options.keywords[i % options.keywords.length];
    try {
      const article = await generateBlogPost(keyword, options.contentType);
      articles.push(article);
      
      // Add delay between requests to avoid rate limiting
      if (i < options.count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to generate article ${i + 1}:`, error);
      // Continue with other articles
    }
  }
  
  return articles;
}