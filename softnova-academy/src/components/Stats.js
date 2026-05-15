"use client";

import { motion, useInView, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
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
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, to, count]);

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
