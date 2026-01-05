import React from "react";

export default function LogoBottomCenter() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1100,
      }}
    >
      <img
        src="/divine-logo.png"
        alt="The Divine Get Down Logo"
        style={{
          height: 60,
          filter: "drop-shadow(0 0 12px gold)",
        }}
      />
    </div>
  );
}
