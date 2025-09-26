'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/data/blog';
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
    
    // On mobile, make carousel swipeable instead of auto-scrolling
    if (isMobile) {
      // Remove any existing GSAP animations
      gsap.killTweensOf(blogRow);
      
      // Reset transform
      gsap.set(blogRow, { x: 0 });
      
      // Enable horizontal scrolling for mobile
      if (blogRow.parentElement) {
        blogRow.parentElement.style.overflowX = 'auto';
        blogRow.parentElement.style.scrollSnapType = 'x mandatory';
      }
      
      return;
    }

    // Desktop: Auto-scroll behavior
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
  }, [isMobile]);

  return (
    <section className="section fourth" id="section-four">
      <div className="section--four--container" ref={containerRef}>
        <h2 ref={titleRef}>
          <span className="crystal-gradient-stones">Crystal</span> Wisdom Blog.
        </h2>
        
        <div className="blog-showcase" ref={showcaseRef}>
          <div className={`blog-carousel ${isMobile ? 'mobile-swipe' : ''}`}>
            <div className={`blog-row ${isMobile ? 'mobile-row' : 'auto-scroll-row'}`} ref={blogRowRef}>
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