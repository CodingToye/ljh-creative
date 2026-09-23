import { useEffect, useState } from "react";
import { Link } from "react-router";

import { PageLoading } from "../components/feedback/PageLoading";
import { PageMessage } from "../components/feedback/PageMessage";
import { getArticles } from "../features/thinking/api/getArticles";
import type { ArticleSummary } from "../features/thinking/types/article";
import { usePageMeta } from "../hooks/usePageMeta";
import { urlFor } from "../services/sanity/image";

export function ThinkingPage() {
  usePageMeta({
    title: "Thinking",
    description:
      "Read Lisa’s articles, ideas and observations about design and creative practice.",
  });
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const article = await getArticles();
        setArticles(article);
      } catch (error) {
        console.error(error);
        setError("Unable to load article.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadArticles();
  }, []);

  if (isLoading) {
    return <PageLoading message="Loading articles…" />;
  }

  if (error) {
    return (
      <PageMessage
        title="Unable to load Thinking"
        message={error}
        variant="error"
      />
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-bold">Thinking</h1>

      {articles.length === 0 ? (
        <PageMessage
          title="No articles published yet"
          message="Published articles will appear here."
        />
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article._id}>
              <Link to={`/thinking/${article.slug}`} className="group block">
                {article.coverImage && (
                  <img
                    src={urlFor(article.coverImage)
                      .width(1200)
                      .height(800)
                      .fit("crop")
                      .auto("format")
                      .url()}
                    alt={article.coverImage.alt}
                    className="aspect-3/2 w-full object-cover"
                    loading="lazy"
                  />
                )}
                <h2 className="text-2xl font-semibold">
                  {article.title} <br />
                  <span>{article.subtitle}</span>
                </h2>

                <p className="mt-2 text-slate-600">{article.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
