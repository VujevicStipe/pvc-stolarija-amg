import React from "react";
import styles from "./BenefitCard.module.css";

interface BenefitCardProps {
  icon: React.ReactNode;
  text: string;
}

export default function BenefitCard({ icon, text }: BenefitCardProps) {
  return (
    <div className={styles.benefitCard}>
      <div className={styles.benefitImg}>{icon}</div>
      <h3 className={styles.cardTitle}>{text}</h3>
    </div>
  );
}
