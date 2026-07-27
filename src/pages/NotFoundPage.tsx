import { Link } from "react-router";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage() {
  usePageMeta({
    title: "Page not found",
    description: "The requested page could not be found.",
  });
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-6 py-20 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
          Page not found
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          The page may have been removed, renamed or the address may be
          incorrect.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block border border-slate-950 px-6 py-3 font-medium transition-colors hover:bg-slate-950 hover:text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
