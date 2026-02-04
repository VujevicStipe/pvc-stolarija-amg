'use client'

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';
import useDeviceType from '@/app/hooks/useWindowSize';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  gridArea: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/slider1.jpg',
    alt: 'PVC vrata i prozori 1',
    gridArea: 'img1'
  },
  {
    id: 2,
    src: '/images/slider9.jpg', 
    alt: 'PVC vrata i prozori 2',
    gridArea: 'img2'
  },
  {
    id: 3,
    src: '/images/slider3.jpg', 
    alt: 'PVC vrata i prozori 3',
    gridArea: 'img3'
  },
  {
    id: 4,
    src: '/images/slider4.jpg', 
    alt: 'PVC vrata i prozori 4',
    gridArea: 'img4'
  },
  {
    id: 5,
    src: '/images/slider5.jpg', 
    alt: 'PVC vrata i prozori 5',
    gridArea: 'img5'
  },
  {
    id: 6,
    src: '/images/slider6.jpg',
    alt: 'PVC vrata i prozori 6',
    gridArea: 'img6'
  },
  {
    id: 7,
    src: '/images/slider7.jpg',
    alt: 'PVC vrata i prozori 7',
    gridArea: 'img7'
  },
  {
    id: 8,
    src: '/images/slider8.jpg',
    alt: 'PVC vrata i prozori 8',
    gridArea: 'img8'
  },
  {
    id: 9,
    src: '/images/slider2.jpg',
    alt: 'PVC vrata i prozori 9',
    gridArea: 'img9'
  }
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const mobileImageCount = 2;
  const displayImages = isMobile 
    ? galleryImages.slice(0, mobileImageCount) 
    : galleryImages;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 50; 
    const distance = touchStart - touchEnd;
    
    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 50;
    const distance = touchStart - touchEnd;
    
    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Naša PVC stolarija u praksi</h2>
          <button 
            className={styles.galleryButton}
            onClick={() => openModal(0)}
          >
            Galerija
          </button>
        </div>

        <div className={styles.gallery}>
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className={styles.galleryItem}
              style={{ gridArea: image.gridArea }}
              onClick={() => openModal(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className={styles.galleryImage}
              />
              <div className={styles.overlay}>
                <span className={styles.viewText}>Pogledaj</span>
              </div>
            </div>
          ))}
        </div>

        {isMobile && galleryImages.length > mobileImageCount && (
          <div className={styles.showMoreContainer}>
            <button 
              className={styles.showMoreButton}
              onClick={() => openModal(0)}
            >
              Prikaži ostale ({galleryImages.length - mobileImageCount})
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <button 
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>

          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          <div 
            ref={modalContentRef}
            className={`${styles.modalContent} ${isDragging ? styles.dragging : ''}`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className={styles.modalImage}
              draggable={false}
            />
            <div className={styles.imageCounter}>
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;