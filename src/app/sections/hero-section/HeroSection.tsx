"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { Button } from "@mui/material";
import heroImg1 from "../../../../public/heroImg1.png";
import heroImg2 from "../../../../public/heroImg2.png";
import useDeviceType from "@/app/hooks/useWindowSize";
import ContactModal from "@/app/components/contact-modal/ContactModal";

const HeroSection = () => {
  const deviceType = useDeviceType();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const deviceClass = mounted ? deviceType : 'desktop';

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={`${styles.heroSection} ${styles[deviceClass]} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.heroContent}>
          <div className={styles.logoWrapper}>
            <Image
              src={logo}
              className={styles.logoImg}
              alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
              priority
            />
          </div>
          <h1 className={styles.heroTitle}>
            Proizvodnja i Montaža <span className={styles.highlight}>PVC stolarije</span> AMG
          </h1>
          <p className={styles.heroSubtitle}>
            Vrhunska kvaliteta prozora i vrata za vaš dom • Split i okolica
          </p>
          <Button
            variant="contained"
            className={`btn-animate ${styles.ctaButton}`}
            onClick={handleOpenModal}
            sx={{
              mt: "46px",
              background: "var(--radial-green-gradient)",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              padding: "14px 3rem",
              color: "#fff",
              borderRadius: "50px",
              boxShadow: "0 4px 20px rgba(13, 159, 90, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(13, 159, 90, 0.4)",
              }
            }}
          >
            Pošalji upit
          </Button>
        </div>
        <div className={styles.heroGallery}>
          <div className={`${styles.heroImgWrapper} ${styles.img1}`}>
            <Image
              src={heroImg1}
              className={styles.heroImg}
              alt="amg-pvc-stolarija-prozori-izgled-proizvodnja-montaža-montaza"
              priority
            />
            <div className={styles.imageOverlay}></div>
          </div>
          <div className={`${styles.heroImgWrapper} ${styles.img2}`}>
            <Image
              src={heroImg2}
              className={styles.heroImg}
              alt="amg-pvc-stolarija-vrata-izgled-proizvodnja-montaža-montaza"
              priority
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>

        <div className={styles.floatingElements}>
          <div className={styles.floatingCircle1}></div>
          <div className={styles.floatingCircle2}></div>
          <div className={styles.floatingCircle3}></div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default HeroSection;