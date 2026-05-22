"use client";

import React from "react";

export default function FloatingElement({ children }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      {children}
    </div>
  );
}

