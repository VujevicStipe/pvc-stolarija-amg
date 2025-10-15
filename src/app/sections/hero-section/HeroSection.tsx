"use client";

import React from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { Button } from "@mui/material";
import heroImg1 from "../../../../public/heroImg1.png";
import heroImg2 from "../../../../public/heroImg2.png";
import useDeviceType from "@/app/hooks/useWindowSize";

const HeroSection = () => {
  const deviceType = useDeviceType();

  return (
    <div className={`${styles.heroSection} ${styles[deviceType]}`}>
      <div className={styles.heroContent}>
        <Image
          src={logo}
          className={styles.logoImg}
          alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
        />
        <h1 className={styles.heroTitle}>
          Proizvodnja i Montaža PVC stolarije AMG
        </h1>
        <Button
          variant="contained"
          className="btn-animate"
          sx={{
            mt: "46px",
            background: "var(--radial-green-gradient)",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            padding: "10px 2.5rem",
            color: "#fff",
          }}
        >
          Pošalji upit
        </Button>
      </div>
      <div className={styles.heroGallery}>
        <div className={styles.heroImgWrapper}>
          <Image
            src={heroImg1}
            className={styles.heroImg}
            alt="amg-pvc-stolarija-prozori-izgled-proizvodnja-montaža-montaza"
          />
        </div>
        <div className={styles.heroImgWrapper}>
          <Image
            src={heroImg2}
            className={styles.heroImg}
            alt="amg-pvc-stolarija-prozori-izgled-proizvodnja-montaža-montaza"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
