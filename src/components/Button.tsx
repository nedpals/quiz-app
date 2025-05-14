import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonProps<C extends ElementType> = {
  as?: C;
  variant?: "primary" | "secondary" | "outline" | "success" | "danger";
  fullWidth?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<C>;

export default function Button<C extends ElementType = "button">({
  as,
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps<C>) {
  const Component = as || "button";
  const variantStyles = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-sm focus-visible:ring-sky-700 border border-sky-600",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 focus-visible:ring-slate-400 border border-slate-300 shadow-sm",
    outline: "border border-slate-300 hover:bg-slate-50 text-slate-700 focus-visible:ring-slate-400 shadow-sm",
    success: "bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm focus-visible:ring-green-700 border border-green-600",
    danger: "bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm focus-visible:ring-red-700 border border-red-600",
  };
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <Component
      className={`cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed duration-150 ease-in-out hover:scale-105 active:scale-95 ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
