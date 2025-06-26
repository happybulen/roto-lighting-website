# Roto Lighting Website - System Architecture

## Overview

This is a modern full-stack web application for Roto Lighting, a custom rotational molding services company. The application features a React frontend with TypeScript, Express.js backend, and includes a comprehensive design system using shadcn/ui components. The project now includes an AI-powered content management system (CMS) for generating SEO-optimized blog content about rotational molding using GPT-4o. The application is configured for deployment on Replit with PostgreSQL database support.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation (configured but not yet implemented)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database serverless PostgreSQL
- **Build Tool**: esbuild for server-side bundling
- **Development**: tsx for TypeScript execution in development

### Design System
- **Component Library**: Comprehensive shadcn/ui implementation
- **Theme**: Custom "new-york" style with neutral base colors
- **Typography**: Inter font family
- **Icons**: Lucide React icons
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Blog Posts Table**: AI-generated content with SEO optimization features
- **Admin Table**: Secure admin authentication for CMS access
- **Quote Requests & Email Subscriptions**: Customer interaction tracking
- **Schema Location**: `shared/schema.ts` using Drizzle ORM
- **Validation**: Zod schemas for type-safe data validation

### Storage Layer
- **Interface**: IStorage interface defining CRUD operations
- **Implementation**: DatabaseStorage using PostgreSQL with Drizzle ORM
- **Methods**: User management, quote request handling, email subscription management
- **Database Tables**: users, quote_requests, email_subscriptions

### Frontend Pages
- **Home Page**: Single-page application with multiple sections
  - Navigation with smooth scrolling and blog link
  - Hero section with email capture
  - Services showcase
  - Experience/statistics section
  - Products/applications section
  - Contact form with quote requests
  - Footer with social links and legal pages
- **Blog System**: SEO-optimized content display
  - Blog listing page with search and filtering
  - Individual blog post pages with social sharing
  - Responsive design with reading time estimates
- **Admin CMS**: AI-powered content generation system
  - Secure admin login at /login (admin/admin123)
  - Multi-tab interface for content management
  - Bulk article generation (1, 5, 10, 15, 20 articles)
  - Long-tail keyword selection and random generation
  - GPT-4o integration for high-quality content
- **Legal Pages**: Privacy policy and terms of service popup

### API Structure
- **Routes**: Centralized in `server/routes.ts` (currently empty, ready for implementation)
- **Middleware**: Request logging and error handling
- **Development**: Vite integration for hot module replacement

## Data Flow

1. **Frontend**: React components manage local state and UI interactions
2. **API Communication**: TanStack Query handles server requests with caching
3. **Backend**: Express routes process requests and interact with storage
4. **Database**: Drizzle ORM provides type-safe database operations
5. **Storage**: IStorage interface abstracts data persistence layer

## External Dependencies

### Production Dependencies
- **UI/UX**: Radix UI primitives, Tailwind CSS, Lucide icons
- **Database**: Neon Database serverless, Drizzle ORM
- **Forms**: React Hook Form, Zod validation
- **State**: TanStack Query for server state
- **Utilities**: Class variance authority, clsx, date-fns

### Development Dependencies
- **Build Tools**: Vite, esbuild, TypeScript
- **Replit Integration**: Runtime error overlay, cartographer plugin

## Deployment Strategy

### Replit Configuration
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development**: `npm run dev` starts both frontend and backend
- **Production Build**: Vite builds frontend, esbuild bundles backend
- **Deployment**: Autoscale deployment target
- **Port Configuration**: Internal port 5000, external port 80

### Environment Setup
- **Database**: Requires `DATABASE_URL` environment variable
- **Build Process**: Frontend builds to `dist/public`, backend to `dist/`
- **Static Assets**: Served through Vite in development, Express in production

## SEO Optimization Features

### Comprehensive SEO Implementation
- **Dynamic Meta Tags**: SEOHead component for dynamic title, description, and keywords per page
- **Open Graph & Twitter Cards**: Full social media optimization for better sharing
- **Structured Data**: JSON-LD schema markup for organization, services, and blog posts
- **Canonical URLs**: Proper canonical link management across all pages
- **Sitemap Generation**: Automatic XML sitemap including all blog content at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots.txt with proper crawling directives at `/robots.txt`

### Blog SEO Features
- **Article Schema**: Comprehensive structured data for each blog post
- **Meta Optimization**: Unique titles, descriptions, and keywords for each article
- **Featured Snippets**: Content structured for Google featured snippets
- **Internal Linking**: Strategic internal linking opportunities
- **Image SEO**: Optimized alt tags and image integration via Pexels API

### Content Generation SEO
- **Keyword Optimization**: AI-generated content with natural keyword integration
- **Long-tail Keywords**: Semantic keyword inclusion for better search coverage
- **Content Length**: Optimized 1800-2500 word articles for competitive keywords
- **E-A-T Principles**: Content demonstrates Expertise, Authority, and Trustworthiness
- **Search Intent**: Content addresses specific user search intents and questions

## Changelog

```
Changelog:
- June 26, 2025. Initial setup with React frontend and Express backend
- June 26, 2025. Added PostgreSQL database with Drizzle ORM integration
- June 26, 2025. Implemented quote requests and email subscriptions database schema
- June 26, 2025. Created API endpoints for quote submissions and email collection
- June 26, 2025. Updated storage layer from in-memory to database-backed persistence
- June 26, 2025. Updated display email addresses to info@rotationalmoldingpros.com
- June 26, 2025. Implemented AI-powered CMS system with GPT-4o integration
- June 26, 2025. Added blog functionality with SEO-optimized content display
- June 26, 2025. Created admin authentication system with secure login
- June 26, 2025. Built content generation engine with 30+ rotational molding keywords
- June 26, 2025. Added privacy policy and terms of service popup system
- June 26, 2025. Integrated navigation links for blog and admin access
- June 26, 2025. Implemented comprehensive SEO optimization across entire website
- June 26, 2025. Added automatic sitemap generation with blog content integration
- June 26, 2025. Enhanced content generation with advanced SEO optimization features
- June 26, 2025. Completed structured data implementation for all page types
- June 26, 2025. Updated admin credentials to secure login (rotolighting/Heiko123!)
- June 26, 2025. Enhanced security with bcrypt 12-round password hashing
- June 26, 2025. Fixed admin authentication system and added proper session management
- June 26, 2025. Updated Pexels image search to use actual rotationally molded products
- June 26, 2025. Fixed blog post date formatting and content display errors
- June 26, 2025. Corrected query key format for individual blog post fetching
- June 26, 2025. Removed Pexels attribution text from all images per user request
- June 26, 2025. Fixed IMAGE_PLACEHOLDER issue in generated content
- June 26, 2025. Completely revamped image search with curated professional terms
- June 26, 2025. Prepared project for Cloudflare hosting deployment
- June 26, 2025. Created deployment documentation and configuration files
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```