'use client';

import { blogData } from '@/data/blog';
import type { BlogPost } from '@/types/blog';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useReactiveBlogData } from '@/hooks/useReactiveData';
import Navbar from '@/components/Navbar';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPage = ({ params }: BlogPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = React.use(params);
  const blogs = useReactiveBlogData();
  const [isLoading, setIsLoading] = React.useState(true);
  
  console.log('🔍 Blog Page - Looking for slug:', slug);
  console.log('🔍 Available blogs:', blogs.map(b => ({ id: b.id, title: b.title, slug: b.slug })));
  console.log('🔍 Blogs length:', blogs.length);
  
  // Check if blogs are still loading
  React.useEffect(() => {
    if (blogs.length > 0) {
      setIsLoading(false);
    } else {
      // Give some time for localStorage to load
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [blogs]);
  
  let post: BlogPost | undefined = undefined;

  // Wait for blogs to load before searching
  if (isLoading) {
    return (
      <div className="blog-post-page">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <svg className="loading-spinner" width="160" height="160" viewBox="0 0 100 100">
            <circle className="path" cx="50" cy="50" r="40" fill="none" strokeWidth="12" />
          </svg>
        </div>
      </div>
    );
  }

  if (blogs.length > 0) {
    post = blogs.find(blog => blog.slug === slug);
  }
  // Fallback: if no post found in reactive data, check original data
  if (!post) {
    post = blogData.find((blog: BlogPost) => blog.slug === slug);
    console.log('🔄 Using fallback original data, found:', post ? post.title : 'NOT FOUND');
  }
  console.log('🔍 Found blog:', post ? post.title : 'NOT FOUND');

  if (!post) {
    notFound();
  }

  return (
    <div className="blog-post-page">
      <Navbar />
      <div className="blog-post-header">
        <div className="blog-post-meta-header">
          <h1 className="blog-post-title">{post.title}</h1>
          
          <div className="blog-post-meta">
            <div className="blog-post-author-info">
              <span className="blog-post-author">By {post.author}</span>
              <span className="blog-post-date">{post.date}</span>
              <span className="blog-post-read-time">{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-post-image-container">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={600}
          className="blog-post-image"
        />
      </div>

      <div className="blog-post-container">
        <div className="blog-post-content">
          <div 
            className="blog-content-html"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
          />
          {post.tags && (
            <div className="blog-post-tags-section">
              <h3>Tags</h3>
              <div className="blog-post-tags">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="blog-post-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="blog-post-navigation">
        <Link href="/blogs" className="back-to-blogs-btn">
          ← Back to All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;