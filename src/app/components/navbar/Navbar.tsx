"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import logo from "../../../../public/image 3.png";
import useDeviceType from "@/app/hooks/useWindowSize";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function Navbar() {
  const deviceType = useDeviceType();
  const [menuOpen, setMenuOpen] = useState(false);

  if (deviceType === "mobile") {
    return (
      <div className={styles.navbarMobile}>
        <div className={styles.logo}>
          <Image
            className={styles.logoImg}
            src={logo}
            alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
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
            <h2 className={styles.menuTitle}>
              Menu
            </h2>

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
            {["O nama", "Ponuda", "Galerija", "Kontakt"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setMenuOpen(false)}>
                  <ListItemText
                    primary={text}
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
      </div>
    );
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          className={styles.logoImg}
          src={logo}
          alt="amg-pvc-stolarija-logo-obrt-za-proizvodnju"
        />
      </div>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="">O nama</a>
        </li>
        <li className={styles.navItem}>
          <a href="">Ponuda</a>
        </li>
        <li className={styles.navItem}>
          <a href="">Galerija</a>
        </li>
        <li className={styles.navItem}>
          <a href="">Kontakt</a>
        </li>
      </ul>
    </div>
  );
}
