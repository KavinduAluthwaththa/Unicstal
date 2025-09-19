# UNICSTAL - Next.js Crystal E-commerce Platform

## Overview

Your HTML/CSS/JS crystal e-commerce site has been successfully converted to a modern Next.js React application! This new version provides:

- **Dynamic Content Management**: Easily customizable crystal and blog data
- **Component-Based Architecture**: Reusable React components for better maintainability
- **Modern Animations**: Framer Motion and GSAP for smooth interactions
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimization**: Built-in Next.js SEO features
- **Type Safety**: Full TypeScript support

## 🚀 Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd unicstal-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
unicstal-nextjs/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ManifestSection.tsx
│   │   ├── CrystalSection.tsx
│   │   ├── BlogSection.tsx
│   │   └── ThreeBackground.tsx
│   ├── data/               # Data management
│   │   ├── crystals.ts     # Crystal product data
│   │   └── blog.ts         # Blog post data
│   └── hooks/              # Custom React hooks
│       ├── useThreeScene.ts
│       └── useScrollAnimations.ts
├── public/
│   └── assets/             # Static assets (images, etc.)
└── package.json
```

## 🎨 Key Features

### Dynamic Content Management
- **Crystal Products**: Easily add/edit crystals in `src/data/crystals.ts`
- **Blog Posts**: Manage blog content in `src/data/blog.ts`
- **Customizable**: All content is now data-driven and easily updatable

### Modern React Components
- **Navbar**: Interactive navigation with search and cart functionality
- **HeroSection**: Animated hero with Framer Motion effects
- **CrystalSection**: Two-row crystal showcase with add-to-cart functionality
- **BlogSection**: Responsive blog carousel
- **ThreeBackground**: Three.js integration ready for your GLB models

### Enhanced Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **GSAP ScrollTrigger**: Advanced scroll-based animations
- **Custom Hooks**: Reusable animation logic

## 🛠 Customization Guide

### Adding New Crystals
Edit `src/data/crystals.ts`:

```typescript
export const crystalData: Crystal[] = [
  {
    id: '9',
    name: 'New Crystal',
    type: 'Limited Edition',
    price: 350,
    image: '/assets/images/new-crystal.jpg',
    description: 'Description of the new crystal'
  },
  // ... existing crystals
];
```

### Adding New Blog Posts
Edit `src/data/blog.ts`:

```typescript
export const blogData: BlogPost[] = [
  {
    id: '5',
    title: 'New Blog Post',
    excerpt: 'Brief description...',
    author: 'Author Name',
    readTime: '7 min read',
    date: 'Dec 15',
    image: '/assets/images/new-blog.jpg',
    slug: 'new-blog-post'
  },
  // ... existing posts
];
```

## 🚀 Deployment

The site is ready for deployment on Vercel, Netlify, or any Node.js hosting platform.

## 💡 Benefits of the Conversion

✅ **Maintainability**: Component-based architecture makes updates easier  
✅ **Scalability**: Easy to add new features and pages  
✅ **Performance**: Next.js optimizations for faster loading  
✅ **SEO**: Better search engine optimization  
✅ **Modern Stack**: Using latest React and Next.js features  
✅ **Type Safety**: Full TypeScript support prevents runtime errors
