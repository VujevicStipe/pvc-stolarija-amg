import styles from "./page.module.css";
import HeroSection from "./sections/hero-section/HeroSection";
import BenefitsSection from "./sections/benefits-section/BenefitsSection";
import AboutSection from "./sections/about-section/AboutSection";
import ShowcaseSection from "./sections/showcase-section/ShowcaseSection.server";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroSection />
        <BenefitsSection />
        <AboutSection />
        <ShowcaseSection />
      </main>
    </div>
  );
}
