import { useEffect, useState } from "react";

import { CareerJourney } from "../components/careerJourney/CareerJourney";
import { RichText } from "../components/content/RichText";
import { TwoColumnRichText } from "../components/content/TwoColumnRichText";
import { CTABox } from "../components/ctaBox/CTABox";
import { Section } from "../components/layout/Section";
import { FeatureImage } from "../components/media/FeatureImage";
import { PullQuote } from "../components/pullQuote/PullQuote";
import { SocialLink } from "../components/socialLinks/SocialLink";
import { ButtonLink } from "../components/ui/Button";
import {
  type AboutContent,
  getAboutContent,
} from "../features/about/api/getAboutContent";
import { LatestArticles } from "../features/thinking/LatestArticles";
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
      <Section variant="tertiary" borderPosition="bottom" container="site">
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
            {content.cvDownload?.url && (
              // ?dl= makes Sanity's CDN send the file as a download, keeping its original filename
              <ButtonLink
                to={`${content.cvDownload.url}?dl=`}
                variant="primary"
              >
                {content.cvDownload.label}
              </ButtonLink>
            )}
            <ButtonLink
              to="https://www.linkedin.com/in/lisahughes/"
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
            >
              Connect on LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        variant="white"
        container="content"
        containerClassName="flex flex-col"
      >
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-heading">
            From craft to{" "}
            <em className="text-primary-500">creative leadership</em>
          </h2>
        </header>

        <TwoColumnRichText
          left={content.creativeLeadershipLeft}
          right={content.creativeLeadershipRight}
        />
      </Section>

      {content.careerJourney.length > 0 && (
        <Section variant="tertiary" borderPosition="top" container="content">
          <CareerJourney steps={content.careerJourney} />
        </Section>
      )}

      {content.pullQuoteOne?.quote && (
        <PullQuote
          quote={content.pullQuoteOne.quote}
          variant={content.pullQuoteOne.variant}
        />
      )}

      {content.howIWork.length > 0 && (
        <Section variant="white" container="content">
          <header className="mb-10 text-center">
            <h2 className="text-4xl font-heading">How I work</h2>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {content.howIWork.map((item) => (
              <CTABox
                key={item._key}
                icon={item.icon}
                iconAlt={item.iconAlt}
                title={item.title}
                content={item.content}
                variant={item.variant}
              />
            ))}
          </div>
        </Section>
      )}

      {content.pullQuoteTwo?.quote && (
        <PullQuote
          quote={content.pullQuoteTwo.quote}
          variant={content.pullQuoteTwo.variant}
        />
      )}

      {(content.beyondTheWorkLeft.length > 0 ||
        content.beyondTheWorkRight.length > 0) && (
        <Section
          variant="white"
          container="content"
          containerClassName="flex flex-col"
        >
          <header className="mb-8 text-center">
            <h2 className="text-4xl font-heading">Beyond the work</h2>
          </header>

          <TwoColumnRichText
            left={content.beyondTheWorkLeft}
            right={content.beyondTheWorkRight}
          />
        </Section>
      )}

      {content.elsewhereLinks.length > 0 && (
        <Section variant="tertiary" borderPosition="both">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 md:flex-row md:items-center">
            <h2 className="shrink-0 font-heading text-3xl md:w-60">
              Elsewhere
            </h2>

            <ul className="grid flex-1 gap-6 md:grid-cols-3">
              {content.elsewhereLinks.map((link) => (
                <li key={link._id}>
                  <SocialLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {content.articles.length > 0 && (
        <Section variant="tertiary" container="content">
          <LatestArticles articles={content.articles} variant="compact" />
        </Section>
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
