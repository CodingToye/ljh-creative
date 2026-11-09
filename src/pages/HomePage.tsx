import { useEffect, useState } from "react";

import { Section } from "../components/layout/Section";
import { FeatureImage } from "../components/media/FeatureImage";
import { Skills } from "../components/skills/Skills";
import { ButtonLink } from "../components/ui/Button";
import {
  getHomeContent,
  type HomeContent,
} from "../features/home/api/getHomeContent";
import { LatestArticles } from "../features/thinking/LatestArticles";
import { SelectedWork } from "../features/work/SelectedWork";
import { usePageMeta } from "../hooks/usePageMeta";

// const dateFormatter = new Intl.DateTimeFormat("en-GB", {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
// });

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
      <Section variant="tertiary" borderPosition="bottom" container="site">
        <div className="max-w-[786px] pt-[72px]">
          <h1 className="mt-5 text-jumbo tracking-tight md:text-7xl text-heading">
            Building <em className="font-bold tracking-tighter">stronger</em>{" "}
            brands, <em className="font-bold tracking-tighter">better</em>{" "}
            experiences and{" "}
            <em className="font-bold tracking-tighter">better</em> ways of
            working.
          </h1>

          <p className="mt-8 max-w-[440px] leading-[24px] mb-8">
            I combine hands-on design experience with strategic brand thinking,
            team leadership and creative governance.
          </p>

          <div className="flex gap-4">
            <ButtonLink to="/work" variant="primary">
              Explore my work
            </ButtonLink>
            <ButtonLink to="/about" variant="secondary">
              More about me
            </ButtonLink>
          </div>
        </div>
        {content.featureImages.length > 0 && (
          <div className="w-auto">
            {content.featureImages.map((featureImage, index) => (
              <FeatureImage
                key={featureImage._key}
                image={featureImage.image}
                alt={featureImage.alt}
                caption={featureImage.caption}
                captionPosition={featureImage.captionPosition}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        )}
      </Section>

      <Section
        variant="white"
        borderPosition="bottom"
        container="site"
        containerClassName="flex flex-col gap-16"
        className="pt-8"
      >
        <Skills skills={content.skills} />
        <SelectedWork projects={content.featuredWork} />
      </Section>

      <Section container="site" className="pt-8">
        <LatestArticles articles={content.latestArticles} />
      </Section>
    </main>
  );
}
