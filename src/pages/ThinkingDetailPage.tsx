import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { RichText } from "../components/content/RichText";
import { getArticleBySlug } from "../features/thinking/api/getArticleBySlug";
import type { Article } from "../features/thinking/types/article";
import { urlFor } from "../services/sanity/image";
import { PageLoading } from "../components/feedback/PageLoading";
import { PageMessage } from "../components/feedback/PageMessage";
import { usePageMeta } from "../hooks/usePageMeta";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function ThinkingDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePageMeta({
    title: article?.title ?? "Thinking",
    description:
      article?.excerpt ??
      "Ideas and observations about design and creative practice.",
  });

  useEffect(() => {
    let isCancelled = false;

    async function loadArticle() {
      if (!slug) {
        setError("Article not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const result = await getArticleBySlug(slug);

        if (!isCancelled) {
          setArticle(result);
        }
      } catch (error) {
        console.error(error);

        if (!isCancelled) {
          setError("Unable to load this article.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadArticle();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return <PageLoading message="Loading article…" />;
  }

  if (error) {
    return (
      <PageMessage
        title="Unable to load article"
        message={error}
        variant="error"
      />
    );
  }

  if (!article) {
    return (
      <PageMessage
        title="Article not found"
        message="The article may have been removed or its address may have changed."
        action={
          <Link
            to="/thinking"
            className="underline decoration-slate-400 underline-offset-4 hover:decoration-slate-950"
          >
            Return to Thinking
          </Link>
        }
      />
    );
  }

  return (
    <main className="pb-20">
      {article.coverImage && (
        <figure>
          <img
            src={urlFor(article.coverImage)
              .width(2000)
              .height(1100)
              .fit("crop")
              .auto("format")
              .url()}
            alt={article.coverImage.alt}
            className="aspect-[20/11] w-full object-cover"
          />

          {article.coverImage.caption && (
            <figcaption className="mx-auto max-w-6xl px-6 pt-3 text-sm text-slate-500">
              {article.coverImage.caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mx-auto max-w-3xl px-6 pt-12">
        <Link to="/thinking" className="text-sm underline underline-offset-4">
          Back to Thinking
        </Link>

        <article className="mt-10">
          <header>
            <time
              dateTime={article.publishedAt}
              className="text-sm text-slate-500"
            >
              {dateFormatter.format(new Date(article.publishedAt))}
            </time>

            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              {article.title}
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600">
              {article.excerpt}
            </p>

            {article.tags?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          {article.body?.length ? (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <RichText value={article.body} />
            </section>
          ) : null}
        </article>
      </div>
    </main>
  );
}
