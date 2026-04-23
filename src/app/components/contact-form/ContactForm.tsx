"use client";
import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

interface ContactFormProps {
  inModal?: boolean;
}

const CLOSED = process.env.NEXT_PUBLIC_CONTACT_FORM_CLOSED === "true";

export default function ContactForm({ inModal = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    poruka: "",
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Vaša poruka je uspješno poslana! Javit ćemo vam se uskoro.',
        });
        setFormData({ ime: "", prezime: "", email: "", telefon: "", poruka: "" });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Došlo je do greške. Pokušajte ponovo.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Greška pri slanju. Molimo provjerite vašu internet vezu.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>

      {CLOSED && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.30)",
          backdropFilter: "blur(1.5px)",
        }}>
          <div style={{
            position: "absolute",
            top: "28%",
            left: 0,
            right: 0,
            height: "38px",
            backgroundColor: "#f5c800",
            transform: "rotate(-3deg) scaleX(1.05)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={{
                whiteSpace: "nowrap",
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#1a1a1a",
                padding: "0 12px",
                userSelect: "none",
              }}>
                PRIVREMENO ZATVORENO ✦
              </span>
            ))}
          </div>

          <div style={{
            position: "absolute",
            bottom: "22%",
            left: 0,
            right: 0,
            height: "38px",
            backgroundColor: "#f5c800",
            transform: "rotate(2deg) scaleX(1.05)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={{
                whiteSpace: "nowrap",
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#1a1a1a",
                padding: "0 12px",
                userSelect: "none",
              }}>
                NE PRIMAMO UPITE ✦
              </span>
            ))}
          </div>

          <div style={{
            backgroundColor: "var(--green)",
            border: "3px solid #fff",
            borderRadius: "6px",
            padding: "16px 28px",
            textAlign: "center",
            zIndex: 1,
          }}>
            <p style={{
              margin: 0,
              color: "#f5c800",
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "15px",
              letterSpacing: "1px",
              lineHeight: 1.6,
            }}>
              OBRT JE PRIVREMENO ZATVOREN<br />
              <span style={{ fontWeight: 400, fontSize: "13px", color: "#fff" }}>
                Hvala na razumijevanju.
              </span>
            </p>
          </div>
        </div>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: inModal ? "100%" : "800px",
          margin: inModal ? 0 : "0 auto",
          padding: inModal ? 0 : 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: inModal ? "transparent" : "#fff",
          borderRadius: inModal ? 0 : 2,
          boxShadow: inModal ? "none" : "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, color: "var(--green)", textAlign: "center" }}>
          Pošaljite nam upit
        </Typography>

        <Typography sx={{ textAlign: "center", color: "#666", fontSize: "0.95rem", mb: 1 }}>
          Popunite formu i javit ćemo vam se u najkraćem roku
        </Typography>

        {status.type && (
          <Alert severity={status.type} onClose={() => setStatus({ type: null, message: '' })} sx={{ borderRadius: 2 }}>
            {status.message}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth required label="Ime" name="ime" value={formData.ime} onChange={handleChange} disabled={loading || CLOSED}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'var(--green)' }, '&.Mui-focused fieldset': { borderColor: 'var(--green)' } }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--green)' } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Prezime" name="prezime" value={formData.prezime} onChange={handleChange} disabled={loading || CLOSED}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'var(--green)' }, '&.Mui-focused fieldset': { borderColor: 'var(--green)' } }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--green)' } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth required label="Email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={loading || CLOSED}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'var(--green)' }, '&.Mui-focused fieldset': { borderColor: 'var(--green)' } }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--green)' } }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Telefon" name="telefon" value={formData.telefon} onChange={handleChange} disabled={loading || CLOSED}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'var(--green)' }, '&.Mui-focused fieldset': { borderColor: 'var(--green)' } }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--green)' } }} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth required label="Poruka" name="poruka" value={formData.poruka} onChange={handleChange} multiline rows={5} disabled={loading || CLOSED}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: 'var(--green)' }, '&.Mui-focused fieldset': { borderColor: 'var(--green)' } }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--green)' } }} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" disabled={loading || CLOSED}
          sx={{
            mt: 2,
            backgroundColor: "var(--green)",
            "&:hover": { backgroundColor: "#0a7a42", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(13, 159, 90, 0.4)" },
            fontSize: "1rem", fontWeight: 600, textTransform: "none",
            padding: "12px 0", borderRadius: "50px", transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(13, 159, 90, 0.3)",
          }}>
          {loading ? <><CircularProgress size={24} sx={{ color: 'white', marginRight: 1 }} />Šaljem...</> : 'Pošalji upit'}
        </Button>
      </Box>
    </div>
  );
}