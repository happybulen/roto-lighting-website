#!/bin/bash

# Cloudflare Deployment Script for Roto Lighting

echo "🚀 Building Roto Lighting for Cloudflare deployment..."

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Create deployment package
echo "📁 Creating deployment package..."
cd dist/public

# Create a zip file for easy deployment
zip -r ../../roto-lighting-cloudflare.zip .

cd ../..

echo "✅ Deployment package created: roto-lighting-cloudflare.zip"
echo ""
echo "📋 Next steps:"
echo "1. Extract roto-lighting-cloudflare.zip"
echo "2. Upload the contents to Cloudflare Pages"
echo "3. Deploy your API server separately (see CLOUDFLARE_DEPLOYMENT.md)"
echo "4. Configure environment variables"
echo ""
echo "📖 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions"