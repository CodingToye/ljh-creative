import type { ButtonHTMLAttributes } from "react";
import { MdArrowDropDown } from "react-icons/md";

type ActionButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "tertiary"
  | "tertiary2";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ActionButtonVariant;
};

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: "bg-primary-500 hover:bg-primary-400",
  secondary: "bg-secondary-500 hover:bg-secondary-400",
  neutral: "bg-neutral-500 hover:bg-neutral-400",
  tertiary: "bg-tertiary-500 hover:bg-tertiary-400",
  tertiary2: "bg-tertiary2-500 hover:bg-tertiary2-400",
};

export function ActionButton({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex size-10 items-center justify-center rounded-full cursor-pointer",
        "transition-colors",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      <MdArrowDropDown
        size={28}
        className="-rotate-90 text-white"
        aria-hidden="true"
      />
    </button>
  );
}
