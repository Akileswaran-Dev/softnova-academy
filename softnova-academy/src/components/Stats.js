"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/about/about.module.css";

const stats = [
  { label: "Students Trained", value: 60, suffix: "+" },
  { label: "Courses Offered", value: 20, suffix: "+" },
  { label: "Placement Rate", value: 93, suffix: "%" },
  { label: "Years of Experience", value: 2, suffix: "+" },
];

function Counter({ from, to, suffix }) {
  const [displayValue, setDisplayValue] = useState(from);
  const nodeRef = useRef();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + easeProgress * (to - from)));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, from, to]);

  return (
    <span ref={nodeRef}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={styles.statsSection}>
      <div className={`${styles.statsGrid} gsap-stagger-group`}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${styles.statItem} gsap-card`}
          >
            <h3>
              <Counter from={0} to={stat.value} suffix={stat.suffix} />
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

