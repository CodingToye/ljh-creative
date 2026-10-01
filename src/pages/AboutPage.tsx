import { useEffect, useState } from "react";

import { CareerJourney } from "../components/careerJourney/CareerJourney";
import { RichText } from "../components/content/RichText";
import { FeatureImage } from "../components/media/FeatureImage";
import { ButtonLink } from "../components/ui/Button";
import {
  type AboutContent,
  getAboutContent,
} from "../features/about/api/getAboutContent";
import { usePageMeta } from "../hooks/usePageMeta";

export function AboutPage() {
  usePageMeta({
    title: "About",
    description:
      "Learn more about LJH creative practice, approach and areas of expertise.",
  });
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadAboutContent() {
      try {
        const result = await getAboutContent();

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

    void loadAboutContent();

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
      <section className="border-b border-tertiary-400 bg-tertiary-200">
        <div className="site-container">
          {content.featureImages.length > 0 && (
            <div className="w-[700px]">
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
          <div className="max-w-[630px] pt-[72px]">
            <h1 className="mt-5 mb-4 max-w-4xl text-5xl text-heading tracking-tight md:text-7xl">
              I'm always looking for a{" "}
              <em className="font-bold">better way through</em>
            </h1>
            {content.intro.length > 0 && (
              <div className="mb-8 w-sm">
                <RichText value={content.intro} />
              </div>
            )}
            <div className="flex gap-4 mb-8">
              <ButtonLink to="/work" variant="primary">
                Download my CV
              </ButtonLink>
              <ButtonLink to="/about" variant="secondary">
                Connect on LinkedIn
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-16 md:py-24">
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-heading">
              From craft to{" "}
              <em className="text-primary-500">creative leadership</em>
            </h2>
          </header>

          <div className="grid gap-x-16 md:grid-cols-2">
            <div className="[&>*:first-child]:mt-0">
              <RichText value={content.creativeLeadershipLeft} />
            </div>
            <div className="md:[&>*:first-child]:mt-0">
              <RichText value={content.creativeLeadershipRight} />
            </div>
          </div>
        </div>
      </section>

      {content.careerJourney.length > 0 && (
        <section className="border-t border-tertiary-400 bg-tertiary-200">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <CareerJourney steps={content.careerJourney} />
          </div>
        </section>
      )}

      {/* <section className="border-t border-slate-200 bg-slate-50">
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
      </section> */}
    </main>
  );
}
