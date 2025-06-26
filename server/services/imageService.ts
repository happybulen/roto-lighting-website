export interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
  next_page?: string;
}

export async function searchPexelsImages(query: string, count: number = 3): Promise<PexelsPhoto[]> {
  if (!process.env.PEXELS_API_KEY) {
    console.warn("Pexels API key not configured");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count * 2}&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();
    
    // Filter out inappropriate images and return only the requested count
    const filteredPhotos = data.photos
      .filter(photo => {
        // Basic content filtering - exclude potentially inappropriate keywords
        const photographer = photo.photographer.toLowerCase();
        
        // Skip images with potentially inappropriate keywords
        const inappropriateKeywords = ['weed', 'joint', 'cannabis', 'marijuana', 'drug', 'smoking'];
        const hasInappropriate = inappropriateKeywords.some(keyword => 
          photographer.includes(keyword)
        );
        
        return !hasInappropriate;
      })
      .slice(0, count);
    
    return filteredPhotos;
  } catch (error) {
    console.error("Error fetching images from Pexels:", error);
    return [];
  }
}

export function getRotationalMoldingImageQueries(): string[] {
  // Highly curated list of safe, professional terms that consistently return good results
  return [
    "modern factory",
    "industrial building",
    "manufacturing plant", 
    "factory equipment",
    "industrial machinery",
    "production facility",
    "warehouse interior",
    "industrial workspace"
  ];
}

export async function getRandomRotationalMoldingImage(): Promise<PexelsPhoto | null> {
  const queries = getRotationalMoldingImageQueries();
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  
  const images = await searchPexelsImages(randomQuery, 1);
  return images.length > 0 ? images[0] : null;
}

export async function getImagesForBlogPost(keyword: string): Promise<{ heroImage: PexelsPhoto | null; contentImages: PexelsPhoto[] }> {
  // Always use safe, professional manufacturing images instead of searching by keyword
  const safeQueries = getRotationalMoldingImageQueries();
  
  // Get hero image from our curated list
  const randomHeroQuery = safeQueries[Math.floor(Math.random() * safeQueries.length)];
  const heroImages = await searchPexelsImages(randomHeroQuery, 1);
  const heroImage = heroImages.length > 0 ? heroImages[0] : null;

  // Get 2-3 additional content images from different queries
  const contentImages: PexelsPhoto[] = [];
  const shuffledQueries = [...safeQueries].sort(() => Math.random() - 0.5);
  
  for (const query of shuffledQueries.slice(0, 3)) {
    if (query === randomHeroQuery) continue; // Skip the hero image query
    
    const images = await searchPexelsImages(query, 1);
    if (images.length > 0) {
      contentImages.push(images[0]);
    }
  }

  return { heroImage, contentImages };
}