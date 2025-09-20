'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '@/data/blog';
import { getBlogData } from '@/lib/dataManager';
import { useBlogAnimations } from '@/hooks/useBlogAnimations';
import { gsap } from 'gsap';

const BlogCard = React.memo(({ post, index }: { post: any; index: number }) => {
  return (
    <article className="blog-post">
      <div className="blog-image">
        <Image 
          src={post.image} 
          alt={post.title}
          width={320}
          height={200}
          className="w-full h-full object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
});

const BlogSection = () => {
  const blogRowRef = React.useRef<HTMLDivElement>(null);
  const { containerRef, titleRef, paragraphRef, buttonRef, showcaseRef } = useBlogAnimations();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogs(getBlogData());
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !blogRowRef.current) return;

    const blogRow = blogRowRef.current;

    // Wait for content to be rendered
    setTimeout(() => {
      // Clone the blog cards for seamless infinite loop
      const blogCards = Array.from(blogRow.querySelectorAll('.blog-post'));

      if (blogCards.length === 0) return;

      // Clone cards multiple times for smoother infinite scroll
      for (let i = 0; i < 4; i++) {
        blogCards.forEach(card => {
          const clone = card.cloneNode(true) as HTMLElement;
          blogRow.appendChild(clone);
        });
      }

      // Calculate the width of one set of cards
      const cardWidth = 350 + 24; // card width + gap
      const rowWidth = cardWidth * blogCards.length;

      // Auto-scroll row to the LEFT (negative direction)
      const blogAnimation = gsap.fromTo(blogRow, 
        { x: 0 },
        {
          x: -rowWidth,
          duration: 25,
          ease: "none",
          repeat: -1,
        }
      );

      // Pause animation on hover for better UX
      const pauseAnimation = () => {
        blogAnimation.pause();
      };

      const playAnimation = () => {
        blogAnimation.play();
      };

      blogRow.addEventListener('mouseenter', pauseAnimation);
      blogRow.addEventListener('mouseleave', playAnimation);

      return () => {
        blogAnimation.kill();
        blogRow.removeEventListener('mouseenter', pauseAnimation);
        blogRow.removeEventListener('mouseleave', playAnimation);
      };
    }, 100);
  }, []);

  return (
    <section className="section fourth" id="section-four">
      <div className="section--four--container" ref={containerRef}>
        <h2 ref={titleRef}>
          <span className="crystal-gradient-stones">Crystal</span> Wisdom Blog.
        </h2>
        
        <div className="blog-showcase" ref={showcaseRef}>
          <div className="blog-carousel">
            <div className="blog-row auto-scroll-row" ref={blogRowRef}>
              {blogs.map((post: BlogPost, index: number) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>

        <button 
          ref={buttonRef}
          className="button--hero"
        >
          READ ALL STORIES
        </button>
      </div>
    </section>
  );
};

export default BlogSection;