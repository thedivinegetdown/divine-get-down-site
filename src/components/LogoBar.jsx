import React from "react";

export default function LogoBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1100,
        borderBottom: "1px solid rgba(255, 215, 0, 0.1)",
      }}
    >
      <img
        src="/divine-logo.png"
        alt="The Divine Get Down Logo"
        style={{
          height: 44,
          filter: "drop-shadow(0 0 8px gold)",
        }}
      />
    </div>
  );
}
