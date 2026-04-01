import React from "react";

export default function ServicesSection() {
  return (
    <section style={styles.container}>
      <h1 style={styles.title}>The Divine Get Down</h1>

      <p style={styles.description}>
        The Divine Get Down is a faith-based platform providing motivational,
        educational, and spiritual content designed to inspire transformation,
        purpose, and connection with God.
      </p>

      <h2 style={styles.subtitle}>Our Services</h2>

      <ul style={styles.list}>
        <li>
          Providing non-downloadable videos in the field of religion and
          spiritual growth
        </li>
        <li>Motivational and educational speaking services</li>
        <li>Faith-based coaching and spiritual guidance</li>
      </ul>

      <p style={styles.contact}>
        For speaking engagements, collaborations, or inquiries, contact us
        directly.
      </p>
    </section>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#fff",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  subtitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "30px",
  },
  contact: {
    fontSize: "16px",
    opacity: 0.8,
  },
};
