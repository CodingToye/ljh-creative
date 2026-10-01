import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { CTABox } from "../components/ctaBox/CTABox";
import { PageLoading } from "../components/feedback/PageLoading";
import { PageMessage } from "../components/feedback/PageMessage";
import { Section } from "../components/layout/Section";
import { PullQuote } from "../components/pullQuote/PullQuote";
import { LatestArticles } from "../features/thinking/LatestArticles";
import { getWorkBySlug } from "../features/work/api/getWorkBySlug";
import { RelatedWorkCard } from "../features/work/RelatedWorkCard";
import type { WorkDetail } from "../features/work/types/work";
import { WorkHeader } from "../features/work/WorkHeader";
import { WorkHero } from "../features/work/WorkHero";
import { WorkSection } from "../features/work/WorkSection";
import { usePageMeta } from "../hooks/usePageMeta";

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<WorkDetail | null>(null);
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
      <WorkHeader project={project} />

      <WorkHero project={project} />

      <WorkSection title="The reason" section={project.theReason} />

      <WorkSection
        title="The challenge"
        section={project.theChallenge}
        variant="tertiary"
        imageLayout="featured"
      />

      <WorkSection title="The solution" section={project.theSolution} />

      <WorkSection
        title="The outcome"
        section={project.theOutcome}
        variant="tertiary"
      />

      {project.whatITookForward?.quote?.length ? (
        <PullQuote
          title="What I took forward"
          quote={{ pullQuote: project.whatITookForward.quote }}
          variant={project.whatITookForward.variant ?? "secondary"}
        />
      ) : null}

      {project.moreInCategory.length > 0 && (
        <Section
          variant="tertiary"
          container="content"
          className="overflow-x-hidden"
        >
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-heading">More in this category</h2>
          </header>

          <div className="relative">
            {/* Decorative rule running edge to edge behind the cards, at their mid-height */}
            <div
              aria-hidden="true"
              className="absolute top-18 left-1/2 hidden h-px w-screen -translate-x-1/2 bg-neutral-300 md:block"
            />
            <div className="relative grid gap-6 md:grid-cols-3">
              {project.moreInCategory.map((relatedProject) => (
                <RelatedWorkCard
                  key={relatedProject._id}
                  project={relatedProject}
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {project.otherCategories.length > 0 && (
        <Section variant="white" container="content">
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-heading">Other categories</h2>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.otherCategories.map((category) => (
              <CTABox
                key={category._id}
                layout="stacked"
                icon={category.icon}
                title={category.title}
                variant={category.colour ?? "neutral"}
                to={`/work?category=${category.slug}`}
              />
            ))}
          </div>
        </Section>
      )}

      {project.relatedArticles.length > 0 && (
        <Section variant="tertiary" container="content">
          <LatestArticles
            articles={project.relatedArticles}
            variant="compact"
          />
        </Section>
      )}
    </main>
  );
}
