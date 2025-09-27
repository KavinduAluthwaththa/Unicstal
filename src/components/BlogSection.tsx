'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { useReactiveBlogData } from '@/hooks/useReactiveData';
import { useBlogAnimations } from '@/hooks/useBlogAnimations';
import { gsap } from 'gsap';

const BlogCard = React.memo(({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="blog-post-link">
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
        </div>
        <div className="blog-content">
          <div className="blog-meta-top">
            <span className="blog-date-text">{post.date}</span>
            <span className="blog-meta-separator">•</span>
            <span className="blog-read-time-text">{post.readTime}</span>
          </div>
          <h3 className="blog-title">{post.title}</h3>
          <div className="blog-meta">
            <div className="blog-author-info">
              <span className="blog-author">{post.author}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});
BlogCard.displayName = 'BlogCard';

const BlogSection = () => {
  const blogRowRef = React.useRef<HTMLDivElement>(null);
  const { containerRef, titleRef, buttonRef, showcaseRef } = useBlogAnimations();
  const blogs = useReactiveBlogData(); // Use reactive hook instead of state
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !blogRowRef.current) return;
    const blogRow = blogRowRef.current;

    // Cleanup previous animation and clones
    gsap.killTweensOf(blogRow);
    gsap.set(blogRow, { x: 0 });
    const clones = blogRow.querySelectorAll('.blog-post.clone');
    clones.forEach(clone => clone.remove());

    if (isMobile) {
      // Enable manual scrolling for mobile
      if (blogRow.parentElement) {
        blogRow.parentElement.style.overflowX = 'auto';
        blogRow.parentElement.style.scrollSnapType = 'x mandatory';
      }
      blogRow.style.animation = '';
      blogRow.style.transform = '';
      return;
    }

    // PC view: auto-scroll effect
    if (blogRow.parentElement) {
      blogRow.parentElement.style.overflowX = 'hidden';
      blogRow.parentElement.style.scrollSnapType = 'none';
    }
    // Remove CSS animation from .blog-row
    blogRow.style.animation = 'none';

    // Clone blog cards for seamless loop
    const cards = blogRow.querySelectorAll('.blog-post');
    cards.forEach(card => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.classList.add('clone');
      blogRow.appendChild(clone);
    });

    // Calculate total width
    const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 320;
    const totalCards = cards.length;
    const totalWidth = cardWidth * totalCards;

    // Animate x position for infinite loop
    gsap.to(blogRow, {
      x: -totalWidth,
      duration: totalCards * 2, // 2s per card
      ease: 'none',
      repeat: -1,
      force3D: true,
      onUpdate: () => {
        // Ensure transform is set
        blogRow.style.transform = `translateX(${gsap.getProperty(blogRow, 'x')}px)`;
      },
      modifiers: {
        x: x => `${parseFloat(x) % totalWidth}`
      }
    });

    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(blogRow);
      gsap.set(blogRow, { x: 0 });
      blogRow.style.animation = '';
      blogRow.style.transform = '';
      const clones = blogRow.querySelectorAll('.blog-post.clone');
      clones.forEach(clone => clone.remove());
    };
  }, [isMobile, blogs]);

  return (
    <section className="section fourth" id="section-four">
      <div className="section--four--container" ref={containerRef}>
        <h2 ref={titleRef}>
          <span className="crystal-gradient-stones">Crystal</span> Wisdom Blog.
        </h2>
        
        <div className="blog-showcase" ref={showcaseRef}>
          <div className={`blog-carousel ${isMobile ? 'mobile-swipe' : ''}`}>
            <div className={`blog-row ${isMobile ? 'mobile-row' : ''}`} ref={blogRowRef}>
              {blogs.map((post: BlogPost, index: number) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        <Link href="/blogs">
          <button 
            ref={buttonRef}
            className="button--hero"
          >
            READ ALL STORIES
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;