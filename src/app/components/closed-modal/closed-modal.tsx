"use client";
import React, { useState, useEffect } from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CLOSED = process.env.NEXT_PUBLIC_CONTACT_FORM_CLOSED === "true";

export default function ClosedModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (CLOSED) setOpen(true);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: 0,
          overflow: "hidden",
        },
      }}
    >
      {/* police tape header */}
      <div style={{
        backgroundColor: "#1a1a1a",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* traka */}
        {["-4deg", "4deg"].map((rot, i) => (
          <div key={i} style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: i === 0 ? "18%" : "58%",
            height: "34px",
            backgroundColor: "#f5c800",
            transform: `rotate(${rot}) scaleX(1.05)`,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}>
            {Array.from({ length: 15 }).map((_, j) => (
              <span key={j} style={{
                whiteSpace: "nowrap",
                fontFamily: "monospace",
                fontWeight: 900,
                fontSize: "12px",
                letterSpacing: "2px",
                color: "#1a1a1a",
                padding: "0 12px",
                userSelect: "none",
              }}>
                PRIVREMENO ZATVORENO ✦
              </span>
            ))}
          </div>
        ))}

        {/* naslov */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "16px 0",
        }}>
          <p style={{
            margin: 0,
            fontFamily: "monospace",
            fontWeight: 900,
            fontSize: "13px",
            letterSpacing: "2px",
            color: "#f5c800",
            visibility: "hidden", // drži visinu ali trake su iznad
          }}>
            PRIVREMENO ZATVORENO
          </p>
        </div>
      </div>

      {/* body */}
      <div style={{
        backgroundColor: "#fff",
        padding: "32px 28px 28px",
        position: "relative",
      }}>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <h2 style={{
          margin: "0 0 12px",
          fontSize: "20px",
          fontWeight: 700,
          color: "#1a1a1a",
        }}>
          Obrt je privremeno zatvoren
        </h2>

        <p style={{
          margin: "0 0 20px",
          color: "#555",
          lineHeight: 1.7,
          fontSize: "15px",
        }}>
            Trenutno ne primamo nove upite ni narudžbe, ali uskoro se vraćamo!
            Hvala svim dosadašnjim klijentima na povjerenju.
        </p>

        <button
          onClick={() => setOpen(false)}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--green)",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Razumijem
        </button>
      </div>
    </Dialog>
  );
}