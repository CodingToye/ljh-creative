import { usePageMeta } from "../hooks/usePageMeta";

export function AboutPage() {
  usePageMeta({
    title: "About",
    description:
      "Learn more about LJH creative practice, approach and areas of expertise.",
  });
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] md:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
            About
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Ideas shaped through curiosity, collaboration and thoughtful design.
          </h1>
        </div>

        <div className="md:pt-20">
          <p className="text-xl leading-8 text-slate-700">
            Lisa is a multidisciplinary creative working across brand, editorial
            and visual communication.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Creative approach
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Her work begins with understanding the purpose behind a project:
              who it is for, what it needs to communicate and how it should make
              people feel.
            </p>

            <p>
              She combines research, experimentation and visual storytelling to
              create work that is expressive, considered and appropriate for its
              context.
            </p>

            <p>
              Collaboration is central to the process, with ideas developed
              through open conversation, iteration and close attention to
              detail.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:py-24">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Areas of practice
            </h2>
          </div>

          <div className="md:col-span-2">
            <ul className="grid gap-x-8 gap-y-4 text-lg sm:grid-cols-2">
              <li className="border-t border-slate-300 py-4">Brand identity</li>
              <li className="border-t border-slate-300 py-4">Art direction</li>
              <li className="border-t border-slate-300 py-4">
                Editorial design
              </li>
              <li className="border-t border-slate-300 py-4">
                Campaign design
              </li>
              <li className="border-t border-slate-300 py-4">Illustration</li>
              <li className="border-t border-slate-300 py-4">
                Creative strategy
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
