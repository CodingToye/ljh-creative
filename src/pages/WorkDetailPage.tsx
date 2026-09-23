import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { ContentTaxonomy } from "../components/content/ContentTaxonomy";
import { RichText } from "../components/content/RichText";
import { PageLoading } from "../components/feedback/PageLoading";
import { PageMessage } from "../components/feedback/PageMessage";
import { getWorkBySlug } from "../features/work/api/getWorkBySlug";
import type { Work } from "../features/work/types/work";
import { usePageMeta } from "../hooks/usePageMeta";
import { urlFor } from "../services/sanity/image";

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageMeta({
    title: project?.title ?? "Work",
    description:
      project?.summary ??
      "Explore selected creative work and case studies by Lisa.",
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadProject() {
      if (!slug) {
        setError("Project not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const work = await getWorkBySlug(slug);

        if (!isCancelled) {
          setProject(work);
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setError("Unable to load this project.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return <PageLoading message="Loading project…" />;
  }

  if (error) {
    return (
      <PageMessage
        title="Unable to load project"
        message={error}
        variant="error"
      />
    );
  }

  if (!project) {
    return (
      <PageMessage
        title="Project not found"
        message="The project may have been removed or its address may have changed."
        action={
          <Link
            to="/work"
            className="underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950"
          >
            Return to Work
          </Link>
        }
      />
    );
  }

  return (
    <main>
      <img
        src={urlFor(project.heroImage)
          .width(2000)
          .height(1200)
          .fit("crop")
          .auto("format")
          .url()}
        alt={project.heroImage.alt}
        className="aspect-[5/3] w-full object-cover"
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link to="/work" className="text-sm underline underline-offset-4">
          Back to Work
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold md:text-6xl">{project.title}</h1>

          <p className="mt-6 max-w-3xl text-xl text-slate-600">
            {project.summary}
          </p>
        </header>

        <dl className="mt-10 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-3">
          {project.client && (
            <div>
              <dt className="text-sm text-slate-500">Client</dt>
              <dd className="mt-1 font-medium">{project.client}</dd>
            </div>
          )}

          {project.year && (
            <div>
              <dt className="text-sm text-slate-500">Year</dt>
              <dd className="mt-1 font-medium">{project.year}</dd>
            </div>
          )}
        </dl>

        <div className="mt-10 border-t border-tertiary-200 pt-8">
          <ContentTaxonomy category={project.category} tags={project.tags} />
        </div>

        {project.body?.length ? (
          <section className="mx-auto mt-16 max-w-3xl border-t border-slate-200 pt-12">
            <RichText value={project.body} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
