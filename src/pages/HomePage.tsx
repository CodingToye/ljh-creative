import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  getHomeContent,
  type HomeContent,
} from "../features/home/api/getHomeContent";
import { urlFor } from "../services/sanity/image";
import { usePageMeta } from "../hooks/usePageMeta";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function HomePage() {
  usePageMeta({
    description:
      "LJH creative portfolio featuring selected projects, creative ideas and articles.",
  });
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadHomeContent() {
      try {
        const result = await getHomeContent();

        if (!isCancelled) {
          setContent(result);
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setError("Unable to load the portfolio.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadHomeContent();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) {
    return <p className="p-8">Loading portfolio…</p>;
  }

  if (error || !content) {
    return <p className="p-8">{error ?? "Unable to load the portfolio."}</p>;
  }

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
          Creative portfolio
        </p>

        <h1 className="mt-5 max-w-5xl text-5xl font-semibold tracking-tight md:text-7xl">
          Creative ideas, thoughtful design and work made with purpose.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
          A collection of selected work, creative thinking and observations from
          across design practice.
        </p>
      </section>

      <FeaturedWork projects={content.featuredWork} />

      <LatestThinking articles={content.latestArticles} />
    </main>
  );
}

type FeaturedWorkProps = {
  projects: HomeContent["featuredWork"];
};

function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-500">
              Selected projects
            </p>

            <h2 className="mt-2 text-4xl font-semibold tracking-tight">
              Featured Work
            </h2>
          </div>

          <Link
            to="/work"
            className="shrink-0 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950"
          >
            View all work
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="mt-10 text-slate-600">
            No featured projects have been selected.
          </p>
        ) : (
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project._id}>
                <Link to={`/work/${project.slug}`} className="group block">
                  {project.heroImage && (
                    <div className="overflow-hidden">
                      <img
                        src={urlFor(project.heroImage)
                          .width(1000)
                          .height(750)
                          .fit("crop")
                          .auto("format")
                          .url()}
                        alt={project.heroImage.alt}
                        className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <h3 className="mt-5 text-2xl font-semibold group-hover:underline">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-slate-600">{project.summary}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type LatestThinkingProps = {
  articles: HomeContent["latestArticles"];
};

function LatestThinking({ articles }: LatestThinkingProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-500">
              Ideas and observations
            </p>

            <h2 className="mt-2 text-4xl font-semibold tracking-tight">
              Latest Thinking
            </h2>
          </div>

          <Link
            to="/thinking"
            className="shrink-0 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950"
          >
            View all articles
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="mt-10 text-slate-600">
            No articles have been published.
          </p>
        ) : (
          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {articles.map((article) => (
              <article key={article._id}>
                <Link
                  to={`/thinking/${article.slug}`}
                  className="group grid gap-4 py-8 md:grid-cols-[10rem_1fr_auto] md:items-center"
                >
                  <time
                    dateTime={article.publishedAt}
                    className="text-sm text-slate-500"
                  >
                    {dateFormatter.format(new Date(article.publishedAt))}
                  </time>

                  <div>
                    <h3 className="text-2xl font-semibold group-hover:underline">
                      {article.title}
                    </h3>

                    <p className="mt-2 max-w-3xl text-slate-600">
                      {article.excerpt}
                    </p>
                  </div>

                  <span aria-hidden="true" className="text-xl">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
