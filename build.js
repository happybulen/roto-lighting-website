#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🏗️  Building Roto Lighting website...');

try {
  // Build frontend
  console.log('📦 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Build backend
  console.log('⚙️  Building backend...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Verify builds
  if (existsSync('dist/public') && existsSync('dist/index.js')) {
    console.log('✅ Build completed successfully!');
  } else {
    throw new Error('Build verification failed');
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}