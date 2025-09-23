'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import type { Article } from '@/data/articles';
import { useReactiveArticleData } from '@/hooks/useReactiveData';
import { useArticleAnimations } from '@/hooks/useArticleAnimations';

const ArticleSection = () => {
  const articles = useReactiveArticleData();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize GSAP animations
  useArticleAnimations(sectionRef, titleRef, paragraphRef, showcaseRef, buttonRef);

  const categories = ['ALL', 'HIGH QUALITY', 'PREMIUM', 'CALM', 'PROTECT', 'CLEAN'];

  const filteredArticles = selectedCategory === 'ALL' 
    ? articles 
    : articles.filter((article: Article) => article.category === selectedCategory);

  const articlesPerView = 4;
  const maxSlides = Math.max(0, filteredArticles.length - articlesPerView);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory]);

  const handleLike = (articleId: string) => {
    // This would typically update the like count
    console.log('Liked article:', articleId);
  };

  return (
    <section className="section fifth" id="section-five" ref={sectionRef}>
      <div className="section--fifth--container">
        {/* Header */}
        <h2 ref={titleRef}>
          CRYSTAL <span className="crystal-gradient-journey">ARTICLES</span> COLLECTION.
        </h2>
        <br />
        <p ref={paragraphRef}>
          Discover the power of crystals through our curated collection of articles
        </p>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Carousel */}
        <div className="article-showcase" ref={showcaseRef}>
          <div className="articles-carousel">
            <button 
              className="carousel-btn prev" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="articles-container">
              <div 
                className="articles-slider"
                style={{ transform: `translateX(-${currentSlide * (100 / articlesPerView)}%)` }}
              >
                {filteredArticles.map((article: Article) => (
                  <div key={article.id} className="article-card">
                    <div className="article-image">
                      <img src={article.image} alt={article.title} />
                      <div className="article-overlay">
                        <div className="article-category">{article.category}</div>
                        <button 
                          className="like-btn"
                          onClick={() => handleLike(article.id)}
                        >
                          <Heart size={20} />
                          <span>{article.likes}</span>
                        </button>
                      </div>
                    </div>
                    <div className="article-content">
                      <h3 className="article-card-title">{article.title}</h3>
                      {article.description && (
                        <p className="article-description">{article.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="carousel-btn next" 
              onClick={nextSlide}
              disabled={currentSlide >= maxSlides}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        {maxSlides > 0 && (
          <div className="slide-indicators">
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}

        <button 
          ref={buttonRef}
          className="button--hero"
        >
          VIEW ARTICLE COLLECTION
        </button>
      </div>
    </section>
  );
};

export default ArticleSection;