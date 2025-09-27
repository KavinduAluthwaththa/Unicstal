'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSupabaseBlogs } from '@/hooks/useSupabaseBlogs';
import type { BlogPost } from '@/types/blog';
import Navbar from '@/components/Navbar';
import { useStarBackground } from '@/hooks/useStarBackground';

const BlogsPage = () => {
  const { blogs, loading, error } = useSupabaseBlogs();
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
          {loading && <div>Loading blogs...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && blogs.map((post: BlogPost) => {
            const blogUrl = `/blogs/${post.slug}`;
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