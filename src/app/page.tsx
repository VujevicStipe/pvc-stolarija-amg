import styles from "./page.module.css";
import HeroSection from "./sections/hero-section/HeroSection";
import BenefitsSection from "./sections/benefits-section/BenefitsSection";
import AboutSection from "./sections/about-section/AboutSection";
import ShowcaseSection from "./sections/showcase-section/ShowcaseSection";
import GallerySection from "./sections/gallery-section/GallerySection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroSection />
        <BenefitsSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="showcase">
          <ShowcaseSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="contact">
        </section>
      </main>
    </div>
  );
}