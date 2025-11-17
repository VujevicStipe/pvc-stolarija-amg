import React from "react";
import Gallery from "@/app/components/gallery/Gallery";
import styles from './GallerySection.module.css'

export default function GallerySection() {

  return (
    <section className={`${styles.gallery} section`}>
      <Gallery />
    </section>
  );
}
