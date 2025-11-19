import { buildMetadata } from '../app/lib/BuildMetadata';
import styles from "./page.module.css";
import HeroSection from "./sections/hero-section/HeroSection";
import BenefitsSection from "./sections/benefits-section/BenefitsSection";
import AboutSection from "./sections/about-section/AboutSection";
import ShowcaseSection from "./sections/showcase-section/ShowcaseSection";
import GallerySection from "./sections/gallery-section/GallerySection";

export const metadata = buildMetadata({
  title: 'Proizvodnja i Montaža PVC Stolarije',
  description: 'AMG - Vrhunska PVC stolarija u Splitu i Kaštelima. Proizvodnja i montaža PVC prozora, vrata, balkonskih vrata i roletni. Toplinska i zvučna izolacija, energetska učinkovitost. Besplatna mjerenja i konzultacije. Preko 1000 zadovoljnih klijenata.',
  path: '/',
  image: {
    src: '/meta/og-home.png',
    alt: 'AMG PVC Stolarija - Proizvodnja i montaža prozora i vrata u Splitu',
  },
});

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