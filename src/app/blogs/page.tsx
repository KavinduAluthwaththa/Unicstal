'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useReactiveBlogData } from '@/hooks/useReactiveData';
import { BlogPost } from '@/data/blog';
import Navbar from '@/components/Navbar';

const BlogsPage = () => {
  const blogs = useReactiveBlogData();

  return (
    <div className="blogs-page">
      <Navbar />
      <div className="blogs-header">
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
                  <div className="blog-card-date">
                    {post.date}
                  </div>
                  {post.category && (
                    <div className="blog-card-category">
                      {post.category}
                    </div>
                  )}
                </div>
                
                <div className="blog-card-content">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-card-meta">
                    <div className="blog-card-author">
                      By {post.author}
                    </div>
                    <div className="blog-card-read-time">
                      {post.readTime}
                    </div>
                  </div>
                  
                  {post.tags && (
                    <div className="blog-card-tags">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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