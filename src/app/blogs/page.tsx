'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReactiveBlogData } from '@/hooks/useReactiveData';
import { BlogPost } from '@/data/blog';
import Navbar from '@/components/Navbar';
import { useStarBackground } from '@/hooks/useStarBackground';

const BlogsPage = () => {
  const blogs = useReactiveBlogData();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Initialize star background
  useStarBackground(headerRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blogs-page">
      <Navbar />
      <div ref={headerRef} className="blogs-header">
        <canvas className="blogs-header-star-bg" />
        <div className="blogs-header-content">
          <h1>Our Crystal Blog</h1>
          <p>Discover insights, wisdom, and guidance from crystal experts and spiritual practitioners.</p>
        </div>
      </div>

      <div className="blogs-container">
        <div className="blogs-grid">
          {blogs.map((post: BlogPost) => {
            const blogUrl = `/blogs/${post.slug}`;
            console.log('🔗 Blog Link:', post.title, '→', blogUrl);
            return (
            <Link 
              href={blogUrl} 
              key={post.id}
              className="blog-card-link"
            >
              <article className="blog-card">
                <div className="blog-card-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="blog-image"
                  />
                </div>
                
                <div className="blog-card-content">
                  <div className="blog-card-meta-top">
                    <span className="blog-card-date-text">{post.date}</span>
                    <span className="blog-card-meta-separator">•</span>
                    <span className="blog-card-read-time-text">{post.readTime}</span>
                  </div>
                  
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-card-meta">
                    <div className="blog-card-author-info">
                      <span className="blog-card-author">{post.author}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;