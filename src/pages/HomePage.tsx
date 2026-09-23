import { useEffect, useState } from "react";

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
      <section className="border-b border-tertiary-400">
        <div className="site-container">
          <div className="max-w-[786px]">
            <p className="text-[12px] font-medium uppercase tracking-widest text-tertiary-500">
              CREATIVE LEADERSHIP • BRAND • EXPERIENCE
            </p>

            <h1 className="mt-5 text-jumbo tracking-tight md:text-7xl">
              Building <em>stronger</em> brands, <em>better</em> experiences and{" "}
              <em>better</em> ways of working.
            </h1>

            <p className="mt-8 max-w-[440px] leading-[24px] mb-8">
              I combine hands-on design experience with strategic brand
              thinking, team leadership and creative governance.
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
        </div>
      </section>

      <section className="pt-8 bg-primary-200 border-b border-tertiary-400">
        <div className="site-container flex flex-col gap-8">
          <Skills skills={content.skills} />
          <SelectedWork projects={content.featuredWork} />
        </div>
      </section>

      <section className="pt-8">
        <div className="site-container">
          <LatestArticles articles={content.latestArticles} />
        </div>
      </section>
    </main>
  );
}

// type LatestThinkingProps = {
//   articles: HomeContent["latestArticles"];
// };

// function LatestThinking({ articles }: LatestThinkingProps) {
//   return (
//     <section className="border-t border-slate-200 bg-slate-50">
//       <div className="mx-auto max-w-7xl px-6 py-16">
//         <div className="flex items-end justify-between gap-6">
//           <div>
//             <p className="text-sm uppercase tracking-widest text-slate-500">
//               Ideas and observations
//             </p>

//             <h2 className="mt-2 text-4xl font-semibold tracking-tight">
//               Latest Thinking
//             </h2>
//           </div>

//           <Link
//             to="/thinking"
//             className="shrink-0 underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950"
//           >
//             View all articles
//           </Link>
//         </div>

//         {articles.length === 0 ? (
//           <p className="mt-10 text-slate-600">
//             No articles have been published.
//           </p>
//         ) : (
//           <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
//             {articles.map((article) => (
//               <article key={article._id}>
//                 <Link
//                   to={`/thinking/${article.slug}`}
//                   className="group grid gap-4 py-8 md:grid-cols-[10rem_1fr_auto] md:items-center"
//                 >
//                   <time
//                     dateTime={article.publishedAt}
//                     className="text-sm text-slate-500"
//                   >
//                     {dateFormatter.format(new Date(article.publishedAt))}
//                   </time>

//                   <div>
//                     <h3 className="text-2xl font-semibold group-hover:underline">
//                       {article.title}
//                     </h3>

//                     <p className="mt-2 max-w-3xl text-slate-600">
//                       {article.excerpt}
//                     </p>
//                   </div>

//                   <span aria-hidden="true" className="text-xl">
//                     →
//                   </span>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
