"use client";
import React from "react";
import styles from "./AboutSection.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useDeviceType from "@/app/hooks/useWindowSize";

const AboutSection = () => {
  const deviceType = useDeviceType();
  return (
    <div className={`${styles.aboutSection} section ${styles[deviceType]}`}>
      <h2 className={styles.aboutUsTitle}>Tko smo mi?</h2>
      <div className={styles.googleMapsLocation}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10440.621344289311!2d16.354090508190612!3d43.56703411987629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355cccb067ead3%3A0xea361b9c1fd935a0!2sUl.%20Sv.%20Jurja%2074%2C%2021217%2C%20Ka%C5%A1tel%20Stari!5e0!3m2!1shr!2shr!4v1761664386824!5m2!1shr!2shr"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </div>
      <div className={styles.aboutUsContent}>
        <h4 className={styles.contentTitle}>Lorem ipsum dolor sit amet.</h4>
        <p className={styles.contentText}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          autem earum ex quibusdam neque iste saepe. Perferendis, delectus
          optio? Molestias iure cupiditate nostrum natus sapiente labore,
          dignissimos tenetur rerum non?
        </p>
        <span className={styles.location}>
          <LocationOnIcon /> Ulica Sv. Jurja 74
        </span>
      </div>
    </div>
  );
};

export default AboutSection;
