'use client'

import React, { useRef, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import styles from './ShowcaseSlider.module.css';
import useDeviceType from '@/app/hooks/useWindowSize';

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
    title: 'Grilje',
    subtitle: 'Ponuda',
    image: './images/grilje.jpg',
    features: ['Veliki izbor boja po želji kupca', 'Otporna na vremenske uvjete', 'Elegantni i moderni profili', 'UV zaštita i brza montaža']
  },
  {
    id: 2,
    title: 'Ulazna PVC vrata',
    subtitle: 'Ponuda',
    image: './images/vrata.jpg',
    features: ['Premium kvaliteta izrade', 'Moderan dizajn i širok izbor panela', 'Toplinska izolacija', 'Sigurnosna brava']
  },
  {
    id: 3,
    title: 'PVC Prozori',
    subtitle: 'Ponuda',
    image: './images/pvc_prozor.jpg',
    features: ['Energetska učinkovitost', 'Zvučna izolacija i UV zaštita', 'Odabir boja i završnih obrada po želji', 'Lako održavanje']
  },
  {
    id: 4,
    title: 'Rolete',
    subtitle: 'Ponuda',
    image: './images/rolete.jpg',
    features: ['Veliki izbor dizajna i boja', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  },
  {
    id: 5,
    title: 'Rolete na izbačaj',
    subtitle: 'Ponuda',
    image: './images/roleta_izbacaj.jpg',
    features: ['Širok izbor modela i boja', 'Izvedba prema specifičnim potrebama kupca', 'Otporna na vremenske uvjete', 'Elegantni profili i UV zaštita']
  },
  {
    id: 6,
    title: 'Balkonska vrata',
    subtitle: 'Ponuda',
    image: './images/balkonska_vrata.jpg',
    features: ['Veliki izbor dizajna i boja', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  },
  {
    id: 7,
    title: 'Komarnici',
    subtitle: 'Ponuda',
    image: './images/komarnik.jpg',
    features: ['Jednostavna i brza montaža', 'Veliki izbor modela (fiksni, rolo, klizni…)', 'Dugotrajni materijali', 'Boje po dogovoru']
  },
  {
    id: 8,
    title: 'Klizna stijenka',
    subtitle: 'Ponuda',
    image: './images/klizna_vrata.jpg',
    features: ['Veliki izbor dizajna', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  }
];

const ShowCaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeIndex, isAutoPlaying]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setIsAutoPlaying(true);
  };

  const getVisibleSlides = () => {
    const total = slidesData.length;
    const slides = [];
    
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

                const transformValue = isMobile 
                  ? `translateX(${slide.position * 200}px) scale(${isActive ? 1.3 : 1})`
                  : `translateX(${slide.position * 280}px) scale(${isActive ? 1.3 : 1})`;

                return (
                  <div
                    key={slide.id}
                    className={`${styles.slide} ${isActive ? styles.slideActive : ''} ${isLeft ? styles.slideLeft : ''}`}
                    style={{
                      transform: transformValue,
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