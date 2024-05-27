"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xbjnewdz");

  if (state.succeeded) {
    return (
      <div
        className="container"
        style={{
          height: "100vh",
          paddingTop: "2rem",
        }}
      >
        <p>Thank you! We'll get in touch with you shortly. 🍺</p>
        <span>
          Go back to ➡ <Link href="/">Home</Link>
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        height: "100vh",
        paddingTop: "2rem",
      }}
    >
      <form onSubmit={handleSubmit} className="container">
        <h1>Contact Form:</h1>
        <TextField
          id="email"
          type="email"
          label="Email"
          name="email"
          variant="outlined"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <TextField
          label="Message"
          name="message"
          id="message"
          variant="outlined"
          multiline
          maxRows={5}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button variant="contained" type="submit" disabled={state.submitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}
