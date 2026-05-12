"use client";

import React from "react";
import Link from "next/link";
import { Home, ArrowRight, Ghost } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="notFoundPage" suppressHydrationWarning>
      <motion.div 
        className="notFoundVideoWrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="notFoundVisualFallback">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Ghost size={120} className="notFoundGhostIcon" />
          </motion.div>
          <div className="notFoundErrorCode">404</div>
        </div>
      </motion.div>

      <div className="notFoundContent">
        <motion.h1 
          className="notFoundTitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Lost in Orbit?
        </motion.h1>
        <motion.p 
          className="notFoundSubtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The page you're looking for has drifted away. <br />
          Don't worry, even the best students take a wrong turn sometimes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/" className="notFoundHomeBtn">
            <Home size={22} />
            Back to Campus
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
