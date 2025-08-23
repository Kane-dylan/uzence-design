import React from "react";

type ButtonProps = {
  label?: string;
  size?: "sm"| "md"| "lg";
  backgroundColor?: string;
  onClick?: () => void;
};

export const Button = ({ label, size ="md", backgroundColor = "green", onClick }: ButtonProps) => {

  let scale =1 
  if (size == "sm") scale = 0.75
  if (size == "lg") scale = 1.5

  // const style = {
  //   backgroundColor,
  //   padding: `${scale * 0.5}rem ${scale * 1}rem`,
  //   border: "none",
  // }

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 border border-none"
    >
      {label}
      {size}
      {backgroundColor}
    </button>
  );
};
