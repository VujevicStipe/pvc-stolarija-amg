'use client'

import React, { useRef, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import styles from './ShowcaseSlider.module.css';
import useDeviceType from '@/app/hooks/useWindowSize';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  imgAlt: string;
  imgTitle: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    title: 'Grilje',
    description: 'Grilje su idealno rješenje za zaštitu prozora i vrata od provalnika uz odličnu ventilaciju. Izrađujemo ih u svim standardnim i nestandardnim dimenzijama.',
    subtitle: 'Ponuda',
    image: './images/grilje.jpg',
    imgAlt: 'PVC grilje - izrada i montaža',
    imgTitle: 'PVC grilje AMG stolarija',
    features: ['Veliki izbor boja po želji kupca', 'Otporna na vremenske uvjete', 'Elegantni i moderni profili', 'UV zaštita i brza montaža']
  },
  {
    id: 2,
    title: 'Ulazna PVC vrata',
    subtitle: 'Ponuda',
    description: 'Ulazna PVC vrata kombiniraju sigurnost, estetiku i toplinsku izolaciju. Dostupna u brojnim dizajnima i bojama prilagođenim vašem domu.',
    image: './images/vrata.jpg',
    imgAlt: 'PVC ulazna vrata - izrada i montaža',
    imgTitle: 'PVC ulazna vrata AMG stolarija',
    features: ['Premium kvaliteta izrade', 'Moderan dizajn i širok izbor panela', 'Toplinska izolacija', 'Sigurnosna brava']
  },
  {
    id: 3,
    title: 'PVC Prozori',
    subtitle: 'Ponuda',
    description: 'PVC prozori pružaju izvrsnu toplinsku i zvučnu izolaciju uz minimalno održavanje. Idealni za stambene i poslovne objekte u svim klimatskim uvjetima.',
    image: './images/pvc_prozor.jpg',
    imgAlt: 'PVC prozori - izrada i montaža',
    imgTitle: 'PVC prozori AMG stolarija',
    features: ['Energetska učinkovitost', 'Zvučna izolacija i UV zaštita', 'Odabir boja i završnih obrada po želji', 'Lako održavanje']
  },
  {
    id: 4,
    title: 'Rolete',
    subtitle: 'Ponuda',
    description: 'Rolete osiguravaju privatnost, zaštitu od sunca i dodatnu toplinsku izolaciju.',
    image: './images/rolete.jpg',
    imgAlt: 'PVC rolete - izrada i montaža',
    imgTitle: 'PVC rolete AMG stolarija',
    features: ['Veliki izbor dizajna i boja', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  },
  {
    id: 5,
    title: 'Rolete na izbačaj',
    subtitle: 'Ponuda',
    description: 'Rolete na izbačaj idealne su za terase i balkone. Pružaju hlad i zaštitu od kiše uz elegantan izgled.',
    image: './images/roleta_izbacaj.jpg',
    imgAlt: 'PVC rolete na izbačaj - izrada i montaža',
    imgTitle: 'PVC rolete na izbačaj AMG stolarija',
    features: ['Širok izbor modela i boja', 'Izvedba prema specifičnim potrebama kupca', 'Otporna na vremenske uvjete', 'Elegantni profili i UV zaštita']
  },
  {
    id: 6,
    title: 'Balkonska vrata',
    subtitle: 'Ponuda',
    description: 'Balkonska PVC vrata spajaju funkcionalnost i estetiku. Izrađujemo ih u kliznoj i okretnoj izvedbi prema vašim potrebama.',
    image: './images/balkonska_vrata.jpg',
    imgAlt: 'PVC balkonska vrata - izrada i montaža',
    imgTitle: 'PVC balkonska vrata AMG stolarija',
    features: ['Veliki izbor dizajna i boja', 'Otporna na vremenske uvjete', 'Elegantni profili', 'UV zaštita']
  },
  {
    id: 7,
    title: 'Komarnici',
    subtitle: 'Ponuda',
    description: 'Komarnici štite vaš dom od insekata uz maksimalnu propusnost zraka. Nudimo fiksne, rolo i klizne modele prilagođene svakom otvoru.',
    image: './images/komarnik.jpg',
    imgAlt: 'Komarnici - izrada i montaža',
    imgTitle: 'Komarnici AMG stolarija',
    features: ['Jednostavna i brza montaža', 'Veliki izbor modela (fiksni, rolo, klizni…)', 'Dugotrajni materijali', 'Boje po dogovoru']
  },
  {
    id: 8,
    title: 'Klizna stijenka',
    subtitle: 'Ponuda',
    description: 'Klizne stijenke idealno su rješenje za spajanje unutarnjeg i vanjskog prostora. Elegantne, funkcionalne i otporne na sve vremenske uvjete.',
    image: './images/klizna_vrata.jpg',
    imgAlt: 'Klizna stijenka - izrada i montaža',
    imgTitle: 'Klizna stijenka AMG stolarija',
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
            <p className={styles.description}>{slidesData[activeIndex].description}</p>
            
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
                      alt={slide.imgAlt} 
                      title={slide.imgTitle}
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