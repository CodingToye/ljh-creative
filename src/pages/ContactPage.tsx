import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage() {
  usePageMeta({
    title: "Contact",
    description:
      "Contact Lisa about freelance projects, collaborations and creative opportunities.",
  });
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
            Contact
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Have a project, collaboration or idea in mind?
          </h1>
        </div>

        <div className="md:pt-20">
          <p className="text-xl leading-8 text-slate-700">
            Lisa is available for selected freelance projects, collaborations
            and creative opportunities.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Get in touch
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Include a little information about the project, the expected
              timescale and how you would like to work together.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-10 inline-block text-2xl font-semibold underline decoration-slate-300 underline-offset-8 transition-colors hover:decoration-slate-950"
            >
              hello@example.com
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Elsewhere</h2>
          </div>

          <div className="md:col-span-2">
            <ul className="divide-y divide-slate-300 border-y border-slate-300">
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between py-5 text-lg hover:underline"
                >
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between py-5 text-lg hover:underline"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.behance.net/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between py-5 text-lg hover:underline"
                >
                  <span>Behance</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
