import React from "react";

type ButtonProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
  onClick?: () => void;
};

export const Button = ({
  label = "Button",
  size = "md",
  backgroundColor = "blue",
  onClick,
}: ButtonProps) => {
  const sizeClasses: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      style={{ backgroundColor }}
      className={`inline-flex items-center justify-center font-medium text-white rounded border-none hover:opacity-90 transition ${sizeClasses[size]}`}
    >
      {label}
    </button>
  );
};
