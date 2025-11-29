"use client";
import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import footerLogo from "../../../../public/images/footer-logo.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import useDeviceType from "@/app/hooks/useWindowSize";
import ContactForm from "../contact-form/ContactForm";

export default function Footer() {
  const deviceType = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted && deviceType !== "desktop";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        {!isMobile ? (
          <div className={styles.footerRow}>
            <div className={styles.contact}>
              <div className={`${styles.footerContent} ${styles.marginBottom}`}>
                <h2>Kontaktirajte nas!</h2>
                <p>
                  Trebate nove prozore ili vrata? Pošaljite nam upit i dobijte 
                  <strong> besplatno mjerenje i konzultacije</strong> za PVC stolariju 
                  prilagođenu vašim potrebama.
                </p>
              </div>
              <div className={styles.logoSection}>
                <Image
                  src={footerLogo}
                  alt="AMG PVC Stolarija logo - proizvodnja i montaža prozora i vrata"
                  className={styles.footerLogoImg}
                />
                <p className={styles.tagline}>
                  Kvalitetna PVC stolarija<br />
                  za vaš dom • Split i okolica
                </p>
              </div>
              <div className={styles.contactContent}>
                <h3>
                  <PhoneIcon /> 
                  <a href="tel:0916009252" className={styles.contactLink}>
                    091/600-9252
                  </a>
                </h3>
                <h3>
                  <EmailIcon /> 
                  <a href="mailto:pvcstolarijaamg@gmail.com" className={styles.contactLink}>
                    pvcstolarijaamg@gmail.com
                  </a>
                </h3>
                <h3>
                  <FacebookIcon /> 
                  <a 
                    href="https://www.facebook.com/p/Amg-Pvcstolarija-100084518001943/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    Amg Pvcstolarija
                  </a>
                </h3>
              </div>
            </div>

            <div className={styles.contactFormWrapper}>
              <ContactForm inModal={false} />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.footerContent}>
              <h2>Kontaktirajte nas!</h2>
              <p>
                Trebate nove prozore ili vrata? Pošaljite nam upit i dobijte 
                <strong> besplatno mjerenje i konzultacije</strong> za PVC stolariju 
                prilagođenu vašim potrebama.
              </p>
            </div>
            <ContactForm inModal={false} />
            <div className={styles.contact}>
              <div className={styles.logoSection}>
                <Image
                  src={footerLogo}
                  alt="AMG PVC Stolarija logo - proizvodnja i montaža prozora i vrata"
                  className={styles.footerLogoImg}
                />
                <p className={styles.tagline}>
                  Kvalitetna PVC stolarija<br />
                  za vaš dom • Split i okolica
                </p>
              </div>
              <div className={styles.contactContent}>
                <h3>
                  <PhoneIcon /> 
                  <a href="tel:0916009252" className={styles.contactLink}>
                    091/600-9252
                  </a>
                </h3>
                <h3>
                  <EmailIcon /> 
                  <a href="mailto:pvcstolarijaamg@gmail.com" className={styles.contactLink}>
                    pvcstolarijaamg@gmail.com
                  </a>
                </h3>
                <h3>
                  <FacebookIcon /> 
                  <a 
                    href="https://www.facebook.com/p/Amg-Pvcstolarija-100084518001943/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    Amg Pvcstolarija
                  </a>
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.copyright}>
        <p className={styles.allRights}>
          © 2025 AMG PVC Stolarija. Sva prava pridržana.
        </p>
        <p className={styles.seoText}>
          PVC prozori Split • PVC vrata • Roletne • Kaštela • Dalmacija
        </p>
      </div>
    </footer>
  );
}