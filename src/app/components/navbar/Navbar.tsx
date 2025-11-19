"use client";
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../../../public/image 3.png";
import useDeviceType from "@/app/hooks/useWindowSize";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const navItems = [
  { label: "O nama", id: "about" },
  { label: "Ponuda", id: "showcase" },
  { label: "Galerija", id: "gallery" },
  { label: "Kontakt", id: "contact" },
];

export default function Navbar() {
  const deviceType = useDeviceType();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  const isMobile = mounted && deviceType === "mobile";

  if (isMobile) {
    return (
      <nav className={styles.navbarMobile}>
        <div className={styles.logo}>
          <Image
            className={styles.logoImg}
            src={logo}
            alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <IconButton onClick={() => setMenuOpen(!menuOpen)} color="inherit">
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          slotProps={{
            paper: {
              sx: {
                width: "75vw",
                backgroundColor: "white",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                boxShadow: "none",
              },
            },
          }}
        >
          <div className={styles.mobileNavHeader}>
            <h2 className={styles.menuTitle}>Menu</h2>

            <IconButton
              onClick={() => setMenuOpen(false)}
              sx={{
                color: "black",
                "&:hover": { color: "var(--green)" },
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>

          <List sx={{ width: "100%" }}>
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => scrollToSection(item.id)}>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          color: "black",
                          fontSize: "1.3rem",
                          transition: "color 0.2s ease",
                          "&:hover": { color: "var(--green)" },
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div 
        className={styles.logo}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
      >
        <Image
          className={styles.logoImg}
          src={logo}
          alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
        />
      </div>
      <ul className={styles.navItems}>
        {navItems.map((item) => (
          <li key={item.id} className={`${styles.navItem} btn-animate`}>
            <a 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              style={{ cursor: 'pointer' }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}