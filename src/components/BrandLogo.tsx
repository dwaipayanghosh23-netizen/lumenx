import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  lightText?: boolean;
}

export default function BrandLogo({ className = "", size = "md", lightText = true }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl sm:text-5xl",
  };

  return (
    <div className={`inline-flex items-baseline font-sans font-extrabold tracking-tight select-none ${sizeClasses[size]} ${className}`}>
      <span className={lightText ? "text-white" : "text-black"}>
        LumenX
      </span>
      <span className="text-[#a855f7] font-extrabold text-[1.1em] leading-none inline-block ml-[1px] transform translate-y-[-1px]">.</span>
    </div>
  );
}
