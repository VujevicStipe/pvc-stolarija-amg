import React from "react";
import styles from "./BenefitsSection.module.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import StarIcon from "@mui/icons-material/Star";

const benefits = [
  {
    icon: EmojiEventsIcon,
    title: "Vrhunska kvaliteta",
    description: "Koristimo samo najkvalitetnije materijale i tehnologiju"
  },
  {
    icon: WorkspacePremiumIcon,
    title: "Certifikati i garancija",
    description: "Dugogodišnja garancija na sve naše proizvode"
  },
  {
    icon: AccessAlarmsIcon,
    title: "Brza montaža",
    description: "Profesionalna montaža u dogovorenom roku"
  },
  {
    icon: StarIcon,
    title: "Zadovoljni klijenti",
    description: "Preko 1000+ zadovoljnih kupaca"
  }
];

const BenefitsSection = () => {
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Zašto baš AMG?</h2>
        
        <div className={styles.grid}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;