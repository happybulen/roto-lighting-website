import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertEmailSubscriptionSchema, insertBlogPostSchema, insertAdminSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";
import { sendQuoteRequestEmail, sendEmailSubscriptionNotification } from "./email";
import { generateMultipleBlogPosts, getRandomRotationalMoldingKeyword, getAllRotationalMoldingKeywords } from "./services/contentGenerator";
import { generateSitemap, generateRobotsTxt } from "./services/sitemapService";
import bcrypt from "bcrypt";
import session from "express-session";

// Extend session interface
declare module "express-session" {
  interface SessionData {
    adminId?: number;
  }
}

// Simple auth middleware
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.session?.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Setup session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true
    }
  }));

  // Quote request endpoint
  app.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      
      // Save to database
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      
      // Send email notification to info@rotolighting.com
      try {
        await sendQuoteRequestEmail(validatedData);
        console.log("Quote request email sent successfully");
      } catch (emailError) {
        console.error("Failed to send quote request email:", emailError);
        // Continue with success response even if email fails
      }
      
      res.status(201).json(quoteRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating quote request:", error);
      res.status(500).json({ error: "Failed to create quote request" });
    }
  });

  // Admin endpoint to view quote requests
  app.get("/api/admin/quote-requests", (req, res, next) => {
    if (!req.session?.adminId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  }, async (req, res) => {
    try {
      const quoteRequests = await storage.getAllQuoteRequests();
      res.json(quoteRequests);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });

  // Email subscription endpoint
  app.post("/api/email-subscriptions", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Save to database
      const subscription = await storage.createEmailSubscription(validatedData);
      
      // Send email notification to info@rotolighting.com
      try {
        await sendEmailSubscriptionNotification(validatedData.email);
        console.log("Email subscription notification sent successfully");
      } catch (emailError) {
        console.error("Failed to send subscription notification:", emailError);
        // Continue with success response even if email fails
      }
      
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      // Handle duplicate email constraint
      if (error instanceof Error && error.message.includes("unique")) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      console.error("Error creating email subscription:", error);
      res.status(500).json({ error: "Failed to create email subscription" });
    }
  });

  // Get all quote requests (for admin purposes)
  app.get("/api/quote-requests", async (req, res) => {
    try {
      const quoteRequests = await storage.getAllQuoteRequests();
      res.json(quoteRequests);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });

  // Get all email subscriptions (for admin purposes)
  app.get("/api/email-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching email subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch email subscriptions" });
    }
  });

  // Blog posts endpoints (public)
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.adminId = admin.id;
      res.json({ success: true });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", requireAuth, (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Admin CMS endpoints
  app.get("/api/admin/keywords", requireAuth, (req, res) => {
    try {
      const keywords = getAllRotationalMoldingKeywords();
      res.json(keywords);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      res.status(500).json({ error: "Failed to fetch keywords" });
    }
  });

  app.get("/api/admin/random-keyword", requireAuth, (req, res) => {
    try {
      const keyword = getRandomRotationalMoldingKeyword();
      res.json(keyword);
    } catch (error) {
      console.error("Error generating random keyword:", error);
      res.status(500).json({ error: "Failed to generate random keyword" });
    }
  });

  app.get("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/generate-content", requireAuth, async (req, res) => {
    try {
      const { keywords, contentType, count } = req.body;
      
      if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ error: "Keywords array is required" });
      }

      if (!contentType || !["guide", "tips", "comparison", "howto"].includes(contentType)) {
        return res.status(400).json({ error: "Valid content type is required" });
      }

      if (!count || count < 1 || count > 20) {
        return res.status(400).json({ error: "Count must be between 1 and 20" });
      }

      const articles = await generateMultipleBlogPosts({
        keywords,
        contentType,
        count
      });

      // Save articles to database
      const savedArticles = [];
      for (const article of articles) {
        try {
          const blogPost = await storage.createBlogPost({
            title: article.title,
            slug: article.slug,
            content: article.content,
            metaDescription: article.metaDescription,
            keywords: article.keywords,
            contentType,
            published: true,
            featuredImage: article.featuredImage,
            heroImageUrl: article.heroImage?.url,
            heroImagePhotographer: article.heroImage?.photographer,
            heroImagePhotographerUrl: article.heroImage?.photographer_url
          });
          savedArticles.push(blogPost);
        } catch (error) {
          console.error("Failed to save article:", error);
        }
      }

      res.json(savedArticles);
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: "Failed to generate content" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }

      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // SEO Routes - Sitemap and Robots.txt
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/robots.txt", async (req, res) => {
    try {
      const robotsTxt = await generateRobotsTxt();
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.send(robotsTxt);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
