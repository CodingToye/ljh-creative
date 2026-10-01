import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { PageLoading } from "../components/feedback/PageLoading";
import { PageMessage } from "../components/feedback/PageMessage";
import { getWork } from "../features/work/api/getWork";
import type { Work } from "../features/work/types/work";
import { usePageMeta } from "../hooks/usePageMeta";
import { urlFor } from "../services/sanity/image";

export function WorkPage() {
  usePageMeta({
    title: "Work",
    description:
      "Explore selected creative projects, case studies and client work by Lisa.",
  });
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [projects, setProjects] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWork() {
      try {
        const work = await getWork();
        setProjects(work);
      } catch (error) {
        console.error(error);
        setError("Unable to load work.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadWork();
  }, []);

  if (isLoading) {
    return <PageLoading message="Loading work…" />;
  }

  if (error) {
    return (
      <PageMessage
        title="Unable to load work"
        message={error}
        variant="error"
      />
    );
  }

  // ?category=<slug> (linked from "Other categories" on project pages) narrows the list
  const visibleProjects = categorySlug
    ? projects.filter((project) => project.category?.slug === categorySlug)
    : projects;
  const activeCategory = visibleProjects[0]?.category;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold">Work</h1>

      {categorySlug && (
        <p className="mt-4 text-sm">
          {activeCategory
            ? `Showing work in ${activeCategory.title}. `
            : "No work in this category yet. "}
          <Link to="/work" className="underline">
            Show all work
          </Link>
        </p>
      )}

      {visibleProjects.length === 0 && !categorySlug ? (
        <PageMessage
          title="No work published yet"
          message="Published projects will appear here."
        />
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article key={project._id}>
              <Link to={`/work/${project.slug}`} className="group block">
                {project.heroImage && (
                  <img
                    src={urlFor(project.heroImage)
                      .width(1200)
                      .height(800)
                      .fit("crop")
                      .auto("format")
                      .url()}
                    alt={project.heroImage.alt}
                    className="aspect-3/2 w-full object-cover"
                    loading="lazy"
                  />
                )}
                <h2 className="text-2xl font-semibold">{project.title}</h2>

                <p className="mt-2 text-slate-600">{project.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
