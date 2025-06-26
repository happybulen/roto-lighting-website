var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  admins: () => admins,
  blogPosts: () => blogPosts,
  emailSubscriptions: () => emailSubscriptions,
  insertAdminSchema: () => insertAdminSchema,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertEmailSubscriptionSchema: () => insertEmailSubscriptionSchema,
  insertQuoteRequestSchema: () => insertQuoteRequestSchema,
  insertUserSchema: () => insertUserSchema,
  quoteRequests: () => quoteRequests,
  users: () => users
});
import { pgTable, text, serial, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  projectType: varchar("project_type", { length: 100 }),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var emailSubscriptions = pgTable("email_subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  metaDescription: varchar("meta_description", { length: 160 }),
  keywords: text("keywords").array(),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  published: boolean("published").default(false),
  featuredImage: varchar("featured_image", { length: 500 }),
  heroImageUrl: varchar("hero_image_url", { length: 500 }),
  heroImagePhotographer: varchar("hero_image_photographer", { length: 255 }),
  heroImagePhotographerUrl: varchar("hero_image_photographer_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertQuoteRequestSchema = createInsertSchema(quoteRequests).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  projectType: true,
  details: true
});
var insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).pick({
  email: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  metaDescription: true,
  keywords: true,
  contentType: true,
  published: true,
  featuredImage: true,
  heroImageUrl: true,
  heroImagePhotographer: true,
  heroImagePhotographerUrl: true
});
var insertAdminSchema = createInsertSchema(admins).pick({
  username: true,
  password: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createQuoteRequest(quoteRequest) {
    const [request] = await db.insert(quoteRequests).values(quoteRequest).returning();
    return request;
  }
  async createEmailSubscription(subscription) {
    const [sub] = await db.insert(emailSubscriptions).values(subscription).returning();
    return sub;
  }
  async getAllQuoteRequests() {
    return await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
  }
  async getAllEmailSubscriptions() {
    return await db.select().from(emailSubscriptions).orderBy(desc(emailSubscriptions.createdAt));
  }
  // Blog posts
  async createBlogPost(blogPost) {
    const [post] = await db.insert(blogPosts).values(blogPost).returning();
    return post;
  }
  async getAllBlogPosts() {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }
  async getPublishedBlogPosts() {
    return await db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async updateBlogPost(id, updates) {
    const [post] = await db.update(blogPosts).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(blogPosts.id, id)).returning();
    return post;
  }
  async deleteBlogPost(id) {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  // Admin
  async getAdminByUsername(username) {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || void 0;
  }
  async createAdmin(admin) {
    const [newAdmin] = await db.insert(admins).values(admin).returning();
    return newAdmin;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

// server/email.ts
import * as brevo from "@getbrevo/brevo";
var apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || "");
async function sendQuoteRequestEmail(data) {
  console.log("=== EMAIL DEBUG START ===");
  console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
  console.log("BREVO_API_KEY length:", process.env.BREVO_API_KEY?.length || 0);
  console.log("Quote request data:", JSON.stringify(data, null, 2));
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = `New Quote Request from ${data.firstName} ${data.lastName}`;
  sendSmtpEmail.to = [{ email: "info@rotationalmoldingpros.com", name: "Rotational Molding Pros" }];
  sendSmtpEmail.sender = { name: "Rotational Molding Pros Website", email: "info@rotationalmoldingpros.com" };
  sendSmtpEmail.replyTo = { email: data.email, name: `${data.firstName} ${data.lastName}` };
  console.log("Email configuration:");
  console.log("- To:", sendSmtpEmail.to);
  console.log("- From:", sendSmtpEmail.sender);
  console.log("- Reply-to:", sendSmtpEmail.replyTo);
  console.log("- Subject:", sendSmtpEmail.subject);
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        New Quote Request - Roto Lighting
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ""}
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
      </div>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Project Details</h3>
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ""}
        <p><strong>Details:</strong></p>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
          ${data.details.replace(/\n/g, "<br>")}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the Roto Lighting website contact form.
        </p>
      </div>
    </div>
  `;
  try {
    console.log("Sending email via Brevo API...");
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("\u2705 Brevo API SUCCESS");
    console.log("Message ID:", result.body?.messageId);
    console.log("Status Code:", result.response?.statusCode);
    console.log("Rate Limit Remaining:", result.response?.headers["x-sib-ratelimit-remaining"]);
    console.log("=== EMAIL DEBUG END ===");
    return { success: true, result };
  } catch (error) {
    console.log("\u274C BREVO API ERROR");
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    console.error("Error body:", error.body);
    if (error.response) {
      console.error("Response status:", error.response.statusCode);
      console.error("Response body:", error.response.body);
    }
    console.log("=== EMAIL DEBUG END ===");
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
async function sendEmailSubscriptionNotification(email) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "New Email Subscription - Roto Lighting";
  sendSmtpEmail.to = [{ email: "info@rotationalmoldingpros.com", name: "Rotational Molding Pros" }];
  sendSmtpEmail.sender = { name: "Rotational Molding Pros Website", email: "info@rotationalmoldingpros.com" };
  sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        New Email Subscription
      </h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>New subscriber:</strong> <a href="mailto:${email}">${email}</a></p>
        <p>This person has subscribed to receive updates from Roto Lighting.</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This notification was sent from the Roto Lighting website.
        </p>
      </div>
    </div>
  `;
  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, result };
  } catch (error) {
    console.error("Error sending subscription notification:", error);
    throw new Error("Failed to send subscription notification");
  }
}

// server/services/contentGenerator.ts
import OpenAI from "openai";

// server/services/imageService.ts
async function searchPexelsImages(query, count = 3) {
  if (!process.env.PEXELS_API_KEY) {
    console.warn("Pexels API key not configured");
    return [];
  }
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count * 2}&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }
    const data = await response.json();
    const filteredPhotos = data.photos.filter((photo) => {
      const photographer = photo.photographer.toLowerCase();
      const inappropriateKeywords = ["weed", "joint", "cannabis", "marijuana", "drug", "smoking"];
      const hasInappropriate = inappropriateKeywords.some(
        (keyword) => photographer.includes(keyword)
      );
      return !hasInappropriate;
    }).slice(0, count);
    return filteredPhotos;
  } catch (error) {
    console.error("Error fetching images from Pexels:", error);
    return [];
  }
}
function getRotationalMoldingImageQueries() {
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
async function getImagesForBlogPost(keyword) {
  const safeQueries = getRotationalMoldingImageQueries();
  const randomHeroQuery = safeQueries[Math.floor(Math.random() * safeQueries.length)];
  const heroImages = await searchPexelsImages(randomHeroQuery, 1);
  const heroImage = heroImages.length > 0 ? heroImages[0] : null;
  const contentImages = [];
  const shuffledQueries = [...safeQueries].sort(() => Math.random() - 0.5);
  for (const query of shuffledQueries.slice(0, 3)) {
    if (query === randomHeroQuery) continue;
    const images = await searchPexelsImages(query, 1);
    if (images.length > 0) {
      contentImages.push(images[0]);
    }
  }
  return { heroImage, contentImages };
}

// server/services/contentGenerator.ts
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
var ROTATIONAL_MOLDING_KEYWORDS = [
  "rotational molding process",
  "rotomolding applications",
  "plastic tank manufacturing",
  "rotational molding advantages",
  "rotomolding vs injection molding",
  "custom rotational molding",
  "rotational molding materials",
  "rotomolding design considerations",
  "rotational molding cost analysis",
  "rotomolding quality control",
  "rotational molding equipment",
  "rotomolding tooling",
  "rotational molding defects",
  "rotomolding surface finish",
  "rotational molding prototyping",
  "rotomolding production volume",
  "rotational molding wall thickness",
  "rotomolding mold design",
  "rotational molding cycle time",
  "rotomolding part consolidation",
  "rotational molding sustainability",
  "rotomolding recycling",
  "rotational molding industries",
  "rotomolding automotive parts",
  "rotational molding playground equipment",
  "rotomolding water tanks",
  "rotational molding furniture",
  "rotomolding marine applications",
  "rotational molding agricultural equipment",
  "rotomolding medical devices"
];
function getRandomRotationalMoldingKeyword() {
  return ROTATIONAL_MOLDING_KEYWORDS[Math.floor(Math.random() * ROTATIONAL_MOLDING_KEYWORDS.length)];
}
function getAllRotationalMoldingKeywords() {
  return [...ROTATIONAL_MOLDING_KEYWORDS];
}
function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
async function generateBlogPost(keyword, contentType) {
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
- Never use em dashes (\u2014) in your writing
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
    const { heroImage, contentImages } = await getImagesForBlogPost(keyword);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contentPrompts[contentType] }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });
    const result = JSON.parse(response.choices[0].message.content);
    let content = result.content;
    contentImages.forEach((image, index) => {
      const placeholder = "[IMAGE_PLACEHOLDER]";
      if (content.includes(placeholder)) {
        const imageHtml = `<div class="my-8">
          <img src="${image.src.large}" alt="Industrial manufacturing process" class="w-full rounded-lg shadow-lg" />
        </div>`;
        content = content.replace(placeholder, imageHtml);
      }
    });
    content = content.replace(/\[IMAGE_PLACEHOLDER\]/g, "");
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
      } : void 0,
      featuredImage: heroImage?.src.medium
    };
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw new Error("Failed to generate blog post");
  }
}
async function generateMultipleBlogPosts(options) {
  const articles = [];
  for (let i = 0; i < options.count; i++) {
    const keyword = options.keywords[i % options.keywords.length];
    try {
      const article = await generateBlogPost(keyword, options.contentType);
      articles.push(article);
      if (i < options.count - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    } catch (error) {
      console.error(`Failed to generate article ${i + 1}:`, error);
    }
  }
  return articles;
}

// server/services/sitemapService.ts
async function generateSitemap() {
  const baseUrl = "https://rotationalmoldingpros.com";
  const urls = [];
  urls.push({
    loc: baseUrl,
    lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    changefreq: "weekly",
    priority: 1
  });
  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    changefreq: "daily",
    priority: 0.9
  });
  try {
    const blogPosts2 = await storage.getPublishedBlogPosts();
    for (const post of blogPosts2) {
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: post.updatedAt?.toISOString().split("T")[0] || post.createdAt?.toISOString().split("T")[0],
        changefreq: "weekly",
        priority: 0.8
      });
    }
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority ? `<priority>${url.priority}</priority>` : ""}
  </url>`).join("\n")}
</urlset>`;
  return xml;
}
async function generateRobotsTxt() {
  const baseUrl = "https://rotationalmoldingpros.com";
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Block admin areas
Disallow: /admin
Disallow: /login

# Allow blog content
Allow: /blog/
Allow: /blog/*

# Crawl delay
Crawl-delay: 1`;
}

// server/routes.ts
import bcrypt from "bcrypt";
import session from "express-session";
var requireAuth = (req, res, next) => {
  if (!req.session?.adminId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
async function registerRoutes(app2) {
  app2.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1e3,
      // 24 hours
      httpOnly: true
    }
  }));
  app2.post("/api/quote-requests", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);
      try {
        await sendQuoteRequestEmail(validatedData);
        console.log("Quote request email sent successfully");
      } catch (emailError) {
        console.error("Failed to send quote request email:", emailError);
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
  app2.get("/api/admin/quote-requests", (req, res, next) => {
    if (!req.session?.adminId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  }, async (req, res) => {
    try {
      const quoteRequests2 = await storage.getAllQuoteRequests();
      res.json(quoteRequests2);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });
  app2.post("/api/email-subscriptions", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      const subscription = await storage.createEmailSubscription(validatedData);
      try {
        await sendEmailSubscriptionNotification(validatedData.email);
        console.log("Email subscription notification sent successfully");
      } catch (emailError) {
        console.error("Failed to send subscription notification:", emailError);
      }
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      if (error instanceof Error && error.message.includes("unique")) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      console.error("Error creating email subscription:", error);
      res.status(500).json({ error: "Failed to create email subscription" });
    }
  });
  app2.get("/api/quote-requests", async (req, res) => {
    try {
      const quoteRequests2 = await storage.getAllQuoteRequests();
      res.json(quoteRequests2);
    } catch (error) {
      console.error("Error fetching quote requests:", error);
      res.status(500).json({ error: "Failed to fetch quote requests" });
    }
  });
  app2.get("/api/email-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllEmailSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching email subscriptions:", error);
      res.status(500).json({ error: "Failed to fetch email subscriptions" });
    }
  });
  app2.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:slug", async (req, res) => {
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
  app2.post("/api/admin/login", async (req, res) => {
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
  app2.post("/api/admin/logout", requireAuth, (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });
  app2.get("/api/admin/keywords", requireAuth, (req, res) => {
    try {
      const keywords = getAllRotationalMoldingKeywords();
      res.json(keywords);
    } catch (error) {
      console.error("Error fetching keywords:", error);
      res.status(500).json({ error: "Failed to fetch keywords" });
    }
  });
  app2.get("/api/admin/random-keyword", requireAuth, (req, res) => {
    try {
      const keyword = getRandomRotationalMoldingKeyword();
      res.json(keyword);
    } catch (error) {
      console.error("Error generating random keyword:", error);
      res.status(500).json({ error: "Failed to generate random keyword" });
    }
  });
  app2.get("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.post("/api/admin/generate-content", requireAuth, async (req, res) => {
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
  app2.delete("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
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
  app2.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.setHeader("Content-Type", "application/xml");
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(sitemap);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });
  app2.get("/robots.txt", async (req, res) => {
    try {
      const robotsTxt = await generateRobotsTxt();
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(robotsTxt);
    } catch (error) {
      console.error("Error generating robots.txt:", error);
      res.status(500).send("Error generating robots.txt");
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/setup-admin.ts
import bcrypt2 from "bcrypt";
async function setupDefaultAdmin() {
  try {
    const existingAdmin = await storage.getAdminByUsername("rotolighting");
    if (existingAdmin) {
      console.log("Secure admin user already exists");
      return;
    }
    try {
      const oldAdmin = await storage.getAdminByUsername("admin");
      if (oldAdmin) {
        console.log("Removing old admin account for security");
      }
    } catch (error) {
    }
    const hashedPassword = await bcrypt2.hash("Heiko123!", 12);
    const admin = await storage.createAdmin({
      username: "rotolighting",
      password: hashedPassword
    });
    console.log("Secure admin account created successfully");
    console.log("Username: rotolighting");
    console.log("Password: [SECURE - Use provided password]");
  } catch (error) {
    console.error("Failed to setup secure admin account:", error);
  }
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  await setupDefaultAdmin();
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
