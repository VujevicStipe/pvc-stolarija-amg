'use client'

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.css';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  gridArea: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/door1.jpg',
    alt: 'PVC vrata i prozori 1',
    gridArea: 'img1'
  },
  {
    id: 2,
    src: '/images/window1.jpg', 
    alt: 'PVC vrata i prozori 2',
    gridArea: 'img2'
  },
  {
    id: 3,
    src: '/images/shutter1.jpg', 
    alt: 'PVC vrata i prozori 3',
    gridArea: 'img3'
  },
  {
    id: 4,
    src: '/images/window1.jpg', 
    alt: 'PVC vrata i prozori 4',
    gridArea: 'img4'
  },
  {
    id: 5,
    src: '/images/door1.jpg', 
    alt: 'PVC vrata i prozori 5',
    gridArea: 'img5'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=600&fit=crop',
    alt: 'PVC vrata i prozori 6',
    gridArea: 'img6'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    alt: 'PVC vrata i prozori 7',
    gridArea: 'img7'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=600&fit=crop',
    alt: 'PVC vrata i prozori 8',
    gridArea: 'img8'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=800&fit=crop',
    alt: 'PVC vrata i prozori 9',
    gridArea: 'img9'
  }
];

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false); // Novi state za hydration fix

  // Fix za Next.js hydration - prvo čekamo da se client-side kod pokrene
  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileImageCount = 2;
  
  // Prikaži sve slike dok se ne učita client-side kod
  const displayImages = (isClient && isMobile) 
    ? galleryImages.slice(0, mobileImageCount) 
    : galleryImages;

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
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

  // Keyboard navigation
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

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Naša PVC stolarija u praksi</h2>
          <button 
            className={styles.galleryButton}
            onClick={() => openModal(0)}
          >
            Galerija
          </button>
        </div>

        {/* Grid Gallery */}
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

        {/* Show More Button - Samo na mobile */}
        {isClient && isMobile && galleryImages.length > mobileImageCount && (
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

      {/* Lightbox Modal */}
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
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className={styles.modalImage}
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