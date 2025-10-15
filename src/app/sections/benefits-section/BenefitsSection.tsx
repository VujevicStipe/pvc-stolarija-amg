import React from "react";
import styles from "./BenefitsSection.module.css";
import BenefitCard from "@/app/components/benefit-card/BenefitCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import StarIcon from "@mui/icons-material/Star";

const BenefitsSection = () => {
  const txt1 = "Lorem ipsum dolor sit amet, consec";
  return (
    <div className={styles.benefitsSection}>
      <h2 className={styles.benefitsTitle}>Zašto baš AMG?</h2>
      <BenefitCard
        icon={<EmojiEventsIcon sx={{ fontSize: 48, color: "var(--green)" }} />}
        text={txt1}
      />
      <BenefitCard
        icon={
          <WorkspacePremiumIcon sx={{ fontSize: 48, color: "var(--green)" }} />
        }
        text={txt1}
      />
      <BenefitCard
        icon={<AccessAlarmsIcon sx={{ fontSize: 48, color: "var(--green)" }} />}
        text={txt1}
      />
      <BenefitCard
        icon={<StarIcon sx={{ fontSize: 48, color: "var(--green)" }} />}
        text={txt1}
      />
    </div>
  );
};

export default BenefitsSection;
