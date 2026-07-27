import type { ReactNode } from "react";

type PageMessageProps = {
  title: string;
  message?: string | null;
  action?: ReactNode;
  variant?: "error" | "empty";
};

export function PageMessage({
  title,
  message,
  action,
  variant = "empty",
}: PageMessageProps) {
  return (
    <main
      className="mx-auto flex min-h-80 max-w-3xl items-center justify-center px-6 py-16 text-center"
      role={variant === "error" ? "alert" : undefined}
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

        {message && <p className="mt-4 leading-7 text-slate-600">{message}</p>}

        {action && <div className="mt-8">{action}</div>}
      </div>
    </main>
  );
}
