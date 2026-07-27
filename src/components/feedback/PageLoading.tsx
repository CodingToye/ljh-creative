type PageLoadingProps = {
  message?: string;
};

export function PageLoading({ message = "Loading…" }: PageLoadingProps) {
  return (
    <div
      className="mx-auto flex min-h-80 max-w-7xl items-center justify-center px-6 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <span
          className="mx-auto block size-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm text-slate-600">{message}</p>
      </div>
    </div>
  );
}
