"use client";
import React, { useState, useEffect } from "react";
import styles from "./AboutSection.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useDeviceType from "@/app/hooks/useWindowSize";

const AboutSection = () => {
  const deviceType = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deviceClass = mounted ? deviceType : 'desktop';

  return (
    <div className={`${styles.aboutSection} section ${styles[deviceClass]}`}>
      <h2 className={styles.aboutUsTitle}>Tko smo mi?</h2>
      <div className={styles.aboutUsContent}>
        <h3 className={styles.contentTitle}>Vaš partner za kvalitetnu PVC stolariju u Splitu i okolici</h3>
        <p className={styles.contentText}>
          AMG je obrt specijaliziran za <strong>proizvodnju i montažu PVC stolarije</strong> sa sjedištem u Kaštel Starom. 
          Nudimo široku ponudu <strong>PVC prozora, vrata, balkonskih vrata i roletni</strong> uz profesionalnu montažu 
          i dugogodišnju garanciju. Naša PVC stolarija odlikuje se vrhunskom <strong>toplinskom i zvučnom izolacijom</strong>, 
          što garantira energetsku učinkovitost vašeg doma. S preko 1000 zadovoljnih klijenata u <strong>Splitu, 
          Kaštelima i široj Dalmaciji</strong>, AMG je sinonim za kvalitetu, pouzdanost i stručnost u proizvodnji 
          PVC stolarije.
        </p>
        <address className={styles.location}>
          <LocationOnIcon /> Ulica Sv. Jurja 74, 21217 Kaštel Stari
        </address>
      </div>
      <div className={styles.googleMapsLocation}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10440.621344289311!2d16.354090508190612!3d43.56703411987629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355cccb067ead3%3A0xea361b9c1fd935a0!2sUl.%20Sv.%20Jurja%2074%2C%2021217%2C%20Ka%C5%A1tel%20Stari!5e0!3m2!1shr!2shr!4v1761664386824!5m2!1shr!2shr"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="AMG PVC Stolarija - Lokacija u Kaštelu Starijem"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutSection;