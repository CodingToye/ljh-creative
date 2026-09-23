import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline";

const baseClasses =
  "inline-flex items-center justify-center px-5 py-3 font-medium leading-[19px] transition-colors rounded-2xl";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-400",

  secondary: "bg-secondary-500 text-white hover:bg-secondary-400",

  tertiary:
    "border border-tertiary-500 bg-transparent text-tertiary-500 hover:bg-tertiary-500 hover:text-white",
  outline: "border border-white bg-transparent rounded-none text-white",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
