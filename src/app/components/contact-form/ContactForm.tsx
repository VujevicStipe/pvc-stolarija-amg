"use client";
import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    poruka: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "var(--green)",
          textAlign: "center",
        }}
      >
        Kontakt forma
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Ime"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Prezime"
            name="prezime"
            value={formData.prezime}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Telefon"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Poruka"
            name="poruka"
            value={formData.poruka}
            onChange={handleChange}
            multiline
            rows={5}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "var(--green)",
          "&:hover": { backgroundColor: "#0a7a42" },
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Pošalji upit
      </Button>
    </Box>
  );
}
