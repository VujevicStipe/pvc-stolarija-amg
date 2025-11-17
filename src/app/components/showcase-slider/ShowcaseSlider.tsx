'use client'

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import styles from './ShowcaseSlider.module.css';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: 'Ulazna vrata',
    subtitle: 'Ponuda',
    image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=600&h=700&fit=crop',
    features: ['Premium kvaliteta', 'Toplinska izolacija', 'Sigurnosna brava', 'Moderna estetika']
  },
  {
    id: 2,
    title: 'PVC Prozori',
    subtitle: 'Ponuda',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=700&fit=crop',
    features: ['Energetska učinkovitost', 'Zvučna izolacija', 'Lako održavanje']
  },
  {
    id: 3,
    title: 'Komarnici',
    subtitle: 'Ponuda',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=700&fit=crop',
    features: ['Jednostavna montaža', 'Različiti modeli', 'Dugotrajnost']
  },
  {
    id: 4,
    title: 'Balkonska vrata',
    subtitle: 'Ponuda',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=700&fit=crop',
    features: ['Veliki izbor dizajna', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  }
];

const ShowCaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Detektiramo mobile/tablet
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeIndex, isAutoPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsAutoPlaying(true);
  };

  const getSlidePosition = (index: number) => {
    const total = slidesData.length;
    let diff = index - activeIndex;
    
    // Normaliziramo razliku da bude u rasponu [-total/2, total/2]
    if (diff > total / 2) {
      diff -= total;
    } else if (diff < -total / 2) {
      diff += total;
    }
    
    return diff;
  };

  // Dupliciramo slides da bi infinity loop radio bolje
  const getVisibleSlides = () => {
    const total = slidesData.length;
    const slides = [];
    
    // Prikazujemo: 1 lijevo (za animaciju) + aktivni + 2 desno
    for (let i = -1; i <= 2; i++) {
      const index = (activeIndex + i + total) % total;
      slides.push({
        ...slidesData[index],
        position: i,
        originalIndex: index
      });
    }
    
    return slides;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className={styles.container}>
      <div className={styles.greenSection}>
        <div className={styles.contentWrapper}>
          {/* Lijevi dio s tekstom */}
          <div className={styles.textSection}>
            <h2 className={styles.title}>{slidesData[activeIndex].title}</h2>
            <span className={styles.subtitle}>{slidesData[activeIndex].subtitle}</span>
            
            <ul className={styles.featureList}>
              {slidesData[activeIndex].features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <Check size={16} className={styles.checkIcon} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.navButtons}>
              <button 
                onClick={handlePrev} 
                className={styles.navButton} 
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext} 
                className={styles.navButton} 
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className={styles.sliderSection}>
            <div className={styles.sliderWrapper}>
              {visibleSlides.map((slide) => {
                const isActive = slide.position === 0;
                const isLeft = slide.position < 0;
                const isVisible = slide.position >= 0 && slide.position <= 2;

                return (
                  <div
                    key={slide.id}
                    className={`${styles.slide} ${isActive ? styles.slideActive : ''} ${isLeft ? styles.slideLeft : ''}`}
                    style={{
                      transform: `translateX(${slide.position * 280}px) scale(${isActive ? 1.3 : 1})`,
                      zIndex: isActive ? 10 : isLeft ? -1 : 8 - slide.position,
                      opacity: isVisible ? 1 : 0,
                      pointerEvents: isVisible ? 'auto' : 'none',
                      visibility: isVisible ? 'visible' : 'hidden',
                    }}
                    onClick={() => !isActive && isVisible && setActiveIndex(slide.originalIndex)}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className={styles.slideImage} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCaseSlider;