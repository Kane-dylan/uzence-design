import React, { useEffect, useState } from "react";

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
  loading ?: boolean;
}

export const InputField = ({
  value: controlledValue, 
  onChange, 
  label, 
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
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

  const [uncontrolledValue, setUncontrolledValue] = useState(controlledValue ?? "");
  useEffect(() => {
    if(controlledValue !== undefined) {
      setUncontrolledValue(controlledValue);
    }
  },[controlledValue])

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  }

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    } else {
      const event = {
        target: { value: "" }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    }
    onClear?.();
  };

  return (
    <div className="flex flex-col gap-1 max-w-1/2">
      {label && <label className="flex items-center justify-between text-md font-medium">{label}

      {loading && (
        <div className="right-2 top-1/2">
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      </label>}

      <div className="flex flex-row gap-5">
        <input
        value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}

          className={`w-full rounded-xl outline-none transition-all pr-8
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${invalid ? "border-red-500 text-red-600" : ""}
          `}
          type="text" />
        <button
          type="button"
          disabled={disabled || !value}
          className={`inline-flex px-3 ${size === 'sm' ? 'text-xs' : 'text-sm'} items-center justify-center font-medium text-white rounded-xl transition
            bg-red-400 hover:opacity-90 hover:text-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {invalid && errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  )
}

function onClear() {
  throw new Error("Function not implemented.");
}
