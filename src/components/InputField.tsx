import React from "react";

type InputFieldProps ={
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const InputField = ({
  value, 
  onChange, 
  label, 
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
}: InputFieldProps) => {

  const sizeClasses: { [key: string]: string } = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variantClasses: { [key: string]: string } = {
    filled: "bg-gray-100 border border-transparent focus:bg-white",
    outlined: "border border-gray-400 focus:border-blue-500 bg-white",
    ghost: "border-none bg-transparent focus:border-b-2",
  };

  return (
    <div>
      {label}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}

        className={`flex flex-row items-center max-h-screen rounded-xl outline-none ${sizeClasses[size]} ${variantClasses[variant]}`}
        type="text" />

      {invalid && errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  )
}