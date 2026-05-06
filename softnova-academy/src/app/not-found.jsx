"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Images/Robot 404 Error.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Lost in Orbit?</h1>
        <p className={styles.subtitle}>
          The page you're looking for has drifted away. <br />
          Don't worry, even the best students take a wrong turn sometimes.
        </p>

        <Link href="/" className={styles.homeBtn}>
          <Home size={22} />
          Back to Campus
          <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}
