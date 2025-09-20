'use client';

import React from 'react';
import Image from 'next/image';
import { blogData } from '@/data/blog';
import { useBlogAnimations } from '@/hooks/useBlogAnimations';

const BlogCard = ({ post, index }: { post: any; index: number }) => {
  return (
    <article 
      className="blog-post"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      <div className="blog-image">
        <Image 
          src={post.image} 
          alt={post.title}
          width={320}
          height={200}
          className="w-full h-full object-cover"
        />
        <div className="blog-date">{post.date}</div>
      </div>
      
      <div className="blog-content">
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        
        <div className="blog-meta">
          <span className="blog-author">{post.author}</span>
          <span className="blog-read-time">{post.readTime}</span>
        </div>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const { containerRef, titleRef, buttonRef, showcaseRef } = useBlogAnimations();

  return (
    <section className="section fourth" id="section-four">
      <div className="section--four--container" ref={containerRef}>
        <h2 ref={titleRef}>
          CRYSTAL <span className="crystal-gradient-stones">STORIES.</span>
        </h2>
        
        <div className="blog-showcase" ref={showcaseRef}>
          <div className="blog-carousel">
            {blogData.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>

        <button 
          ref={buttonRef}
          className="button--hero"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          READ ALL STORIES
        </button>
      </div>
    </section>
  );
};

export default BlogSection;