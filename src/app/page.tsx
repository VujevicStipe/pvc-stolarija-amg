import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "./sections/hero-section/HeroSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
