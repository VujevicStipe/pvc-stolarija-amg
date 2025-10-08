"use client";
import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import footerLogo from "../../../../public/image 3.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import useDeviceType from "@/app/hooks/useWindowSize";
import ContactForm from "../contact-form/ContactForm";

export default function Footer() {
  const deviceType = useDeviceType();

  return (
    <div className={styles.footer}>
      <div className={styles.footerWrapper}>
        {deviceType === "desktop" ? (
          <div className={styles.footerRow}>
            <div className={styles.contact}>
              <div className={`${styles.footerContent} ${styles.marginBottom}`}>
                <h2>Javi nam se!</h2>
                <p>
                  Lorem ipsum dolor sit amet, consec adipiscing elit. Donec eu
                  tempus metus. Aliquam erat volutpat.
                </p>
              </div>
              <Image
                src={footerLogo}
                alt="pvc stolarija amg logo proizvodnja montaža pvc stolarije"
                className={styles.footerLogoImg}
              />
              <div className={styles.contactContent}>
                <h3>
                  <PhoneIcon /> <span>091/111-222</span>
                </h3>
                <h3>
                  <EmailIcon /> <span>pvc-stolarija-amg@gmail.com</span>
                </h3>
                <h3>
                  <FacebookIcon /> <span>PvcStolarijaAMG</span>
                </h3>
              </div>
            </div>

            <div className={styles.contactFormWrapper}>
              <ContactForm />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.footerContent}>
              <h2>Javi nam se!</h2>
              <p>
                Lorem ipsum dolor sit amet, consec adipiscing elit. Donec eu
                tempus metus. Aliquam erat volutpat.
              </p>
            </div>
            <ContactForm />
            <div className={styles.contact}>
              <Image
                src={footerLogo}
                alt="pvc stolarija amg logo proizvodnja montaža pvc stolarije"
                className={styles.footerLogoImg}
              />
              <div className={styles.contactContent}>
                <h3>
                  <PhoneIcon /> <span>091/111-222</span>
                </h3>
                <h3>
                  <EmailIcon /> <span>pvc-stolarija-amg@gmail.com</span>
                </h3>
                <h3>
                  <FacebookIcon /> <span>PvcStolarijaAMG</span>
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
      <h4 className={styles.allRights}>
        © 2025 Pvc Stolarija AMG. Sva prava pridržana.
      </h4>
    </div>
  );
}
